"use client"; // typing আর button click browser-এ চলে, তাই এটা Client Component

import { Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

// Header-এর বড় search bar (Daraz-এর মতো), সাথে "Ask AI" button
export default function SearchBar() {
  const router = useRouter(); // অন্য page-এ যাওয়ার জন্য
  const [query, setQuery] = useState(""); // box-এ যা লেখা হচ্ছে

  // Enter চাপলে বা search button চাপলে চলে
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // browser-এর page reload বন্ধ
    const text = query.trim(); // দুই পাশের ফাঁকা জায়গা বাদ
    if (!text) return; // খালি হলে কিছু করো না
    router.push(`/search?q=${encodeURIComponent(text)}`); // search page-এ নিয়ে যাও
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex h-11 w-full overflow-hidden rounded-lg bg-white shadow-lg shadow-brand-950/25"
    >
      {/* লেখার box */}
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search in VendorVerse"
        aria-label="Search products"
        className="min-w-0 flex-1 px-4 text-sm text-ink outline-none placeholder:text-muted"
      />
      {/* AI search button — পরের sprint-এ Gemini দিয়ে কাজ করবে, এখন সাধারণ search চালায় */}
      <button
        type="submit"
        className="hidden items-center gap-1.5 border-l border-brand-100 bg-brand-50 px-3 text-xs font-bold text-brand-600 sm:flex"
      >
        <Sparkles size={15} aria-hidden="true" />
        Ask AI
      </button>
      {/* কমলা search button */}
      <button
        type="submit"
        aria-label="Search"
        className="flex w-14 items-center justify-center bg-accent-500 text-white transition-colors hover:bg-accent-600"
      >
        <Search size={20} strokeWidth={2.4} />
      </button>
    </form>
  );
}
