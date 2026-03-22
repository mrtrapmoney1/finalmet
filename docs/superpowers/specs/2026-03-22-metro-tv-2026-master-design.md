# Metro TV 2026 — Master Architecture & Design Spec

## Executive Summary

Refactor metrotv-audiotech.com from a legacy static HTML site into a high-performance Next.js 15 App Router application on Vercel. The project has four sub-projects executed sequentially:

1. **Core Shell** — Complete Next.js migration with all pages, design system, Shadcn/UI
2. **Diagnostic Wizard** — Interactive Samsung/LG error code tool with professionalism pivot
3. **MCP Inventory Stitching** — eBay parts data integrated into diagnostic results
4. **SEO Hardening** — Playwright E2E audit, AEO formatting, per-page generateMetadata + JSON-LD

**Base project**: `/home/aaron/code/met/` (clean Next.js 15 repo, 4 commits, no HTML baggage)
**Content source**: `/home/aaron/code/nmet/` (polished HTML copy from 2 editorial passes)
**Deploy target**: Vercel (Next.js framework mode)
**Design system**: "Technical Artisan" from DESIGN.MD — deep blue/orange palette, Manrope + Inter, glassmorphism, no-line rule

---

## Sub-Project 1: Core Shell

### Goal
Complete the Next.js migration so every page from the static site has a component-based equivalent with identical (or improved) content, proper metadata, and the full design system applied.

### Architecture

```
met/
├── app/
│   ├── layout.tsx                    # Root layout (exists)
│   ├── page.tsx                      # Homepage (exists)
│   ├── globals.css                   # Design tokens (exists)
│   ├── appliance/page.tsx            # (exists)
│   ├── tv/page.tsx                   # (exists)
│   ├── audio/page.tsx                # (exists)
│   ├── commercial/page.tsx           # (exists)
│   ├── contact/page.tsx              # (exists)
│   ├── faq/page.tsx                  # (exists)
│   ├── how-it-works/page.tsx         # (exists, was what-to-expect)
│   ├── partners/page.tsx             # (exists)
│   ├── warranty/page.tsx             # (exists)
│   ├── service-area/page.tsx         # (exists)
│   ├── services/page.tsx             # (exists)
│   ├── schedule/page.tsx             # NEW — dedicated scheduling page
│   ├── troubleshooting/
│   │   ├── page.tsx                  # NEW — troubleshooting hub
│   │   ├── appliances/page.tsx       # NEW — port from nmet HTML
│   │   ├── tv/page.tsx               # NEW — port from nmet HTML
│   │   ├── audio/page.tsx            # NEW — port from nmet HTML
│   │   └── commercial/page.tsx       # NEW — port from nmet HTML
│   ├── appliance-repair-lincoln/page.tsx      # NEW — city landing page
│   ├── appliance-repair-omaha/page.tsx        # NEW — city landing page
│   ├── appliance-repair-bellevue/page.tsx     # NEW — city landing page
│   ├── appliance-repair-council-bluffs/page.tsx # NEW — city landing page
│   ├── appliance-repair-grand-island/page.tsx   # NEW — city landing page
│   ├── appliance-repair-southeast-nebraska/page.tsx # NEW — city landing page
│   ├── squaretrade/page.tsx          # NEW — port from nmet HTML
│   ├── sitemap.ts                    # NEW — dynamic sitemap
│   ├── robots.ts                     # NEW — robots config
│   ├── not-found.tsx                 # NEW — custom 404 page
│   └── api/
│       ├── contact/route.ts          # (exists — simple contact form via Resend)
│       └── send/route.ts             # NEW — ScheduleForm endpoint (see below)
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # (exists)
│   │   ├── Footer.tsx                # (exists)
│   │   └── ContactForm.tsx           # (exists)
│   ├── sections/
│   │   ├── Hero.tsx                  # (exists)
│   │   ├── TrustBar.tsx              # (exists)
│   │   ├── Services.tsx              # (exists)
│   │   ├── Testimonials.tsx          # (exists)
│   │   └── CTA.tsx                   # (exists)
│   ├── ui/
│   │   ├── Button.tsx                # (exists)
│   │   ├── Card.tsx                  # (exists)
│   │   ├── ServiceChip.tsx           # (exists)
│   │   └── ... (Shadcn primitives)   # NEW — via npx shadcn-ui init
│   ├── FaqAccordion.tsx              # NEW — port from nmet
│   ├── ZipChecker.tsx                # NEW — port from nmet
│   ├── ScheduleForm.tsx              # NEW — port from nmet
│   ├── ScrollReveal.tsx              # NEW — port from nmet
│   ├── RepairQuiz.tsx                # NEW — port from nmet
│   ├── JsonLd.tsx                    # NEW — port from nmet (global graph)
│   ├── ServiceAreaMap.tsx            # (exists)
│   ├── DiagnosticWizard.tsx          # Sub-Project 2
│   ├── RelevantParts.tsx             # Sub-Project 3 — client-side parts display
│   └── CityLandingPage.tsx           # NEW — shared template for city pages
├── lib/
│   ├── constants.ts                  # (exists)
│   ├── zip-codes.ts                  # NEW — port from nmet (221 zips)
│   ├── error-codes.ts               # Sub-Project 2
│   └── metadata.ts                   # NEW — shared buildMetadata helper
├── mcp/
│   └── ebay-inventory/               # Sub-Project 3 — MCP server package
│       ├── package.json
│       ├── tsconfig.json
│       ├── src/
│       │   └── index.ts              # stdio MCP server entry point
│       └── .env.example
└── public/                            # MUST BE CREATED — does not exist yet
    ├── docs/                         # Media assets (copy from nmet/docs/)
    ├── favicon.ico                   # Copy from nmet/
    ├── favicon-16x16.png             # Copy from nmet/
    ├── favicon-32x32.png             # Copy from nmet/
    ├── apple-touch-icon.png          # Copy from nmet/
    └── robots.txt                    # Fallback static robots
```

