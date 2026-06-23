# METROTV Revamp — Prometheus Base (Design Spec)

**Date:** 2026-06-21
**Status:** Awaiting user review

## Goal

Revamp the METROTV site site-wide: punchier copy, fixed spacing/typographic
rhythm, animated standards-based buttons, and a rich motion layer — using the
**Prometheus Fuels** website as the aesthetic base. The result must keep
METROTV's design-token discipline (`standards/tokens.css` single source of
truth) and honor the non-negotiable readability rules from `reviews/`.

## Decisions (locked with user)

| Topic | Decision |
|---|---|
| Scope | **Whole site** (home sections, `/services` + 4 detail pages, `/home-warranty`, `/contact`, placeholders) |
| Aesthetic base | **Prometheus Fuels** (supersedes an earlier Baunfire exploration) |
| Theme | **Dark-first** — dark default, light kept as the alternate |
| Palette | Black/red/white per Prometheus: bg ≈ `#0F1217`, accent red `#DE1F27`, white text, subtle gradients |
| Fonts | **System stack only** (no web fonts) — borrow Prometheus's *type rhythm*, not its typefaces |
| Copy | **Bold rewrite** — confident, benefit-led, short lines; keep softeners + real facts |
| Motion | **Rich & lively**, but **content visible by default** (no JS-gated `opacity:0`) |
| Buttons | **Open Props** (buttons module) themed onto tokens; styled as Prometheus clean pill |
| Hero media | **Gradient hero by default**; use a properly-licensed appliance/tools video only if found (downloaded locally, never hotlinked) |

## Non-negotiable guardrails (from `reviews/` + CLAUDE.md)

1. **No content hidden without JS.** All copy/images render at `opacity:1` on
   first paint. Reveal animations apply only under an `html.js` flag set by a
   tiny inline script, and collapse instantly under `prefers-reduced-motion`.
2. **WCAG AA contrast.** Never express text color as an opacity of the
   foreground. White-on-red and muted grays must pass AA (≥4.5:1 normal text,
   ≥3:1 large). Red is reserved for large text, the red-period accent,
   dividers, and button fills with verified contrast.
3. **Type floor:** 16px body, 12px minimum for any real text.
4. **Tokens only.** Every visual value flows primitive → semantic → component.
   No hardcoded colors/spacing/sizes/radii/motion in components.
5. **System fonts only.** No web fonts added.
6. **Reduced motion + focus visibility** handled centrally in tokens; don't
   override per-component.

## Architecture

### 1. `standards/tokens.css` — dark-first palette + display type
- Add primitives: Prometheus dark surfaces (`#0F1217` and gradient stops),
  red `#DE1F27`/hover, AA-safe light text grays for dark backgrounds, plus
  larger display font-size steps and tracking values.
- Re-point **semantic** tokens so **dark is the default** `:root` (light
  becomes the alternate via `prefers-color-scheme: light` or a `[data-theme]`
  hook — decide during impl, prefer media query to match current pattern).
- Keep the existing reduced-motion + focus-visible blocks.
- Add semantic tokens for: gradient surfaces (`--gradient-card`,
  `--gradient-section`), the red accent period, divider color, glow.

### 2. `app/globals.css` — base + utilities
- Set dark base background/text.
- Add utilities: `.eyebrow` (red-dot circle label variant), uppercase display
  heading helpers, `.red-dot` accent, dashed divider, container/section rhythm
  refinements (fixes the "space the words"/formatting ask via consistent
  vertical rhythm and measure limits).
- Add the `html.js` flag script (in `app/layout.tsx`) + base `.reveal` styles
  (hidden→shown only under `html.js`, visible otherwise).

### 3. Motion + flourish primitives (`components/ui/`, `components/motion/`)
- **`Reveal.tsx`** — client component using IntersectionObserver; toggles a
  reveal class for fade/slide-up. Visible-by-default; reduced-motion safe.
