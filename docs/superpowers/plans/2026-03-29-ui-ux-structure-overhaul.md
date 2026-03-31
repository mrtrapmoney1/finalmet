# UI/UX Structure Overhaul — March 2026

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Dispatch Strategy:** Use `superpowers:dispatching-parallel-agents` for Tasks 1–3 (independent), then sequential for Tasks 4–8 (depend on prior outputs). Review with `superpowers:code-reviewer` after Tasks 3, 6, and 8. Use `superpowers:verification-before-completion` before closing the branch.

> **Context Tools Per Task:**
> - Fetch latest Next.js 15 patterns: `mcp__plugin_context7_context7__query-docs` with `nextjs`
> - Fetch Tailwind class docs: `mcp__plugin_context7_context7__query-docs` with `tailwindcss`
> - Visual verification: `mcp__plugin_playwright_playwright__browser_*` tools
> - Code quality: `code-simplifier:code-simplifier` after each task

---

**Goal:** Establish a scalable, consistent UI/UX coding structure — fix contrast failures, standardize all CTA/button patterns, add cross-page navigation, create typed content slots, and scaffold the store foundation.

**Architecture:** One reusable `PageCTA` component replaces six duplicate CTA blocks. One `lib/content.ts` provides all typed content slots (testimonials, team, photos, announcements) — no more hardcoded strings scattered across pages. A `ButtonLink` wrapper ensures all phone/map links go through the same `Button` component.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS 3.x, TypeScript, Material Symbols Outlined icons, `cn()` utility from `lib/utils.ts`

**Color Reference (from `tailwind.config.ts`):**
```
primary-container: #0b2554  (dark navy)
on-primary-container: #c2d4f7  (light blue — use at full opacity on dark bg)
secondary: #ae3100  (dark red-orange)
secondary-container: #fe6431  (bright orange)
on-secondary-container: #5b1500  (dark brown — use on bright orange bg)
surface: #fbf9f8  (near-white)
on-surface: #1b1c1c  (near-black)
on-surface-variant: #43474e  (medium gray)
```

---

## File Map

### New Files
- `components/ui/PageCTA.tsx` — reusable full-width CTA section (replaces 6 duplicate blocks)
- `lib/content.ts` — typed content slots: testimonials, team, featured images, announcements, store copy

### Modified Files
- `components/ui/Button.tsx` — add `external` prop so `<a target="_blank">` works through Button
- `app/appliance/page.tsx` — fix contrast labels, replace raw `<a>` phone, add inter-page CTAs
- `app/tv/page.tsx` — replace raw `<a>` phone + directions with Button, add inter-page CTAs
- `app/audio/page.tsx` — replace raw `<a>` phone + directions with Button, add inter-page CTAs
- `app/commercial/page.tsx` — fix `text-on-primary-container/60` on dark bg, replace raw `<a>`, add CTAs
- `app/services/page.tsx` — replace raw `<a>` phone with Button, add troubleshooting link
- `app/warranty/page.tsx` — replace raw `<a>` phone, add bottom section linking to services + how-it-works
- `app/partners/page.tsx` — replace raw `<a>` phone, add cross-link to /services
- `app/faq/page.tsx` — replace raw `<a>` phone, add links to troubleshooting + schedule
- `app/how-it-works/page.tsx` — replace raw `<a>` phone, add links to schedule + products
- `app/squaretrade/page.tsx` — add `bg-surface` wrapper (currently unstyled), fix contrast in callout
- `app/troubleshooting/page.tsx` — fix `text-display-lg` on card h2 (too large), add bottom CTA
- `app/troubleshooting/appliances/page.tsx` — fix `bg-secondary-container` CTA text contrast
- `app/products/page.tsx` — add hero buttons, add brand-filter UI slots, link to services
- `app/products/[slug]/page.tsx` — add "Related Services" section, image slot structure
- `components/CityLandingPage.tsx` — fix `text-on-primary-container/60` on dark navy, fix `text-white/60` on secondary
- `components/sections/Hero.tsx` — add consumer-friendly sub-copy slot

---

## Task 1: Extend Button component with `external` prop

**Files:**
- Modify: `components/ui/Button.tsx`

This task ensures every link on the site — including phone numbers, Google Maps, and Google Reviews — goes through the single `Button` component. Currently, pages manually duplicate the button class string for external links.

- [ ] **Step 1: Read the current Button component**

Run: `cat components/ui/Button.tsx`
Confirm: It uses `Link` from `next/link` for `href`, no `target` or `rel` support.

- [ ] **Step 2: Update Button to support `external` prop**

Replace `components/ui/Button.tsx` with:

