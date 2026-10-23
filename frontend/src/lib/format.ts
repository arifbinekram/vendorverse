// দাম, discount আর "sold" সংখ্যা দেখানোর ছোট helper function

// 24999 → "৳24,999" (বাংলাদেশি lakh-style comma: 124560 → "৳1,24,560")
export function formatPrice(amount: number): string {
  return `৳${amount.toLocaleString("en-IN")}`; // en-IN = lakh/crore grouping
}

// দাম থেকে discount % বের করা: 1799 / 3499 → 49
export function discountPercent(price: number, originalPrice: number): number {
  if (originalPrice <= price) return 0; // আগের দাম কম/সমান হলে discount নেই
  return Math.round((1 - price / originalPrice) * 100); // % হিসাব করে round
}

// 8200 → "8.2K", 15000 → "15K", 640 → "640"
export function formatCount(count: number): string {
  if (count < 1000) return String(count); // ১০০০-এর কম হলে যেমন আছে তেমন
  const thousands = count / 1000; // হাজারে রূপান্তর
  return `${Number.isInteger(thousands) ? thousands : thousands.toFixed(1)}K`; // ".0" বাদ দিয়ে "K" যোগ
}
