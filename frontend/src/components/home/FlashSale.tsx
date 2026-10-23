import { Zap } from "lucide-react";
import Link from "next/link";

import FlashSaleCard from "@/components/product/FlashSaleCard";
import type { FlashSaleProduct } from "@/types";

import CountdownTimer from "./CountdownTimer";

// "Flash Sale" অংশ: শিরোনাম, চলমান countdown, "SHOP ALL" button, আর ৬টা card
export default function FlashSale({ products }: { products: FlashSaleProduct[] }) {
  return (
    <section aria-labelledby="flash-sale-title">
      {/* উপরের সারি */}
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h2 id="flash-sale-title" className="text-xl font-bold tracking-tight">
          Flash Sale
        </h2>
        <span className="flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-1 text-[11px] font-semibold text-accent-600">
          <Zap size={12} strokeWidth={2.4} aria-hidden="true" />
          On Sale Now
        </span>
        <CountdownTimer />
        <Link
          href="/flash-sale"
          className="ml-auto rounded-md border border-accent-500 px-3 py-1.5 text-xs font-semibold text-accent-600 hover:bg-accent-50"
        >
          SHOP ALL PRODUCTS
        </Link>
      </div>

      {/* card-এর grid: mobile-এ ২টা, tablet-এ ৩টা, বড় screen-এ ৬টা পাশাপাশি */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => (
          <FlashSaleCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