### Pages to Create (not yet in met/)

| Route | Source | Content |
|-------|--------|---------|
| `/schedule` | nmet ScheduleForm | Dedicated scheduling page with full form |
| `/troubleshooting` | New | Hub linking to 4 troubleshooting sub-pages |
| `/troubleshooting/appliances` | nmet HTML | Samsung/LG fault codes, thermal circuit faults, drain issues |
| `/troubleshooting/tv` | nmet HTML | PSU, T-Con, LED driver, A-board diagnostics |
| `/troubleshooting/audio` | nmet HTML | BJT, RIAA, ESR, VTA, azimuth |
| `/troubleshooting/commercial` | nmet HTML | HV circuit, magnetron, mode stirrer, membrane switch |
| `/appliance-repair-lincoln` | nmet HTML | City-specific landing page with local SEO |
| `/appliance-repair-omaha` | nmet HTML | City-specific landing page |
| `/appliance-repair-bellevue` | nmet HTML | City-specific landing page |
| `/appliance-repair-council-bluffs` | nmet HTML | City-specific landing page |
| `/appliance-repair-grand-island` | nmet HTML | City-specific landing page |
| `/appliance-repair-southeast-nebraska` | nmet HTML | City-specific landing page |
| `/squaretrade` | nmet HTML | SquareTrade warranty info |
| `/not-found` | New | Custom 404 page with search and popular links |
| `/sitemap.ts` | nmet | Dynamic XML sitemap for all routes |
| `/robots.ts` | nmet | Robots metadata |

### Components to Port from nmet/

| Component | Purpose | Changes |
|-----------|---------|---------|
| `FaqAccordion.tsx` | Collapsible FAQ sections | Port from nmet. Used for troubleshooting pages and new FAQ sections. The existing `/faq/page.tsx` has its own inline `FAQItem` accordion — replace it with this shared component to eliminate duplication. |
| `ZipChecker.tsx` | Zip code coverage lookup | Port as-is with zip-codes.ts data |
| `ScheduleForm.tsx` | Service request form | Port with Zod validation (install zod — exists in nmet but not met) |
| `ScrollReveal.tsx` | Intersection Observer animations | Port as-is |
| `RepairQuiz.tsx` | Repair-vs-replace calculator | Port as-is |
| `JsonLd.tsx` | Global JSON-LD graph | Port and enhance with per-page schema |

### Shadcn/UI Components to Install

- `accordion` — FAQ pages, troubleshooting expandables
- `dialog` — Professionalism Pivot modal (Sub-Project 2)
- `tabs` — Troubleshooting category tabs
- `select` — ScheduleForm dropdowns
- `input` — Form fields
- `label` — Form labels
- `badge` — Trust badges, service chips
- `separator` — Visual dividers (respecting the "no-line rule" — used sparingly)