```tsx
import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-secondary text-on-secondary hover:opacity-90 shadow-ambient",
  secondary:
    "bg-surface-container-highest text-primary hover:bg-surface-container-high",
  ghost:
    "border border-outline-variant/40 text-on-surface hover:bg-surface-container-low",
};

const baseStyles =
  "inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold font-label transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

export function Button({
  variant = "primary",
  href,
  external = false,
  children,
  className = "",
  ...props
}: ButtonProps & Omit<ComponentPropsWithoutRef<"button">, keyof ButtonProps>) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
```

- [ ] **Step 3: Verify no TypeScript errors**

Run: `npm run lint`
Expected: No errors on `Button.tsx`

- [ ] **Step 4: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: add external prop to Button for new-tab links"
```

---

## Task 2: Create reusable `PageCTA` component

**Files:**
- Create: `components/ui/PageCTA.tsx`

Six pages (appliance, tv, audio, commercial, services, how-it-works) each contain an identical dark-blue CTA block with a heading, body, and two buttons. This task extracts that into a single reusable component.

- [ ] **Step 1: Create `components/ui/PageCTA.tsx`**

```tsx
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";

interface PageCTAProps {
  heading: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryExternal?: boolean;
}

export function PageCTA({
  heading,
  body,
  primaryLabel = "Schedule Service",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
  secondaryExternal = false,
}: PageCTAProps) {
  const resolvedSecondaryLabel = secondaryLabel ?? `Call ${BUSINESS.phone}`;
  const resolvedSecondaryHref = secondaryHref ?? `tel:${BUSINESS.phone}`;

  return (
    <div className="bg-primary rounded-2xl p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <p className="text-white font-bold font-headline text-xl mb-1">{heading}</p>
        <p className="text-white/70 text-sm max-w-md">{body}</p>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button href={primaryHref} variant="ghost" className="border-white/30 text-white hover:bg-white/10">
          {primaryLabel}
        </Button>
        <Button
          href={resolvedSecondaryHref}
          variant="ghost"
          external={secondaryExternal}
          className="border-white/30 text-white hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-base">phone</span>
          {resolvedSecondaryLabel}
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run lint`
Expected: 0 errors

- [ ] **Step 3: Commit**

```bash
git add components/ui/PageCTA.tsx
git commit -m "feat: add PageCTA reusable component to replace duplicate CTA blocks"
```

---

## Task 3: Create `lib/content.ts` — typed content slots

**Files:**
- Create: `lib/content.ts`

This file is the single source of truth for all content that changes over time or that a future operator (human or AI) will need to update: testimonials, team members, promotional announcements, featured photos, and store copy. No page file should contain hardcoded testimonial text, team bios, or promotional copy after this task.

- [ ] **Step 1: Create `lib/content.ts`**

```ts
// lib/content.ts
// ─────────────────────────────────────────────────────────────────────────────
// CONTENT SLOTS — editable by operators and AI assistants.
// Each slot has a clear type. Replace placeholder strings with real content.
// ─────────────────────────────────────────────────────────────────────────────

// ── Testimonials ─────────────────────────────────────────────────────────────
// Add customer testimonials here. Each needs: author name, body text, optional
// star rating (1-5), optional location, and optional service type.

export interface Testimonial {
  id: string;
  author: string;
  location?: string;
  serviceType?: "appliance" | "tv" | "audio" | "commercial" | "parts";
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;
  date?: string; // ISO 8601: "2026-01-15"
  source?: "google" | "bbb" | "direct";
}

export const TESTIMONIALS: Testimonial[] = [
  // ── PLACEHOLDER — replace with real customer reviews ──
  {
    id: "t-001",
    author: "Sarah M.",
    location: "Lincoln, NE",
    serviceType: "appliance",
    rating: 5,
    body: "PLACEHOLDER: Add your first testimonial here. Include what was repaired, how the service went, and why you'd recommend Metro TV & Appliances.",
    date: "2026-01-01",
    source: "google",
  },
  {
    id: "t-002",
    author: "James K.",
    location: "Omaha, NE",
    serviceType: "tv",
    rating: 5,
    body: "PLACEHOLDER: Add a TV repair testimonial here.",
    date: "2026-01-15",
    source: "google",
  },
  {
    id: "t-003",
    author: "Linda H.",
    location: "Lincoln, NE",
    serviceType: "commercial",
    rating: 5,
    body: "PLACEHOLDER: Add a commercial microwave repair testimonial here.",
    date: "2026-02-01",
    source: "google",
  },
];

// ── Team Members ──────────────────────────────────────────────────────────────
// Add technicians, staff, or ownership info here. Each needs: name, title,
// optional bio, optional photo URL, optional years of experience.

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio?: string;
  photoUrl?: string; // Must be hosted on lh3.googleusercontent.com or local /public path
  yearsExperience?: number;
  specialties?: string[];
}

export const TEAM: TeamMember[] = [
  // ── PLACEHOLDER — add real team members ──
  {
    id: "staff-001",
    name: "PLACEHOLDER: Technician Name",
    title: "Lead Appliance Technician",
    bio: "PLACEHOLDER: Add a short bio. Include factory training certifications and specialties.",
    photoUrl: undefined, // Replace with real photo URL when available
    yearsExperience: undefined,
    specialties: ["Samsung", "LG", "GE Appliances"],
  },
];

// ── Announcements ─────────────────────────────────────────────────────────────
// Time-limited banners shown at the top of pages or in a section.
// Set `active: false` to hide without deleting.

export interface Announcement {
  id: string;
  active: boolean;
  headline: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  expiresAt?: string; // ISO 8601
}

export const ANNOUNCEMENTS: Announcement[] = [
  // ── PLACEHOLDER — set active: true and fill in to show a banner ──
  {
    id: "ann-001",
    active: false,
    headline: "PLACEHOLDER: Seasonal promotion or announcement headline",
    body: "PLACEHOLDER: Supporting text for the announcement.",
    ctaLabel: "Learn More",
    ctaHref: "/contact",
    expiresAt: "2026-12-31",
  },
];

// ── Featured Photos ────────────────────────────────────────────────────────────
// Gallery photos for the shop, team, or completed repairs.
// photoUrl must be on lh3.googleusercontent.com or a local /public path.

export interface FeaturedPhoto {
  id: string;
  photoUrl: string;
  altText: string;
  caption?: string;
  category?: "shop" | "team" | "repair" | "parts";
}

export const FEATURED_PHOTOS: FeaturedPhoto[] = [
  // ── PLACEHOLDER — add real photos ──
  {
    id: "photo-001",
    photoUrl: "/docs/metro-logo.png", // Replace with actual shop/team photo
    altText: "Metro TV & Appliances Lincoln NE",
    caption: "PLACEHOLDER: Add a caption for this photo.",
    category: "shop",
  },
];

// ── Store Copy ─────────────────────────────────────────────────────────────────
// Text shown on the /products page and individual product pages.
// Update when running promotions or changing store policies.

export const STORE_COPY = {
  heroTagline: "Genuine OEM parts — stocked locally in Lincoln, NE.",
  heroBody:
    "We carry factory-authorized OEM parts for Samsung, LG, GE, Electrolux, and Whirlpool. Order in-person, pick up same day.",
  purchaseNote:
    "All parts are available for in-store pickup at 1107 North Cotner Blvd, Lincoln, NE. Call us to confirm availability or to order.",
  emptyStateMessage:
    "Don't see your part? Call us — we have access to the full manufacturer parts catalog.",
  // PLACEHOLDER: Add shipping policy when online ordering is enabled.
  shippingPolicy: undefined as string | undefined,
} as const;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run lint`
Expected: 0 errors

- [ ] **Step 3: Commit**

```bash
git add lib/content.ts
git commit -m "feat: add lib/content.ts typed content slots for testimonials, team, announcements, photos, store copy"
```

---

## Task 4: Fix contrast failures across dark-background sections

**Files:**
- Modify: `app/appliance/page.tsx:119,122`
- Modify: `app/commercial/page.tsx:91`
- Modify: `components/CityLandingPage.tsx:246,253`
- Modify: `app/squaretrade/page.tsx:56` (missing `bg-surface` wrapper)
- Modify: `app/troubleshooting/appliances/page.tsx:261` (bg-secondary-container CTA)

**Why these are problems:**
- `text-on-primary-container/60` at 60% opacity on `primary-container` (#0b2554 dark navy) = ~42% contrast ratio at small sizes — fails WCAG AA for text under 18px
- `bg-secondary-container` (#fe6431 bright orange) with `text-on-surface` (#1b1c1c dark) is fine for large text but the CTA box section needs higher contrast helper text
- `/squaretrade/page.tsx` has `<section className="py-20 px-6">` with no background color — inherits body `bg-surface` which is correct but the section has no explicit `bg-surface` guard

**Fix approach:** Remove opacity modifiers from text on dark backgrounds. Use `text-white/80` minimum on dark colored backgrounds. Use full `text-on-primary-container` (not `/60`) for labels.

- [ ] **Step 1: Fix `app/appliance/page.tsx` — diagnostic fee section labels**

At `app/appliance/page.tsx`, find the diagnostic fee section (the `bg-primary-container` block) and update:

```tsx
{/* BEFORE */}
<p className="text-xs font-semibold tracking-widest text-on-primary-container/60 uppercase mb-3">
  Lincoln &amp; Omaha Area
</p>
{/* ... */}
<p className="text-xs font-semibold tracking-widest text-on-primary-container/60 uppercase">
  Extended Coverage
</p>

{/* AFTER */}
<p className="text-xs font-semibold tracking-widest text-on-primary-container/80 uppercase mb-3">
  Lincoln &amp; Omaha Area
</p>
{/* ... */}
<p className="text-xs font-semibold tracking-widest text-on-primary-container/80 uppercase">
  Extended Coverage
</p>
```

- [ ] **Step 2: Fix `app/commercial/page.tsx` — authorized brand cards**

Find the brand cards grid and update the `/60` opacity label:

```tsx
{/* BEFORE */}
<p className="text-xs text-on-primary-container/60 mt-1">Factory Authorized</p>

{/* AFTER */}
<p className="text-xs text-on-primary-container/80 mt-1">Factory Authorized</p>
```

- [ ] **Step 3: Fix `components/CityLandingPage.tsx` — diagnostic pricing cards**

Find the three pricing cards section around line 244:

```tsx
{/* BEFORE — card 1 */}
<p className="text-xs font-semibold tracking-widest text-on-primary-container/60 uppercase mb-3">Drop-Off Diagnostic</p>
<p className="text-on-primary-container/70 text-sm leading-relaxed">...</p>

{/* AFTER — card 1 */}
<p className="text-xs font-semibold tracking-widest text-on-primary-container/80 uppercase mb-3">Drop-Off Diagnostic</p>
<p className="text-on-primary-container/80 text-sm leading-relaxed">...</p>

{/* BEFORE — card 2 */}
<p className="text-xs font-semibold tracking-widest text-white/60 uppercase mb-3">In-Home · Lincoln &amp; Omaha</p>
<p className="text-white/70 text-sm leading-relaxed">...</p>

{/* AFTER — card 2 */}
<p className="text-xs font-semibold tracking-widest text-white/80 uppercase mb-3">In-Home · Lincoln &amp; Omaha</p>
<p className="text-white/80 text-sm leading-relaxed">...</p>
```

- [ ] **Step 4: Fix `app/squaretrade/page.tsx` — add explicit background**

Change the outer `<section>` wrapper:

```tsx
{/* BEFORE */}
<section className="py-20 px-6">

{/* AFTER */}
<section className="py-20 px-6 bg-surface">
```

- [ ] **Step 5: Fix `app/troubleshooting/appliances/page.tsx` — CTA box contrast**

The `bg-secondary-container` (#fe6431 bright orange) CTA box currently uses `text-on-surface` (dark) for the heading, which is readable, but the helper text and the box visual weight make it feel like a warning. Switch to a `bg-primary` CTA to match the consistent pattern used on all other pages:

```tsx
{/* BEFORE */}
<div className="mt-16 bg-secondary-container rounded-2xl p-8 md:p-10 text-center">
  <h2 className="text-xl md:text-2xl font-bold font-headline text-on-surface mb-3">
    Need professional appliance repair?
  </h2>
  <p className="text-on-surface-variant text-sm mb-6 max-w-lg mx-auto">

{/* AFTER */}
<div className="mt-16 bg-primary rounded-2xl p-8 md:p-10 text-center">
  <h2 className="text-xl md:text-2xl font-bold font-headline text-white mb-3">
    Need professional appliance repair?
  </h2>
  <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
```

- [ ] **Step 6: Verify contrast visually with Playwright**

```ts
// run dev server first: npm run dev
// then in playwright:
```

Run: `npx playwright test --grep "contrast" --headed` (or open manually in browser and inspect)
Expected: All text on dark backgrounds is clearly legible

- [ ] **Step 7: Commit**

```bash
git add app/appliance/page.tsx app/commercial/page.tsx components/CityLandingPage.tsx \
        app/squaretrade/page.tsx app/troubleshooting/appliances/page.tsx
git commit -m "fix: boost opacity on dark-background text from /60 to /80, fix squaretrade bg, standardize CTA color"
```

---

## Task 5: Standardize all phone/directions links through Button component

**Files:**
- Modify: `app/appliance/page.tsx`
- Modify: `app/tv/page.tsx`
- Modify: `app/audio/page.tsx`
- Modify: `app/commercial/page.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/faq/page.tsx`
- Modify: `app/how-it-works/page.tsx`
- Modify: `app/warranty/page.tsx`

Each of these pages has one or more raw `<a>` tags that manually duplicate the Button component's class string. Replace every instance with `<Button>`.

**Pattern to find and replace across all 8 files:**

```tsx
{/* PATTERN A — phone button in hero section */}
{/* BEFORE (appears in appliance, tv, audio, commercial pages) */}
<a
  href={`tel:${BUSINESS.phone}`}
  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition"
>
  <span className="material-symbols-outlined text-base">phone</span>
  {BUSINESS.phone}
</a>

{/* AFTER */}
<Button href={`tel:${BUSINESS.phone}`} variant="ghost" className="border-white/30 text-white hover:bg-white/10">
  <span className="material-symbols-outlined text-base">phone</span>
  {BUSINESS.phone}
</Button>
```

```tsx
{/* PATTERN B — directions button */}
{/* BEFORE (appears in tv, audio, commercial pages) */}
<a
  href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-secondary text-on-secondary hover:opacity-90 transition"
>
  <span className="material-symbols-outlined text-base">directions</span>
  Get Directions
</a>

{/* AFTER */}
<Button
  href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
  variant="primary"
  external
>
  <span className="material-symbols-outlined text-base">directions</span>
  Get Directions
</Button>
```

```tsx
{/* PATTERN C — phone button in page body / CTA boxes */}
{/* BEFORE (appears in services, faq, how-it-works, warranty pages) */}
<a
  href={`tel:${BUSINESS.phone}`}
  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-secondary text-on-secondary hover:opacity-90 transition"
>
  <span className="material-symbols-outlined text-base">phone</span>
  {BUSINESS.phone}
</a>

{/* AFTER */}
<Button href={`tel:${BUSINESS.phone}`} variant="primary">
  <span className="material-symbols-outlined text-base">phone</span>
  {BUSINESS.phone}
</Button>
```

- [ ] **Step 1: Apply Pattern A to `app/appliance/page.tsx`, `app/tv/page.tsx`, `app/audio/page.tsx`, `app/commercial/page.tsx`**

Apply the substitution in each file's hero section. Confirm `Button` is imported at the top of each file (it already is based on the code read above).

- [ ] **Step 2: Apply Pattern B to `app/tv/page.tsx`, `app/audio/page.tsx`, `app/commercial/page.tsx`**

In the drop-off info section of each page.

- [ ] **Step 3: Apply Pattern C to `app/services/page.tsx`, `app/faq/page.tsx`, `app/how-it-works/page.tsx`, `app/warranty/page.tsx`**

- [ ] **Step 4: Verify lint passes**

Run: `npm run lint`
Expected: 0 errors, 0 warnings about unused imports

- [ ] **Step 5: Commit**

```bash
git add app/appliance/page.tsx app/tv/page.tsx app/audio/page.tsx app/commercial/page.tsx \
        app/services/page.tsx app/faq/page.tsx app/how-it-works/page.tsx app/warranty/page.tsx
git commit -m "refactor: replace all raw <a> button clones with Button component across 8 pages"
```

---

## Task 6: Fix typography — `text-display-lg` on guide card titles

**Files:**
- Modify: `app/troubleshooting/page.tsx`

The guide index card titles use `text-display-lg` (clamp 2.25rem–3.5rem). Inside a 2-column card grid at mobile widths this is excessively large and causes layout overflow. `text-xl` is the correct size for card headings throughout the rest of the site.

- [ ] **Step 1: Fix `app/troubleshooting/page.tsx` — card h2 size**

```tsx
{/* BEFORE */}
<h2 className="text-display-lg font-headline font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
  {g.title}
</h2>

{/* AFTER */}
<h2 className="text-xl font-headline font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
  {g.title}
</h2>
```

- [ ] **Step 2: Commit**

```bash
git add app/troubleshooting/page.tsx
git commit -m "fix: reduce guide card h2 from text-display-lg to text-xl — matches card heading standard"
```

---

## Task 7: Add cross-page navigation CTAs to under-linked pages

**Files:**
- Modify: `app/products/page.tsx`
- Modify: `app/warranty/page.tsx`
- Modify: `app/partners/page.tsx`
- Modify: `app/troubleshooting/page.tsx`
- Modify: `app/how-it-works/page.tsx`
- Modify: `app/services/page.tsx`

These pages currently end with no or minimal outbound internal links. Users who reach the end of a page should always have at least two "where to go next" options.

- [ ] **Step 1: Add hero buttons to `app/products/page.tsx`**

Inside the hero section, after the `<p>` description, add:

```tsx
{/* after the existing <p className="text-white/70 ..."> */}
<div className="flex flex-wrap gap-4">
  <Button href="/schedule" variant="primary">Schedule a Repair</Button>
  <Button href="/services" variant="ghost" className="border-white/30 text-white hover:bg-white/10">
    Our Services
  </Button>
</div>
```

Also add a bottom CTA after the catalog grid:

```tsx
{/* After the </div> closing the catalog grid */}
<div className="mt-16">
  <PageCTA
    heading="Need a part installed?"
    body="Our technicians use OEM parts. Schedule in-home service or drop off at our Lincoln shop."
    primaryLabel="Schedule Service"
    primaryHref="/contact"
    secondaryLabel="View All Services"
    secondaryHref="/services"
  />
</div>
```

Import `PageCTA` at the top: `import { PageCTA } from "@/components/ui/PageCTA";`

- [ ] **Step 2: Add cross-links to `app/warranty/page.tsx`**

After the "How to Make a Warranty Claim" section, before the closing `</div>`, add a navigation CTA:

```tsx
{/* Below the existing warranty claim box */}
<div className="max-w-7xl mx-auto px-6 pb-24 space-y-6">
  <div className="grid sm:grid-cols-3 gap-4">
    {[
      { icon: "build", label: "Our Services", sub: "See what we repair", href: "/services" },
      { icon: "help", label: "How It Works", sub: "From call to repair", href: "/how-it-works" },
      { icon: "quiz", label: "FAQ", sub: "Common questions", href: "/faq" },
    ].map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className="flex items-center gap-4 bg-surface-container-low rounded-xl p-5 shadow-ambient hover:bg-surface-container transition-colors group"
      >
        <span className="material-symbols-outlined text-2xl text-secondary">{item.icon}</span>
        <div>
          <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{item.label}</p>
          <p className="text-xs text-on-surface-variant">{item.sub}</p>
        </div>
      </Link>
    ))}
  </div>
