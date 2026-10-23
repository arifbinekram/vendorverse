import type { Banner } from "@/types";

// Homepage-এর বড় banner slider-এর slide-গুলো (Daraz-এর campaign banner-এর মতো)
export const banners: Banner[] = [
  {
    id: "mega-sale",
    tag: "BIGGEST SHOPPING FESTIVAL",
    title: "11.11",
    subtitle: "MEGA SALE",
    description: "Up to 80% OFF · Free Delivery · Extra Vouchers",
    cta: "Shop Now",
    href: "/campaign/11-11-mega-sale",
    background:
      "radial-gradient(circle at 80% 45%, #ff8a3d 0%, rgba(255,138,61,0) 40%), linear-gradient(115deg, #2a0b63 0%, #5b21b6 52%, #b4237a 100%)",
    images: [
      "/images/mock/mobile-phone.svg",
      "/images/mock/headphone.svg",
      "/images/mock/running-shoe.svg",
      "/images/mock/wrapped-gift.svg",
      "/images/mock/shopping-bags.svg",
    ],
  },
  {
    id: "electronics-week",
    tag: "ELECTRONICS WEEK",
    title: "60%",
    subtitle: "OFF GADGETS",
    description: "Laptops · Smart TVs · Gaming · 0% EMI on select banks",
    cta: "Explore Deals",
    href: "/category/electronic-devices",
    background:
      "radial-gradient(circle at 78% 40%, #38bdf8 0%, rgba(56,189,248,0) 42%), linear-gradient(115deg, #0b1b3f 0%, #1e3a8a 55%, #6d28d9 100%)",
    images: [
      "/images/mock/laptop.svg",
      "/images/mock/television.svg",
      "/images/mock/video-game.svg",
      "/images/mock/headphone.svg",
      "/images/mock/package.svg",
    ],
  },
  {
    id: "fresh-groceries",
    tag: "FRESH EVERY MORNING",
    title: "GROCERY",
    subtitle: "IN 2 HOURS",
    description: "Rice · Fruits · Vegetables · delivered inside Dhaka",
    cta: "Order Now",
    href: "/category/groceries",
    background:
      "radial-gradient(circle at 80% 45%, #a3e635 0%, rgba(163,230,53,0) 42%), linear-gradient(115deg, #064e3b 0%, #0e7a6e 55%, #15a34a 100%)",
    images: [
      "/images/mock/basket.svg",
      "/images/mock/mango.svg",
      "/images/mock/carrot.svg",
      "/images/mock/egg.svg",
      "/images/mock/delivery-truck.svg",
    ],
  },
  {
    id: "vv-mall",
    tag: "VV MALL · 100% AUTHENTIC",
    title: "BRANDS",
    subtitle: "YOU TRUST",
    description: "Official stores · 14-day free returns · Brand warranty",
    cta: "Visit VV Mall",
    href: "/mall",
    background:
      "radial-gradient(circle at 80% 45%, #f472b6 0%, rgba(244,114,182,0) 42%), linear-gradient(115deg, #1b0742 0%, #3b0f86 55%, #db2777 100%)",
    images: [
      "/images/mock/lotion-bottle.svg",
      "/images/mock/lipstick.svg",
      "/images/mock/handbag.svg",
      "/images/mock/sparkles.svg",
      "/images/mock/shopping-bags.svg",
    ],
  },
];