### Design System Implementation

The Tailwind config already implements DESIGN.MD tokens. Additional work:

1. **Typography scale**: Add `clamp()` fluid typography in globals.css:
   - `display-lg`: `clamp(2.25rem, 5vw, 3.5rem)`
   - `display-md`: `clamp(1.75rem, 4vw, 2.5rem)`
   - `body-md`: `clamp(0.875rem, 1.5vw, 1rem)`

2. **Touch targets**: Ensure all interactive elements meet 48px minimum (already handled by Button component padding, verify on mobile nav)

3. **Glass & Gradient**: Already implemented in globals.css (`glass`, `glass-dark`, `hero-gradient`, `diagnostic-overlay`)

4. **Ambient shadows**: Already in tailwind.config.ts (`shadow-ambient`, `shadow-ambient-lg`)

### API Endpoint: `/api/send/route.ts`

The ScheduleForm submits to `/api/send`. This endpoint differs from `/api/contact`:

- **`/api/contact`** (existing): Simple contact form — name, email, phone, service type, message. Sends via Resend to `service@metrotv-audiotech.com`.
- **`/api/send`** (new): Full service request form — name, email, phone, **zip code**, service type, **appliance type**, **brand**, detailed issue description. Validates with Zod schema. Sends via Resend with a richer email template that includes all diagnostic context. Used by the `/schedule` page and the DiagnosticWizard's CTA.

```typescript
// Zod schema for /api/send
const scheduleSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  zip: z.string().length(5),
  serviceType: z.enum(["appliance-inhome", "tv-dropoff", "audio-dropoff", "commercial-dropoff", "not-sure"]),
  applianceType: z.string().optional(),
  brand: z.string().optional(),
  issue: z.string().min(10),
});
```

### City Landing Page Template

Six city pages share identical structure. Use a shared `CityLandingPage` component with city-specific props:

```typescript
// components/CityLandingPage.tsx
interface CityPageProps {
  city: string;
  state: string;
  region: string;         // Key into SERVICE_REGIONS
  nearbyAreas: string[];  // "Also serving Bellevue, Papillion, La Vista..."
  localContext: string;    // City-specific paragraph (e.g., "minutes from Gateway Mall")
}
```

Each city's `page.tsx` is a thin wrapper: export `generateMetadata` with city-specific SEO, render `<CityLandingPage>` with props, and add city-scoped JSON-LD (`LocalBusiness` variant with `areaServed` filtered to that city's zips).

**Note on Bellevue**: Bellevue zips fall under the "Omaha" region in `SERVICE_REGIONS`. The Bellevue city page should filter Omaha-region zips that are Bellevue-specific (68005, 68123, 68147) and list "Also serving Papillion, La Vista, and Offutt AFB area."

### Existing Code Fixes (Sub-Project 1)

- **Hero.tsx line 34**: Links to `/what-to-expect` which was renamed to `/how-it-works`. Fix the internal link to point to `/how-it-works` directly — don't rely on the redirect for internal navigation.
- **FAQ page**: Replace the inline `FAQItem` accordion with the shared `FaqAccordion` component to eliminate duplicate accordion implementations.

### Metadata Strategy

Pages **without** dynamic parameters (most of them) use the static `export const metadata: Metadata` pattern with the `buildMetadata()` helper. This is more efficient than `generateMetadata` for static pages. Only pages with dynamic segments (none currently, but future-proofing) need `generateMetadata`. The `buildMetadata()` helper works with both patterns.

### Deployment Configuration

Remove nmet's `vercel.json` approach. The met/ project deploys as a standard Next.js app:
- Framework: Next.js (auto-detected by Vercel)
- No rewrites needed — App Router handles routing
- `next.config.ts`: Add image domains if needed, redirects from old URL patterns

---

## Sub-Project 2: Diagnostic Wizard

### Goal
Build an interactive "Virtual Tech" component that walks users through Samsung and LG error code diagnosis, then pivots to a high-authority modal positioning Metro TV as the professional safety tier.

### Component: `DiagnosticWizard.tsx` (Client Component)

#### State Machine

```
BRAND_SELECT → ERROR_CODE_INPUT → DIAGNOSIS_RESULT → PROFESSIONALISM_MODAL
     ↑                                                        |
     └────────────────── RESTART ─────────────────────────────┘
```

