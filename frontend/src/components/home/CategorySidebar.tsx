import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Category } from "@/types";

// Hero-র বাম পাশের category menu (Daraz-এর মতো) — শুধু বড় screen-এ দেখায় (hidden lg:block)
export default function CategorySidebar({ categories }: { categories: Category[] }) {
  return (
    <nav aria-label="Categories" className="hidden w-60 shrink-0 rounded-xl border border-line bg-white py-2 lg:block">
      <ul>
        {categories.map((category) => (
          <li key={category.slug}>
            {/* প্রতিটা সারি: ছোট ছবি + নাম + ডান তীর */}
            <Link
              href={`/category/${category.slug}`}
              className="flex items-center gap-2.5 px-3.5 py-[7px] text-[13px] text-ink/80 hover:bg-brand-50 hover:text-brand-700"
            >
              <Image src={category.icon} alt="" width={18} height={18} />
              <span className="flex-1 truncate">{category.name}</span>
              <ChevronRight size={13} className="text-zinc-300" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
