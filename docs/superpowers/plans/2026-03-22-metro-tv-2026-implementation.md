# Metro TV 2026 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor metrotv-audiotech.com from legacy static HTML into a Next.js 15 App Router site with a Diagnostic Wizard, MCP inventory stitching, and Playwright SEO guardrails.

**Architecture:** Next.js 15 App Router on Vercel. React Server Components for all pages, Client Components only for interactivity (DiagnosticWizard, FaqAccordion, ZipChecker, forms). Shadcn/UI primitives on Tailwind CSS with the "Technical Artisan" design system. MCP server as a monorepo sub-package.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Tailwind CSS 3.4, Shadcn/UI, Zod, Resend, Playwright, @modelcontextprotocol/sdk

**Spec:** `docs/superpowers/specs/2026-03-22-metro-tv-2026-master-design.md`

**Base project:** `/home/aaron/code/met/`
**Content source:** `/home/aaron/code/nmet/` (polished HTML with 2 editorial passes)

---

## Phase 1: Core Shell

### Task 1: Create public/ directory and copy static assets

**Files:**
- Create: `public/docs/` (directory)
- Create: `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`
- Create: `public/robots.txt`

- [ ] **Step 1: Create public directory structure**

```bash
mkdir -p public/docs
```

- [ ] **Step 2: Copy favicons from nmet**

```bash
cp /home/aaron/code/nmet/favicon.ico public/
cp /home/aaron/code/nmet/docs/metro-logo.png public/docs/
# Copy any other media assets needed (videos, images)
cp /home/aaron/code/nmet/docs/*.mp4 public/docs/ 2>/dev/null || true
cp /home/aaron/code/nmet/docs/*.png public/docs/ 2>/dev/null || true
cp /home/aaron/code/nmet/docs/*.jpg public/docs/ 2>/dev/null || true
```

- [ ] **Step 3: Create fallback robots.txt**

```
# public/robots.txt
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://metrotv-audiotech.com/sitemap.xml
Host: metrotv-audiotech.com
```

- [ ] **Step 4: Commit**

```bash
git add public/
git commit -m "feat: create public/ with static assets and favicons"
```

---

### Task 2: Install dependencies (Shadcn/UI, Zod)

**Files:**
- Modify: `package.json`
- Create: `components.json` (Shadcn config)

- [ ] **Step 1: Install Zod**

```bash
cd /home/aaron/code/met && npm install zod
```

- [ ] **Step 2: Initialize Shadcn/UI**

Run: `npx shadcn@latest init`

When prompted:
- Style: Default
- Base color: Neutral
- CSS variables: Yes
- `components.json` path: default
- Tailwind config: `tailwind.config.ts`
- Components alias: `@/components/ui`
- Utils alias: `@/lib/utils`

NOTE: Shadcn may modify `globals.css` and `tailwind.config.ts`. After init, verify the existing design tokens in both files are preserved. If Shadcn overwrites them, restore the originals and only keep the Shadcn utility additions (`cn` function in `lib/utils.ts`).

- [ ] **Step 3: Install Shadcn components**

```bash
npx shadcn@latest add accordion dialog tabs select input label badge separator
```

- [ ] **Step 4: Verify build still works**

```bash
npm run build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Shadcn/UI, Zod, and UI primitives"
```

---

### Task 3: Create lib/metadata.ts helper

**Files:**
- Create: `lib/metadata.ts`

- [ ] **Step 1: Write buildMetadata helper**

```typescript
// lib/metadata.ts
import { Metadata } from "next";
import { BUSINESS } from "./constants";

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function buildMetadata(opts: PageMetaOptions): Metadata {
  const url = `${BUSINESS.url}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: BUSINESS.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: opts.title,
      description: opts.description,
    },
    robots: opts.noIndex ? { index: false } : undefined,
  };
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add lib/metadata.ts
git commit -m "feat: add buildMetadata helper for per-page SEO"
```

---

### Task 4: Port zip-codes.ts from nmet

**Files:**
- Create: `lib/zip-codes.ts`

- [ ] **Step 1: Copy and verify zip-codes.ts**

Copy `/home/aaron/code/nmet/lib/zip-codes.ts` to `/home/aaron/code/met/lib/zip-codes.ts`.

This file exports:
- `COVERED_ZIPS`: array of 221 zip code strings organized by region
- `SERVICE_REGIONS`: array of region objects with `name`, `state`, `description`, `center` (lat/lng), and `zips`

Verify the import path for any constants references. The nmet version should work as-is since both projects use `@/lib/` aliasing.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add lib/zip-codes.ts
git commit -m "feat: port 221 zip codes and service regions data"
```

---

### Task 5: Port utility components from nmet

**Files:**
- Create: `components/FaqAccordion.tsx`
- Create: `components/ZipChecker.tsx`
- Create: `components/ScheduleForm.tsx`
- Create: `components/ScrollReveal.tsx`
- Create: `components/RepairQuiz.tsx`
- Create: `components/JsonLd.tsx`

- [ ] **Step 1: Copy FaqAccordion.tsx**

Copy `/home/aaron/code/nmet/components/FaqAccordion.tsx` to `/home/aaron/code/met/components/FaqAccordion.tsx`.

Verify: It's a `"use client"` component with `items: { question: string; answer: string }[]` props, uses `useState` for `openIndex`, and Material Symbols `expand_more` icon. Should work as-is.

- [ ] **Step 2: Copy ZipChecker.tsx**

Copy `/home/aaron/code/nmet/components/ZipChecker.tsx` to `/home/aaron/code/met/components/ZipChecker.tsx`.

Verify: Uses `COVERED_ZIPS` from `@/lib/zip-codes` and `BUSINESS` from `@/lib/constants`. Both paths exist in met/.

- [ ] **Step 3: Copy ScheduleForm.tsx**

Copy `/home/aaron/code/nmet/components/ScheduleForm.tsx` to `/home/aaron/code/met/components/ScheduleForm.tsx`.

Verify: Posts to `/api/send`. That route doesn't exist yet (Task 10). The component will build fine; the route just won't work until Task 10.

- [ ] **Step 4: Copy ScrollReveal.tsx**