#### Step 1: Brand Selection
User selects Samsung or LG. UI: two large cards with brand logos.

#### Step 2: Error Code Input
**Samsung codes** (primary focus):
| Code | Display Name | Appliance | Cause | Severity |
|------|-------------|-----------|-------|----------|
| 5E (SE) | Drain Error | Washer | Drain pump failure, clogged filter, kinked hose | Medium |
| 8E | Motor Error | Washer | Motor winding fault, hall sensor failure | High |
| 14E | Communication Error | Washer | Wire harness disconnect, control board fault | High |
| 1E | Water Level Sensor | Washer | Pressure switch or air dome tube | Medium |
| 4E | Water Supply Error | Washer, Dishwasher | Inlet valve, low pressure, kinked hose | Medium |
| dE | Door Lock Error | Washer | Door latch interlock, actuator failure | Medium |
| HE | Heater Error | Washer, Dryer | Heating element open circuit, thermistor | High |
| OE | Overflow Error | Washer | Water level exceeded, pressure switch stuck | High |

**LG codes** (light coverage):
| Code | Display Name | Appliance | Cause | Severity |
|------|-------------|-----------|-------|----------|
| OE | Drain Error | Washer, Dishwasher | Drain pump, filter, hose obstruction | Medium |
| LE | Motor Error | Washer | Locked motor, hall sensor, wiring | High |
| FE | Overflow Error | Washer | Water inlet valve stuck open | High |
| dE | Door Error | Washer | Door switch, latch mechanism | Medium |
| IE | Water Inlet Error | Washer, Dishwasher | Water supply, inlet valve | Medium |

UI: Grid of error code buttons styled as diagnostic chips. User taps the code shown on their appliance display.

#### Step 3: Diagnosis Result
Display:
- **Error code name and severity badge**
- **Plain-language explanation** of what the code means
- **Common causes** (bulleted list)
- **DIY safety note** (brief, factual: "Before attempting any repair, unplug the appliance and wait 5 minutes")
- **MCP inventory slot** (Sub-Project 3 integration point — shows relevant OEM parts from eBay store if available)

After a 2-second delay or on scroll, trigger the Professionalism Pivot.

#### Step 4: Professionalism Pivot Modal

A Shadcn `Dialog` that overlays the diagnosis result. This is the critical conversion element.

**Header**: "Reading the Code Is the Easy Part"

**Body** (structured as a contrast table):

| DIY Diagnosis | Professional Execution |
|---------------|----------------------|
| Read an error code from a display | Verify the code against live sensor data |
| Watch a YouTube video | Follow factory service bulletins and TSB updates |
| Order a part that might fix it | Test the failed component (resistance, voltage, continuity) to confirm root cause before ordering |
| Risk voiding manufacturer warranty | Maintain Samsung ASC seal integrity and full warranty coverage |
| No safety training | High-voltage safety protocol, lockout/tagout, PPE |

**Footer**: Two CTAs:
1. **Primary (orange)**: "Schedule Factory-Authorized Repair" → `/schedule`
2. **Ghost**: "I understand the risks — continue reading" → dismisses modal

**12-Point Certification Badge** (below the table):
A compact visual showing Metro TV's qualifications:
1. Samsung Established ASC
2. Factory-trained technicians
3. OEM parts only
4. 90-day parts & labor warranty
5. In-home service (appliances)
6. 200+ zip code coverage
7. $42.90 diagnostic (applied to repair)
8. BBB A+ accredited
9. High-voltage safety certified
10. Lockout/tagout protocol
11. 77+ years continuous operation
12. No subcontractors

### Data Architecture

```typescript
// lib/error-codes.ts
type ApplianceType = "washer" | "dryer" | "refrigerator" | "dishwasher" | "range";

export interface ErrorCode {
  code: string;
  aliases?: string[];       // e.g., "5E" and "SE" are the same
  brand: "samsung" | "lg";
  displayName: string;
  appliances: ApplianceType[];  // Array — some codes apply to multiple appliance types
  severity: "low" | "medium" | "high";
  description: string;      // Plain-language explanation
  causes: string[];          // Common root causes
  components: string[];      // OEM part names for MCP matching
  safetyNote?: string;       // Specific safety warning if high-voltage
}

export const SAMSUNG_CODES: ErrorCode[] = [/* ... */];
export const LG_CODES: ErrorCode[] = [/* ... */];
```