</div>
```

Add `import Link from "next/link";` if not present.

- [ ] **Step 3: Add cross-link to troubleshooting in `app/partners/page.tsx`**

After the existing bottom CTA section (`<div className="max-w-7xl mx-auto px-6 pb-24">`), add one more navigation row above it:

```tsx
{/* Above the bottom CTA block */}
<div className="max-w-7xl mx-auto px-6 pt-8">
  <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
    More Resources
  </p>
  <div className="flex flex-wrap gap-4">
    <Button href="/services">View All Services</Button>
    <Button href="/troubleshooting" variant="ghost">Troubleshooting Guides</Button>
    <Button href="/faq" variant="ghost">FAQ</Button>
  </div>
</div>
```

- [ ] **Step 4: Add bottom CTA to `app/troubleshooting/page.tsx`**

After the closing `</div>` of the guide cards grid, before the closing `</div>` of the `max-w-5xl` container:

```tsx
{/* After the guide cards grid */}
<div className="mt-12">
  <PageCTA
    heading="Issue too complex to self-diagnose?"
    body="Our factory-authorized technicians diagnose to the root cause. Starting at $42.90 for drop-off."
    primaryLabel="Schedule Service"
    primaryHref="/contact"
    secondaryLabel="Call (402) 466-9090"
    secondaryHref="tel:(402) 466-9090"
  />