Copy `/home/aaron/code/nmet/components/ScrollReveal.tsx` to `/home/aaron/code/met/components/ScrollReveal.tsx`.

No external dependencies — uses IntersectionObserver API only.

- [ ] **Step 5: Copy RepairQuiz.tsx**

Copy `/home/aaron/code/nmet/components/RepairQuiz.tsx` to `/home/aaron/code/met/components/RepairQuiz.tsx`.

Uses `BUSINESS` from `@/lib/constants` and `Button` from `@/components/ui/Button`. Both exist in met/.

- [ ] **Step 6: Copy JsonLd.tsx**

Copy `/home/aaron/code/nmet/components/JsonLd.tsx` to `/home/aaron/code/met/components/JsonLd.tsx`.

Uses `BUSINESS` from `@/lib/constants`. This is the global JSON-LD graph component rendered in `layout.tsx`.

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Fix any import path issues.

- [ ] **Step 8: Commit**

```bash
git add components/FaqAccordion.tsx components/ZipChecker.tsx components/ScheduleForm.tsx components/ScrollReveal.tsx components/RepairQuiz.tsx components/JsonLd.tsx
git commit -m "feat: port 6 utility components from nmet"
```

---

### Task 6: Fix Hero.tsx dead link and add JsonLd to layout

**Files:**
- Modify: `components/sections/Hero.tsx` (line ~34)
- Modify: `app/layout.tsx`

- [ ] **Step 1: Fix Hero link**

In `components/sections/Hero.tsx`, find the link to `/what-to-expect` and change it to `/how-it-works`.

- [ ] **Step 2: Add JsonLd to layout.tsx**

In `app/layout.tsx`, import and render `<JsonLd />` inside `<body>` before `<Header />`:

```tsx
import { JsonLd } from "@/components/JsonLd";
// ... in body:
<body>
  <JsonLd />
  <Header />
  <main>{children}</main>
  <Footer />
</body>
```

