# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Metro TV & Appliances — a Next.js 15 marketing/service website for a factory-authorized appliance, TV, and audio repair business in Lincoln, NE. Static content site with contact/scheduling forms (mailto: links, zero API calls), Google Maps integration, local SEO city landing pages, and an OEM parts catalog with a localStorage cart.

## Commands

```bash
npm run dev        # Dev server with Turbopack
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint via next lint

npx playwright test                        # All E2E tests (iPhone 16 Pro viewport, auto-starts dev server)
npx playwright test --grep "test name"     # Single test by name
```

## Architecture

**Next.js 16 / React 19 / Tailwind CSS 3.x** — App Router with flat routing. Each route has a single `page.tsx`, no nested layouts beyond root. All pages are server components unless they need interactivity. Path alias `@/*` maps to project root (e.g., `import { BUSINESS } from "@/lib/constants"`).

```
app/
  page.tsx          # Homepage
  appliance/        # Service pages: /appliance, /tv, /audio, /commercial
  tv/
  audio/
  commercial/
  services/         # Info pages: /services, /service-area, /contact,
  service-area/     #             /how-it-works, /faq, /warranty, /partners
  contact/
  how-it-works/
  faq/
  warranty/
  partners/
  return-policy/    # Return/refund policy page (Google Merchant required)
  privacy-policy/   # Privacy policy page (Google Merchant / Stripe / PayPal required)
  terms/            # Terms of service page (Google Merchant / Stripe / PayPal required)
  sitemap/          # Human-readable site index (all pages by section); /sitemap.xml is the XML feed
  troubleshooting/  # Nested: /troubleshooting, /troubleshooting/appliances,
    appliances/     #          /troubleshooting/tv, /troubleshooting/audio,
    tv/             #          /troubleshooting/commercial
    audio/
    commercial/
  appliance-repair-lincoln/   # 6 city landing pages (local SEO)
  appliance-repair-omaha/     #   All use shared CityLandingPage component
  appliance-repair-bellevue/
  appliance-repair-council-bluffs/
  appliance-repair-grand-island/
  appliance-repair-southeast-nebraska/
  products/         # OEM parts catalog listing page
    [slug]/         # Individual part detail page (generateStaticParams from OEM_PARTS)
  schedule/         # Dedicated /schedule page (wraps ScheduleForm)
  squaretrade/      # SquareTrade warranty service info page
  api/parts/        # GET — returns OEM_PARTS data for DiagnosticWizard
  api/merchant-feed/# GET — Google Shopping XML RSS feed of OEM_PARTS catalog (cached 24h)
  layout.tsx        # Root layout: fonts (Inter + Manrope + Geist), Header/Footer, JsonLd, geo meta
  globals.css       # Tailwind directives + custom utilities
  sitemap.ts        # Dynamic sitemap generation
  robots.ts         # Dynamic robots.txt

components/
  layout/           # Header (sticky glass nav), Footer (dark inverse), ContactForm (client)
  sections/         # Homepage sections: Hero, TrustBar, Services, Testimonials, CTA, ProductsCarousel
  ui/               # Primitives: Button, Card, ServiceChip, PageCTA + shadcn/ui components
  CityLandingPage.tsx  # Shared template for all city landing pages
  ScheduleForm.tsx     # Multi-step scheduling form → mailto: link
  ZipChecker.tsx       # Zip code coverage checker (checks against COVERED_ZIPS)
  FaqAccordion.tsx     # Custom FAQ accordion
  DiagnosticWizard.tsx # Error code lookup wizard (Samsung/LG) with professionalism pivot
  RelevantParts.tsx    # Parts display for DiagnosticWizard (wired to /api/parts)
  RepairQuiz.tsx       # Interactive guided quiz to identify repair service type
  JsonLd.tsx           # Structured data (LocalBusiness + WebSite schema)
  ServiceAreaMap.tsx   # Client: Google Maps component (orphaned — no longer used by any page)
  NebraskaMap.tsx      # Client: SVG Nebraska map — interactive region dots reveal zip lists (zero API)
  ScrollReveal.tsx     # Client: IntersectionObserver-based enter animation wrapper
  CartProvider.tsx     # Client: React Context + localStorage cart (CartItem, useCart hook)
  AddToCartButton.tsx  # Client: add-to-cart button for product detail pages
  CartDrawer.tsx       # Client: slide-in cart sidebar (uses useCart)

lib/
  constants.ts      # BUSINESS info, SERVICES array, NAV_LINKS — single source of truth
  content.ts        # Typed operator-editable content slots (see Content Slots below)
  parts.ts          # Part interface + OEM_PARTS array (used by /products, /api/parts, /api/merchant-feed)
  error-codes.ts    # Samsung/LG error code data (ErrorCode interface, SAMSUNG_CODES, LG_CODES)
  zip-codes.ts      # COVERED_ZIPS (221 codes), SERVICE_REGIONS (6 regions with lat/lng)
  metadata.ts       # buildMetadata() helper for consistent page metadata with OG/Twitter
  utils.ts          # cn() — clsx + tailwind-merge utility

mcp/
  ebay-inventory/   # MCP server skeleton for eBay parts integration (mock data, future)

tests/
  seo-audit.spec.ts # Playwright SEO audit suite (10 tests, iPhone 16 Pro viewport)
```

