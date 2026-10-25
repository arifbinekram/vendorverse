# PostgreSQL Product Demo

This demo lets an administrator add products to PostgreSQL and shows them on the
VendorVerse homepage. The frontend is deployed to Vercel; the NestJS API and
PostgreSQL database are hosted separately.

## Local setup

Requirements: Node.js 20.9 or newer and PostgreSQL 18 (or another supported
PostgreSQL version).

1. Install PostgreSQL for Windows from
   [postgresql.org](https://www.postgresql.org/download/windows/). In the
   installer, keep the default port (`5432`), remember the password you choose
   for the `postgres` user, and include the command-line tools.
2. Create a database named `vendorverse`. For example, open SQL Shell (psql),
   connect as `postgres`, and run:

   ```sql
   CREATE DATABASE vendorverse;
   ```

3. Copy `backend/.env.example` to `backend/.env`. Set `DATABASE_URL` to
   `postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/vendorverse?schema=public`,
   replacing `YOUR_POSTGRES_PASSWORD` with the password from the installer.
   Set `ADMIN_API_TOKEN` to a long random secret. Keep both values private and
   out of Git.
4. Start the API:

   ```powershell
   cd backend
   npm install
   npm run db:generate
   npm run db:push
   npm run db:seed
   npm run start:dev
   ```

   The API listens on `http://localhost:4000`; its health endpoint is
   `http://localhost:4000/api/health`.
5. In another terminal, copy `frontend/.env.example` to `frontend/.env.local`, keep
   `API_URL=http://localhost:4000`, then start the frontend:

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

6. Visit `http://localhost:3000/admin/products`, enter the `ADMIN_API_TOKEN` value
   you configured in `backend/.env`, fill the product fields, and save. The new
   record is stored in PostgreSQL and appears in the homepage catalog. Mark it as
   a Flash Sale item if you want it in that section too.

The starter seed creates one example product. Seed is safe to rerun; it will not
duplicate that example row.

## Catalog data model

The initial catalog schema is relational:

- A **Vendor** can own multiple **Stores**.
- Each **Store** can list multiple **Products**.
- A **Category** can be assigned to multiple products; each product has one
  primary category in this first version.
- Each product stores its available `stockQuantity`.

Adding a product through the admin form creates or reuses the vendor, store, and
category records from the entered names/slugs. User accounts, product variants,
carts, orders, payments, and vendor payouts are intentionally outside this
catalog-only phase.

## Deploy for a Vercel demo

1. Create a PostgreSQL database with a provider such as Neon. Copy its pooled or
   direct connection string, including its required SSL option.
2. Deploy `backend/` as a Node web service (for example, on Render). Configure:
   - Build command: `npm ci && npm run build`
   - Start command: `npm run start`
   - `DATABASE_URL`: the PostgreSQL connection string
   - `ADMIN_API_TOKEN`: a long, randomly generated secret
   - `PORT`: use the platform-provided port (the API defaults to `4000` locally)

   Before the first demo, run `npm run db:push` once with the production
   `DATABASE_URL` to create the table. Run `npm run db:seed` if you want the sample
   product in the live catalog. Keep database migrations/updates limited to the
   team's authorized developer.
3. Deploy the repository's `frontend/` directory as a Vercel project. Set its
   `API_URL` environment variable to the deployed API origin, for example
   `https://your-api.example.com` (no `/api` suffix). Redeploy after changing
   environment variables.
4. Open `https://<your-vercel-domain>/admin/products`, enter the admin token, and
   save a test product. Open the homepage in a new tab; it should appear in the
   product grid. The public API's `GET /api/products` endpoint can also confirm
   the saved record.

The API is called server-to-server by the Next.js site, so the admin token and
database URL must never be prefixed with `NEXT_PUBLIC_`. The admin token is
validated by the API and is not persisted by the product form. Use HTTPS for both
deployed services. Do not commit `.env` files or share credentials in chat or
screenshots.

## API overview

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | Service health check |
| `GET` | `/api/products` | Public | List products, newest first |
| `GET` | `/api/products/flash-sale` | Public | List products marked for Flash Sale |
| `POST` | `/api/products` | `x-admin-token` required | Validate and save a product |