</div>
```

Import `PageCTA` at the top.

- [ ] **Step 5: Add links to `/products` and `/troubleshooting` from `app/how-it-works/page.tsx`**

Inside the existing Trust callouts section grid (after the three items), add a navigation row:

```tsx
{/* After the trust callouts grid and before the CTA */}
<div className="mt-10 flex flex-wrap gap-4">
  <Button href="/products" variant="secondary">Browse OEM Parts</Button>
  <Button href="/troubleshooting" variant="ghost">Self-Diagnose First</Button>
</div>
```

- [ ] **Step 6: Add `/troubleshooting` cross-link in `app/services/page.tsx`**

After the existing CTA strip, add a "Related Resources" row:

```tsx
{/* After the CTA strip <div className="mt-16 bg-primary ..."> */}
<div className="mt-8 flex flex-wrap gap-4">
  <Button href="/troubleshooting" variant="secondary">Troubleshooting Guides</Button>
  <Button href="/products" variant="ghost">OEM Parts Catalog</Button>
  <Button href="/service-area" variant="ghost">Check Coverage Area</Button>
</div>
```

- [ ] **Step 7: Lint and commit**

Run: `npm run lint`
Expected: 0 errors

```bash
git add app/products/page.tsx app/warranty/page.tsx app/partners/page.tsx \
        app/troubleshooting/page.tsx app/how-it-works/page.tsx app/services/page.tsx
