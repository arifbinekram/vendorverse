import Image from "next/image";
import Link from "next/link";

import { discountPercent, formatCount, formatPrice } from "@/lib/format";
import type { Product } from "@/types";

import RatingStars from "./RatingStars";

// Daraz-এর মতো product card: ছবি, নাম, দাম, পুরনো দাম, discount, rating
export default function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product.price, product.originalPrice); // কত % ছাড়

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow hover:shadow-lg hover:shadow-brand-900/10"
    >
      {/* ছবির অংশ: বর্গাকার, পেছনে হালকা রং */}
      <div className="relative aspect-square" style={{ background: product.imageBg }}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
        {/* উপরে-বামে ছোট badge: VV Mall আর Free Delivery */}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {product.isMall && (
            <span className="rounded bg-brand-600 px-1.5 py-0.5 text-[10px] font-bold text-white">VV Mall</span>
          )}
          {product.freeDelivery && (
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
              Free Delivery
            </span>
          )}
        </div>
      </div>

      {/* লেখার অংশ */}
      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-2">
        {/* নাম: সর্বোচ্চ ২ লাইন, বেশি হলে "..." */}
        <h3 className="line-clamp-2 min-h-[2.6em] text-[13px] leading-snug text-ink/90 group-hover:text-brand-700">
          {product.title}
        </h3>
        {/* এখনকার দাম — কমলা আর বড় */}
        <p className="mt-1.5 text-base font-bold text-accent-500">{formatPrice(product.price)}</p>
        {/* আগের দাম (কাটা) আর discount % */}
        {discount > 0 && (
          <p className="flex gap-1.5 text-[11px]">
            <span className="text-muted line-through">{formatPrice(product.originalPrice)}</span>
            <span className="text-ink">-{discount}%</span>
          </p>
        )}
        {/* rating, কতজন review দিয়েছে, আর seller-এর শহর */}
        <div className="mt-auto flex items-center gap-1 pt-1.5 text-[11px] text-muted">
          <RatingStars rating={product.rating} />
          <span>({formatCount(product.reviews)})</span>
          <span className="ml-auto truncate">{product.location}</span>
        </div>
      </div>
    </Link>
  );
}