## Key Patterns

**Data-driven pages**: All business data (name, phone, hours, brands, services) lives in `lib/constants.ts`. Service pages query `SERVICES.find(s => s.slug === "appliance")!` to hydrate. Never hardcode business info in page files.

**Content slots**: Operator-editable copy, testimonials, team members, announcements, and photos live in `lib/content.ts`. All entries are typed with interfaces. Arrays use PLACEHOLDER entries — replace with real data without changing the shape. Used by `Hero` (HERO_COPY), products pages (STORE_COPY), and future testimonial/team sections.

**Service page structure**: The four service pages (`/appliance`, `/tv`, `/audio`, `/commercial`) follow a consistent layout: hero-gradient hero section → content sections → CTA bar. All use the same container pattern: `max-w-7xl mx-auto px-6`.

**City landing pages**: Use the shared `CityLandingPage` component. Each page file passes city-specific props (city, state, region, nearbyAreas, localContext, zips) and exports metadata via `buildMetadata()`. Each includes its own `LocalBusiness` JSON-LD with city-specific `@id`.

**Metadata helper**: Use `buildMetadata()` from `lib/metadata.ts` for new pages — it generates title, description, canonical URL, OpenGraph, and Twitter metadata consistently.

**Client components**: Only used where needed — Header (mobile menu toggle + services dropdown + cart), ContactForm, ScheduleForm, ZipChecker, DiagnosticWizard, FaqAccordion, NebraskaMap, CartProvider, CartDrawer, AddToCartButton, RepairQuiz, ScrollReveal. Marked with `"use client"`.

**Forms**: Both `ContactForm` and `ScheduleForm` submit via `mailto:` links (no server round-trip, no Resend dependency). There are no `/api/contact` or `/api/send` routes. The contact page embeds an OpenStreetMap `<iframe>` — no API key required.

**API routes**: `/api/parts` — returns `OEM_PARTS` for DiagnosticWizard; `/api/merchant-feed` — Google Shopping XML RSS feed of the parts catalog (cached 24h).

**Cart system**: `CartProvider` wraps the app in `layout.tsx` and exposes `useCart()`. State persists to `localStorage` under key `met_cart`. The cart is purely client-side; checkout is not yet implemented (no payment integration).

**Icons**: Google Material Symbols Outlined loaded via CDN in layout.tsx. Used inline: `<span className="material-symbols-outlined">icon_name</span>`. All decorative icons must have `aria-hidden="true"`. Lucide React is also available for shadcn/ui components.

**Button component**: Polymorphic — pass `href` for a Next.js `<Link>`, pass `href` + `external` for a new-tab `<a>`, omit `href` for a `<button>`. Three variants: `primary` (orange CTA), `secondary` (container-high), `ghost` (bordered). Never use raw `<a>` tags for navigation — use `Button` or `Link`.

**PageCTA component**: Reusable dark-navy CTA block (`components/ui/PageCTA.tsx`). Drop-in at the bottom of any page with `heading`, `body`, `primaryLabel/Href`, and optional `secondaryLabel/Href`. Defaults secondary button to a phone call. Pass `secondaryIcon={null}` to suppress icon on non-phone links (e.g., `/services`).

**shadcn/ui**: Some UI primitives come from shadcn (dialog, tabs, accordion, badge, label, input, select, separator). These live in `components/ui/` alongside custom primitives.

**cn() utility**: Use `cn()` from `lib/utils.ts` for conditional class merging (clsx + tailwind-merge).

**URL redirects**: Legacy URLs are redirected in `next.config.ts` (e.g., `/what-to-expect` → `/how-it-works`, flat troubleshooting → nested).

## Design System (Tailwind)

Material Design 3-inspired color tokens defined in `tailwind.config.ts`:

