# Metro TV & Appliances — Project Bible

> The canonical governing document for this build. Everything here is a commitment, not a
> suggestion. When code and this file disagree, this file wins or the file gets updated —
> never silent drift. Front-end only (no backend, no DB). Built distinctive, risk-averse,
> and long-horizon.
>
> Sources of truth this bible sits on top of: `standards/company-facts.md` (hard facts),
> `standards/customer-strategy.md` (positioning + roadmap), `lib/business.ts` (the data
> components consume), `standards/tokens.css` (visual values). Invent nothing not traceable
> to those.

---

## 0. PROJECT FACTS

- **Name / brand:** Metro TV & Appliances (alt. listing: *Metro TV/Audiotech and Appliance Services*).
  This is the real, verifiable 77-year brand — not a placeholder, not renamed.
- **What it does:** Factory-authorized appliance, TV, audio, and commercial-microwave **repair** in
  Lincoln, NE — root-cause, board-level diagnostics with OEM parts. Samsung Established Authorized
  Service Center; serving Nebraska & western Iowa since **1947**.
- **Audience & the 5-second feeling:** Homeowners and businesses who don't want to gamble on a repair
  bill. In five seconds: *"These people actually know the inside of the machine — calibrated, factory-
  authorized, been doing it since 1947. I trust them."* Competence you can feel, not hype.
- **Routes:** `/` · `/services` + `/appliance` `/tv` `/commercial` `/audio` · `/home-warranty`
  · `/service-area` · `/how-it-works` · `/faq` · `/contact` · `/privacy-policy` · `/cookie-policy`
  · `not-found` (404) · global `error` (500). B2B variants (TV-for-business, commercial-restaurant,
  audio-wait) are roadmap, not launch (see §6 / customer-strategy phases).
