import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



function fallbackReply(message: string) {
  const text = message.toLowerCase();
  if (/order|track|delivery|shipping|parcel|অর্ডার|ডেলিভারি|পার্সেল/.test(text)) {
    return "I can help with order tracking. Please share your order number (do not send card details or passwords). This demo is not connected to a live courier system yet, so I can explain the process but cannot verify a real shipment.\n\nআপনার অর্ডার নম্বরটি দিলে আমি পরবর্তী ধাপ বুঝিয়ে দিতে পারি। এই demo এখনো live courier system-এর সঙ্গে যুক্ত নয়।";
  }
  if (/return|refund|exchange|রিটার্ন|ফেরত|রিফান্ড/.test(text)) {
    return "For a return or refund, keep the product, packaging, and order number ready. In a real store, eligibility depends on the order date and item policy. This demo can guide you, but it does not submit a real return request yet.\n\nরিটার্ন/রিফান্ডের জন্য অর্ডার নম্বর, পণ্যের অবস্থা ও প্যাকেজিং প্রস্তুত রাখুন। এই demo এখনো বাস্তব return request তৈরি করে না।";
  }
  if (/payment|pay|card|bkash|nagad|পেমেন্ট|টাকা/.test(text)) {
    return "For your safety, never send card numbers, PINs, OTPs, or passwords in chat. Payment support can help you check available methods, but this demo does not process payments.\n\nনিরাপত্তার জন্য কার্ড নম্বর, PIN, OTP বা password chat-এ পাঠাবেন না।";
  }
  if (/product|price|stock|available|পণ্য|দাম|স্টক/.test(text)) {
    return "I can help with product questions. Please tell me the product name or paste its product-page link. I can guide you, but live stock checks are not connected to this demo yet.\n\nপণ্যের নাম বা product page-এর link দিলে আমি সাহায্য করতে পারব।";
  }
  if (/hello|hi\b|hey|হ্যালো|আসসালামু/.test(text)) {
    return "Hello! 👋 Welcome to VendorVerse Support. You can ask me about orders, delivery, returns, payments, or products. আপনি চাইলে বাংলাতেও প্রশ্ন করতে পারেন।";
  }
  return "Thanks for contacting VendorVerse Support. I can guide you about orders, delivery, returns & refunds, payments, and product questions. Tell me a little more about the issue, and please do not share passwords, PINs, or OTPs.\n\nআপনি চাইলে বাংলায়ও লিখতে পারেন।";
}

async function generateReply(history: { role: string; content: string }[], latest: string) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return fallbackReply(latest);
  try {
    const transcript = history.slice(-12).map((m) => `${m.role === "assistant" ? "Support agent" : "Customer"}: ${m.content}`).join("\n");
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: "You are Vira, the VendorVerse customer-support assistant. Be warm, concise, and helpful. Reply in the language the customer uses (Bangla or English). You may explain order tracking, delivery, returns/refunds, payments, and product help, but never claim you performed an action or checked a live order unless the system provided verified data. Do not ask for passwords, card numbers, PINs, or OTPs. If information is missing, ask a focused follow-up question. Clearly say when a real store action is not connected." }] },
        contents: [{ role: "user", parts: [{ text: `Conversation history:\n${transcript}\n\nRespond to the latest customer message: ${latest}` }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 450 }
      })
    });
    if (!response.ok) return fallbackReply(latest);
    const data = await response.json();
    const answer = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("").trim();
    return answer || fallbackReply(latest);
  } catch {
    return fallbackReply(latest);
  }
}

export async function GET(request: NextRequest) {
  const conversationId = request.nextUrl.searchParams.get("conversationId");
  if (!conversationId) return NextResponse.json({ messages: [] });
  const conversation = await prisma.supportConversation.findUnique({
    where: { id: conversationId },
    include: { messages: { orderBy: { createdAt: "asc" } } }
  });
  if (!conversation) return NextResponse.json({ messages: [] });
  return NextResponse.json({ conversationId: conversation.id, messages: conversation.messages });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const existingId = typeof body.conversationId === "string" ? body.conversationId : null;
    const visitorId = typeof body.visitorId === "string" ? body.visitorId.slice(0, 100) : null;
    if (!message) return NextResponse.json({ error: "Message is required." }, { status: 400 });
    if (message.length > 3000) return NextResponse.json({ error: "Message is too long (max 3000 characters)." }, { status: 400 });

    let conversation = existingId ? await prisma.supportConversation.findUnique({ where: { id: existingId } }) : null;
    if (!conversation) conversation = await prisma.supportConversation.create({ data: { visitorId, subject: message.slice(0, 70) } });
    const customerMessage = await prisma.supportMessage.create({ data: { conversationId: conversation.id, role: "user", content: message } });
    const previous = await prisma.supportMessage.findMany({ where: { conversationId: conversation.id }, orderBy: { createdAt: "asc" }, take: 20 });
    const reply = await generateReply(previous.map((m) => ({ role: m.role, content: m.content })), message);
    const assistantMessage = await prisma.supportMessage.create({ data: { conversationId: conversation.id, role: "assistant", content: reply } });
    return NextResponse.json({ conversationId: conversation.id, messages: [customerMessage, assistantMessage] });
  } catch (error) {
    console.error("Help chat error", error);
    return NextResponse.json({ error: "Could not save your message. Check the database connection and try again." }, { status: 500 });
  }
}
