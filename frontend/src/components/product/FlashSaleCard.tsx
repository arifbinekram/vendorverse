import Image from "next/image";
import Link from "next/link";

import { discountPercent, formatCount, formatPrice } from "@/lib/format";
import type { FlashSaleProduct } from "@/types";

// Flash Sale-এর card: সাধারণ card-এর মতো, কিন্তু rating-এর জায়গায় "কত বিক্রি হলো"-র কমলা bar
export default function FlashSaleCard({ product }: { product: FlashSaleProduct }) {
  const discount = discountPercent(product.price, product.originalPrice); // কত % ছাড়

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow hover:shadow-lg hover:shadow-brand-900/10"
    >
      {/* ছবি + ডান কোণে কমলা discount badge */}
      <div className="relative aspect-square" style={{ background: product.imageBg }}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute right-2 top-2 rounded bg-accent-500 px-1.5 py-0.5 text-[11px] font-bold text-white">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-3 pt-2">
        {/* নাম (২ লাইন পর্যন্ত) */}
        <h3 className="line-clamp-2 min-h-[2.6em] text-[13px] leading-snug text-ink/90 group-hover:text-brand-700">
          {product.title}
        </h3>
        {/* দাম আর কাটা দাম */}
        <p className="mt-1.5 text-base font-bold text-accent-500">{formatPrice(product.price)}</p>
        <p className="text-[11px] text-muted line-through">{formatPrice(product.originalPrice)}</p>
        {/* বিক্রির progress bar: যত বেশি বিক্রি, bar তত লম্বা */}
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-accent-100" aria-hidden="true">
          <div className="h-full rounded-full bg-accent-500" style={{ width: `${product.soldPercent}%` }} />
        </div>
        <p className="mt-1 text-[11px] text-muted">{formatCount(product.sold)} sold</p>
      </div>
    </Link>
  );
}