- **Content source — use ONLY this:** `standards/company-facts.md`, `standards/customer-strategy.md`,
  `lib/business.ts`. No fabricated testimonials, team bios, stats, logos, or photos — those must come
  from the owner (flagged as the brand's credibility gap).
- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript. Styling via **plain CSS Modules
  consuming `standards/tokens.css`** — no Tailwind, no UI kit, no component library, no AI-slop starter
  theme. Zero runtime deps beyond `next`/`react`.
- **Deploy target:** Vercel (static-leaning; client/edge-side only — no server or DB assumed).

---

## 1. AESTHETIC ANCHOR — "Broadcast Service-Bench"

**One named reference, committed:** Tektronix / HP test-instrument manuals + Dieter Rams–era Braun
precision, carrying a broadcast-control-room **red signal**. The site feels like a calibrated
instrument that happens to be loud exactly where it counts.

- **Why it's one-of-one:** it *is* the business — root-cause, board-level diagnostics since 1947.
  Graticule grids, measured layouts, and real readouts (fault codes, voltages, model numbers as
  monospace instrument text) can't be faked by a competitor or reproduced by a template.
- **Discipline:** broadcast red is **signal, not decoration**. Precision first; loudness reserved for
  headlines, the period accent, dividers, and CTAs.

---

## 2. TYPOGRAPHY — self-hosted (deliberate reversal of the old system-only ban)

The predecessor banned web fonts. This build adopts **self-hosted** faces (subset, `font-display:swap`,
preload the critical face; no Google CDN — privacy + performance intact):

- **Display + body:** **Archivo** (variable, OFL). Extreme weight contrast — 200 vs 900 — and 3×+ size
  jumps for hierarchy. One decisive voice.
- **Technical annotations:** **IBM Plex Mono** (OFL) — readouts, fault codes, voltages, model numbers,
  captions. The "instrument" voice.
- No third face. Display family + one mono accent only.

*Decision record:* self-hosted chosen because the Broadcast Service-Bench look needs a distinctive
display voice; if a strict system-only constraint is reinstated later, get distinctiveness from
weight/size/color/layout and delete the typeface lines — do not add a Google CDN link.

---

## 3. COLOR — light default, dark first-class

- **Ink on warm studio paper** in light (clean studio white — no red wash); inverted in dark.
- **Accent 1 — Broadcast red `#DE1F27`** (`--color-accent`/`--color-accent-bright`): signal only —
  display periods, dividers, button fills, large text. **Small red text uses `--color-accent-text`**
  (raw brand red fails AA at body sizes). Glow effects are **dark-mode only** via `--glow-*` tokens.
- **Accent 2 — Instrument amber:** used sparingly for "live/measured" cues and graticule highlights.
- One dominant color + two sharp accents, all via tokens. Never a timid evenly-spread palette.

---

## 4. MOTION — one orchestrated reveal

A single **"power-on / signal-sweep" page-load reveal** with staggered delays (an instrument warming
up), CSS-first. `prefers-reduced-motion` collapses durations to ~1ms via `--action-duration`/`--dur-*`.
**Content is visible by default** — the hide-then-reveal applies only under `html.js`; no-JS,
reduced-motion, and crawlers always see `opacity:1`. Non-negotiable. The reading-progress bar and
scroll-reveal layer follow the same rule (static, accessible fallback always present).

---

## 5. LAYOUT — break the hero→3-cards→footer template ≥2×

- **Hero:** asymmetric — oversized uppercase headline left, an **instrument readout panel** right
  (stats as gauges/readouts, not a centered 4-up), graticule background.
- **Stats as VU-meter / readout gauges**, not a card strip.
- **How It Works as a pinned diagnostic sequence** — the 6 repair steps as an instrument walkthrough.
- **Services index as a spec-sheet table**, not four generic cards.

---

## 6. ROUTES, COMPONENTS & ROADMAP

- **Launch routes:** as listed in §0.
- **Component model:** homepage composes section components (`Hero`, `Stats`, `ServicesGrid`,
  `ScrollStory`, `Brands`, `WarrantyTeaser`, `CTA`), each with a co-located `*.module.css`. Service
  detail routes render through one shared `ServiceDetail` component fed by `SERVICES`. Primitives in
  `components/ui/` (`Button`, `Icon` inline-SVG, `ThemeToggle`, `CountUp`). `Placeholder` survives only
  as a stub/`not-found` fallback so nav never dead-ends.
- **Roadmap (customer-strategy phases, post-launch):** Phase 1 home-warranty homeowner page (priority
  segment) → Phase 2 TV split by audience (consumer + restaurants/bars/gyms) → Phase 3 commercial
  microwave for restaurant operators → Phase 4 audio niche/expertise page stating the 1–3 month wait
  plainly.

---

## 7. DESIGN-TOKEN SYSTEM (durability backbone)

- `standards/tokens.css` is the single source of truth: color, type scale, spacing, radii, shadows,
  motion, breakpoints — as CSS custom properties, **primitive (`--c-*`, `--fs-*`, `--sp-*`, …) →
  semantic (`--color-*`, `--gradient-*`, `--space-*`, …)** tiers. Components consume **semantic tokens
  only**. Never hardcode a raw color/size/duration in a component.
- Adding a value: primitive → semantic → consume the semantic. New theme-sensitive values are semantic
  tokens with a dark override so they flip correctly.
- **Theme:** light default in `:root`, dark override under `html[data-theme="dark"]`. Persisted to
  `localStorage`; an inline script in `app/layout.tsx` applies `data-theme` (default `light`) **before
  paint** (no flash) and adds `class="js"`. `<html>` carries `suppressHydrationWarning`. No
  `prefers-color-scheme`-driven theming. CSS-Modules gotcha: global hooks (`html.js`,
  `html[data-theme="dark"]`) must be wrapped in `:global(...)`.

---

## 8. FOUNDATIONAL SYSTEMS (all required — the risk-averse, long-term part)

**A. Analytics (GA4).** Loaded via Next's `<Script>` (`afterInteractive`) off `NEXT_PUBLIC_GA_ID` —
never inline-hardcoded, never in dev. **Does not fire until consent is granted.** Consent Mode v2
defaults to "denied," upgraded on accept. SPA route changes tracked as `page_view`. A small typed event
helper covers CTA/form/outbound clicks.

**B. Privacy & consent.** Cookie-consent banner (accept / reject / preferences) with granular
categories that **gates GA4**. Choice persisted; changeable later. Real `/privacy-policy` and
`/cookie-policy` pages. GDPR/CCPA-safe by default — no tracking pre-consent.

**C. SEO & structured data.** Per-route title/description from a central config; title template
(`%s | Metro TV & Appliances`); canonical URLs; `metadataBase` from `BUSINESS.url`. OpenGraph + Twitter
cards + an OG image. Generated `robots.txt` + `sitemap.xml`. JSON-LD (`LocalBusiness` +
`HomeAndConstructionBusiness`, per-page types) built entirely from `BUSINESS` facts in `layout.tsx` —
**no duplicated NAP strings in components.** Semantic HTML: one `h1`/route, logical heading order,
landmarks, descriptive links.

**D. Performance & Core Web Vitals.** Budgets: LCP < 2.5s, CLS < 0.1, INP < 200ms; **Lighthouse ≥ 95**
across all four categories on the built site (report the numbers). Responsive images in modern formats
with width/height to prevent CLS, lazy below the fold; self-hosted fonts with `font-display:swap` +
preload of the critical face; minimal/zero JS where static suffices.

**E. Accessibility (WCAG 2.2 AA).** All text AA-contrast verified per use — **never opacity-as-color,
never sub-12px real text** (16px body / 12px floor). Content visible without JS and under reduced
motion. Global `:focus-visible` outline (`--color-focus`) everywhere, never removed. Full keyboard
operability, labeled forms, alt text, aria only where semantics fall short, skip-to-content link.

**F. Error handling & observability.** Custom on-brand 404 + 500, never dead-ends; error boundary
around the app. A pluggable error/perf hook (Sentry-ready or no-op shim behind an env var) so
monitoring switches on without a refactor. Forms degrade gracefully — `ContactForm` POSTs to Web3Forms
when `NEXT_PUBLIC_WEB3FORMS_KEY` is set, falls back to a `mailto:` draft with no key, and surfaces
phone + email on network failure. No npm SDK (keeps zero-runtime-deps).

---

## 9. READABILITY AUDIT (run on every self-verification)

Fail the slice if ANY are true: real text below 12px; text color set as an opacity of the foreground;
meaningful content stuck at `opacity:0` (JS-gated); contrast below AA; focus outline missing; console
errors present; layout shifts on load.

---

## 10. CONTENT RULES

- Facts only from `standards/` + `lib/business.ts`. Invent nothing — no fake testimonials, stats,
  team, or logos; no reuse of the reference repos' placeholder content as if real.
- **No definitive liability/guarantee statements.** Advertising softeners ("can help", "designed to",
  "typically", "may"). Coverage/approvals belong to the warranty provider — keep the provider-
  disclaimer pattern. Keep the "since 1947" lineage; don't introduce alternate founding dates.
- Copy is bold and benefit-led: short lines, UPPERCASE display headlines, the red-period accent
  (`<span className="dot">.</span>`).

---

## 11. WORKFLOW (how the build runs)

1. Plan-first: a route gets a short plan before code. No scaffolding ahead of an approved plan.
2. Build in vertical slices — one route fully done (markup, styles, responsive, a11y) before the next.
   Independent routes may fan out via a dynamic workflow once the token + component system is set.
3. **Self-verify every slice with Playwright before calling it done:** screenshot desktop (1280) AND
   mobile (390), read the console (zero errors), run the §9 readability audit. Look adversarially.
4. `npm run build` (production build + typecheck) is the test gate — zero errors/warnings. `PORT=3000`
   for dev.
5. Keep `DECISIONS.md` current: every non-obvious choice (font, palette, tradeoff) with a one-line why.

---

## 12. DEFINITION OF DONE (per route AND overall)

- [ ] Plan approved before code
- [ ] Tokens-only styling, no hardcoded values
- [ ] Distinct from any template; matches the Broadcast Service-Bench aesthetic
- [ ] Desktop + mobile screenshots clean
- [ ] Zero console errors
- [ ] Readability audit passes
- [ ] AA contrast verified per use
- [ ] GA4 gated behind consent; fires on accept only
- [ ] SEO meta + JSON-LD + sitemap/robots present
- [ ] Lighthouse ≥ 95 (perf/a11y/best-practices/SEO) reported
- [ ] 404/500 + error boundary in place
- [ ] Build + typecheck pass with zero errors
- [ ] `DECISIONS.md` updated

---

## 13. AMENDMENTS

> Amendments are commitments too. Each must state **what it supersedes**, the **rationale**, and
> the **non-negotiables it preserves**. Hold a high bar: amend only when the change genuinely serves
> the quality/maximal goal, never to paper over a shortcut. Non-negotiables that may NEVER be amended
> away: WCAG 2.2 AA, readability (no opacity-as-color, 12px floor, content visible without JS),
> tokens-only styling, zero runtime deps.

### 2026-06-26 — "Fully maximal" overhaul: real photography + per-section interaction

- **Supersedes §0** ("No … photos — those must come from the owner") **for illustrative/ambient
  photography only.** The build now ships **12 verified free-license, watermark-free stock photos**
  (`public/images/` + `manifest.json`, credits in `standards/image-credits.md`, served through
  `components/ui/Figure.tsx` → `next/image`). *Rationale:* a 77-year repair brand reading as
  credible needs real imagery, and waiting on owner-supplied assets indefinitely blocked the maximal
  bar; generic benchwork/appliance/audio photography illustrates the work without **impersonating
  this specific shop, its staff, or its results.** *Still forbidden (unchanged):* fabricated
  testimonials, team bios, stats, logos, or any photo that claims to *be* Metro's premises, employees,
  or completed jobs. Owner-supplied photos should replace these when available.
- **Extends §4** ("one orchestrated reveal") **to a per-section interaction layer.** Beyond the
  single power-on reveal, each homepage section now carries one distinct, on-theme interaction
  (Hero pointer-graticule, Stats VU-meters, Services scan-line, Brands manifest-ticker, Warranty
  flip-cards, CTA photo; service pages get a drag `DiagnosticSlider`). *Rationale:* "maximal"
  distinctiveness — each section earns its own instrument metaphor. *Preserved non-negotiables:*
  every interaction is **keyboard-operable, reduced-motion-safe, and renders a complete static
  fallback at `opacity:1`** without JS; content is never gated behind an interaction.
- **Hardens §8C (SEO).** Photo alt text now **inherits descriptive copy from the image manifest**
  (decorative `alt=""` overrides removed where the photo is illustrative — see `lib/images.ts`).
  `lib/seo.ts` `pageMeta()` now wires **`openGraph.images` + `twitter.card:"summary_large_image"`
  explicitly** (a route that defines its own `openGraph` block does NOT inherit the root file-based
  `opengraph-image`, so every route had a null `og:image` before this). Per-route meta descriptions
  trimmed to ≤160 chars; under-length titles lengthened. *Result:* every indexable route scores
  **SEO 100/100**; legal pages cap at 98 by design (intentional `noindex`, preserved per §8/§10).
- **Tooling note (env):** Lighthouse CLI is unavailable in the working environment, so the §12
  "Lighthouse ≥ 95" gate is evidenced via **axe-core accessibility audits (0 violations site-wide),
  the SEO audit (100/100 indexable), and Core Web Vitals** (`performance_audit`: LCP 388ms, CLS
  0.045, TBT 90ms — all "Good"). Run a true Lighthouse pass before launch when the binary is present.
