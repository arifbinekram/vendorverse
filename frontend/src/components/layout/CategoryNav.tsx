import { ChevronDown, LayoutGrid, Zap } from "lucide-react";
import Link from "next/link";

// Header-এর নিচের সাদা bar-এর link-গুলো
const navLinks = [
  { label: "Flash Sale", href: "/flash-sale" },
  { label: "VV Mall", href: "/mall" },
  { label: "Vouchers", href: "/vouchers" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Global Collection", href: "/global" },
  { label: "Groceries", href: "/category/groceries" },
  { label: "Add Product", href: "/admin/products" },
];

// Categories + campaign link-এর bar — mobile-এ পাশাপাশি scroll হয়
export default function CategoryNav() {
  return (
    <div className="border-b border-line bg-white">
      <nav
        aria-label="Shop sections"
        className="page-container no-scrollbar flex h-11 items-center gap-6 overflow-x-auto whitespace-nowrap text-sm font-medium text-ink/80"
      >
        {/* সব category-র link */}
        <Link href="/categories" className="flex items-center gap-1.5 font-semibold text-ink">
          <LayoutGrid size={16} className="text-brand-600" aria-hidden="true" />
          Categories
          <ChevronDown size={14} aria-hidden="true" />
        </Link>
        {/* চলমান campaign — কমলা রঙে আলাদা করে দেখানো */}
        <Link href="/campaign/11-11-mega-sale" className="flex items-center gap-1 font-bold text-accent-600">
          <Zap size={14} strokeWidth={2.4} aria-hidden="true" />
          11.11 Mega Sale
        </Link>
        {/* বাকি সাধারণ link */}
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-brand-600">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
