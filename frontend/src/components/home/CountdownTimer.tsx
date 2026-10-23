"use client"; // প্রতি সেকেন্ডে সময় বদলায় — browser-এ চলতে হবে

import { useEffect, useState } from "react";

// Flash Sale-এর slot প্রতি ৪ ঘণ্টায় বদলায় (12AM, 4AM, 8AM, 12PM, 4PM, 8PM)
const SLOT_HOURS = 4;

// এখনকার slot কখন শেষ হবে তা বের করা
function getSlotEnd(now: Date): Date {
  const end = new Date(now); // এখনকার সময়ের কপি
  end.setMinutes(0, 0, 0); // মিনিট-সেকেন্ড শূন্য
  end.setHours(Math.floor(now.getHours() / SLOT_HOURS) * SLOT_HOURS + SLOT_HOURS); // পরের slot-এর শুরু
  return end; // 24 হলে নিজে থেকেই পরের দিনের 12AM হয়ে যায়
}

// 5 → "05"
const pad = (value: number) => String(value).padStart(2, "0");

// "Ending in 02 : 14 : 37" — কালো ছোট বাক্সে ঘণ্টা : মিনিট : সেকেন্ড
export default function CountdownTimer() {
  // শুরুতে null — server-এ সময় হিসাব করি না (তাহলে browser-এর সময়ের সাথে মিলত না)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    // বাকি সেকেন্ড হিসাব করে state-এ রাখা
    const tick = () => {
      const now = new Date();
      const left = Math.floor((getSlotEnd(now).getTime() - now.getTime()) / 1000);
      setSecondsLeft(Math.max(0, left));
    };
    const first = setTimeout(tick, 0); // প্রথমবার সাথে সাথেই
    const timer = setInterval(tick, 1000); // তারপর প্রতি সেকেন্ডে
    return () => {
      clearTimeout(first); // component সরে গেলে timer বন্ধ
      clearInterval(timer);
    };
  }, []);

  // সেকেন্ড থেকে ঘণ্টা, মিনিট, সেকেন্ড আলাদা করা
  const parts =
    secondsLeft === null
      ? ["--", "--", "--"] // হিসাব হওয়ার আগে
      : [Math.floor(secondsLeft / 3600), Math.floor((secondsLeft % 3600) / 60), secondsLeft % 60].map(pad);

  return (
    <span className="flex items-center gap-1 text-xs text-muted" aria-live="off">
      <span className="mr-1 hidden sm:inline">Ending in</span>
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="rounded-md bg-ink px-1.5 py-1 font-bold tabular-nums text-white">{part}</span>
          {i < 2 && <b className="text-ink">:</b>}
        </span>
      ))}
    </span>
  );
}
