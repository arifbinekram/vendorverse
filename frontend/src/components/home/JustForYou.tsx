"use client"; // "LOAD MORE" চাপলে আরো product দেখানো — browser-এ state লাগে

import { useState } from "react";

import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";

const FIRST_BATCH = 18; // শুরুতে ১৮টা (বড় screen-এ ৩ সারি)
const NEXT_BATCH = 12; // প্রতিবার LOAD MORE চাপলে আরো ১২টা

// "Just For You" অংশ: product-এর বড় grid আর নিচে LOAD MORE button
export default function JustForYou({ products }: { products: Product[] }) {
  const [visibleCount, setVisibleCount] = useState(FIRST_BATCH); // এখন কয়টা দেখাচ্ছে
  const visibleProducts = products.slice(0, visibleCount); // প্রথম visibleCount-টা নেওয়া
  const hasMore = visibleCount < products.length; // আরো বাকি আছে কিনা

  return (
    <section aria-labelledby="just-for-you-title">
      <h2 id="just-for-you-title" className="mb-3 text-xl font-bold tracking-tight">
        Just For You
      </h2>
      {/* mobile-এ ২, tablet-এ ৩–৪, বড় screen-এ ৬ কলাম */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* বাকি থাকলে LOAD MORE, না থাকলে শেষের লেখা */}
      <div className="mt-6 flex justify-center">
        {hasMore ? (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + NEXT_BATCH)}
            className="w-full max-w-sm rounded-lg border border-brand-600 py-2.5 text-sm font-bold text-brand-600 hover:bg-brand-50"
          >
            LOAD MORE
          </button>
        ) : (
          <p className="text-sm text-muted">You have seen all products ✓</p>
        )}
      </div>
    </section>
  );
}