- **Primary**: `primary` (#1a4494 navy), `primary-container` (#0b2554 darker)
- **Secondary** (CTA): `secondary` (#ae3100), `secondary-container` (#fe6431 orange)
- **Surface scale**: `surface`, `surface-container-low/high/highest`, `surface-variant`
- **Text**: `on-surface` (dark text), `on-surface-variant` (secondary text)
- **Inverse** (footer): `inverse-surface` (#303030), `inverse-on-surface`

**Contrast rule**: On dark (`primary`, `primary-container`, `hero-gradient`) backgrounds, text opacity must be at least `/80` for body text to pass WCAG AA. Never use `/60` or `/70` for readable text on dark surfaces.

**Fonts**: `font-headline` (Manrope) for headings, `font-body` (Inter) for body text. Applied globally in the CSS base layer — body gets `font-body` and all `h1`–`h6` get `font-headline` automatically; no need to add per-element.

**Custom CSS utilities** in globals.css:
- `.glass` / `.glass-dark` — frosted blur overlays (backdrop-filter: blur(20px))
- `.hero-gradient` — navy gradient (primary → primary-container)
- `.diagnostic-overlay` — dark bottom fade for hero sections
- `.text-display-lg/md/sm` — responsive display type sizes (clamp-based)
- `.text-body-lg/md` — responsive body type sizes (clamp-based)
- `.text-balance` — balanced text wrapping
- `.fade-up` / `.fade-in` / `.slide-left` — one-shot CSS animation classes
- `[data-reveal]` / `[data-reveal="left"]` — scroll-triggered variants; `ScrollReveal` adds `.revealed` via IntersectionObserver
- `@keyframes marquee` / `marqueeReverse` — used by the service-area zip ticker (3-row bidirectional, 60s/45s/80s)

**Shadows**: `shadow-ambient` (subtle elevation), `shadow-ambient-lg` (hover state).

**Interaction cards**: Any card-level clickable element (product grid item, service card, etc.) must include `active:scale-[0.98] transition-all` for tactile feedback. Image placeholders awaiting content use `animate-pulse` skeleton loading.

**Filter state — no useState**: Brand/category filters on listing pages must use URL query params (`?brand=Samsung`) via `<Link>` or `<Button>`, never `useState`. This keeps the page a Server Component and preserves SEO caching. Read the param server-side in `page.tsx` via `searchParams`.

## SEO

- Every page exports `metadata` (use `buildMetadata()` for new pages).
- Homepage injects JSON-LD via the `JsonLd` component (LocalBusiness + WebSite schema graph).
- City landing pages each have their own LocalBusiness JSON-LD with city-scoped `@id`.
- Root layout includes geo meta tags (geo.region, geo.placename, geo.position, ICBM).
- Dynamic `sitemap.ts` and `robots.ts` for crawlers.
- Product detail pages (`/products/[slug]`) embed Product schema with Google Merchant Center-compliant fields (`brand`, `offers`, `itemCondition`, `mpn`). Do not remove or restructure these fields.

## next.config.ts

In **Next.js 16**, if you add `reactCompiler` or `cacheComponents`, they are **top-level** keys — not under `experimental`:

```ts
const nextConfig: NextConfig = {
  reactCompiler: true,      // Requires babel-plugin-react-compiler installed
  cacheComponents: true,    // Partial Prerendering (PPR)
  ...
};
```

`reactCompiler: true` requires `babel-plugin-react-compiler` as a dependency. `cacheComponents: true` enables hybrid static/streaming rendering (PPR). **Do not** nest these under `experimental` — that was the Next.js 15 API and will emit "Unrecognized key" warnings in Next 16.

**Constraint**: Server components that call `new Date()` at render time will break the build with `cacheComponents` active. Always use a static constant for copyright years etc. (see `Footer.tsx`: `const FOOTER_YEAR = 2026`).

## Image Config

`next.config.ts` allows remote images from `lh3.googleusercontent.com` (Google profile photos for testimonials).

## Security Headers

`next.config.ts` applies these headers to all routes via `async headers()`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

No CSP is set — inline JSON-LD scripts and CDN fonts would break under a strict CSP without careful per-directive tuning.

## Google Merchant Center Readiness

Required legal pages (all live):
- `/return-policy` — 7-day window, defective exchange, buyer pays shipping
- `/privacy-policy` — no server data collection (mailto forms), localStorage cart, Google Maps third-party notice
- `/terms` — parts sales, no fitness guarantee, Nebraska governing law

Merchant feed: `/api/merchant-feed` — Google Shopping XML RSS, cached 24h. `lib/parts.ts` is the single source of truth for inventory — update `availability` field per part. Product detail pages show "Out of Stock" badge + Email to Order / Call Us / Visit Store CTAs when unavailable; falls back to `AddToCartButton` for in-stock items.

## Environment Variables

- `GOOGLE_PLACE_ID` — optional, for Google Business integration
- No other env vars required — maps use OpenStreetMap (no API key), forms use mailto

## Known Issues
- Hardcoded `mailto:` address in `ContactForm.tsx` and `ScheduleForm.tsx` — should come from `BUSINESS` constants
- Inconsistent Facebook `sameAs` URL between `JsonLd.tsx` and `app/page.tsx`
- Duplicate LocalBusiness JSON-LD on homepage (global `JsonLd` + page-level)
- `ScheduleForm` labels missing `htmlFor`/`id` associations (a11y)
- Cart has no checkout flow — `CartDrawer` shows items but no payment integration
- ~10MB video files in `public/docs/` committed without Git LFS
- `lib/content.ts` all entries are PLACEHOLDER — replace with real copy, testimonials, and team data before launch