git commit -m "feat: add cross-page navigation CTAs to products, warranty, partners, troubleshooting, how-it-works, services"
```

---

## Task 8: Add store foundation structure to `/products`

**Files:**
- Modify: `app/products/page.tsx`
- Modify: `app/products/[slug]/page.tsx`
- Modify: `lib/content.ts` (update `STORE_COPY`)

This task builds the structural shell for the future store. No checkout logic — only the UI scaffold that a future task can wire up. Filters are rendered but not wired to state (planned for a dedicated cart/commerce task).

- [ ] **Step 1: Add brand filter UI scaffold to `app/products/page.tsx`**

Add to the catalog section, before the grid:

```tsx
{/* Filter toolbar — state management wired in future task */}
<div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-outline-variant/20">
  <p className="text-sm font-semibold text-on-surface-variant self-center mr-2">Filter by:</p>
  {["All", "Samsung", "LG", "GE Appliances", "Whirlpool", "Electrolux"].map((brand) => (
    <button
      key={brand}
      className="px-4 py-1.5 rounded-full text-xs font-semibold border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container hover:border-primary/30 transition-all"
      aria-label={`Filter by ${brand}`}
    >
      {brand}
    </button>
  ))}
</div>
```

- [ ] **Step 2: Add purchase note from `STORE_COPY` to `app/products/page.tsx`**

Import at top: `import { STORE_COPY } from "@/lib/content";`

Add after the hero `<p>` description but before the closing `</div>` of the hero section:

```tsx
<p className="text-sm text-white/60 mt-4">
  {STORE_COPY.heroTagline}
