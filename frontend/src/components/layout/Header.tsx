import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

import Logo from "./Logo";
import SearchBar from "./SearchBar";

// মূল header: logo, search bar, login আর cart — scroll করলেও উপরে আটকে থাকে (sticky)
export default function Header() {
  const cartCount = 0; // cart-এ কয়টা item — পরে cart state (Zustand) থেকে আসবে

  return (
    <header className="sticky top-0 z-40 bg-linear-to-r from-brand-900 via-brand-700 to-brand-500">
      {/* mobile-এ দুই সারি (logo / search), বড় screen-এ এক সারি */}
      <div className="page-container flex flex-wrap items-center gap-x-5 gap-y-3 py-3 md:h-[76px] md:flex-nowrap md:py-0 lg:gap-x-8">
        <Logo gradientId="vv-logo-header" />

        {/* search bar: mobile-এ নিচের সারিতে পুরো চওড়া, বড় screen-এ মাঝখানে */}
        <div className="order-3 w-full md:order-none md:flex-1">
          <SearchBar />
        </div>

        {/* ডান পাশের icon-গুলো */}
        <nav className="ml-auto flex items-center gap-5 text-white" aria-label="Account">
          {/* Login | Sign Up — বড় screen-এ লেখা, ছোট screen-এ শুধু icon (চাপলে login page) */}
          <div className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold">
            <Link href="/login" aria-label="Login" className="lg:hidden">
              <User size={21} />
            </Link>
            <User size={21} aria-hidden="true" className="hidden lg:block" />
            <Link href="/login" className="hidden hover:underline lg:inline">
              Login
            </Link>
            <span className="hidden opacity-60 lg:inline">|</span>
            <Link href="/signup" className="hidden hover:underline lg:inline">
              Sign Up
            </Link>
          </div>
          {/* Wishlist */}
          <Link href="/wishlist" aria-label="Wishlist" className="hidden sm:block">
            <Heart size={21} />
          </Link>
          {/* Cart icon, উপরে কমলা সংখ্যার badge */}
          <Link href="/cart" aria-label={`Cart, ${cartCount} items`} className="relative">
            <ShoppingCart size={24} />
            <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-brand-600 bg-accent-500 px-1 text-[10px] font-bold">
              {cartCount}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
