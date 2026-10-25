// Data layer: homepage শুধু এই function-গুলো ডাকে, data কোথা থেকে আসে তা জানে না।
// এখন mock data ফেরত দেয়; backend (NestJS) তৈরি হলে শুধু এই file-এর ভেতরটা বদলাতে হবে — UI-তে হাত দিতে হবে না।
// উদাহরণ (cacheComponents চালু, তাই fetch-এর ফল "use cache" দিয়ে cache না করলে build error হয়):
//   import { cacheLife } from "next/cache";
//   export async function getJustForYouProducts(): Promise<Product[]> {
//     "use cache";
//     cacheLife("minutes"); // কয়েক মিনিট পর পর নতুন data আনে
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/just-for-you`);
//     return res.json();
//   }

import { banners } from "@/data/banners";
import { categoryTiles, sidebarCategories } from "@/data/categories";
import { flashSaleItems, justForYouOrder, products } from "@/data/products";
import type { Banner, Category, FlashSaleProduct, Product } from "@/types";

const API_URL = process.env.API_URL?.replace(/\/$/, "");

// id দিয়ে দ্রুত product খোঁজার জন্য একটা Map বানিয়ে রাখি
const productById = new Map(products.map((p) => [p.id, p]));

async function fetchProducts<T>(path: string): Promise<T> {
  if (!API_URL) throw new Error("API_URL is not configured.");

  const response = await fetch(`${API_URL}/api/products${path}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Product API request failed (${response.status} ${response.statusText}).`);
  }
  return (await response.json()) as T;
}

// id থেকে product আনে; না পেলে error দেয় (ভুল id ধরতে সুবিধা)
function findProduct(id: string): Product {
  const product = productById.get(id); // Map থেকে খোঁজা
  if (!product) throw new Error(`Unknown product id: ${id}`); // ভুল id হলে থামাও
  return product;
}

// Hero carousel-এর banner-গুলো
export async function getBanners(): Promise<Banner[]> {
  return banners;
}

// বাম পাশের category menu
export async function getSidebarCategories(): Promise<Category[]> {
  return sidebarCategories;
}

// "Categories" অংশের tile-গুলো
export async function getCategoryTiles(): Promise<Category[]> {
  return categoryTiles;
}

// Flash Sale-এর product-গুলো, সাথে কত % বিক্রি হয়েছে
export async function getFlashSaleProducts(): Promise<FlashSaleProduct[]> {
  if (API_URL) return fetchProducts<FlashSaleProduct[]>("/flash-sale");

  return flashSaleItems.map((item) => ({
    ...findProduct(item.productId), // পুরো product-এর তথ্য
    soldPercent: item.soldPercent, // progress bar-এর %
  }));
}

// "Just For You" অংশের সব product, নির্দিষ্ট ক্রমে
export async function getJustForYouProducts(): Promise<Product[]> {
  if (API_URL) return fetchProducts<Product[]>("");

  return justForYouOrder.map(findProduct); // id-র list → product-এর list
}