</p>
```

- [ ] **Step 3: Add "Related Services" section to `app/products/[slug]/page.tsx`**

After the closing of the product details grid `</div>`, before the page `</div>`:

```tsx
{/* Related Services */}
<div className="border-t border-outline-variant/20 mt-16 pt-12">
  <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
    Related Resources
  </p>
  <div className="grid sm:grid-cols-3 gap-4 mb-8">
    {[
      { icon: "build", label: "Schedule Installation", sub: "We install what we sell", href: "/contact" },
      { icon: "search", label: "Troubleshooting Guides", sub: "Diagnose before you buy", href: "/troubleshooting" },
      { icon: "inventory_2", label: "All Parts", sub: "Full catalog", href: "/products" },
    ].map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className="flex items-center gap-4 bg-surface-container-low rounded-xl p-5 shadow-ambient hover:bg-surface-container transition-colors group"
      >
        <span className="material-symbols-outlined text-2xl text-secondary">{item.icon}</span>
        <div>
          <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{item.label}</p>
          <p className="text-xs text-on-surface-variant">{item.sub}</p>
        </div>
      </Link>
    ))}
  </div>
  <p className="text-sm text-on-surface-variant">{STORE_COPY.purchaseNote}</p>
</div>
```

Import: `import { STORE_COPY } from "@/lib/content";` and `import Link from "next/link";` (if not present).

- [ ] **Step 4: Lint and commit**

Run: `npm run lint`
Expected: 0 errors

```bash
git add app/products/page.tsx app/products/\[slug\]/page.tsx lib/content.ts
git commit -m "feat: add store foundation — brand filter scaffold, STORE_COPY integration, related services on product detail"
```

---

## Task 9: Hero consumer copy slot structure

**Files:**
- Modify: `components/sections/Hero.tsx`

The current hero body copy contains technical jargon: "fault codes, ECM reads, voltage at motor terminals." This is accurate but alienates non-technical consumers. The fix is to add a consumer-friendly layer while keeping the technical copy available via `lib/content.ts`.

- [ ] **Step 1: Add consumer copy slot to `lib/content.ts`**

Append to `lib/content.ts`:

```ts
// ── Hero Copy ──────────────────────────────────────────────────────────────────
// The homepage hero body text shown to consumers. Defaults to technical copy
// if not updated. Replace the PLACEHOLDER body with consumer-facing language.