(Check if it's already there — the nmet layout has it. If met/ already imports it, skip.)

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx app/layout.tsx
git commit -m "fix: Hero link to /how-it-works, add global JsonLd to layout"
```

---

### Task 7: Replace inline FAQ accordion with FaqAccordion

**Files:**
- Modify: `app/faq/page.tsx`

- [ ] **Step 1: Read current faq/page.tsx**

Read the file to find the inline `FAQItem` component and understand the data structure.

- [ ] **Step 2: Refactor to use FaqAccordion**

Replace the inline `FAQItem` component with the imported `FaqAccordion`. The existing page has FAQ data organized by category. Convert each category's Q&A pairs to `{ question, answer }[]` format and pass to `<FaqAccordion items={...} />`.

Keep the page's metadata, JSON-LD, and overall layout. Only replace the accordion rendering.

- [ ] **Step 3: Verify build and visual check**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/faq/page.tsx
git commit -m "refactor: replace inline FAQ accordion with shared FaqAccordion"
```

---

### Task 8: Add fluid typography to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add fluid type utilities**

Add to `@layer utilities` in `app/globals.css`:

```css
.text-display-lg {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.text-display-md {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.text-display-sm {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  line-height: 1.2;
}

.text-body-lg {
  font-size: clamp(1rem, 1.8vw, 1.125rem);
  line-height: 1.6;
}

.text-body-md {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  line-height: 1.6;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add fluid clamp() typography utilities"
```

---

### Task 9: Add redirects in next.config.ts

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Read current next.config.ts**

Read `/home/aaron/code/met/next.config.ts` to understand existing config.

- [ ] **Step 2: Add redirects**

Add the `redirects()` function to the Next.js config:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/what-to-expect", destination: "/how-it-works", permanent: true },
      { source: "/troubleshooting-appliances", destination: "/troubleshooting/appliances", permanent: true },
      { source: "/troubleshooting-tv", destination: "/troubleshooting/tv", permanent: true },
      { source: "/troubleshooting-audio", destination: "/troubleshooting/audio", permanent: true },
      { source: "/troubleshooting-commercial", destination: "/troubleshooting/commercial", permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add next.config.ts
git commit -m "feat: add redirects for legacy URL patterns"
```

---

### Task 10: Create /api/send/route.ts

**Files:**
- Create: `app/api/send/route.ts`

- [ ] **Step 1: Read existing /api/contact/route.ts for reference**

Read `/home/aaron/code/met/app/api/contact/route.ts` to understand the Resend pattern.

- [ ] **Step 2: Create the route**

```typescript
// app/api/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const scheduleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone number required"),
  zip: z.string().length(5, "5-digit zip required"),
  serviceType: z.enum([
    "appliance-inhome",
    "tv-dropoff",
    "audio-dropoff",
    "commercial-dropoff",
    "not-sure",
  ]),
  applianceType: z.string().optional(),
  brand: z.string().optional(),
  issue: z.string().min(10, "Please describe the issue"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = scheduleSchema.parse(body);

    await resend.emails.send({
      from: "Metro TV Service Request <noreply@metrotv-audiotech.com>",
      to: ["service@metrotv-audiotech.com"],
      subject: `Service Request: ${data.serviceType} — ${data.name}`,
      html: `
        <h2>New Service Request</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${data.phone}</td></tr>
          <tr><td><strong>Zip:</strong></td><td>${data.zip}</td></tr>
          <tr><td><strong>Service:</strong></td><td>${data.serviceType}</td></tr>
          ${data.applianceType ? `<tr><td><strong>Appliance:</strong></td><td>${data.applianceType}</td></tr>` : ""}
          ${data.brand ? `<tr><td><strong>Brand:</strong></td><td>${data.brand}</td></tr>` : ""}
          <tr><td><strong>Issue:</strong></td><td>${data.issue}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to send request" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/api/send/route.ts
git commit -m "feat: add /api/send endpoint with Zod validation for schedule form"
```

---

### Task 11: Create sitemap.ts and robots.ts

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: Create sitemap.ts**

Copy from `/home/aaron/code/nmet/app/sitemap.ts` and add any new routes:

```typescript
// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://metrotv-audiotech.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/appliance`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tv`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/audio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/commercial`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/service-area`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/schedule`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/warranty`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/partners`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/squaretrade`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/troubleshooting`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/troubleshooting/appliances`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/troubleshooting/tv`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/troubleshooting/audio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/troubleshooting/commercial`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/appliance-repair-lincoln`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/appliance-repair-omaha`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/appliance-repair-bellevue`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/appliance-repair-council-bluffs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/appliance-repair-grand-island`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/appliance-repair-southeast-nebraska`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
```

- [ ] **Step 2: Create robots.ts**

Copy from `/home/aaron/code/nmet/app/robots.ts`:

```typescript
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://metrotv-audiotech.com/sitemap.xml",
    host: "metrotv-audiotech.com",
  };
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat: add dynamic sitemap and robots.ts"
```

---

### Task 12: Create CityLandingPage shared template

**Files:**
- Create: `components/CityLandingPage.tsx`

- [ ] **Step 1: Write the shared template**

```tsx
// components/CityLandingPage.tsx
import Link from "next/link";
import { BUSINESS, SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { ZipChecker } from "@/components/ZipChecker";
import { CTA } from "@/components/sections/CTA";

interface CityPageProps {
  city: string;
  state: string;
  region: string;
  nearbyAreas: string[];
  localContext: string;
  zips: string[];
}

export function CityLandingPage({ city, state, region, nearbyAreas, localContext }: CityPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-on-primary py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-display-lg font-headline font-bold mb-6">
            Factory-Authorized Appliance Repair in {city}, {state}
          </h1>
          <p className="text-body-lg text-on-primary/80 max-w-2xl mb-8" data-speakable>
            Metro TV & Appliances provides factory-authorized in-home appliance repair in {city} and surrounding {state} communities. Samsung Established ASC with OEM parts, ${BUSINESS.diagnostic} diagnostic fee, and 90-day warranty on all repairs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/schedule" variant="primary">Schedule Service</Button>
            <Button href={`tel:${BUSINESS.phone}`} variant="ghost">Call {BUSINESS.phone}</Button>
          </div>
        </div>
      </section>

      {/* Local context */}
      <section className="bg-surface-container-low py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-display-sm font-headline font-bold mb-4">
            Serving {city} and Nearby Areas
          </h2>
          <p className="text-body-md text-on-surface-variant mb-6">{localContext}</p>
          {nearbyAreas.length > 0 && (
            <p className="text-body-md text-on-surface-variant">
              Also serving: {nearbyAreas.join(", ")}.
            </p>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-display-sm font-headline font-bold mb-8">
            Repair Services Available in {city}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={s.href} className="block p-6 bg-surface-container-low rounded-2xl hover:shadow-ambient transition-shadow">
                <h3 className="text-lg font-bold font-headline mb-2">{s.title}</h3>
                <p className="text-sm text-on-surface-variant mb-3">{s.description}</p>
                <span className="text-xs font-medium text-primary">{s.deliveryModel === "in-home" ? "In-home service" : "Drop-off at Lincoln shop"}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Zip checker */}
      <section className="bg-surface-container-low py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-display-sm font-headline font-bold mb-4">Check Your Coverage</h2>
          <p className="text-body-md text-on-surface-variant mb-8">
            Enter your zip code to confirm we service your area.
          </p>
          <ZipChecker />
        </div>
      </section>

      <CTA />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/CityLandingPage.tsx
git commit -m "feat: add shared CityLandingPage template component"
```

---

### Task 13: Create city landing pages (6 pages)

**Files:**
- Create: `app/appliance-repair-lincoln/page.tsx`
- Create: `app/appliance-repair-omaha/page.tsx`
- Create: `app/appliance-repair-bellevue/page.tsx`
- Create: `app/appliance-repair-council-bluffs/page.tsx`
- Create: `app/appliance-repair-grand-island/page.tsx`
- Create: `app/appliance-repair-southeast-nebraska/page.tsx`

- [ ] **Step 1: Create Lincoln page (reference template)**

```tsx
// app/appliance-repair-lincoln/page.tsx
import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { CityLandingPage } from "@/components/CityLandingPage";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Appliance Repair in Lincoln, NE — Factory-Authorized Service",
  description: `Factory-authorized in-home appliance repair in Lincoln, NE. Samsung ASC, OEM parts, ${BUSINESS.diagnostic} diagnostic. Metro TV & Appliances — since 1947.`,
  path: "/appliance-repair-lincoln",
  keywords: ["appliance repair Lincoln NE", "Lincoln appliance service", "Samsung repair Lincoln Nebraska"],
});

export default function ApplianceRepairLincoln() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: BUSINESS.name,
            telephone: "+1-402-466-9090",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1107 North Cotner Blvd",
              addressLocality: "Lincoln",
              addressRegion: "NE",
              postalCode: "68505",
              addressCountry: "US",
            },
            areaServed: { "@type": "City", name: "Lincoln", containedInPlace: { "@type": "State", name: "Nebraska" } },
            url: `${BUSINESS.url}/appliance-repair-lincoln`,
          }),
        }}
      />
      <CityLandingPage
        city="Lincoln"
        state="NE"
        region="Lincoln Metro"
        nearbyAreas={["Waverly", "Hickman", "Crete", "Seward", "Milford"]}
        localContext="Located at 1107 North Cotner Blvd, we're minutes from the University of Nebraska campus and serve all of Lancaster County. Same-day and next-day appointments available for most appliance repairs."
        zips={[]}
      />
    </>
  );
}
```

- [ ] **Step 2: Create remaining 5 city pages**

Follow the Lincoln template pattern for each city. Key differences per city:

**Omaha**: nearbyAreas = ["Papillion", "La Vista", "Ralston", "Elkhorn"]. localContext about Douglas County coverage.

**Bellevue**: nearbyAreas = ["Papillion", "La Vista", "Offutt AFB area"]. localContext about Sarpy County, Bellevue-specific zips (68005, 68123, 68147).

**Council Bluffs**: nearbyAreas = ["Carter Lake", "Crescent", "Treynor"]. localContext about cross-state Iowa service from Lincoln shop.

**Grand Island**: nearbyAreas = ["Hastings", "Kearney", "Aurora"]. localContext about extended coverage area.

**Southeast Nebraska**: nearbyAreas = ["Nebraska City", "Beatrice", "Falls City", "Auburn"]. localContext about rural coverage.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/appliance-repair-*/
git commit -m "feat: add 6 city landing pages with local SEO"
```

