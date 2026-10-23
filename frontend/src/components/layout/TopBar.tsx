import { Languages } from "lucide-react";
import Link from "next/link";

// উপরের ডানদিকের ছোট link-গুলো (Daraz-এর top bar-এর মতো)
const topLinks = [
  { label: "Become a Seller", href: "/seller/register" },
  { label: "Help & Support", href: "/help" },
  { label: "Track My Order", href: "/account/orders" },
  { label: "VV Express", href: "/express" },
];

// সবার উপরের পাতলা গাঢ়-বেগুনি bar — mobile-এ লুকানো থাকে (hidden md:block)
export default function TopBar() {
  return (
    <div className="hidden bg-brand-950 text-xs text-brand-200 md:block">
      <div className="page-container flex h-8 items-center justify-between">
        {/* বাম পাশে offer-এর লেখা — জায়গা কম হলে (tablet) লুকানো */}
        <p className="hidden lg:block">Free delivery on orders over ৳999 inside Dhaka · 14-day easy returns</p>
        {/* ডান পাশে link আর ভাষা বদলের অংশ (whitespace-nowrap: লেখা ভেঙে দুই লাইনে যাবে না) */}
        <nav className="ml-auto flex items-center gap-5 whitespace-nowrap" aria-label="Top links">
          {topLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
          {/* ভাষা বদল: এখন শুধু দেখানো, পরের sprint-এ next-intl দিয়ে কাজ করবে */}
          <span className="flex items-center gap-1">
            <Languages size={13} aria-hidden="true" />
            EN | <span lang="bn">বাংলা</span>
          </span>
        </nav>
      </div>
    </div>
  );
}
