import { BadgeCheck, Banknote, ShieldCheck, Truck, Undo2 } from "lucide-react";

// ভরসার ৫টা কথা (Daraz-এর মতো) — icon, শিরোনাম, ছোট লেখা
const services = [
  { icon: BadgeCheck, title: "100% Authentic", note: "VV Mall brands" },
  { icon: Undo2, title: "14-Day Free Returns", note: "Hassle-free pickup" },
  { icon: Banknote, title: "Cash on Delivery", note: "Pay at your door" },
  { icon: Truck, title: "Fast Delivery", note: "2 days in Dhaka" },
  { icon: ShieldCheck, title: "Secure Payments", note: "bKash · Nagad · Card" },
];

// Hero-র নিচের সাদা পাট্টি — mobile-এ পাশাপাশি scroll হয়, tablet-এ ৩ কলাম, বড় screen-এ ৫ কলাম
export default function ServiceBar() {
  return (
    <section
      aria-label="Why shop with us"
      className="no-scrollbar flex gap-6 overflow-x-auto rounded-xl border border-line bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-3 lg:grid-cols-5"
    >
      {services.map(({ icon: Icon, title, note }) => (
        <div key={title} className="flex shrink-0 items-center gap-2.5 whitespace-nowrap sm:whitespace-normal">
          <Icon size={22} strokeWidth={1.9} className="shrink-0 text-brand-600" aria-hidden="true" />
          <div>
            <p className="text-[13px] font-semibold">{title}</p>
            <p className="text-[11px] text-muted">{note}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
