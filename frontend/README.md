# VendorVerse — Customer Website (frontend)

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Lucide icons

## Run

```bash
npm install      # first time only
npm run dev      # http://localhost:3000 (auto-reloads on save)
npm run lint     # ESLint
npm run build    # production build — CI runs this on every PR
```

To display products from PostgreSQL, copy `.env.example` to `.env.local` and set
`API_URL` to the NestJS API base URL. Without it, the homepage uses the bundled mock
catalog. The admin product form is at `/admin/products`; product creation requires
the backend's `ADMIN_API_TOKEN`.

## Folder map

```
src/
├── app/
│   ├── layout.tsx        # frame of every page: top bar, header, category bar, footer
│   ├── page.tsx          # homepage — loads data, places the sections in order
│   ├── not-found.tsx     # "coming soon" page for routes not built yet
│   ├── globals.css       # Tailwind + brand colours (@theme)
│   └── icon.svg          # browser tab icon
├── components/
│   ├── layout/           # TopBar, Header, SearchBar, CategoryNav, Footer, Logo, SupportButton
│   ├── home/             # HeroSection (CategorySidebar + HeroCarousel + SidePanel),
│   │                     # ServiceBar, FlashSale + CountdownTimer, CategoryGrid, JustForYou
│   └── product/          # ProductCard, FlashSaleCard, RatingStars
├── data/                 # fallback mock products, categories and banners
├── lib/
│   ├── api.ts            # data layer — the only place to change when the real API arrives
│   └── format.ts         # ৳ price, discount %, "8.2K" count helpers
└── types/index.ts        # shared TypeScript types (Product, Category, Banner …)
public/images/mock/       # placeholder product images (SVG)
```

## Homepage sections (Daraz layout)

1. Top bar, sticky header with search and cart, category/campaign bar
2. Hero: category menu · auto-sliding banner carousel · VV Coins check-in and vouchers
3. Service bar (authentic, returns, COD, delivery, secure payment)
4. Flash Sale with live countdown and sold-progress bars
5. Category tiles
6. Just For You product grid with **LOAD MORE**
7. Footer and the floating "Ask Vira" AI support button

## Product API

Components never import from `src/data/` directly — they get product data from
`src/lib/api.ts`. When `API_URL` is set, that data layer fetches the NestJS API with
cache disabled so new products show up on the next page request. The admin form
submits through a same-origin Next.js route and does not store the admin token.

See [`../docs/PRODUCT_DEMO.md`](../docs/PRODUCT_DEMO.md) for database setup and the
Vercel demo deployment steps.

## Credits

Placeholder product images: [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji) (MIT licence),
see `public/images/mock/LICENSE.txt`.
