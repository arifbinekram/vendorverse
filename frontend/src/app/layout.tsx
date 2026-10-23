import type { Metadata } from "next";
import "@fontsource-variable/inter"; // Inter font — npm থেকে আসে, তাই internet ছাড়াও চলে
import "./globals.css"; // Tailwind + brand রং

import CategoryNav from "@/components/layout/CategoryNav";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SupportButton from "@/components/layout/SupportButton";
import TopBar from "@/components/layout/TopBar";

// Browser tab-এর title আর Google-এর জন্য description
export const metadata: Metadata = {
  title: "VendorVerse — Online Shopping in Bangladesh",
  description:
    "VendorVerse: multi-vendor online marketplace — Flash Sale, VV Mall, Cash on Delivery and 14-day easy returns.",
};

// Root layout: সব page-এর চারপাশের "ফ্রেম" — উপরে header, নিচে footer
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-page font-sans text-ink antialiased">
        {/* সবার উপরের পাতলা বেগুনি bar */}
        <TopBar />
        {/* Logo + search + cart (scroll করলেও উপরে আটকে থাকে) */}
        <Header />
        {/* Categories আর campaign link-এর সাদা bar */}
        <CategoryNav />
        {/* এখানে প্রতিটা page-এর নিজের content বসে (homepage = page.tsx) */}
        <main className="flex-1">{children}</main>
        {/* নিচের footer */}
        <Footer />
        {/* ডান-নিচের ভাসমান AI support button */}
        <SupportButton />
      </body>
    </html>
  );
}
