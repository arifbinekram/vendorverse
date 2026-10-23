"use client"; // "Check in" আর "Collect" button চাপলে লেখা বদলায় — তাই Client Component

import Image from "next/image";
import { useState } from "react";

// Daily check-in-এর ৭ দিনের coin (শেষ দিনে বেশি)
const checkInRewards = [10, 10, 10, 10, 10, 10, 50];

// সংগ্রহ করার মতো voucher-গুলো
const vouchers = [
  { id: "save150", value: "৳150 OFF", condition: "Min. spend ৳1,499", tone: "accent" },
  { id: "freeship", value: "Free Shipping", condition: "Min. spend ৳499", tone: "brand" },
] as const;

// Hero-র ডান পাশের দুটো ছোট card: VV Coins check-in আর voucher collect
// (এখন শুধু UI-তে কাজ করে; login আর backend এলে আসল coin/voucher জমা হবে)
export default function SidePanel() {
  const [streak, setStreak] = useState(4); // কত দিন টানা check-in হয়েছে
  const [checkedIn, setCheckedIn] = useState(false); // আজ check-in করা হয়েছে কিনা
  const [collected, setCollected] = useState<string[]>([]); // কোন voucher-গুলো নেওয়া হয়েছে

  // আজকের check-in: streak এক বাড়াও আর button বন্ধ করো
  function handleCheckIn() {
    if (checkedIn) return; // দিনে একবারই
    setStreak((days) => Math.min(days + 1, checkInRewards.length));
    setCheckedIn(true);
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-3 xl:flex" aria-label="Rewards">
      {/* VV Coins card */}
      <div className="rounded-xl border border-line bg-linear-to-br from-amber-50 to-white p-4">
        <div className="flex items-center gap-2">
          <Image src="/images/mock/coin.svg" alt="" width={30} height={30} />
          <div>
            <p className="text-sm font-bold">VV Coins</p>
            <p className="text-[11px] text-muted">Daily check-in · {streak}-day streak</p>
          </div>
        </div>
        {/* ৭ দিনের গোল ঘর — যতদিন হয়েছে সেগুলো হলুদ */}
        <div className="mt-3 flex justify-between">
          {checkInRewards.map((coins, day) => (
            <div key={day} className="flex flex-col items-center gap-0.5">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                  day < streak ? "bg-gold text-amber-900" : "bg-zinc-100 text-zinc-400"
                }`}
              >
                +{coins}
              </span>
              <span className="text-[10px] text-muted">D{day + 1}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleCheckIn}
          disabled={checkedIn}
          className="mt-3 w-full rounded-lg bg-accent-500 py-1.5 text-xs font-bold text-white hover:bg-accent-600 disabled:bg-emerald-600"
        >
          {checkedIn ? "Checked in ✓" : `Check in · +${checkInRewards[streak] ?? 10} Coins`}
        </button>
      </div>

      {/* Voucher card */}
      <div className="rounded-xl border border-line bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">Collect Vouchers</p>
          <span className="text-[11px] font-semibold text-brand-600">View all</span>
        </div>
        {vouchers.map((voucher) => {
          const isCollected = collected.includes(voucher.id); // এটা কি নেওয়া হয়ে গেছে?
          const isAccent = voucher.tone === "accent"; // কমলা নাকি বেগুনি
          return (
            <div
              key={voucher.id}
              className={`mt-2.5 flex items-center rounded-lg border border-dashed ${
                isAccent ? "border-accent-400 bg-accent-50" : "border-brand-300 bg-brand-50"
              }`}
            >
              <div className="flex-1 px-3 py-2">
                <p className={`text-base font-extrabold ${isAccent ? "text-accent-500" : "text-brand-600"}`}>
                  {voucher.value}
                </p>
                <p className="text-[11px] text-muted">{voucher.condition}</p>
              </div>
              <button
                type="button"
                onClick={() => setCollected((ids) => [...ids, voucher.id])}
                disabled={isCollected}
                className={`mr-2.5 rounded-md px-3 py-1 text-xs font-bold text-white disabled:bg-emerald-600 ${
                  isAccent ? "bg-accent-500" : "bg-brand-600"
                }`}
              >
                {isCollected ? "Collected" : "Collect"}
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
