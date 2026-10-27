"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Bot, CheckCircle2, ChevronDown, CircleHelp, Clock3, Headphones, LifeBuoy, MessageCircle, PackageCheck, RotateCcw, Search, Send, ShieldCheck, Sparkles, WalletCards } from "lucide-react";

type ChatMessage = { id: string; role: string; content: string; createdAt: string };
const starter = [
  { icon: PackageCheck, title: "Orders", desc: "Track an order or delivery", prompt: "How can I track my order?" },
  { icon: WalletCards, title: "Payments", desc: "Payment methods and issues", prompt: "Which payment methods are supported?" },
  { icon: RotateCcw, title: "Returns & Refunds", desc: "Return policy and refund help", prompt: "How do I request a return or refund?" },
  { icon: ShieldCheck, title: "Warranty & Care", desc: "Warranty and product support", prompt: "How can I check a product warranty?" },
];
const faqs = [
  { q: "How do I track my order?", a: "Open your order details and use the tracking link when one is available. You can ask Vira for guidance, but live courier tracking is not connected in this demo." },
  { q: "When will I receive my refund?", a: "Refund timing depends on the return approval and payment provider. Keep your order number ready when contacting support." },
  { q: "Can I change my delivery address?", a: "Address changes may only be possible before dispatch. Contact support with your order number; never share passwords or OTPs." },
  { q: "How do I contact a human agent?", a: "This starter demonstrates the chat UI and saved history. Live human-agent handoff needs a support team integration." },
];

