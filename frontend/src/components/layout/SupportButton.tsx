import Image from "next/image";
import Link from "next/link";

// ডান-নিচে ভেসে থাকা "Vira" AI support button — help page-এ নিয়ে যায়
// (Gemini দিয়ে আসল chat agent পরের sprint-এ যোগ হবে)
export default function SupportButton() {
  return (
    <Link
      href="/help"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-linear-to-br from-brand-600 to-pink-600 py-2 pl-2 pr-4 text-sm font-bold text-white shadow-xl shadow-brand-600/40 transition-transform hover:-translate-y-0.5"
    >
      {/* সাদা গোলের মধ্যে robot ছবি */}
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
        <Image src="/images/mock/robot.svg" alt="" width={24} height={24} />
      </span>
      {/* ছোট screen-এ লেখা লুকানো, শুধু icon */}
      <span className="hidden sm:inline">Ask Vira · AI Support</span>
    </Link>
  );
}