---

### Task 14: Create troubleshooting pages

**Files:**
- Create: `app/troubleshooting/page.tsx`
- Create: `app/troubleshooting/appliances/page.tsx`
- Create: `app/troubleshooting/tv/page.tsx`
- Create: `app/troubleshooting/audio/page.tsx`
- Create: `app/troubleshooting/commercial/page.tsx`

- [ ] **Step 1: Create troubleshooting hub**

```tsx
// app/troubleshooting/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Troubleshooting Guides — Appliance, TV, Audio & Commercial",
  description: "Diagnose common appliance, TV, audio, and commercial microwave issues. Expert troubleshooting guides from Metro TV & Appliances, Lincoln NE.",
  path: "/troubleshooting",
  keywords: ["appliance troubleshooting", "TV repair guide", "error code lookup"],
});

const guides = [
  { href: "/troubleshooting/appliances", title: "Appliance Troubleshooting", desc: "Samsung & LG error codes, washer drain issues, dryer thermal faults, refrigerator diagnostics." },
  { href: "/troubleshooting/tv", title: "TV Troubleshooting", desc: "PSU failures, T-Con board issues, LED driver diagnostics, A-board faults." },
  { href: "/troubleshooting/audio", title: "Audio Troubleshooting", desc: "BJT amplifier issues, RIAA phono preamp, ESR capacitor testing, VTA & azimuth." },
  { href: "/troubleshooting/commercial", title: "Commercial Microwave Troubleshooting", desc: "HV circuit, magnetron, mode stirrer motor, membrane switch matrix." },
];

export default function TroubleshootingHub() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-display-lg font-headline font-bold mb-4">Troubleshooting Guides</h1>
        <p className="text-body-lg text-on-surface-variant mb-12 max-w-2xl" data-speakable>
          Use these guides to identify common issues with your appliance, TV, audio equipment, or commercial microwave. For professional diagnosis, call (402) 466-9090.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((g) => (
            <Link key={g.href} href={g.href} className="block p-8 bg-surface-container-low rounded-2xl hover:shadow-ambient transition-shadow group">
              <h2 className="text-xl font-bold font-headline mb-2 group-hover:text-primary transition-colors">{g.title}</h2>
              <p className="text-sm text-on-surface-variant">{g.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create appliances troubleshooting page**

Port content from `/home/aaron/code/nmet/troubleshooting-appliances/index.html`. Use `FaqAccordion` for the diagnostic Q&A sections. Include the `data-speakable` 40-word summary. This is where the DiagnosticWizard will be integrated in Phase 2.

Structure:
- H1 with AEO summary paragraph
- FaqAccordion sections for each fault category (from the nmet HTML `info-item` blocks)
- CTA section

- [ ] **Step 3: Create TV, Audio, Commercial troubleshooting pages**

Same pattern as appliances, porting content from their respective nmet HTML pages:
- `/home/aaron/code/nmet/troubleshooting-tv/index.html`
- `/home/aaron/code/nmet/troubleshooting-audio/index.html`
- `/home/aaron/code/nmet/troubleshooting-commercial/index.html`

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add app/troubleshooting/
git commit -m "feat: add troubleshooting hub and 4 category pages"
```

---

### Task 15: Create schedule, squaretrade, and not-found pages

**Files:**
- Create: `app/schedule/page.tsx`
- Create: `app/squaretrade/page.tsx`
- Create: `app/not-found.tsx`

- [ ] **Step 1: Create schedule page**

```tsx
// app/schedule/page.tsx
import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { ScheduleForm } from "@/components/ScheduleForm";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Schedule Service — Factory-Authorized Repair",
  description: `Schedule factory-authorized appliance, TV, or commercial microwave repair. ${BUSINESS.diagnostic} diagnostic fee applied to repair. Call (402) 466-9090 or book online.`,
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-display-md font-headline font-bold mb-4">Schedule Service</h1>
        <p className="text-body-md text-on-surface-variant mb-8" data-speakable>
          Request factory-authorized repair service from Metro TV & Appliances. We'll confirm your appointment within one business day. {BUSINESS.diagnostic} diagnostic fee is applied to the total if you proceed with repair.
        </p>
        <ScheduleForm />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create squaretrade page**

Port content from `/home/aaron/code/nmet/squaretrade/index.html`. Include SquareTrade-specific copy about extended warranty processing.

- [ ] **Step 3: Create not-found page**

```tsx
// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-20 px-6 text-center">
      <div className="max-w-xl mx-auto">
        <p className="text-6xl font-bold font-headline text-primary mb-4">404</p>
        <h1 className="text-display-sm font-headline font-bold mb-4">Page Not Found</h1>
        <p className="text-body-md text-on-surface-variant mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button href="/" variant="primary">Go Home</Button>
          <Button href="/contact" variant="secondary">Contact Us</Button>
        </div>
        <div className="text-left bg-surface-container-low rounded-2xl p-6">
          <p className="text-sm font-semibold font-headline mb-3">Popular pages:</p>
          <ul className="space-y-2">
            <li><Link href="/appliance" className="text-sm text-primary hover:underline">Appliance Repair</Link></li>
            <li><Link href="/tv" className="text-sm text-primary hover:underline">TV Repair</Link></li>
            <li><Link href="/service-area" className="text-sm text-primary hover:underline">Service Area</Link></li>
            <li><Link href="/faq" className="text-sm text-primary hover:underline">FAQ</Link></li>
            <li><Link href="/schedule" className="text-sm text-primary hover:underline">Schedule Service</Link></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add app/schedule/ app/squaretrade/ app/not-found.tsx
git commit -m "feat: add schedule, squaretrade, and 404 pages"
```

---

### Task 16: Verify full build — Phase 1 complete

- [ ] **Step 1: Run full build**

```bash
cd /home/aaron/code/met && npm run build
```

Expected: Build succeeds. All pages render. No TypeScript errors.

- [ ] **Step 2: Start dev server and spot-check key pages**

```bash
npm run dev
```

Check: `/`, `/appliance`, `/faq`, `/troubleshooting`, `/schedule`, `/appliance-repair-lincoln`, `/not-found-test` (404 page).

- [ ] **Step 3: Commit any remaining fixes**

---

## Phase 2: Diagnostic Wizard

### Task 17: Create lib/error-codes.ts

**Files:**
- Create: `lib/error-codes.ts`

- [ ] **Step 1: Write error code data**

```typescript
// lib/error-codes.ts
export type ApplianceType = "washer" | "dryer" | "refrigerator" | "dishwasher" | "range";