- **`ScrollStory.tsx`** — sticky two-state cross-fade panel (Prometheus
  `pf-scroll-story`/`show-second`), driven by scroll progress. Both states
  render; reduced-motion stacks them.
- **`Carousel`** — gradient service cards; swiper-like on mobile, grid on
  desktop. Prefer a minimal dependency-free implementation or a small a11y
  carousel; decide in plan.
- **`ReadingProgress.tsx`** + **`ScrollToTop.tsx`** — top progress bar and
  back-to-top control.
- **Decorative SVGs**: circle motif, dashed divider, chevron arrow — all
  `aria-hidden`, `pointer-events:none`.

### 4. `components/ui/Button.tsx` + Open Props
- Add `open-props` dependency; import its buttons module in `globals.css`.
- **Adapter layer**: remap the Open Props variables buttons.css consumes onto
  METROTV semantic tokens so there's no second palette. If the adapter proves
  fragile/invasive, fall back to replicating the patterns directly in
  `Button.module.css` (same look, drop the dep).
- Style as Prometheus clean pill: red fill / outline / ghost variants,
  optional leading/trailing chevron, subtle hover fill. Add `loading`,
  `disabled`, `fullWidth`, `sm` size. Focus via `--color-focus`. Reduced-motion
  safe. (Baunfire swipe-fill dropped since the base changed.)

### 5. Sections (`components/sections/`)
- **Hero** — full-viewport, uppercase headline + red period, sub, primary CTA,
  badges; gradient background (video slot optional, only if licensed clip
  sourced).
- **Stats** — count-up on view (visible-by-default), circle-label eyebrow.
- **ServicesGrid** → gradient-card **Carousel** ("applications" pattern):
  icon · title · divider · description · chevron button.
- **Feature two-column** — In-home vs. Drop-off (Prometheus On-grid/Off-grid).
- **Brands row** — authorized brands with soft glow ("trusted by").
- **WarrantyTeaser**, **CTA** — restyle to the dark/gradient + red system.
- **Header/Footer** — dark, red accent, reveal on scroll, reading-progress bar.

### 6. Copy rewrite
- Rewrite taglines/descriptions in `lib/business.ts` and section copy: bold,
  benefit-led, short. Keep advertising softeners ("can help", "designed to",
  "typically", "may"); use only real facts from `standards/company-facts.md`;
  keep the warranty-provider disclaimer pattern.

### 7. Hero video sourcing (best-effort)
- Search free CC0 / properly-licensed sources (Pexels, Coverr) for an
  appliance/tools clip. If a good one is found, download it locally to
  `public/` and wire it as the hero background with the gradient as the
  poster/fallback. If not, ship the gradient hero. **Never hotlink.**

## Implementation order
1. Tokens (dark-first palette + display type).
2. globals + `html.js` flag + reveal base.
3. Button (Open Props + Prometheus pill).
4. Motion/flourish primitives (Reveal, ScrollStory, Carousel, ReadingProgress, decorative SVGs).
5. Roll across sections + pages (home → services/detail → warranty → contact → placeholders).
6. Copy rewrite.
7. Verify.

## Verification
- `npm run build` (TypeScript check across all routes).
- Playwright: screenshots desktop (1280) + mobile (390) on every route.
- Readability audit: no sub-12px real text, no opacity-as-color, no
  `opacity:0` content; confirm AA contrast on dark surfaces and on red.
- Confirm reduced-motion shows all content and disables animation.

## Out of scope
- Email backend for the contact form (still `mailto`).
- Real testimonials/team/photos (flagged placeholder in company-facts).
- Web fonts, Tailwind, or any second palette.

## Open risks
- **Dark-first flip** touches every component's color assumptions — verify each
  page for contrast regressions.
- **Open Props** may bring more of its own variables than expected; adapter
  fallback noted above.
- **Carousel** dependency choice: keep minimal; a11y must be preserved.
- **Red contrast**: `#DE1F27` with white text is borderline for normal text —
  restrict to large text / fills / accents, verify each use.
