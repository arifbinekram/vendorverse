import Image from "next/image";
import Link from "next/link";

// যে page এখনো বানানো হয়নি (search, product details, login, cart ...) সেখানে গেলে এটা দেখায়।
// Header আর footer layout.tsx থেকে আসে, তাই user পথ হারায় না।
export default function NotFound() {
  return (
    <div className="page-container flex flex-col items-center py-20 text-center">
      <Image src="/images/mock/package.svg" alt="" width={96} height={96} />
      <h1 className="mt-5 text-2xl font-bold tracking-tight">This page is coming soon</h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        Our team is still building this part of VendorVerse. Meanwhile, keep shopping from the homepage.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-accent-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-accent-600"
      >
        Back to Home
      </Link>
    </div>
  );
}