export interface ErrorCode {
  code: string;
  aliases?: string[];
  brand: "samsung" | "lg";
  displayName: string;
  appliances: ApplianceType[];
  severity: "low" | "medium" | "high";
  description: string;
  causes: string[];
  components: string[];
  safetyNote?: string;
}

export const SAMSUNG_CODES: ErrorCode[] = [
  {
    code: "5E",
    aliases: ["SE"],
    brand: "samsung",
    displayName: "Drain Error",
    appliances: ["washer"],
    severity: "medium",
    description: "The washer cannot drain water. The control board detected the water level has not dropped after the drain pump activated.",
    causes: [
      "Clogged debris filter (most common — check the filter access panel at the front bottom)",
      "Drain hose kinked or obstructed",
      "Drain pump failure (motor winding open or seized impeller)",
      "Pressure switch or air dome tube blocked",
    ],
    components: ["drain pump", "debris filter", "pressure switch", "drain hose"],
  },
  {
    code: "8E",
    brand: "samsung",
    displayName: "Motor Error",
    appliances: ["washer"],
    severity: "high",
    description: "The drive motor or its hall sensor is not responding. The control board cannot verify motor rotation.",
    causes: [
      "Hall sensor failure (most common on direct-drive models)",
      "Motor winding open circuit or shorted turns",
      "Wire harness disconnect between motor and main PCB",
      "Main control board relay failure",
    ],
    components: ["hall sensor", "drive motor", "motor wire harness", "main PCB"],
    safetyNote: "Unplug the washer before inspecting motor connections. The motor operates on high current.",
  },
  {
    code: "14E",
    brand: "samsung",
    displayName: "Communication Error",
    appliances: ["washer"],
    severity: "high",
    description: "The main control board and display board cannot communicate. The washer will not respond to button presses.",
    causes: [
      "Wire harness disconnect between main PCB and display PCB",
      "Corroded connector pins",
      "Main control board failure",
      "Display board failure",
    ],
    components: ["main PCB", "display board", "communication harness"],
  },
  {
    code: "1E",
    brand: "samsung",
    displayName: "Water Level Sensor Error",
    appliances: ["washer"],
    severity: "medium",
    description: "The pressure switch cannot detect the water level. The washer does not know if the tub is full or empty.",
    causes: [
      "Air dome tube disconnected or cracked",
      "Pressure switch failure",
      "Main control board input circuit fault",
    ],
    components: ["pressure switch", "air dome tube", "main PCB"],
  },
  {
    code: "4E",
    brand: "samsung",
    displayName: "Water Supply Error",
    appliances: ["washer", "dishwasher"],
    severity: "medium",
    description: "The washer is not receiving water. The expected fill time has been exceeded.",
    causes: [
      "Water supply valves turned off",
      "Inlet valve solenoid failure (coil open circuit)",
      "Inlet screens clogged with sediment",
      "Low household water pressure",
    ],
    components: ["water inlet valve", "inlet screen", "fill hose"],
  },
  {
    code: "dE",
    brand: "samsung",
    displayName: "Door Lock Error",
    appliances: ["washer"],
    severity: "medium",
    description: "The door latch interlock cannot engage or verify the locked position. The washer will not start a cycle.",
    causes: [
      "Door latch mechanism worn or broken",
      "Door lock actuator failure",
      "Door switch open circuit",
      "Foreign object preventing door closure",
    ],
    components: ["door lock assembly", "door latch", "door switch"],
  },
  {
    code: "HE",
    brand: "samsung",
    displayName: "Heater Error",
    appliances: ["washer", "dryer"],
    severity: "high",
    description: "The heating element is not reaching target temperature. On washers, hot wash cycles will fail. On dryers, clothes will not dry.",
    causes: [
      "Heating element open circuit (burnout)",
      "Thermistor (temperature sensor) failure",
      "Thermal cutoff fuse blown",
      "Control board relay failure",
    ],
    components: ["heating element", "thermistor", "thermal cutoff fuse", "control board"],
    safetyNote: "Heating elements operate at mains voltage. Unplug the appliance and discharge any capacitors before testing.",
  },
  {
    code: "OE",
    brand: "samsung",
    displayName: "Overflow Error",
    appliances: ["washer"],
    severity: "high",
    description: "The water level has exceeded the maximum safe threshold. The washer will attempt to drain immediately.",
    causes: [
      "Water inlet valve stuck open",
      "Pressure switch stuck in low-water position",
      "Control board output driving inlet valve continuously",
    ],
    components: ["water inlet valve", "pressure switch", "main PCB"],
    safetyNote: "If water is overflowing, turn off water supply valves immediately before troubleshooting.",
  },
];

