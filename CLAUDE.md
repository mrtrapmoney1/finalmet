# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Metro TV & Appliances — a Next.js 15 marketing/service website for a factory-authorized appliance, TV, and audio repair business in Lincoln, NE. Static content site with a contact form (Resend email) and Google Maps integration.

## Commands

```bash
npm run dev        # Dev server with Turbopack
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint via next lint
```

No test framework is configured.

## Architecture

**Next.js 15 / React 19 / Tailwind CSS 3.x** — App Router with flat routing. Each route has a single `page.tsx`, no nested layouts. All pages are server components unless they need interactivity. Path alias `@/*` maps to project root (e.g., `import { BUSINESS } from "@/lib/constants"`).

```
app/              # Routes: /, /appliance, /tv, /audio, /commercial, /services,
                  #         /service-area, /contact, /how-it-works, /faq, /warranty, /partners
  api/contact/    # POST route — validates fields, sends email via Resend
  layout.tsx      # Root layout: fonts (Inter + Manrope), metadata, Header/Footer, geo meta tags
  globals.css     # Tailwind directives + custom utilities (glass, hero-gradient, etc.)

components/
  layout/         # Header (sticky glass nav), Footer (dark inverse), ContactForm (client)
  sections/       # Homepage sections: Hero, TrustBar, Services, Testimonials, CTA
  ui/             # Primitives: Button (polymorphic link/button), Card, ServiceChip
  ServiceAreaMap.tsx  # Client: Google Maps with region markers + shop pin

lib/
  constants.ts    # BUSINESS info, SERVICES array, NAV_LINKS — single source of truth
  zip-codes.ts    # COVERED_ZIPS (221 codes), SERVICE_REGIONS (6 regions with lat/lng)
```

## Key Patterns

**Data-driven pages**: All business data (name, phone, hours, brands, services) lives in `lib/constants.ts`. Service pages query `SERVICES.find(s => s.slug === "appliance")!` to hydrate. Never hardcode business info in page files.

**Service page structure**: The four service pages (`/appliance`, `/tv`, `/audio`, `/commercial`) follow a consistent layout: hero-gradient hero section → content sections → CTA bar. All use the same container pattern: `max-w-7xl mx-auto px-6`.

**Client components**: Only used where needed — Header (mobile menu toggle), ContactForm (form state), ServiceAreaMap (Google Maps API), FAQ page (collapsible items). Marked with `"use client"`.

**Icons**: Google Material Symbols Outlined loaded via CDN in layout.tsx. Used inline: `<span className="material-symbols-outlined">icon_name</span>`. No icon library.

**Button component**: Polymorphic — pass `href` for a Next.js `Link`, omit for a `<button>`. Three variants: `primary` (orange CTA), `secondary` (container-high), `ghost` (bordered).

**Contact form flow**: Client-side `ContactForm` → fetch POST `/api/contact` → server validates → Resend sends email to `service@metrotv-audiotech.com`. Status states: idle → loading → success/error.

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

**Shadows**: `shadow-ambient` (subtle elevation), `shadow-ambient-lg` (hover state).

## SEO

Every page exports `metadata` with title, description. Homepage injects JSON-LD `LocalBusiness` schema via `dangerouslySetInnerHTML`. Root layout includes geo meta tags (geo.region, geo.placename, geo.position, ICBM) for local SEO targeting Lincoln/Omaha/Nebraska.

## Image Config

`next.config.ts` allows remote images from `lh3.googleusercontent.com` (Google profile photos for testimonials).

## Environment Variables

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — public, for Google Maps in browser
- `RESEND_API_KEY` — server-only, for contact form emails
- `GOOGLE_PLACE_ID` — optional, for Google Business integration
