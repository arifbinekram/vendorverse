import type { Banner, Category } from "@/types";

import CategorySidebar from "./CategorySidebar";
import HeroCarousel from "./HeroCarousel";
import SidePanel from "./SidePanel";

type HeroSectionProps = {
  banners: Banner[]; // carousel-এর slide
  categories: Category[]; // বাম পাশের menu
};

// Homepage-এর প্রথম অংশ: [category menu] [banner slider] [coins + vouchers]
// ছোট screen-এ শুধু slider থাকে, বড় screen-এ তিনটাই পাশাপাশি
export default function HeroSection({ banners, categories }: HeroSectionProps) {
  return (
    <section className="flex gap-4">
      <CategorySidebar categories={categories} />
      <HeroCarousel banners={banners} />
      <SidePanel />
    </section>
  );
}
