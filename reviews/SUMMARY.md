# METROTV rebuild — cross-site review & conclusions

Reviewed two existing builds of the same business (Metro TV & Appliances, Lincoln NE) with
Playwright at desktop (1280) and mobile (390), reveal-animations forced on for accurate capture.

- **met** (`/home/aaron/code/met`, Next 16, Tailwind+shadcn) — the newer, more polished fork.
  Details: [`met/01-homepage.md`](met/01-homepage.md), [`met/02-interior-pages.md`](met/02-interior-pages.md)
- **nmet** (`/home/aaron/code/nmet`, Next 15) — the predecessor, denser but fewer features.
  Details: [`nmet/01-review.md`](nmet/01-review.md)
- Screenshots: [`_screens/met/`](_screens/met), [`_screens/nmet/`](_screens/nmet)

> Note: review only — no source files in met/ or nmet/ were modified. Both share one component
> lineage, so findings on the homepage / services / contact / city / products templates generalize
> to the remaining routes that reuse them.

---

## Bottom line
The two sites are the **same design language** (Manrope display / Inter body, navy `#1c3f9x`-ish
`primary` + orange `#fe6431` accent, identical service-card grid). They split cleanly:

| | met | nmet |
|---|---|---|
| Front-page **drama / polish** | ✅ bigger hero (108px, full-screen video), more breathing room | smaller 72px hero, flatter |
| Front-page **info density** | ❌ sparse; empty hero-right; large empty bands | ✅ hero has copy + `$42.90` price card; stats above fold; filled reputation cards |
| **Mobile economy** | dead bands from scroll-reveal; faint hamburger | ✅ tight, no dead space, visible hamburger |
| **Features** | ✅ Parts Store, cart, legal pages, nested troubleshooting | none of these |
| **Contact** | ✅ real labeled 5-field form | ❌ no form; **broken Google Map** (invalid API key); ✅ nice info card |
| **Readability (contrast)** | ❌ systemic low-alpha text | ❌ same |
| **Imagery** | ❌ zero photos | ❌ zero photos |

**Strategy for the rebuild:** take **met's visual system + architecture** as the base, and fold in
**nmet's homepage density** (hero copy + price card, stats above the fold, filled sections) and
nmet's **contact info card**. Then fix the readability problems that both inherit.

---

## Priority 1 — Readability (the user's stated #1 priority)
Both sites are weakest exactly where the user cares most. Fix order:

### 1a. Stop expressing text color as opacity of the foreground
Systemic anti-pattern — body and label text set with `/35`–`/60` alpha on dark sections, which
**fails WCAG AA (4.5:1)**. Worst offenders (exact code):
```
met/components/sections/Hero.tsx:51   text-white/60   (hero sub-headline, 18–24px)
met/components/sections/Hero.tsx:90   text-white/35   (trust badges — effectively invisible)
met/components/sections/StatsSection.tsx:36 (x4)  text-white/45   (stat labels)
met/components/sections/StatsSection.tsx:77  text-white/55   (section body copy)
met/components/sections/Testimonials.tsx:62  text-white/55
met/components/layout/Footer.tsx:16,32,51,71,74  text-inverse-on-surface/60
met/components/CityLandingPage.tsx:75,90  text-white/60   (city pages → 35 low-alpha nodes/page)
```
nmet homepage shows the same: 36 low-alpha text nodes. **Rule for the rebuild:** body text on dark
≥ a solid token at full opacity (target ≥ `white/85` equivalent); reserve `/50–/60` for purely
decorative labels. In `standards/tokens.css`, `--color-text-muted` must resolve to a real
AA-passing color, **never** `color: rgba(foreground, .55)`.

### 1b. Raise the minimum font size
`minFontPx` bottomed at **9–10px** (met brand marquee, eyebrow labels) and 12px elsewhere; 19–27% of
text nodes are <14px. Floor **real text at 12px** (`--fs-xs: 0.75rem`) and **body at 16px**
(`--fs-base`). 10px uppercase mono is acceptable only for genuinely decorative eyebrows, never for
content.