### Accessibility
- `aria-live="polite"` region wrapping the diagnosis result (updates as user progresses)
- All buttons meet 48px touch target
- Modal traps focus, Escape dismisses
- Keyboard navigation through error code grid

---

## Sub-Project 3: MCP Inventory Stitching

### Goal
Design an MCP server pattern that fetches live inventory from the owner's eBay parts store and injects relevant parts into the Diagnostic Wizard results, providing "Information Gain" for Google's algorithms.

### Architecture

```
DiagnosticWizard (client)
    ↓ fetch('/api/parts?component=drain-pump&brand=samsung')
API Route (server)
    ↓ MCP client call
MCP Server (eBay inventory)
    ↓ eBay Finding API / Browse API
eBay Store
    ↑ Returns: part name, price, condition, eBay listing URL, image
```

### API Route: `/api/parts/route.ts`

```typescript
// Server-side only — no eBay credentials exposed to client
export async function GET(req: NextRequest) {
  const component = req.nextUrl.searchParams.get("component");
  const brand = req.nextUrl.searchParams.get("brand");

  // Call MCP server for inventory data
  const parts = await mcpClient.callTool("search-inventory", {
    query: `${brand} ${component} OEM`,
    store: process.env.EBAY_STORE_ID,
    limit: 3,
  });

  return NextResponse.json({ parts });
}
```

### MCP Server Design: `mcp-ebay-inventory`

**Tools exposed:**
1. `search-inventory` — Search eBay store by keyword, return structured part data
2. `get-part-details` — Get specific listing details by eBay item ID
3. `check-availability` — Boolean check if a part is in stock

**Resources exposed:**
1. `inventory://categories` — List of part categories in the store
2. `inventory://recent` — Recently listed parts

**Server implementation**: Node.js stdio MCP server using `@modelcontextprotocol/sdk`. Wraps eBay Browse API v1.

**Environment variables required:**
- `EBAY_APP_ID` — eBay developer app ID
- `EBAY_STORE_ID` — Metro TV's eBay store identifier
- `EBAY_CERT_ID` — eBay developer cert ID

### MCP Server Location

The MCP server lives in `mcp/ebay-inventory/` within the met/ repo (monorepo-style). It is a standalone Node.js package with its own `package.json` and `tsconfig.json`. It communicates via stdio with the API route using `@modelcontextprotocol/sdk/client`.

### Integration with Diagnostic Wizard

Since `DiagnosticWizard.tsx` is a `"use client"` component, it **cannot** render Server Components as children. The parts integration uses a client-side fetch pattern:

```tsx
// Inside DiagnosticWizard.tsx — client component
// When diagnosis result is shown, fetch parts from API route
const [parts, setParts] = useState<Part[]>([]);
const [partsLoading, setPartsLoading] = useState(false);

useEffect(() => {
  if (!selectedCode) return;
  setPartsLoading(true);
  fetch(`/api/parts?component=${selectedCode.components[0]}&brand=${selectedCode.brand}`)
    .then(res => res.json())
    .then(data => setParts(data.parts ?? []))
    .catch(() => setParts([]))  // Graceful degradation
    .finally(() => setPartsLoading(false));
}, [selectedCode]);

// In JSX:
{partsLoading ? <PartsSkeleton /> : parts.length > 0 ? (
  <RelevantParts parts={parts} />
) : (
  <p>Call <a href="tel:(402) 466-9090">(402) 466-9090</a> for parts availability.</p>
)}
```

`RelevantParts` is a simple presentational client component that renders the parts list. No Server Component involvement.

If no parts match or the MCP server / API route is unavailable, the section gracefully degrades to the phone CTA. No error shown to user.

### SEO Information Gain

The stitched inventory data provides unique, real-time content that no competitor has:
- Actual part numbers with prices
- Availability status
- Direct purchase links
- This is "Information Gain" — novel data not available elsewhere for these error codes

---

## Sub-Project 4: SEO Hardening

### Goal
Implement comprehensive SEO infrastructure: per-page `generateMetadata`, per-page JSON-LD, AEO formatting, and a Playwright E2E test suite that guards against regressions.

### 4A: Per-Page generateMetadata

Every page gets a `generateMetadata` export. Shared helper in `lib/metadata.ts`:

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

