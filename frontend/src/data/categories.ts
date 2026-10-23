import type { Category } from "@/types";

// বাম পাশের category menu (Daraz-এর মতো ১২টা বড় বিভাগ)
export const sidebarCategories: Category[] = [
  { slug: "womens-girls-fashion", name: "Women's & Girls' Fashion", icon: "/images/mock/dress.svg" },
  { slug: "mens-boys-fashion", name: "Men's & Boys' Fashion", icon: "/images/mock/t-shirt.svg" },
  { slug: "health-beauty", name: "Health & Beauty", icon: "/images/mock/lipstick.svg" },
  { slug: "watches-bags-jewellery", name: "Watches, Bags & Jewellery", icon: "/images/mock/watch.svg" },
  { slug: "electronic-devices", name: "Electronic Devices", icon: "/images/mock/mobile-phone.svg" },
  { slug: "electronic-accessories", name: "Electronic Accessories", icon: "/images/mock/headphone.svg" },
  { slug: "tv-home-appliances", name: "TV & Home Appliances", icon: "/images/mock/television.svg" },
  { slug: "mother-baby", name: "Mother & Baby", icon: "/images/mock/baby-bottle.svg" },
  { slug: "groceries", name: "Groceries & Pets", icon: "/images/mock/sheaf-of-rice.svg" },
  { slug: "home-lifestyle", name: "Home & Lifestyle", icon: "/images/mock/couch-and-lamp.svg" },
  { slug: "sports-outdoors", name: "Sports & Outdoors", icon: "/images/mock/soccer-ball.svg" },
  { slug: "automotive-motorbike", name: "Automotive & Motorbike", icon: "/images/mock/motorcycle.svg" },
];

// "Categories" অংশের ১৬টা ছোট tile
export const categoryTiles: Category[] = [
  { slug: "smartphones", name: "Smartphones", icon: "/images/mock/mobile-phone.svg" },
  { slug: "earbuds", name: "Earbuds", icon: "/images/mock/headphone.svg" },
  { slug: "smart-watches", name: "Smart Watches", icon: "/images/mock/watch.svg" },
  { slug: "laptops", name: "Laptops", icon: "/images/mock/laptop.svg" },
  { slug: "sarees", name: "Sarees", icon: "/images/mock/sari.svg" },
  { slug: "sneakers", name: "Sneakers", icon: "/images/mock/running-shoe.svg" },
  { slug: "skin-care", name: "Skin Care", icon: "/images/mock/lotion-bottle.svg" },
  { slug: "handbags", name: "Handbags", icon: "/images/mock/handbag.svg" },
  { slug: "kitchen", name: "Kitchen", icon: "/images/mock/cooking.svg" },
  { slug: "rice-grocery", name: "Rice & Grocery", icon: "/images/mock/sheaf-of-rice.svg" },
  { slug: "toys", name: "Toys", icon: "/images/mock/teddy-bear.svg" },
  { slug: "smart-tv", name: "Smart TV", icon: "/images/mock/television.svg" },
  { slug: "gaming", name: "Gaming", icon: "/images/mock/video-game.svg" },
  { slug: "power-banks", name: "Power Banks", icon: "/images/mock/battery.svg" },
  { slug: "home-decor", name: "Home Decor", icon: "/images/mock/potted-plant.svg" },
  { slug: "cricket", name: "Cricket", icon: "/images/mock/cricket-game.svg" },
];