export const LG_CODES: ErrorCode[] = [
  {
    code: "OE",
    brand: "lg",
    displayName: "Drain Error",
    appliances: ["washer", "dishwasher"],
    severity: "medium",
    description: "The washer or dishwasher cannot drain. Water remains in the tub after the drain cycle.",
    causes: [
      "Drain filter clogged (check the access panel at the front bottom)",
      "Drain hose kinked or blocked",
      "Drain pump motor failure",
      "Control board not sending drain signal",
    ],
    components: ["drain pump", "drain filter", "drain hose"],
  },
  {
    code: "LE",
    brand: "lg",
    displayName: "Motor Error",
    appliances: ["washer"],
    severity: "high",
    description: "The drive motor is locked or the hall sensor is not detecting rotation. The drum will not spin.",
    causes: [
      "Overloaded drum (too many clothes)",
      "Hall sensor failure",
      "Rotor position sensor fault",
      "Motor stator winding failure",
    ],
    components: ["hall sensor", "stator", "rotor", "motor wire harness"],
    safetyNote: "Unplug the washer before inspecting the motor assembly.",
  },
  {
    code: "FE",
    brand: "lg",
    displayName: "Overflow Error",
    appliances: ["washer"],
    severity: "high",
    description: "Water level has exceeded the overflow threshold. The machine will attempt emergency drain.",
    causes: [
      "Water inlet valve stuck in the open position",
      "Pressure switch malfunction",
      "Main control board fault",
    ],
    components: ["water inlet valve", "pressure switch", "main PCB"],
    safetyNote: "Turn off water supply valves immediately if water is actively overflowing.",
  },
  {
    code: "dE",
    brand: "lg",
    displayName: "Door Error",
    appliances: ["washer"],
    severity: "medium",
    description: "The door is not fully closed or the door lock mechanism cannot engage.",
    causes: [
      "Door not fully latched",
      "Door lock actuator failure",
      "Door switch failure",
      "Door hinge misalignment",
    ],
    components: ["door lock assembly", "door switch", "door hinge"],
  },
  {
    code: "IE",
    brand: "lg",
    displayName: "Water Inlet Error",
    appliances: ["washer", "dishwasher"],
    severity: "medium",
    description: "The machine is not filling with water within the expected time.",
    causes: [
      "Water supply turned off at the tap",
      "Inlet valve failure",
      "Inlet hose kinked",
      "Inlet screen clogged with debris",
    ],
    components: ["water inlet valve", "inlet screen", "fill hose"],
  },
];

export const ALL_CODES = [...SAMSUNG_CODES, ...LG_CODES];

export function findCode(brand: "samsung" | "lg", code: string): ErrorCode | undefined {
  const codes = brand === "samsung" ? SAMSUNG_CODES : LG_CODES;
  return codes.find(
    (c) => c.code.toLowerCase() === code.toLowerCase() || c.aliases?.some((a) => a.toLowerCase() === code.toLowerCase())
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add lib/error-codes.ts
git commit -m "feat: add Samsung and LG error code data with typed interfaces"
```

---

### Task 18: Build DiagnosticWizard client component

**Files:**
- Create: `components/DiagnosticWizard.tsx`

- [ ] **Step 1: Write the component**

Build the full state-machine component following the spec:
- State: `"brand"` | `"code"` | `"result"`
- Brand selection: Two large cards (Samsung, LG)
- Error code selection: Grid of code chips filtered by brand
- Diagnosis result: Code info, severity badge, causes, safety note
- Professionalism Pivot: Triggered after 2s delay via `setTimeout`
- Uses Shadcn `Dialog` for the modal
- `aria-live="polite"` region wrapping the result
- 48px minimum touch targets on all buttons

Key implementation details:
- Import `SAMSUNG_CODES`, `LG_CODES`, `findCode` from `@/lib/error-codes`
- Import `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription` from `@/components/ui/dialog`
- Import `Badge` from `@/components/ui/badge`
- Import `Button` from `@/components/ui/Button`

The component should be approximately 200-250 lines covering all 4 steps of the wizard.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/DiagnosticWizard.tsx
git commit -m "feat: build DiagnosticWizard with state machine and professionalism pivot"
```

---

### Task 19: Integrate DiagnosticWizard into troubleshooting page

**Files:**
- Modify: `app/troubleshooting/appliances/page.tsx`

- [ ] **Step 1: Add DiagnosticWizard to the page**

Import `DiagnosticWizard` and render it between the hero section and the FAQ content:

```tsx
import { DiagnosticWizard } from "@/components/DiagnosticWizard";

// In the page JSX, after the hero and before FAQ sections:
<section className="py-16 px-6">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-display-sm font-headline font-bold mb-4 text-center">
      What Error Code Are You Seeing?
    </h2>
    <p className="text-body-md text-on-surface-variant text-center mb-8">
      Select your brand and error code for a diagnosis from our Virtual Tech.
    </p>
    <DiagnosticWizard />
  </div>
</section>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/troubleshooting/appliances/page.tsx
git commit -m "feat: integrate DiagnosticWizard into appliance troubleshooting page"
```

---

## Phase 3: MCP Inventory Stitching

### Task 20: Create MCP server package skeleton

**Files:**
- Create: `mcp/ebay-inventory/package.json`
- Create: `mcp/ebay-inventory/tsconfig.json`
- Create: `mcp/ebay-inventory/.env.example`
- Create: `mcp/ebay-inventory/src/index.ts`

- [ ] **Step 1: Create package structure**

```bash
mkdir -p mcp/ebay-inventory/src
```

- [ ] **Step 2: Write package.json**

```json
{
  "name": "mcp-ebay-inventory",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}
```

- [ ] **Step 3: Write tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Write .env.example**

```
EBAY_APP_ID=your_app_id
EBAY_CERT_ID=your_cert_id
EBAY_STORE_ID=your_store_id
EBAY_SANDBOX=true
```

- [ ] **Step 5: Write MCP server entry point**

```typescript
// mcp/ebay-inventory/src/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  { name: "mcp-ebay-inventory", version: "0.1.0" },
  { capabilities: { tools: {}, resources: {} } }
);

// Tool: search-inventory
server.setRequestHandler("tools/list" as any, async () => ({
  tools: [
    {
      name: "search-inventory",
      description: "Search eBay store inventory by keyword",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search keywords (e.g., 'samsung drain pump OEM')" },
          store: { type: "string", description: "eBay store ID" },
          limit: { type: "number", description: "Max results (default 3)" },
        },
        required: ["query"],
      },
    },
    {
      name: "get-part-details",
      description: "Get details for a specific eBay listing",
      inputSchema: {
        type: "object",
        properties: {
          itemId: { type: "string", description: "eBay item ID" },
        },
        required: ["itemId"],
      },
    },
    {
      name: "check-availability",
      description: "Check if a part is in stock",
      inputSchema: {
        type: "object",
        properties: {
          itemId: { type: "string", description: "eBay item ID" },
        },
        required: ["itemId"],
      },
    },
  ],
}));

// Tool handler — returns mock data until real eBay creds are configured
server.setRequestHandler("tools/call" as any, async (request: any) => {
  const { name, arguments: args } = request.params;

  if (name === "search-inventory") {
    // TODO: Replace with real eBay Browse API calls when creds are available
    const baseUrl = process.env.EBAY_SANDBOX === "true"
      ? "https://api.sandbox.ebay.com"
      : "https://api.ebay.com";

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            parts: [
              {
                name: `${args.query} — OEM Replacement`,
                price: "$45.99",
                condition: "New",
                url: `https://www.ebay.com/str/${process.env.EBAY_STORE_ID || "metro-parts"}`,
                inStock: true,
              },
            ],
            note: "Mock data — configure EBAY_APP_ID for live inventory",
          }),
        },
      ],
    };
  }

  return { content: [{ type: "text", text: "Unknown tool" }] };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
