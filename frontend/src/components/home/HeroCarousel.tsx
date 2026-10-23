"use client"; // নিজে নিজে slide বদলানো আর button click — browser-এ চলে

import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Banner } from "@/types";

const AUTO_SLIDE_MS = 4500; // প্রতি ৪.৫ সেকেন্ডে পরের slide

// ডান পাশে ছবিগুলো কোথায় বসবে (top/left %, আকার px, কতটা ঘোরানো) — প্রথমটা সবচেয়ে বড়
const imageSpots = [
  { top: "18%", left: "38%", size: 150, rotate: 0 },
  { top: "48%", left: "4%", size: 96, rotate: -12 },
  { top: "56%", left: "70%", size: 92, rotate: 10 },
  { top: "4%", left: "10%", size: 58, rotate: 0 },
  { top: "2%", left: "76%", size: 60, rotate: 0 },
];

// Homepage-এর বড় banner slider
export default function HeroCarousel({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0); // এখন কোন slide দেখাচ্ছে
  const [paused, setPaused] = useState(false); // mouse উপরে থাকলে থামানো

  // প্রতি AUTO_SLIDE_MS পর পর পরের slide-এ যাও (থামানো না থাকলে)
  useEffect(() => {
    if (paused) return; // mouse উপরে থাকলে timer চালু করো না
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % banners.length); // শেষ slide-এর পর আবার প্রথমটায়
    }, AUTO_SLIDE_MS);
    return () => clearInterval(timer); // component সরে গেলে timer বন্ধ
  }, [paused, banners.length]);

  // আগের / পরের slide-এ যাওয়া (তীর button-এর জন্য)
  const goTo = (next: number) => setIndex((next + banners.length) % banners.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Campaign banners"
      className="group relative h-48 min-w-0 flex-1 overflow-hidden rounded-xl sm:h-72 lg:h-auto lg:min-h-[362px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* সব slide পাশাপাশি; translateX দিয়ে পুরো সারিটা সরিয়ে একটা slide দেখানো হয় */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((banner, i) => (
          <div
            key={banner.id}
            className="relative h-full min-w-full overflow-hidden"
            style={{ background: banner.background }}
            aria-hidden={i !== index}
          >
            {/* হালকা বিন্দুর নকশা (texture) */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,.18)_1px,transparent_1px)] bg-[length:18px_18px] opacity-40" />

            {/* বাম পাশের লেখা */}
            <div className="relative z-10 flex h-full max-w-[60%] flex-col justify-center px-6 text-white sm:px-10">
              <span className="flex w-fit items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold text-amber-200 sm:text-[11px]">
                <Zap size={12} className="text-gold" aria-hidden="true" />
                {banner.tag}
              </span>
              <p className="mt-3 text-4xl font-black leading-none tracking-tight text-gold sm:text-6xl lg:text-7xl">
                {banner.title}
              </p>
              <p className="text-2xl font-black leading-tight tracking-tight sm:text-4xl lg:text-[44px]">
                {banner.subtitle}
              </p>
              <p className="mt-2 hidden text-sm font-medium opacity-90 sm:block">{banner.description}</p>
              <Link
                href={banner.href}
                tabIndex={i === index ? 0 : -1}
                className="mt-4 w-fit rounded-lg bg-gold px-4 py-2 text-sm font-bold text-brand-900 hover:bg-amber-300 sm:px-5 sm:py-2.5"
              >
                {banner.cta} →
              </Link>
            </div>

            {/* ডান পাশে ছবিগুলোর সাজানো দল — mobile-এ ছোট করে; origin-right মানে ছোট হলেও ডান দিকে লেগে থাকে, লেখার উপর আসে না */}
            <div className="absolute right-2 top-1/2 h-[230px] w-[290px] origin-right -translate-y-1/2 scale-[0.55] sm:right-6 sm:scale-90 lg:scale-100">
              <div className="absolute left-[24%] top-[12%] h-48 w-48 rounded-full bg-white/10" />
              {banner.images.map((src, k) => {
                const spot = imageSpots[k]; // এই ছবির জায়গা
                if (!spot) return null; // ৫টার বেশি ছবি থাকলে বাদ
                return (
                  <Image
                    key={src + k}
                    src={src}
                    alt=""
                    width={spot.size}
                    height={spot.size}
                    priority={i === 0}
                    className="absolute drop-shadow-xl"
                    style={{ top: spot.top, left: spot.left, transform: `rotate(${spot.rotate}deg)` }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* আগের / পরের তীর — mouse নিলে দেখা যায় */}
      <button
        type="button"
        aria-label="Previous banner"
        onClick={() => goTo(index - 1)}
        className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/25 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 sm:block"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Next banner"
        onClick={() => goTo(index + 1)}
        className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/25 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 sm:block"
      >
        <ChevronRight size={20} />
      </button>

      {/* নিচের ছোট dot — চাপলে সেই slide-এ যায় */}
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
        {banners.map((banner, i) => (
          <button
            key={banner.id}
            type="button"
            aria-label={`Show banner ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
