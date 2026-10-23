import Link from "next/link";

type LogoProps = {
  gradientId: string; // একই page-এ দুটো logo থাকলে SVG gradient-এর id আলাদা হতে হয়
  dark?: boolean; // সাদা background-এ বসলে true (লেখা গাঢ় রঙের হবে)
};

// VendorVerse logo: কমলা গোলের মধ্যে "V", চারপাশে একটা কক্ষপথ (orbit) — "Verse" মানে মহাবিশ্ব
export default function Logo({ gradientId, dark = false }: LogoProps) {
  return (
    <Link href="/" aria-label="VendorVerse home" className="flex shrink-0 items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 48 48" aria-hidden="true">
        {/* হলুদ থেকে কমলা gradient */}
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffc046" />
            <stop offset="1" stopColor="#ff6a13" />
          </linearGradient>
        </defs>
        {/* কমলা গোল */}
        <circle cx="24" cy="24" r="18" fill={`url(#${gradientId})`} />
        {/* সাদা "V" অক্ষর */}
        <path
          d="M15.5 16.5 L24 32.5 L32.5 16.5"
          stroke="#fff"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* চারপাশের কক্ষপথ */}
        <ellipse
          cx="24"
          cy="24"
          rx="23"
          ry="7.5"
          transform="rotate(-24 24 24)"
          fill="none"
          stroke={dark ? "#7c3aed" : "#ffffff"}
          strokeOpacity="0.9"
          strokeWidth="2.2"
        />
      </svg>
      {/* লেখা অংশ: "Vendor" + রঙিন "Verse" */}
      <span className="text-2xl font-extrabold tracking-tight">
        <span className={dark ? "text-brand-900" : "text-white"}>Vendor</span>
        <span className={dark ? "text-accent-500" : "text-gold"}>Verse</span>
      </span>
    </Link>
  );
}
