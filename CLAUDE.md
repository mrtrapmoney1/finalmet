# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Metro TV & Appliances — a Next.js 15 marketing/service website for a factory-authorized appliance, TV, and audio repair business in Lincoln, NE. Static content site with contact/scheduling forms (Resend email), Google Maps integration, and local SEO city landing pages.

## Commands

```bash
npm run dev        # Dev server with Turbopack
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint via next lint

npx playwright test                        # All E2E tests (iPhone 16 Pro viewport, requires dev server)
npx playwright test --grep "test name"     # Single test by name
```

## Architecture

**Next.js 15 / React 19 / Tailwind CSS 3.x** — App Router with flat routing. Each route has a single `page.tsx`, no nested layouts beyond root. All pages are server components unless they need interactivity. Path alias `@/*` maps to project root (e.g., `import { BUSINESS } from "@/lib/constants"`).

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
  troubleshooting/  # Nested: /troubleshooting, /troubleshooting/appliances,
    appliances/     #          /troubleshooting/tv, /troubleshooting/audio
    tv/
    audio/
  appliance-repair-lincoln/   # 6 city landing pages (local SEO)
  appliance-repair-omaha/     #   All use shared CityLandingPage component
  appliance-repair-bellevue/
  appliance-repair-council-bluffs/
  appliance-repair-grand-island/
  appliance-repair-southeast-nebraska/
  products/         # OEM parts catalog listing page
    [slug]/         # Individual part detail page
  schedule/         # Dedicated /schedule page (wraps ScheduleForm)
  squaretrade/      # SquareTrade warranty service info page
  api/contact/      # POST — validates fields, sends email via Resend
  api/send/         # POST — Zod-validated scheduling form, sends email via Resend
  api/parts/        # GET — returns OEM_PARTS data for DiagnosticWizard
  api/merchant-feed/# GET — Google Shopping XML RSS feed of OEM_PARTS catalog
  layout.tsx        # Root layout: fonts (Inter + Manrope + Geist), Header/Footer, JsonLd, geo meta
  globals.css       # Tailwind directives + custom utilities
  sitemap.ts        # Dynamic sitemap generation
  robots.ts         # Dynamic robots.txt

components/
  layout/           # Header (sticky glass nav), Footer (dark inverse), ContactForm (client)
  sections/         # Homepage sections: Hero, TrustBar, Services, Testimonials, CTA
  ui/               # Primitives: Button, Card, ServiceChip + shadcn/ui (dialog, tabs, accordion, etc.)
  CityLandingPage.tsx  # Shared template for all city landing pages
  ScheduleForm.tsx     # Multi-step scheduling form → /api/send
  ZipChecker.tsx       # Zip code coverage checker (checks against COVERED_ZIPS)
  RepairQuiz.tsx       # Repair-vs-replace quiz widget (unused — future)
  ScrollReveal.tsx     # IntersectionObserver scroll animation wrapper (unused — future)
  FaqAccordion.tsx     # Custom FAQ accordion
  DiagnosticWizard.tsx # Error code lookup wizard (Samsung/LG) with professionalism pivot
  RelevantParts.tsx    # Parts display for DiagnosticWizard (wired to /api/parts)
  JsonLd.tsx           # Structured data (LocalBusiness + WebSite schema)
  ServiceAreaMap.tsx   # Client: Google Maps with region markers + shop pin

lib/
  constants.ts      # BUSINESS info, SERVICES array, NAV_LINKS — single source of truth
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

**Service page structure**: The four service pages (`/appliance`, `/tv`, `/audio`, `/commercial`) follow a consistent layout: hero-gradient hero section → content sections → CTA bar. All use the same container pattern: `max-w-7xl mx-auto px-6`.

**City landing pages**: Use the shared `CityLandingPage` component. Each page file passes city-specific props (city, state, region, nearbyAreas, localContext, zips) and exports metadata via `buildMetadata()`. Each includes its own `LocalBusiness` JSON-LD with city-specific `@id`.

**Metadata helper**: Use `buildMetadata()` from `lib/metadata.ts` for new pages — it generates title, description, canonical URL, OpenGraph, and Twitter metadata consistently.

**Client components**: Only used where needed — Header (mobile menu toggle), ContactForm, ScheduleForm, ZipChecker, DiagnosticWizard, FaqAccordion, ServiceAreaMap. Marked with `"use client"`.

**API routes**: `/api/contact` — simple contact form (email via Resend); `/api/send` — scheduling form with Zod validation (email via Resend); `/api/parts` — returns `OEM_PARTS` for DiagnosticWizard; `/api/merchant-feed` — Google Shopping XML RSS feed of the parts catalog (cached 24h).

**Icons**: Google Material Symbols Outlined loaded via CDN in layout.tsx. Used inline: `<span className="material-symbols-outlined">icon_name</span>`. Lucide React is also available for shadcn/ui components.

**Button component**: Polymorphic — pass `href` for a Next.js `Link`, omit for a `<button>`. Three variants: `primary` (orange CTA), `secondary` (container-high), `ghost` (bordered).

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

**Fonts**: `font-headline` (Manrope) for headings, `font-body` (Inter) for body text. Applied globally in the CSS base layer — body gets `font-body` and all `h1`–`h6` get `font-headline` automatically; no need to add per-element.

**Custom CSS utilities** in globals.css:
- `.glass` / `.glass-dark` — frosted blur overlays (backdrop-filter: blur(20px))
- `.hero-gradient` — navy gradient (primary → primary-container)
- `.diagnostic-overlay` — dark bottom fade for hero sections
- `.text-display-lg/md/sm` — responsive display type sizes (clamp-based)
- `.text-body-lg/md` — responsive body type sizes (clamp-based)
- `.text-balance` — balanced text wrapping

**Shadows**: `shadow-ambient` (subtle elevation), `shadow-ambient-lg` (hover state).

## SEO

- Every page exports `metadata` (use `buildMetadata()` for new pages).
- Homepage injects JSON-LD via the `JsonLd` component (LocalBusiness + WebSite schema graph).
- City landing pages each have their own LocalBusiness JSON-LD with city-scoped `@id`.
- Root layout includes geo meta tags (geo.region, geo.placename, geo.position, ICBM).
- Dynamic `sitemap.ts` and `robots.ts` for crawlers.

## Image Config

`next.config.ts` allows remote images from `lh3.googleusercontent.com` (Google profile photos for testimonials).

## Environment Variables

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — public, for Google Maps in browser
- `RESEND_API_KEY` — server-only, for contact form and scheduling emails
- `GOOGLE_PLACE_ID` — optional, for Google Business integration

## Known Issues (from 2026-03-22 audit)

**Warnings:**
- Phone number hardcoded in `ScheduleForm.tsx` instead of using `BUSINESS.phone`
- Inconsistent Facebook `sameAs` URL between `JsonLd.tsx` and `app/page.tsx`
- Duplicate LocalBusiness JSON-LD on homepage (global `JsonLd` + page-level)
- `ScheduleForm` labels missing `htmlFor`/`id` associations (a11y)
- `/api/contact` has no input validation beyond field presence checks
- ~10MB video files in `public/docs/` committed without Git LFS
- Duplicate logo files in `public/docs/` (only `metro-logo.png` is referenced)
- Homepage and 404 page missing explicit metadata exports
