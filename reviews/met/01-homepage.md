# met — Homepage (`/`) review

Server: `http://localhost:3001/` · Next 16 · Tailwind + shadcn/base-ui
Source: `met/app/page.tsx` → sections in `met/components/sections/*`
Screens: `reviews/_screens/met/home-desktop-revealed.jpeg`, `home-mobile.jpeg`, `home-desktop.jpeg` (pre-reveal)

## Verdict
The strongest front page of the two. Confident editorial identity: oversized Manrope headline,
disciplined navy (`primary`) + orange (`secondary-container`) palette, consistent `SparkMark`
eyebrow motif, numbered section labels (`01 — OUR SERVICES`), full-bleed video hero. It reads
like a designed brand, not a template. Keep this as the visual foundation for the rebuild.
The problems are **readability/contrast** and **robustness of the reveal system**, not aesthetics.

---

## Issue 1 — Body/auxiliary text is systematically set at low opacity (contrast fails)
This is the single biggest readability problem and it is **systemic** (shared components, so it
repeats on every page).

Measured on the hero (white text on the navy `primary-container` video bg):
- Sub-headline: `text-white/60` → ~3.6:1, **fails WCAG AA (4.5:1)** for 18–24px text near the line.
- Trust badges: `text-white/35` → effectively invisible (~2:1).
- Stat labels: `text-white/45`.
- Long body paragraphs: `text-white/55`.

Exact code:
```tsx
// met/components/sections/Hero.tsx:51
className="text-lg md:text-2xl font-semibold font-headline text-white/60 mb-8 fade-up"   // "Factory-Authorized Repair in Nebraska"

// met/components/sections/Hero.tsx:90
className="flex items-center gap-2 text-xs text-white/35 font-medium tracking-wide"      // trust badges — far too faint

// met/components/sections/StatsSection.tsx:36 (repeated x4)
className="text-sm text-white/45 font-medium tracking-wide"                              // "Year Founded", "Zip Codes Covered"...

// met/components/sections/StatsSection.tsx:77
className="text-white/55 text-body-lg leading-relaxed mb-7 md:mb-10"                     // section body copy
```
Same `*/55`–`/60` pattern recurs in `components/sections/Testimonials.tsx:62`,
`components/layout/Footer.tsx:16,32,51,71,74`, `components/CityLandingPage.tsx:75,90`.

**Fix direction:** body copy on dark should be ≥ `white/80` (ideally a solid token like
`on-primary` at full opacity); reserve `/50–/60` for genuinely decorative labels only.
Maps to `standards/tokens.css` → `--color-text-muted` should resolve to a real AA-passing color,
never an opacity of the foreground.

## Issue 2 — Type scale bottoms out at 9–10px
`browser_evaluate` reported `minFontPx: 9` on both desktop and mobile.
- Eyebrow labels: `text-[10px] font-mono` — e.g. `Hero.tsx:39`, `page.tsx:50`.
- Brand marquee names render at 9–10px (`TrustBar.tsx`).
- Service-card body copy and chips are 14px (`text-sm`) and chip labels are `text-[10px]`
  (`components/sections/Services.tsx:86`).

10px mono uppercase is legible-ish as a label on desktop but is below comfortable reading size on
mobile and for low-vision users. **Fix direction:** floor real text at 12px, body at 16px.
Tie to `standards/tokens.css` `--fs-xs: 0.75rem` (12) as the hard minimum.

## Issue 3 — Content is gated behind JS scroll-reveal and defaults to `opacity:0`
`met/components/ScrollReveal.tsx` adds a `.revealed` class via `IntersectionObserver`; the initial
CSS state is `opacity:0` + `translate`. Confirmed live: at scroll-top the StatsSection heading was
`opacity: 0, transform: translateX(-20px)` (`StatsSection.tsx:74`). Consequences:
- With JS disabled / observer not firing, whole sections stay invisible (the full-page screenshot
  `home-desktop.jpeg` shows the navy + dark bands rendering **empty**).
- SEO/crawlers and print get hidden content.
- `prefers-reduced-motion` users still hit the opacity transition unless globals handles it.

**Fix direction:** reveal should be progressive enhancement — default `opacity:1`, animate only when
JS+motion are available (add `.revealed` immediately if `prefers-reduced-motion`, and gate the
hidden start state behind a `js`/`no-js` class).

## Issue 4 — `AnimatedCounter` shows "0+" until animation runs
`StatsSection.tsx` stats use `<AnimatedCounter target={200} />`. In the forced-reveal capture the
counters read **"0+" Zip Codes Covered / "0+" Years in Service** because the count-up hadn't run.
A user who scrolls quickly, or any non-JS/SSR render, sees `0+`. **Fix:** render the final value as
the SSR/no-JS baseline and animate from it, not from 0-with-suffix.

## Issue 5 — Mobile tap targets below 44px
Header + footer nav links measured 17px tall at 390px wide (`smallTapTargets` from evaluate):
`Services`, `Service Area`, `FAQ`, footer column links. WCAG 2.5.8 / mobile usability wants ≥44px.
The mobile "Toggle navigation menu" button exists but is visually faint (I could not spot it in the
screenshot) — low affordance.

## What to KEEP from this page (for the rebuild)
- The oversized fluid headline: `clamp(2rem, 8.5vw, 7.5rem)` (`Hero.tsx:46`) — excellent, responsive.
- Navy + orange brand discipline and the `SparkMark` eyebrow system.
- Numbered section labels (`01 — OUR SERVICES`) and the editorial section rhythm.
- The component-per-section architecture (`components/sections/*`) — clean and reusable.
- Generous vertical spacing (`py-14 md:py-20 lg:py-28`) — this is the "easy to look at" quality;
  preserve it, just fill the contrast gaps.