### 4B: Per-Page JSON-LD

Each page type gets specific schema:

| Page Type | Schema Types |
|-----------|-------------|
| Homepage | `LocalBusiness`, `WebSite`, `OfferCatalog` |
| Service pages (appliance, tv, audio, commercial) | `Service`, `OfferCatalog`, `BreadcrumbList` |
| FAQ | `FAQPage`, `BreadcrumbList` |
| How It Works | `HowTo`, `BreadcrumbList` |
| Contact | `LocalBusiness` (full), `ContactPoint` |
| Service Area | `LocalBusiness` with `areaServed` (all 221 zips) |
| City landing pages | `LocalBusiness` variant scoped to city, `Service` |
| Troubleshooting | `FAQPage` (each Q&A as FAQ item), `HowTo` |
| Diagnostic Wizard | `WebApplication`, `SoftwareApplication` |

Implementation: A `<PageJsonLd>` component that accepts structured props and renders the `<script type="application/ld+json">` tag. Colocated in each page file, not centralized.

### 4C: AEO (Answer Engine Optimization)

Every service page and troubleshooting page must have:

1. **40-word Featured Snippet Summary** — The first paragraph after the H1, formatted as a direct answer to the most likely search query. Example for `/appliance`:
   > "Metro TV & Appliances provides factory-authorized in-home appliance repair across 200+ zip codes in Lincoln, Omaha, and surrounding Nebraska communities. Samsung Established ASC with OEM parts, $42.90 diagnostic fee, and 90-day warranty on all repairs."

2. **Answer-First Formatting** — Every content section leads with the answer, then provides supporting detail. No "In this section, we'll discuss..." preamble.

3. **Structured Headings for Gemini/SGE** — H2s phrased as questions where appropriate:
   - "What Does Samsung Error Code 5E Mean?"
   - "How Much Does Appliance Repair Cost in Lincoln, NE?"
   - "Is It Worth Repairing a 10-Year-Old Refrigerator?"

4. **`speakable` Schema** — Add `speakable` property to LocalBusiness JSON-LD pointing to CSS selector `[data-speakable]`. Every 40-word summary paragraph must have `data-speakable` attribute. Example: `<p data-speakable>Metro TV & Appliances provides...</p>`. The JSON-LD speakable block: `"speakable": { "@type": "SpeakableSpecification", "cssSelector": "[data-speakable]" }`.

### 4D: Playwright E2E SEO Audit

**Test file**: `tests/seo-audit.spec.ts`

**Viewport**: iPhone 16 Pro (393 x 852, deviceScaleFactor: 3)

**Test suite structure:**