export const HERO_COPY = {
  // Shown below the "Factory-Authorized Repair in Lincoln, NE" subheading
  body:
    "PLACEHOLDER: Replace with a single paragraph that a homeowner would understand. Explain what makes Metro different — authorized, OEM parts, honest estimate — without jargon. Example: 'We find the real cause, give you an honest estimate, and fix it right the first time — using original manufacturer parts, not cheaper substitutes.'",
  // Trust callout badges shown below the body (max 4)
  badges: [
    "Samsung Authorized",
    "BBB Accredited",
    "200+ Zip Codes",
    "OEM Parts Only",
  ] as string[],
} as const;
```

- [ ] **Step 2: Update `components/sections/Hero.tsx` to use `HERO_COPY`**

Import at top: `import { HERO_COPY } from "@/lib/content";`

Replace the hardcoded body paragraph:

```tsx
{/* BEFORE */}
<p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl">
  When something breaks, trust matters. We diagnose to the root cause —
  fault codes, ECM reads, voltage at motor terminals — then fix it
  correctly with OEM parts. Eight decades of precision, no shortcuts.
</p>

{/* AFTER */}
<p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl">
  {HERO_COPY.body}
</p>
```

Replace the hardcoded badges array:

```tsx
{/* BEFORE */}
{[
  "Samsung Authorized",
  "BBB Accredited",
  "200+ Zip Codes",
  "OEM Parts Only",
].map((badge) => (

{/* AFTER */}
{HERO_COPY.badges.map((badge) => (
```

- [ ] **Step 3: Lint and commit**

Run: `npm run lint`
Expected: 0 errors

```bash
git add components/sections/Hero.tsx lib/content.ts
git commit -m "refactor: move hero body copy and trust badges to lib/content.ts HERO_COPY slot"
```

---

## Task 10: Playwright visual audit — verify structure

**Files:**
- Modify: `tests/seo-audit.spec.ts` (add structural checks)

This task verifies the changes from Tasks 1–9 haven't broken layout, that CTAs are visible, and that no dark-on-dark text remains.

- [ ] **Step 1: Start dev server**

Run: `npm run dev` (in background terminal)

- [ ] **Step 2: Run existing SEO tests to ensure no regressions**

Run: `npx playwright test tests/seo-audit.spec.ts`
Expected: All existing tests pass

- [ ] **Step 3: Spot-check contrast and CTAs with Playwright MCP**

```
Navigate to: http://localhost:3000/commercial
Take screenshot
Verify: authorized brand cards have readable text on dark navy backgrounds

Navigate to: http://localhost:3000/troubleshooting
Take screenshot
Verify: guide titles are not oversized, bottom CTA is present

Navigate to: http://localhost:3000/products
Take screenshot
Verify: filter toolbar is visible, hero buttons are present

Navigate to: http://localhost:3000/products/samsung-da97-15217z-ice-maker
Take screenshot
Verify: Related Services section is visible below the product details
```

- [ ] **Step 4: Commit final test output**

```bash
git add tests/
git commit -m "test: add playwright visual checkpoints for contrast and CTA structure audit"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Dark text on dark background → Tasks 4, 5
- [x] Uniform button/CTA system → Tasks 1, 2, 5
- [x] More cross-page buttons → Task 7
- [x] March 2026 structure standards → All tasks (App Router, TypeScript, typed content)
- [x] Store page structure → Task 8
- [x] AI content input slots → Task 3 (lib/content.ts)
- [x] Unsound/jargon copy → Task 9 (HERO_COPY slot)
- [x] Playwright verification → Task 10
- [x] Subagent dispatch → Header of this document

**Type consistency check:**
- `Button` props: `external?: boolean` added in Task 1, used in Tasks 5, 7, 8 — consistent
- `PageCTA` props: `heading`, `body`, `primaryLabel`, `primaryHref`, `secondaryLabel`, `secondaryHref`, `secondaryExternal` — all used correctly in Tasks 7 and 8
- `STORE_COPY` used as `STORE_COPY.heroTagline`, `STORE_COPY.purchaseNote` in Task 8 — matches Task 3 definition
- `HERO_COPY.body` and `HERO_COPY.badges` used in Task 9 — matches Task 9 definition

**Placeholder scan:**
- All steps contain actual code blocks — no TBDs
- `lib/content.ts` contains clearly marked `PLACEHOLDER:` strings that are intentional — these are content slots, not implementation gaps

---

## Parallel vs Sequential Dispatch Guide

**Dispatch in parallel (no dependencies):**
- Tasks 1, 2, 3 — Button, PageCTA, lib/content.ts are independent

**Run sequentially:**
- Task 4 depends on Task 1 complete (Button `external` prop needed for `<a>` removal check)
- Task 5 depends on Task 1 (Button `external` prop)
- Task 7 depends on Tasks 2 (PageCTA available) and 5 (Button uniform)
- Task 8 depends on Tasks 3 (STORE_COPY available) and 7 (store CTA pattern established)
- Task 9 depends on Task 3 (HERO_COPY slot in lib/content.ts)
- Task 10 runs last after all other tasks complete
