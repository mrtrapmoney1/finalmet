# Maximal Bench Overhaul — Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox (`- [ ]`) syntax.
> The "test cycle" for this front-end work is: `npm run build` (typecheck/test gate) + `uimax`
> audits (a11y/seo/lighthouse/perf) + `playwright` visual at 1280/390 + bible §9 readability audit.

**Goal:** Full-site overhaul of MetroTV — real free-license photography, a unique accessible
interaction per section, and an MCP-driven a11y/language/SEO fix pass across all ~16 routes.

**Architecture:** Build reusable foundation (image pipeline script, `Figure` wrapper, interaction
hooks, overlay tokens) → rebuild the homepage as the reference build → run the MCP audit loop →
fan out to interior routes. Next.js 16 App Router, CSS Modules + `standards/tokens.css`, zero new deps.

**Tech Stack:** Next 16 / React 19 / TypeScript, `sharp` (already present) for AVIF/WebP, `next/image`,
uimax + playwright + stitch MCPs (no figma/linear).

## Global Constraints (verbatim from spec/bible)
- Tokens-only styling; never hardcode color/space/type/radii/shadow/motion. Consume **semantic** tokens.
- Zero runtime deps beyond `next`/`react`. No Tailwind/UI kit/web-CDN fonts.
- WCAG 2.2 AA: no opacity-as-color, no sub-12px real text (16px body / 12px floor), content visible
  without JS + under reduced motion, `:focus-visible` outlines never removed, one `h1`/route.
- Lighthouse ≥95 (perf/a11y/best-practices/SEO) on the built site; LCP<2.5s, CLS<0.1, INP<200ms.
- Content: facts only from `lib/business.ts`/`standards/`; softeners ("can help","designed to","may");
  no new liability/guarantee claims; UPPERCASE display headlines + red-period `.dot`.
- CSS-Modules global hooks (`html.js`, `html[data-theme="dark"]`) must be `:global(...)` wrapped.
- All images self-hosted, AVIF+WebP, explicit width/height, descriptive alt, logged in image-credits.md.
- `npm run build` green + `DECISIONS.md` updated after each slice.

---

## Phase 0 — Foundation

### Task 1: Image pipeline (curate + download + convert)
**Files:** Create `scripts/fetch-images.mjs`, `public/images/*`, `standards/image-credits.md`.
- [ ] Curate verified free-license photo URLs (Unsplash/Pexels, probed 200) per subject: bench/tech,
      circuit-board, soldering, appliance internals, TV/display, audio gear, Lincoln/Nebraska.
- [ ] `scripts/fetch-images.mjs`: download each, `sharp` → AVIF + WebP at widths [640,1280,1920],
      record intrinsic w/h; write `standards/image-credits.md` (file, source URL, license).
- [ ] Run it; verify files land in `public/images/`. Commit.

### Task 2: Overlay tokens + Figure component
**Files:** Modify `standards/tokens.css` (add `--figure-*` overlay/duotone semantics, light+dark);
Create `components/ui/Figure.tsx` + `Figure.module.css`.
- [ ] Add overlay/duotone semantic tokens (ink+red graticule) in `:root` and `[data-theme=dark]`.
- [ ] `Figure.tsx`: props `{src, alt, width, height, ratio?, priority?, overlay?, caption?}`; renders
      `next/image` with sizes, optional graticule/duotone overlay layer, `<figcaption>` when caption set;
      required `alt`. No CLS (intrinsic w/h). Reduced-motion safe (overlay is static).
- [ ] `npm run build` green. Commit.

### Task 3: Interaction hooks
**Files:** Create `components/motion/useInView.ts`, `usePointer.ts`, `usePrefersReducedMotion.ts`.
- [ ] `usePrefersReducedMotion()` → boolean (matchMedia, SSR-safe default false).
- [ ] `useInView(opts)` → `[ref, inView]` via IntersectionObserver, disconnect after first.
- [ ] `usePointer(ref)` → normalized x/y (0..1) within element, no-ops under reduced motion / no pointer.
- [ ] `npm run build` green. Commit.

---

## Phase 1 — Homepage reference build (one unique interaction per section)
Each section task: add photo via `Figure` where it strengthens the section, add the section's unique
interaction (keyboard-operable, reduced-motion-safe, complete static fallback), keep tokens-only,
then `npm run build` + playwright 1280/390 + console-zero + readability check, then commit.

- [ ] **Task 4 Hero** — pointer/scroll-reactive oscilloscope graticule + power-on photo reveal behind copy.
- [ ] **Task 5 Stats** — VU-meter needle gauges animating to value on scroll (extend `CountUp` pattern).
- [ ] **Task 6 ServicesGrid** — spec-sheet rows expand on hover/focus to a fault→fix readout; photo per service.
- [ ] **Task 7 Brands** — parts-manifest ticker: auto-scroll, pause-on-hover, drag-to-scrub; static grid fallback.
- [ ] **Task 8 ScrollStory** — keep pinned cross-fade, add scrubbable diagnostic timeline + bench photo.
- [ ] **Task 9 WarrantyTeaser** — flip-panel coverage cards (front system / back coverage); both faces visible static.
- [ ] **Task 10 CTA + Footer polish** — photo-backed CTA band with tokenized overlay; verify contrast.

## Phase 2 — MCP audit loop on homepage
- [ ] **Task 11** Run uimax accessibility_audit, seo_audit, lighthouse_audit, performance_audit on `/`;
      fix every finding; re-audit to green; record before/after numbers in DECISIONS.md. Commit.

## Phase 3 — Fan out to interior routes (repeat the pattern per route)
For each: add relevant photo(s) via `Figure`, add the route's unique interaction, run the audit loop,
language pass (clarity/voice/softeners), build green, commit.
- [ ] **Task 12** `/services` (spec-sheet table) + `/appliance` `/tv` `/commercial` `/audio` (before/after slider).
- [ ] **Task 13** `/home-warranty` (flip coverage panels) + `/service-area` (interactive map readout).
- [ ] **Task 14** `/how-it-works` (pinned 6-step sequence w/ clickable rail) + `/faq` (deep-linkable accordion).
- [ ] **Task 15** `/contact` (live-validating form + map readout).
- [ ] **Task 16** legal (`/privacy-policy`,`/terms`) + `not-found` (404) + error boundary (500); noindex preserved.

## Phase 4 — Close-out
- [ ] **Task 17** Full-site uimax re-audit (all routes), site-wide `npm run build`, update bible override
      note + DECISIONS.md, write image-credits ledger final, final report with audit numbers.

## Self-review notes
- Spec A→Task 1/2; B→Tasks 4-10,12-16; C→Tasks 11,17 + per-route loops; D→Phase ordering. Covered.
- No unit-test runner exists; cycle = build + uimax + playwright + readability (bible §9) — intentional.