```typescript
import { test, expect } from "@playwright/test";

test.describe("SEO Audit — iPhone 16 Pro", () => {

  // Device config is set in playwright.config.ts project — no test.use() override needed

  // 1. JSON-LD Validity
  test("homepage has valid LocalBusiness JSON-LD", async ({ page }) => {
    await page.goto("/");
    const jsonLd = await page.evaluate(() => {
      const script = document.querySelector('script[type="application/ld+json"]');
      return script ? JSON.parse(script.textContent!) : null;
    });
    expect(jsonLd).toBeTruthy();
    // Validate LocalBusiness required fields
    const biz = jsonLd["@graph"]
      ? jsonLd["@graph"].find((n: any) => n["@type"]?.includes?.("LocalBusiness") || n["@type"] === "LocalBusiness")
      : jsonLd;
    expect(biz.name).toBe("Metro TV & Appliances");
    expect(biz.telephone).toContain("402-466-9090");
    expect(biz.address.postalCode).toBe("68505");
  });

  test("service pages have Service JSON-LD", async ({ page }) => {
    for (const slug of ["appliance", "tv", "audio", "commercial"]) {
      await page.goto(`/${slug}`);
      const jsonLd = await page.evaluate(() => {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        return Array.from(scripts).map(s => JSON.parse(s.textContent!));
      });
      const hasService = jsonLd.some((j: any) =>
        JSON.stringify(j).includes("Service")
      );
      expect(hasService).toBe(true);
    }
  });

  test("FAQ page has FAQPage JSON-LD", async ({ page }) => {
    await page.goto("/faq");
    const jsonLd = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      return Array.from(scripts).map(s => JSON.parse(s.textContent!));
    });
    const hasFaq = jsonLd.some((j: any) =>
      JSON.stringify(j).includes("FAQPage")
    );
    expect(hasFaq).toBe(true);
  });

  // 2. ADA Compliance
  test("diagnostic wizard has aria-live region", async ({ page }) => {
    await page.goto("/troubleshooting/appliances");
    const ariaLive = await page.locator("[aria-live]").count();
    expect(ariaLive).toBeGreaterThan(0);
  });

  test("all interactive elements meet 48px touch target", async ({ page }) => {
    await page.goto("/");
    const buttons = await page.locator("button, a[href]").all();
    for (const btn of buttons.slice(0, 20)) { // Sample first 20
      const box = await btn.boundingBox();
      if (box) {
        expect(Math.max(box.width, box.height)).toBeGreaterThanOrEqual(48);
      }
    }
  });

  test("mobile nav is keyboard accessible", async ({ page }) => {
    await page.goto("/");
    const menuBtn = page.locator("button[aria-label='Toggle navigation menu']");
    await menuBtn.click();
    const expanded = await menuBtn.getAttribute("aria-expanded");
    expect(expanded).toBe("true");
  });

  // 3. Performance (LCP proxy — measures time-to-visible for hero, not INP directly)
  test("hero section renders within 3s on mobile", async ({ page }) => {
    const start = Date.now();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.locator("section").first().waitFor({ state: "visible" });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(3000); // Conservative for CI
  });

  test("no layout shift on mobile nav toggle", async ({ page }) => {
    await page.goto("/");
    const mainTop = await page.locator("main").boundingBox();
    const menuBtn = page.locator("button[aria-label='Toggle navigation menu']");
    await menuBtn.click();
    await page.waitForTimeout(300); // Allow animation
    const mainTopAfter = await page.locator("main").boundingBox();
    // Main content should not shift significantly
    expect(Math.abs((mainTopAfter?.y ?? 0) - (mainTop?.y ?? 0))).toBeLessThan(200);
  });

  // 4. AEO Checks
  test("every service page has a 40-word featured snippet", async ({ page }) => {
    for (const slug of ["appliance", "tv", "audio", "commercial"]) {
      await page.goto(`/${slug}`);
      const firstP = await page.locator("main p").first().textContent();
      const wordCount = firstP?.split(/\s+/).length ?? 0;
      expect(wordCount).toBeGreaterThanOrEqual(25);
      expect(wordCount).toBeLessThanOrEqual(60);
    }
  });

  // 5. Critical SEO elements
  test("every page has unique title and meta description", async ({ page }) => {
    const pages = ["/", "/appliance", "/tv", "/audio", "/commercial", "/faq", "/contact"];
    const titles = new Set<string>();
    for (const p of pages) {
      await page.goto(p);
      const title = await page.title();
      expect(titles.has(title)).toBe(false);
      titles.add(title);
      const desc = await page.getAttribute("meta[name='description']", "content");
      expect(desc).toBeTruthy();
      expect(desc!.length).toBeGreaterThan(50);
    }
  });

  test("canonical URLs are set correctly", async ({ page }) => {
    const pages = ["/", "/appliance", "/tv", "/faq"];
    for (const p of pages) {
      await page.goto(p);
      const canonical = await page.getAttribute("link[rel='canonical']", "href");
      expect(canonical).toContain("metrotv-audiotech.com");
    }
  });
});
```

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

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

---

## Cross-Cutting Concerns

### Redirects (old URL → new URL)

The static site used directory-based URLs. Most map 1:1 except:

| Old Path | New Path | Note |
|----------|----------|------|
| `/what-to-expect` | `/how-it-works` | Renamed |
| `/troubleshooting-appliances` | `/troubleshooting/appliances` | Nested |
| `/troubleshooting-tv` | `/troubleshooting/tv` | Nested |
| `/troubleshooting-audio` | `/troubleshooting/audio` | Nested |
| `/troubleshooting-commercial` | `/troubleshooting/commercial` | Nested |

Add permanent redirects in `next.config.ts`:

```typescript
async redirects() {
  return [
    { source: "/what-to-expect", destination: "/how-it-works", permanent: true },
    { source: "/troubleshooting-appliances", destination: "/troubleshooting/appliances", permanent: true },
    { source: "/troubleshooting-tv", destination: "/troubleshooting/tv", permanent: true },
    { source: "/troubleshooting-audio", destination: "/troubleshooting/audio", permanent: true },
    { source: "/troubleshooting-commercial", destination: "/troubleshooting/commercial", permanent: true },
  ];
}
```