export default function HelpCenterPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState("");
  const [visitorId, setVisitorId] = useState("");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id = localStorage.getItem("vv-help-conversation");
    let visitor = localStorage.getItem("vv-help-visitor");
    if (!visitor) { visitor = crypto.randomUUID(); localStorage.setItem("vv-help-visitor", visitor); }
    setVisitorId(visitor);
    if (id) {
      setConversationId(id);
      fetch(`/api/help?conversationId=${encodeURIComponent(id)}`).then(r => r.json()).then(data => {
        if (Array.isArray(data.messages)) setMessages(data.messages);
      }).catch(() => {});
    }
  }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, sending]);

  async function sendMessage(text = input) {
    const message = text.trim();
    if (!message || sending) return;
    setInput(""); setSending(true); setError("");
    try {
      const res = await fetch("/api/help", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, conversationId: conversationId || null, visitorId }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Message could not be sent.");
      if (data.conversationId) { setConversationId(data.conversationId); localStorage.setItem("vv-help-conversation", data.conversationId); }
      setMessages(prev => [...prev, ...data.messages]);
    } catch (e) { setError(e instanceof Error ? e.message : "Something went wrong. Please try again."); setInput(message); }
    finally { setSending(false); }
  }
  function onSubmit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); void sendMessage(); }
  const filteredFaqs = faqs.filter(f => `${f.q} ${f.a}`.toLowerCase().includes(search.toLowerCase()));

  return <main className="help-page">
    <div className="help-mini-top"><div className="help-shell"><span>Welcome to <b>VendorVerse</b> — support that listens.</span><div><Link href="/">Shop</Link><span>English / বাংলা</span><span><i className="help-online-dot"/> Support online</span></div></div></div>
    <header className="help-header"><div className="help-shell help-header-inner"><Link className="help-brand" href="/"><span className="help-brand-icon"><Headphones size={24}/></span><span>vendor<span>verse</span><small>SHOP SMART. LIVE BETTER.</small></span></Link><div className="help-header-search"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search help articles, FAQs, or ask Vira..."/><button onClick={() => document.getElementById("help-chat-input")?.focus()}>Ask Vira</button></div><Link className="help-back-shop" href="/"><ArrowLeft size={16}/> Back to shop</Link></div></header>
    <section className="help-hero"><div className="help-shell help-hero-inner"><div><div className="help-hero-kicker"><Sparkles size={15}/> VENDORVERSE SUPPORT</div><h1>How can we <span>help you?</span></h1><p>Get quick answers, anytime. Chat with Vira, your AI customer-support assistant — in English or বাংলা.</p><div className="help-hero-points"><span><CheckCircle2 size={15}/> Quick answers</span><span><Clock3 size={15}/> 24/7 help</span><span><ShieldCheck size={15}/> Private conversation history</span></div></div><div className="help-hero-art"><div className="help-orbit orbit-one"/><div className="help-orbit orbit-two"/><div className="help-bot-illustration"><Bot size={65}/><span className="bot-spark spark-a">✦</span><span className="bot-spark spark-b">✧</span></div><div className="help-art-bubble">Hi! I'm Vira 👋<small>How can I help today?</small></div></div></div></section>
    <div className="help-shell help-content-grid">
      <aside className="help-sidebar"><div className="help-section-heading"><div><span className="help-overline">FIND YOUR ANSWER</span><h2>Browse by topic</h2></div><CircleHelp size={19}/></div><div className="help-topic-grid">{starter.map(({icon:Icon,title,desc,prompt})=><button key={title} className="help-topic-card" onClick={()=>void sendMessage(prompt)}><span className="help-topic-icon"><Icon size={20}/></span><span><b>{title}</b><small>{desc}</small></span><ArrowRight className="help-topic-arrow" size={15}/></button>)}</div>
      <section className="help-faq-panel"><div className="help-faq-title"><h3>Popular questions</h3><span>TOP FAQs</span></div>{filteredFaqs.map((faq,i)=><div className="help-faq-item" key={faq.q}><button onClick={()=>setExpandedFaq(expandedFaq===i?null:i)}>{faq.q}<ChevronDown size={16} className={expandedFaq===i?"faq-chevron-open":""}/></button>{expandedFaq===i&&<p>{faq.a}<button className="faq-ask" onClick={()=>void sendMessage(faq.q)}>Ask Vira <ArrowRight size={13}/></button></p>}</div>)}{filteredFaqs.length===0&&<p className="help-no-results">No matching FAQs. Ask Vira in the chat.</p>}</section>
      <div className="help-human-card"><span className="human-icon"><LifeBuoy size={20}/></span><div><b>Still need a hand?</b><p>Tell Vira what happened and get guided next steps.</p><button onClick={()=>document.getElementById("help-chat-input")?.focus()}>Start a conversation <ArrowRight size={14}/></button></div></div>
      </aside>
      <section className="help-chat-card"><div className="help-chat-top"><div className="help-agent-avatar"><Bot size={23}/><i/></div><div className="help-agent-meta"><h2>Vira <span>AI Customer Support</span></h2><p><i className="help-online-dot"/> Usually replies instantly <span>·</span> English & বাংলা</p></div><button className="help-chat-menu" title="Conversation saved to your browser and database"><ShieldCheck size={19}/></button></div><div className="help-chat-notice"><ShieldCheck size={15}/><span>Your messages and replies are saved in conversation history. Please don't share passwords, PINs, or OTPs.</span></div>
        <div className="help-chat-messages"><div className="help-chat-date">TODAY · VENDORVERSE SUPPORT</div><div className="help-message-row"><div className="help-message-avatar"><Bot size={16}/></div><div className="help-message-content"><span className="help-message-name">Vira <small>AI assistant</small></span><div className="help-bubble bot-bubble">Hi there! 👋 Welcome to VendorVerse Help Center.<br/><br/>I’m Vira. I can help with orders, delivery, returns & refunds, payments, and product questions. What can I help you with today?<div className="help-quick-prompts"><button onClick={()=>void sendMessage("How can I track my order?")}>📦 Track my order</button><button onClick={()=>void sendMessage("How do I request a return or refund?")}>↩ Returns & refunds</button></div></div></div></div>
        {messages.map((m,i)=><div className={`help-message-row ${m.role==="user"?"customer-row":""}`} key={m.id || `${i}-${m.createdAt}`}><div className="help-message-avatar">{m.role==="user"?"N":<Bot size={16}/>}</div><div className="help-message-content"><span className="help-message-name">{m.role==="user"?"You":"Vira"} <small>{m.createdAt?new Date(m.createdAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}):"just now"}</small></span><div className={`help-bubble ${m.role==="user"?"customer-bubble":"bot-bubble"}`}>{m.content}</div></div></div>)}
        {sending&&<div className="help-message-row"><div className="help-message-avatar"><Bot size={16}/></div><div className="help-bubble bot-bubble help-typing"><i/><i/><i/> Vira is typing</div></div>}{error&&<div className="help-error">{error}</div>}<div ref={bottomRef}/></div>
        <form className="help-chat-compose" onSubmit={onSubmit}><input id="help-chat-input" value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your message in English or বাংলা..." maxLength={3000}/><button type="submit" disabled={sending||!input.trim()} aria-label="Send message"><Send size={18}/></button><small>Press Enter to send · Replies and chat history are stored in PostgreSQL</small></form>
        <div className="help-chat-footer"><span><ShieldCheck size={13}/> Secure support experience</span><span>Powered by <b>Vira AI</b></span></div>
      </section>
    </div>
    <footer className="help-footer"><div className="help-shell"><Link className="help-footer-brand" href="/"><Headphones size={17}/> VendorVerse</Link><span>Need help? Vira is here for you. <span className="help-footer-dot">•</span> <Link href="/">Continue shopping <ArrowRight size={13}/></Link></span><small>© 2026 VendorVerse. Support starter experience.</small></div></footer>
  </main>;
}
