import Link from "next/link";

import Logo from "./Logo";

// Footer-এর link-এর কলামগুলো (Daraz footer-এর মতো)
const linkColumns = [
  {
    title: "Customer Care",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "How to Buy", href: "/help/how-to-buy" },
      { label: "Returns & Refunds", href: "/help/returns" },
      { label: "Track My Order", href: "/account/orders" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "VendorVerse",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Sell on VendorVerse", href: "/seller/register" },
      { label: "VV Express Delivery", href: "/express" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

// Payment-এর উপায়গুলো — logo নয়, শুধু নাম (পরে অনুমতি নিয়ে logo বসানো যাবে)
const paymentMethods = ["Cash on Delivery", "bKash", "Nagad", "Rocket", "Visa", "Mastercard", "EMI"];

// Social link — lucide-এ brand logo নেই, তাই লেখা দিয়ে
const socialLinks = ["Facebook", "YouTube", "Instagram"];

// Page-এর একদম নিচের অংশ
export default function Footer() {
  return (
    <footer className="mt-10 bg-brand-950 text-sm text-brand-200">
      <div className="page-container grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* প্রথম কলাম: logo আর ছোট পরিচয় */}
        <div>
          <Logo gradientId="vv-logo-footer" />
          <p className="mt-3 leading-relaxed">
            Bangladesh&apos;s multi-vendor marketplace — shop from thousands of verified sellers with
            Cash on Delivery and 14-day easy returns.
          </p>
        </div>

        {/* link-এর কলামগুলো */}
        {linkColumns.map((column) => (
          <div key={column.title}>
            <h3 className="mb-3 font-bold text-white">{column.title}</h3>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* শেষ কলাম: payment আর social */}
        <div>
          <h3 className="mb-3 font-bold text-white">Payment Methods</h3>
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <span key={method} className="rounded-md bg-white/10 px-2 py-1 text-xs font-semibold text-white">
                {method}
              </span>
            ))}
          </div>
          <h3 className="mb-2 mt-5 font-bold text-white">Follow Us</h3>
          <p className="flex gap-4">
            {socialLinks.map((name) => (
              <span key={name} className="cursor-pointer hover:text-white">
                {name}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* একদম নিচের copyright লাইন — সাল লিখে রাখা, কারণ prerender-এর সময় new Date() চালানো যায় না */}
      <div className="border-t border-white/10">
        <p className="page-container py-4 text-xs text-brand-300">
          © 2026 VendorVerse · CSE327 Software Engineering Project, North South University
        </p>
      </div>
    </footer>
  );
}