### Image Optimization

Move static images from `nmet/docs/` to `met/public/docs/`. Use `next/image` with:
- `priority` on hero images (LCP optimization)
- `sizes` attribute tuned per breakpoint
- WebP/AVIF auto-conversion via Vercel Image Optimization

### Environment Variables

```
RESEND_API_KEY=...           # Already in use for contact form
EBAY_APP_ID=...              # Sub-Project 3 — eBay developer app ID
EBAY_STORE_ID=...            # Sub-Project 3 — Metro TV eBay store ID
EBAY_CERT_ID=...             # Sub-Project 3 — eBay developer cert ID (for OAuth)
EBAY_SANDBOX=true            # Sub-Project 3 — use eBay Sandbox in dev, set false for prod
NEXT_PUBLIC_GOOGLE_MAPS_KEY=...  # ServiceAreaMap
```

### Error Handling

- API routes return structured `{ success: boolean, error?: string }` responses
- Client forms show inline error messages (no alert/confirm dialogs)
- MCP server failures degrade gracefully (hide parts section, show fallback CTA)
- 404 page: Custom `app/not-found.tsx` with search and popular links

### Performance Budget

- LCP < 2.5s on mobile (hero section with priority image)
- INP < 200ms (all interactions, especially Diagnostic Wizard step transitions)
- CLS < 0.1 (no layout shifts from async content)
- Total JS bundle < 100KB gzipped (first load)

---

## Implementation Order

### Sub-Project 1: Core Shell (estimated: largest chunk of work)
1. Create `public/` directory, copy favicon + media assets from nmet/
2. Install Shadcn/UI and Zod into met/ (`npm install zod && npx shadcn-ui@latest init`)
3. Port utility components (FaqAccordion, ZipChecker, ScheduleForm, ScrollReveal, RepairQuiz, JsonLd)
4. Port zip-codes.ts data
5. Create lib/metadata.ts `buildMetadata()` helper
6. Fix Hero.tsx `/what-to-expect` link → `/how-it-works`
7. Replace inline FAQ accordion with shared FaqAccordion component
8. Create CityLandingPage.tsx shared template
9. Create missing pages (troubleshooting/*, city landing pages, squaretrade, schedule, not-found)
10. Create `/api/send/route.ts` with Zod validation
11. Add sitemap.ts and robots.ts
12. Add redirects in next.config.ts
13. Add fluid typography to globals.css
14. Verify all pages render and `next build` succeeds

### Sub-Project 2: Diagnostic Wizard
1. Create lib/error-codes.ts with Samsung and LG code data
2. Build DiagnosticWizard.tsx client component with state machine
3. Build ProfessionalismPivot dialog component
4. Integrate into /troubleshooting/appliances page
5. Add aria-live regions and keyboard navigation

### Sub-Project 3: MCP Inventory Stitching
1. Create `mcp/ebay-inventory/` package with package.json, tsconfig, .env.example
2. Build MCP server entry point (`src/index.ts`) with tool stubs
3. Create `/api/parts/route.ts` API endpoint
4. Create `RelevantParts.tsx` client component (presentational)
5. Wire fetch + RelevantParts into DiagnosticWizard result step
6. Add EBAY_SANDBOX env var handling for dev vs prod

### Sub-Project 4: SEO Hardening
1. Add `buildMetadata()` calls to every page (static export for non-dynamic pages)
2. Add per-page JSON-LD components
3. Write 40-word AEO summaries for all service pages
4. Add speakable schema
5. Install Playwright, configure for iPhone 16 Pro
6. Write and run seo-audit.spec.ts
7. Fix any failures

---

## Success Criteria

- [ ] All 25+ pages render with correct content and metadata
- [ ] `next build` succeeds with zero errors
- [ ] Diagnostic Wizard completes full flow (brand → code → result → modal)
- [ ] MCP server pattern is functional (mock data OK if no eBay creds yet)
- [ ] All Playwright SEO tests pass
- [ ] Lighthouse mobile score > 90 for Performance, Accessibility, SEO
- [ ] No copy regressions from the 2 editorial passes documented in nmet/CLAUDE.md
- [ ] All redirects from old URL patterns work correctly