```

- [ ] **Step 6: Commit**

```bash
git add mcp/
git commit -m "feat: add MCP ebay-inventory server skeleton with mock data"
```

---

### Task 21: Create /api/parts/route.ts

**Files:**
- Create: `app/api/parts/route.ts`

- [ ] **Step 1: Write the API route**

```typescript
// app/api/parts/route.ts
import { NextRequest, NextResponse } from "next/server";

export interface Part {
  name: string;
  price: string;
  condition: string;
  url: string;
  inStock: boolean;
}

export async function GET(req: NextRequest) {
  const component = req.nextUrl.searchParams.get("component");
  const brand = req.nextUrl.searchParams.get("brand");

  if (!component || !brand) {
    return NextResponse.json({ parts: [] });
  }

  // TODO: Wire to MCP server when eBay creds are configured
  // For now, return mock data to prove the integration pattern
  const mockParts: Part[] = [
    {
      name: `${brand.charAt(0).toUpperCase() + brand.slice(1)} ${component.replace(/-/g, " ")} — OEM`,
      price: "$45.99",
      condition: "New",
      url: "#",
      inStock: true,
    },
  ];

  return NextResponse.json({ parts: mockParts });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/parts/route.ts
git commit -m "feat: add /api/parts endpoint with mock data for MCP integration"
```

---

### Task 22: Create RelevantParts component and wire into wizard

**Files:**
- Create: `components/RelevantParts.tsx`
- Modify: `components/DiagnosticWizard.tsx`

- [ ] **Step 1: Write RelevantParts**

```tsx
// components/RelevantParts.tsx
"use client";

interface Part {
  name: string;
  price: string;
  condition: string;
  url: string;
  inStock: boolean;
}

export function RelevantParts({ parts }: { parts: Part[] }) {
  return (
    <div className="mt-6 p-4 bg-surface-container-low rounded-2xl">
      <p className="text-sm font-semibold font-headline mb-3">Available OEM Parts</p>
      <div className="space-y-3">
        {parts.map((part, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-surface rounded-xl">
            <div>
              <p className="text-sm font-medium">{part.name}</p>
              <p className="text-xs text-on-surface-variant">{part.condition} — {part.inStock ? "In Stock" : "Out of Stock"}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">{part.price}</p>
              {part.url !== "#" && (
                <a href={part.url} target="_blank" rel="noopener noreferrer" className="text-xs text-secondary hover:underline">
                  View on eBay
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PartsSkeleton() {
  return (
    <div className="mt-6 p-4 bg-surface-container-low rounded-2xl animate-pulse">
      <div className="h-4 bg-surface-container-highest rounded w-32 mb-3" />
      <div className="h-16 bg-surface-container-highest rounded-xl" />
    </div>
  );
}
```

- [ ] **Step 2: Add parts fetch to DiagnosticWizard**

In `components/DiagnosticWizard.tsx`, add the parts fetch logic to the result step:

```tsx
import { RelevantParts, PartsSkeleton } from "@/components/RelevantParts";
import { BUSINESS } from "@/lib/constants";

// Inside the component, add state:
const [parts, setParts] = useState<any[]>([]);
const [partsLoading, setPartsLoading] = useState(false);

// Add useEffect to fetch when a code is selected:
useEffect(() => {
  if (!selectedCode) return;
  setPartsLoading(true);
  fetch(`/api/parts?component=${encodeURIComponent(selectedCode.components[0])}&brand=${selectedCode.brand}`)
    .then((res) => res.json())
    .then((data) => setParts(data.parts ?? []))
    .catch(() => setParts([]))
    .finally(() => setPartsLoading(false));
}, [selectedCode]);

// In the result JSX, after causes list:
{partsLoading ? <PartsSkeleton /> : parts.length > 0 ? (
  <RelevantParts parts={parts} />
) : (
  <p className="mt-4 text-sm text-on-surface-variant">
    Call <a href={`tel:${BUSINESS.phone}`} className="text-primary hover:underline">{BUSINESS.phone}</a> for parts availability.
  </p>
)}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add components/RelevantParts.tsx components/DiagnosticWizard.tsx
git commit -m "feat: wire MCP parts integration into DiagnosticWizard"
```

---

## Phase 4: SEO Hardening

### Task 23: Add buildMetadata to all pages

**Files:**
- Modify: All page files in `app/` that don't already use `buildMetadata`

- [ ] **Step 1: Add metadata to pages missing it**

For each page, add a static `export const metadata` using `buildMetadata()`:

Example for `app/appliance/page.tsx`:
```tsx
import { buildMetadata } from "@/lib/metadata";
export const metadata = buildMetadata({
  title: "Appliance Repair in Lincoln, NE — Factory-Authorized In-Home Service",
  description: "Factory-authorized in-home appliance repair across 200+ zip codes. Samsung, LG, GE, Electrolux, and more. OEM parts, $42.90 diagnostic, 90-day warranty.",
  path: "/appliance",
  keywords: ["appliance repair Lincoln NE", "Samsung appliance repair", "in-home appliance repair Nebraska"],
});
```

Repeat for: `/tv`, `/audio`, `/commercial`, `/services`, `/service-area`, `/how-it-works`, `/contact`, `/warranty`, `/partners`.

Pages already handled: city landing pages (Task 13), troubleshooting (Task 14), schedule (Task 15), squaretrade (Task 15).

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/
git commit -m "feat: add buildMetadata to all pages for comprehensive SEO"
```

---

### Task 24: Add per-page JSON-LD

**Files:**
- Modify: Service pages (`app/appliance/page.tsx`, `app/tv/page.tsx`, `app/audio/page.tsx`, `app/commercial/page.tsx`)
- Modify: `app/faq/page.tsx`
- Modify: `app/how-it-works/page.tsx`

- [ ] **Step 1: Add Service JSON-LD to service pages**

For each service page, add a `<script type="application/ld+json">` with `Service` and `BreadcrumbList` schema. Example for appliance:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Appliance Repair",
          provider: { "@id": `${BUSINESS.url}/#business` },
          description: "Factory-authorized in-home appliance repair...",
          areaServed: { "@type": "State", name: "Nebraska" },
          serviceType: "Appliance Repair",
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.url },
            { "@type": "ListItem", position: 2, name: "Appliance Repair", item: `${BUSINESS.url}/appliance` },
          ],
        },
      ],
    }),
  }}
