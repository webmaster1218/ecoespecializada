# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing + booking site (in **Spanish**, `es-CO` locale) for renting/selling portable Mindray ultrasound machines (Z6, Z60, M7) in Colombia. Built with **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind + Supabase**. Production domain: `alquilerdeecografos.com`.

## Commands

- `npm run dev` — dev server on port 3000.
- `npm run build` — production build. **Runs `prebuild` automatically** (`node scripts/generate-posts-data.js`), which regenerates `src/lib/blog/posts-data.ts` from the `.md` files in `/content`. CI (`.github/workflows/ci.yml`) only runs `npm ci && npm run build`.
- `npm run start` — serve the built app (`output: 'standalone'`).
- `npm run lint` — ESLint (`eslint-config-next`, flat config).
- `node scripts/generate-posts-data.js` — regenerate blog data manually after editing `/content/*.md`.

There is **no test framework** in this repo. The only "test" gate is a successful `npm run build`.

## Critical: The Blog Content Pipeline

Blog articles are authored as Markdown in `content/<category>/<slug>.md` with YAML frontmatter. **Do not edit `src/lib/blog/posts-data.ts`** — it is auto-generated (marked `// DO NOT EDIT`). To add/edit an article:

1. Create/modify a `.md` file under `content/<category>/` (frontmatter keys: `articleId` like `GUI-001`, `title`, `slug`, `excerpt`, `date`, `image`, `category`, `author`, `readTime`, `tags` (YAML list), `status: published|draft`).
2. Run the generate script (or `npm run build`).
3. Drafts (`status: draft`) are visible in preview but filtered out by `getPublishedPosts()` in production.

Categories are defined in `src/lib/blog/categories.ts` (guias, equipos, casos-exito, ciudades, tecnica). The URL pattern is `/blog/<category>/<slug>/` (note `trailingSlash: true` everywhere). Redirects for old blog URLs live in `next.config.ts`.

## Architecture

### Route groups (`src/app`)
- `(public)/` — marketing pages, product landing pages (`ecografo-z6`, `ecografo-z60`, `ecografo-m7`), city SEO pages (`colombia/<city>` for 8 cities), `blog`, `login`, `politicas`. The public layout hides the global `Navbar` on product and policy pages but always renders `ChatWidget` (except on `/login`).
- `(admin)/calendario/` — booking calendar admin. Protected client-side: `useEffect` checks `sessionStorage.getItem("admin_auth") === "true"` and redirects to `/login` otherwise. Auth is a PIN compared against `NEXT_PUBLIC_ADMIN_PIN` (see `LoginScreen.tsx`); there is no server-side/JWT auth.
- `gracias/` — thank-you page after booking.
- `api/` — `send-email` (Nodemailer contract email), `keep-alive`, `debug-env`.

### Booking & availability (`src/lib/availability.ts`, `src/lib/pricing.ts`)
- **Pricing is centralized** in `PRICING_CONFIG` (per-day equipment rates, one-time cart/printer/shipping extras) + `calculateDays()` (inclusive) + `calculateTotalPrice()`. Always compute totals through these helpers, not inline.
- `checkAvailability(start, end, excludeId?)` reads total inventory from Supabase table `equipment_settings` (row `key='inventory'`, JSON `{z6,z60,m7}`) and subtracts overlapping bookings from the `bookings` table (status NOT IN `cancelled,completed`, date-overlap via `start_date <= end && end_date >= start`). It has a **missing-column fallback** (retries without `quantity_m7` if Postgres throws `42703`) and a **`DEFAULT_STOCK` fallback** (`{z6:2, z60:2, m7:1}`) used whenever Supabase is unconfigured or errors.

### Supabase client (`src/lib/supabase.ts`)
Exports `supabase` which is **`null` if env vars are missing**. All callers guard for this — the app degrades gracefully to fallback stock and skips DB writes. Because of this, never assume `supabase` is non-null.

### Booking flow (`src/components/sections/BookingWizard.tsx`)
1. Validates availability via `checkAvailability`.
2. Inserts a row into `bookings` (status `pending_delivery`) — failure is non-fatal; the flow continues.
3. POSTs the booking + a base64 PDF contract to an external **n8n webhook** (`n8n.srv1054162.hstgr.cloud`).
4. The `bookings` table columns (from the insert shape): `client_name, client_email, client_phone, client_address, document_number, tax_id, start_date, end_date, delivery_time, collection_time, quantity_z6, quantity_z60, quantity_m7, include_cart, include_printer, selected_transducers, total_price, status`. Booking statuses: `pending_delivery`, `delivered`, `pending_pickup`, `confirmed`, `completed`, `cancelled` (plus `maintenance` for admin date-blocks).

### Contracts / PDF (`src/components/pdf/`, `api/send-email`)
Contracts are rendered client-side with `@react-pdf/renderer`, encoded as base64, and emailed as attachments via the `send-email` route using SMTP creds (`SMTP_HOST/PORT/USER/PASS`). Email is sent to the client with BCC to the business inbox.

## Environment

Env vars are read from a **committed `.env`** (not `.env.local`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_ADMIN_PIN`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`. The Supabase and SMTP keys use different names than what the README mentions — trust the `.env` file and code, not the README.

## Styling & Conventions

- **Tailwind 3** with shadcn-style HSL CSS variables in `src/app/globals.css` (`--primary`, `--radius`, etc.) mapped through `tailwind.config.ts`. Additional design tokens (gradients, glassmorphism, shadows, the medical blue palette `#007BFF`) also live in `globals.css` `:root`.
- Most non-trivial components co-locate a **CSS Module** (`*.module.css`) next to the `.tsx` (see `src/components/sections/`). Match this pattern when adding components.
- Fonts: Inter + Roboto via `next/font`, exposed as CSS variables. Icons: `lucide-react`.
- Path alias: `@/*` → `src/*`.
- `trailingSlash: true` — internal links should end with `/`.

## SEO / Marketing integration

Analytics and tracking scripts (GTM, GA4, Google Ads, Microsoft Clarity) are injected in the **root** `src/app/layout.tsx` via `next/script`. An `Organization` JSON-LD schema is also there. `next.config.ts` sets long-lived `Cache-Control` headers for static/image assets and a swr cache for HTML. A manual `public/sitemap.xml` and `public/robots.txt` exist (sitemap updates are committed by hand, per recent git history).
