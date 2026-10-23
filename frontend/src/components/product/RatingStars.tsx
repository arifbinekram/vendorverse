import { Star } from "lucide-react";

type RatingStarsProps = {
  rating: number; // 0 থেকে 5, যেমন 4.6
  size?: number; // তারার আকার (px)
};

// ৫টা তারা: নিচে ধূসর সারি, উপরে হলুদ সারি — হলুদ সারির চওড়া rating অনুযায়ী কাটা
// (4.6 হলে হলুদ অংশ 92% চওড়া, তাই শেষ তারাটা আংশিক ভরা দেখায়)
export default function RatingStars({ rating, size = 11 }: RatingStarsProps) {
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100)); // 0–100% এর মধ্যে রাখা
  const stars = [0, 1, 2, 3, 4]; // ৫টা তারার জন্য একটা list

  return (
    <span className="relative inline-flex" role="img" aria-label={`Rated ${rating} out of 5`}>
      {/* নিচের ধূসর তারা */}
      <span className="flex text-zinc-300">
        {stars.map((i) => (
          <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      {/* উপরের হলুদ তারা, rating অনুযায়ী কাটা */}
      <span className="absolute inset-y-0 left-0 flex overflow-hidden text-amber-400" style={{ width: `${percent}%` }}>
        {stars.map((i) => (
          <Star key={i} size={size} fill="currentColor" strokeWidth={0} className="shrink-0" />
        ))}
      </span>
    </span>
  );
}