### 1c. Don't gate content behind JS reveal with `opacity:0` default
`met/components/ScrollReveal.tsx` defaults content to `opacity:0` until an IntersectionObserver adds
`.revealed`. Confirmed live: at scroll-top the StatsSection heading was `opacity:0`. With no JS / no
observer / print / crawlers, whole sections are invisible (see `_screens/met/home-desktop.jpeg`
pre-reveal — bands render empty). And `AnimatedCounter` shows **"0+"** until it animates.
**Fix:** progressive enhancement — default `opacity:1`, reveal only when JS + motion are available;
honor `prefers-reduced-motion` (already a concern flagged in `standards/tokens.css`); SSR the final
counter value.

## Priority 2 — "Easy to look at" (visual)
- **Keep met's typographic hero** — fluid `clamp(2rem, 8.5vw, 7.5rem)` headline, SparkMark eyebrow
  motif, numbered section labels (`01 — OUR SERVICES`), generous `py-14 md:py-20 lg:py-28` rhythm.
- **But adopt nmet's density**: put body copy + the `$42.90` price card in the hero (fill met's empty
  hero-right), pull the stat band above the fold, and ensure every colored band has content (met's
  empty navy/`TRUST` bands only look intentional once revealed — make them robust).
- **Add real imagery.** Both sites have **zero photographs** (`numImg: 0` everywhere). A repair
  business needs trust-building photos (techs, shop, real parts). This is the biggest pure-visual gap
  and the fastest credibility win. `standards/tokens.css` already ships `--radius`/`--shadow` tokens
  for media cards.

## Priority 3 — Mobile
- Tap targets: ~20 interactive elements <40px tall at 390px on both (nav + footer links). Enforce
  **≥44px** hit area.
- met's mobile hamburger is visually faint — give the toggle a clear affordance (nmet's is better).
- No horizontal overflow on either site at any breakpoint — keep that.

## Priority 4 — Features / content (correctness)
- **Fix or replace the contact experience.** Merge met's working **form** + nmet's **info card**
  (Address/Phone/Fax/Hours/Get Directions). If a map is used, fix the API key — nmet currently
  renders `"Google Maps Platform rejected your request. The provided API key is invalid."` Prefer a
  static map image to avoid key/JS fragility.
- **Populate the Parts Store.** met's `/products` shows **one** product across 5 brand filters and
  **no product images** (`met/lib/parts.ts` is near-empty). Either populate with images or de-scope.
- **FAQ accordions need semantics.** met's FAQ toggles expose no `<details>` / `aria-expanded`
  (0 found) — rebuild with native `<details>` or `button[aria-expanded]` for keyboard/SR support.

---

## Rebuild blueprint (best-of-both, mapped to `standards/tokens.css`)
1. **Foundation:** met's Next app structure + `components/sections/*` split. Drive *all* color,
   type, spacing, radius, motion from `standards/tokens.css` semantic tokens — no hardcoded values,
   no opacity-as-color.
2. **Homepage:** met hero shell (drama) + nmet hero content (copy + price card) → stats above fold →
   services grid → reputation (filled) → real photo section → CTA. Every band content-complete at
   `opacity:1`.
3. **Contact:** met form + nmet info card + static map.
4. **Readability pass everywhere:** AA-contrast body text, 16px body / 12px floor, reveal as
   enhancement only.
5. **Add photography** and **populate or cut** the Parts Store.

## Coverage / honesty
Sampled live: met `/`, `/services`, `/contact`, `/appliance-repair-lincoln`, `/products`, `/faq`
(desktop+mobile on homepage); nmet `/`, `/contact` (desktop+mobile on homepage). Remaining routes
reuse these shared templates. If you want literal screenshots of every one of the ~30 routes per
site captured to `_screens/`, say so and I'll run the full sweep.
