// VendorVerse frontend-এর shared TypeScript type — এক জায়গায় রাখলে সব component একই "আকার" মেনে চলে

// একটা product-এর তথ্য (পরে backend API ঠিক এই আকারে data পাঠাবে)
export type Product = {
  id: string; // product-এর unique id, যেমন "p001"
  slug: string; // URL-এ ব্যবহারের নাম, যেমন "airbeat-pro-anc-wireless-earbuds"
  title: string; // product-এর পুরো নাম
  image: string; // ছবির path (এখন mock SVG, পরে আসল ছবির URL)
  imageBg: string; // ছবির পেছনের হালকা রং (CSS background)
  price: number; // এখনকার দাম (৳)
  originalPrice: number; // আগের দাম (৳) — কেটে দেখানো হয়
  rating: number; // গড় rating, 0 থেকে 5
  reviews: number; // কতজন rating দিয়েছে
  sold: number; // মোট কতগুলো বিক্রি হয়েছে
  category: string; // কোন category-র (slug)
  store: string; // কোন seller-এর দোকান
  location: string; // seller কোন শহর থেকে পাঠায়
  isMall?: boolean; // VV Mall (official brand) হলে true
  freeDelivery?: boolean; // free delivery থাকলে true
};

// Flash Sale-এর product = সাধারণ product + flash stock-এর কত % বিক্রি হয়েছে
export type FlashSaleProduct = Product & {
  soldPercent: number; // 0–100, progress bar-এর জন্য
};

// Category menu বা tile-এর একটা ঘর
export type Category = {
  slug: string; // URL-এর নাম, যেমন "electronic-devices"
  name: string; // দেখানোর নাম
  icon: string; // ছোট ছবির path
};

// Hero carousel-এর একটা banner slide
export type Banner = {
  id: string; // slide-এর id
  tag: string; // উপরের ছোট লেখা, যেমন "BIGGEST SHOPPING FESTIVAL"
  title: string; // বড় হলুদ লেখা, যেমন "11.11"
  subtitle: string; // বড় সাদা লেখা, যেমন "MEGA SALE"
  description: string; // নিচের এক লাইনের বর্ণনা
  cta: string; // button-এর লেখা
  href: string; // button চাপলে কোথায় যাবে
  background: string; // slide-এর CSS gradient
  images: string[]; // ডান পাশে সাজানো ছবিগুলো (প্রথমটা সবচেয়ে বড়)
};