/>
```

- [ ] **Step 2: Add FAQPage JSON-LD to FAQ page**

Add `FAQPage` schema to `app/faq/page.tsx` with all Q&A pairs as `mainEntity`.

- [ ] **Step 3: Add HowTo JSON-LD to how-it-works page**

Add `HowTo` schema with the 6 service process steps.

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add app/
git commit -m "feat: add per-page JSON-LD (Service, FAQPage, HowTo, BreadcrumbList)"
```

---

### Task 25: Add AEO summaries and speakable schema

**Files:**
- Modify: Service pages, troubleshooting pages (add `data-speakable` to first paragraph)
- Modify: `components/JsonLd.tsx` (add speakable specification)

- [ ] **Step 1: Add data-speakable to all service page summaries**

Ensure the first `<p>` after each page's `<h1>` has the `data-speakable` attribute and contains a ~40-word summary. Check pages: `/appliance`, `/tv`, `/audio`, `/commercial`, troubleshooting pages.

Example:
```tsx
<p data-speakable className="text-body-lg text-on-surface-variant max-w-2xl mb-8">
  Metro TV & Appliances provides factory-authorized in-home appliance repair across 200+ zip codes in Lincoln, Omaha, and surrounding Nebraska communities. Samsung Established ASC with OEM parts, $42.90 diagnostic fee, and 90-day warranty on all repairs.
</p>
```

- [ ] **Step 2: Add speakable to global JsonLd**

In `components/JsonLd.tsx`, add the `speakable` property to the `LocalBusiness` entry:

```typescript
speakable: {
  "@type": "SpeakableSpecification",
  cssSelector: "[data-speakable]",
},
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/ components/JsonLd.tsx
git commit -m "feat: add AEO summaries with data-speakable and speakable schema"
```

---

### Task 26: Install Playwright and write SEO test suite

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/seo-audit.spec.ts`

- [ ] **Step 1: Install Playwright**

```bash
npm install -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Create playwright.config.ts**

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "iPhone 16 Pro",
      use: {
        viewport: { width: 393, height: 852 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 3: Write seo-audit.spec.ts**

Copy the full test suite from the spec document (lines 534-664 of the design spec). The tests cover:
1. JSON-LD validity (LocalBusiness, Service, FAQPage)
2. ADA compliance (aria-live, 48px touch targets, keyboard nav)
3. Performance (LCP proxy, layout shift)
4. AEO checks (40-word snippets)
5. Critical SEO (unique titles, meta descriptions, canonical URLs)

- [ ] **Step 4: Run tests**

```bash
npx playwright test
```

Expected: All tests pass. If any fail, fix the underlying issue in the page code.

- [ ] **Step 5: Commit**

```bash
git add playwright.config.ts tests/
git commit -m "feat: add Playwright SEO audit suite for iPhone 16 Pro viewport"
```

---

### Task 27: Fix any Playwright test failures

- [ ] **Step 1: Review test output**

If any tests failed in Task 26, fix the issues:
- Missing JSON-LD → add to the page
- Touch targets too small → increase padding
- Missing meta descriptions → add via buildMetadata
- Snippet too short/long → adjust copy

- [ ] **Step 2: Re-run tests until all pass**

```bash
npx playwright test
```

- [ ] **Step 3: Commit fixes**

```bash
git add -A
git commit -m "fix: resolve Playwright SEO test failures"
```

---

### Task 28: Final build verification

- [ ] **Step 1: Clean build**

```bash
rm -rf .next && npm run build
```

Expected: Zero errors, all pages pre-rendered.

- [ ] **Step 2: Run Playwright suite**

```bash
npx playwright test
```

Expected: All tests pass.

- [ ] **Step 3: Check page count**

```bash
ls -la .next/server/app/ | grep -c ".html"
```

Expected: 25+ pages rendered.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: Phase 4 complete — all pages, wizard, MCP, and SEO tests passing"
```

---

## Implementation Status (2026-03-22)

**All 28 tasks complete.** Merged to `main` via fast-forward (26 commits).

| Phase | Tasks | Status |
|-------|-------|--------|
| 1: Core Shell | 1–13 | Done |
| 2: Diagnostic Wizard | 14–19 | Done |
| 3: MCP Inventory | 20–22 | Done (mock data, eBay integration future) |
| 4: SEO Hardening | 23–28 | Done |

**Build:** Clean, all pages pre-rendered (33 static routes).
**Tests:** 10/10 Playwright SEO tests pass (iPhone 16 Pro viewport).

### Post-implementation audit findings

**Critical (must fix before production):**
1. `ScheduleForm` sends `"Appliance Repair (In-Home)"` but `/api/send` Zod expects `"appliance-inhome"` — every submission 400s
2. Personal email hardcoded in `/api/contact/route.ts` — move to env var

**Warnings:**
- Phone/diagnostic fee hardcoded in several places instead of using `BUSINESS` constants
- Inconsistent Facebook `sameAs` URL between `JsonLd.tsx` and `app/page.tsx`
- Duplicate LocalBusiness JSON-LD on homepage (global + page-level)
- `ScheduleForm` labels missing `htmlFor`/`id` (a11y)
- `/api/contact` lacks input validation beyond presence checks
- ~10MB video in git without LFS; duplicate logo files in `public/docs/`
- Homepage and 404 missing explicit metadata exports
- `ScrollReveal` and `RepairQuiz` components unused
