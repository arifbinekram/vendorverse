import { Suspense } from "react";

import CategoryGrid from "@/components/home/CategoryGrid";
import FlashSale from "@/components/home/FlashSale";
import HeroSection from "@/components/home/HeroSection";
import JustForYou from "@/components/home/JustForYou";
import ServiceBar from "@/components/home/ServiceBar";
import {
  getBanners,
  getCategoryTiles,
  getFlashSaleProducts,
  getJustForYouProducts,
  getSidebarCategories,
} from "@/lib/api";

// Homepage (http://localhost:3000/) — Daraz-এর মতো ক্রমে সাজানো:
// Hero (category + banner + coins) → service bar → Flash Sale → Categories → Just For You
export default function HomePage() {
  return (
    <Suspense fallback={<div className="page-container py-8 text-sm text-muted">Loading VendorVerse...</div>}>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  // সব data একসাথে আনা — একটার জন্য আরেকটা অপেক্ষা করে না (Promise.all)
  const [banners, sidebarCategories, flashSaleProducts, categoryTiles, justForYouProducts] = await Promise.all([
    getBanners(),
    getSidebarCategories(),
    getFlashSaleProducts(),
    getCategoryTiles(),
    getJustForYouProducts(),
  ]);

  return (
    <div className="page-container space-y-6 py-4">
      {/* screen reader আর Google-এর জন্য page-এর মূল শিরোনাম (চোখে দেখা যায় না) */}
      <h1 className="sr-only">VendorVerse — Online Shopping in Bangladesh</h1>
      <HeroSection banners={banners} categories={sidebarCategories} />
      <ServiceBar />
      <FlashSale products={flashSaleProducts} />
      <CategoryGrid categories={categoryTiles} />
      <JustForYou products={justForYouProducts} />
    </div>
  );
}
