# Metro TV & Appliances — UI Rebuild Plan
_Generated 2026-03-31_

## Superpowers, Subagents & MCPs Engaged

| Tool | Role |
|---|---|
| **MCP: playwright** | Screenshot every page before and after each fix for visual diff verification |
| **MCP: context7 (`/vercel/next.js`)** | Next.js Script component, font loading, Image component docs |
| **Subagent A** — Foundation | Font fix, Header (cart CTA, Services dropdown), globals.css animations |
| **Subagent B** — Homepage | Hero animations, TrustBar, Services section, ProductsCarousel (new), ZipChecker hook, compact spacing |
| **Subagent C** — Service Area | Hardcoded SVG/HTML Nebraska map, remove Google Maps dependency |
| **Subagent D** — FAQ + Interior Pages | Compact FAQ, how-it-works, warranty density |
| **Subagent E** — Products | Brand-icon cards, searchParams filter wiring, detail page image |
| **Playwright verify pass** | Final screenshots of all 6 key pages |

---

## Confirmed Issues (Playwright + Audit)

| # | Issue | Root Cause |
|---|---|---|
| F1 | Icons show as raw text (`home_repair_service`, `shopping_cart`) | `onLoad="this.media='all'"` is a string in JSX — React ignores it; font stays `media="print"` forever |
| F2 | "Schedule Service" button in header — should be Cart | Header CTA points to `/contact`, user wants Cart prominence |
| F3 | No Services dropdown — flat nav only | `NAV_LINKS` has no dropdown config; Header has no flyout logic |
| F4 | Homepage too sparse, low interactivity, too much whitespace | Large `py-24`/`py-16` gaps, no scroll animations, no sticky engagement hook |
| F5 | No products carousel on homepage | Component doesn't exist |
| F6 | Products page: all cards show grey `build` placeholder | `part.image_link` never rendered; no category-specific icons |
| F7 | Service area map: "Oops! Something went wrong" | Google Maps API key not set; no fallback |
| F8 | FAQ and interior pages: too much whitespace | Large padding, single-column layout, sparse content density |
| F9 | Services page: icon names as text | Consequence of F1 |

---

## Animation Classes (defined in globals.css by Agent A)

Agent B and others must use **exactly these class names**:

```css
/* In globals.css — added by Agent A */
.fade-up          /* translateY(24px) → 0, opacity 0→1, 0.5s ease-out */
.fade-in          /* opacity 0→1, 0.4s ease-out */
.slide-left       /* translateX(-20px)→0, opacity 0→1 */
[data-reveal]     /* starts hidden; JS adds .revealed class via IntersectionObserver */
.revealed         /* triggers the animation */
```

Client component `components/ScrollReveal.tsx` wraps children with IntersectionObserver and adds `.revealed`.

---

## File Ownership (no conflicts between agents)

### Agent A
- `app/layout.tsx`
- `components/layout/Header.tsx`
- `app/globals.css`
- `lib/constants.ts`
- `components/ScrollReveal.tsx` (NEW)

### Agent B
- `app/page.tsx`
- `components/sections/Hero.tsx`
- `components/sections/TrustBar.tsx`
- `components/sections/Services.tsx`
- `components/sections/CTA.tsx`
- `components/sections/ProductsCarousel.tsx` (NEW)

### Agent C
- `app/service-area/page.tsx`
- `components/NebraskaMap.tsx` (NEW — replaces ServiceAreaMap usage on this page)

### Agent D
- `app/faq/page.tsx`
- `components/FaqAccordion.tsx`
- `app/how-it-works/page.tsx`

### Agent E
- `app/products/page.tsx`
- `app/products/[slug]/page.tsx`

---

## Design Directives

**Spacing**: `py-24` → `py-12`, `pt-16 pb-12` → `pt-8 pb-6`, section gaps cut by ~40%
**Typography**: All section headings `text-center` on homepage. Interior pages left-aligned.
**Homepage tone**: Concise — max 1 sentence per section subheading, metrics over prose
**Interior pages**: Information-dense, straight to the point, no padding filler copy
**Cart CTA**: Header primary action is the Cart button (opens CartDrawer). "Schedule Service" moved to `/schedule` link inside the mobile menu only.
**Dropdown**: Hover flyout on "Services" nav item showing 4 service tiles with icon + title + delivery model

---

## Nebraska Map Spec (Agent C)

Pure SVG — no external dependencies. Nebraska bounding box SVG with:
- State outline path (simplified rectangle with panhandle)
- 6 colored region circles positioned geographically
- Labels: city name + zip count
- Hover: region card pops with description + zip sample
- Responsive: scales with viewBox

Region approximate SVG coordinates (viewBox="0 0 500 280"):
- Grand Island: cx=220, cy=140
- Lincoln: cx=370, cy=185
- Omaha: cx=450, cy=155
- Council Bluffs: cx=470, cy=165 (Iowa, slightly offset)
- Southeast Nebraska: cx=390, cy=220
- North Omaha Suburbs: cx=445, cy=120

---

## Definition of Done

Playwright must confirm:
1. `/` — animations play, carousel visible, no whitespace waste, cart in header
2. `/services` — icons render (not text), dropdown opens on hover
3. `/service-area` — SVG map renders, no Google Maps error
4. `/products` — brand-icon cards, filter works
5. `/faq` — compact two-column layout, all Q&A readable
6. `/how-it-works` — dense, no excessive padding
