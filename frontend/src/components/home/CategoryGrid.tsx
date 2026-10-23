import Image from "next/image";
import Link from "next/link";

import type { Category } from "@/types";

// "Categories" অংশ: ছবি + নামের ছোট ছোট ঘর (Daraz-এর মতো দুই সারি)
export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section aria-labelledby="categories-title">
      <h2 id="categories-title" className="mb-3 text-xl font-bold tracking-tight">
        Categories
      </h2>
      {/* mobile-এ ৪ কলাম, বড় screen-এ ৮ কলাম */}
      <div className="grid grid-cols-4 overflow-hidden rounded-xl border border-line bg-white sm:grid-cols-8">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="flex flex-col items-center gap-2 border-b border-r border-line/70 px-1 py-4 text-center hover:bg-brand-50"
          >
            <Image src={category.icon} alt="" width={46} height={46} />
            <span className="text-xs font-medium text-ink/80">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
