# Metro TV & Appliances — "Maximal Bench" Site Overhaul (2026-06-25)

> Design spec for a full-site overhaul: real free-license photography, a unique per-section
> interaction on every section, and an MCP-driven accessibility / language / SEO audit-and-fix
> pass across all ~16 routes. Front-end only. Builds on the existing token system, theme engine,
> JSON-LD layer, and reduced-motion-safe reveal layer.
>
> **Override of record:** The project bible (`2026-06-24-metro-tv-project-bible-design.md`) §0/§10
> commits to *no photos* and §4 to *one orchestrated motion moment*. The owner has explicitly
> directed a **"fully maximal"** treatment — real photos plus a distinct interaction per section.
> This spec supersedes those two clauses; all other bible commitments (tokens-only styling,
> WCAG 2.2 AA, readability audit §9, Lighthouse ≥95, content/softener rules §10, theme system,
> zero-runtime-deps) remain in force. The bible and `DECISIONS.md` will be updated to record this.

## Goals
- Real, license-clean photography throughout, self-hosted and optimized, on-brand via instrument overlay.
- A unique, accessible, reduced-motion-safe interaction per homepage section and key interior sections.
- Measurable accessibility, language, and SEO improvements on every route, verified by MCP audits.
- No regression to the test gate: `npm run build` stays green; Lighthouse ≥95 across all four categories.

## Non-goals
- No backend/DB. No new runtime dependencies (`next`/`react` only). No Tailwind / UI kit.
- No AI-generated imagery (owner chose real free-license photos only).
- No figma / linear MCPs. (Stitch may be used for design exploration only, not final assets.)

## A. Image pipeline (free-license, self-hosted)
- **Sources:** Pexels + Unsplash only — free commercial use, no attribution required, no watermark.
  Subjects: bench technicians, circuit boards / soldering, appliance internals, audio gear,
  Lincoln/Nebraska context. No people-as-fake-testimonials; photos are illustrative only.
- **Self-host + optimize:** download to `public/images/`; generate **AVIF + WebP** with explicit
  intrinsic `width`/`height`; serve through `next/image`. No hotlinking.
- **On-brand treatment:** a duotone ink+red graticule overlay (CSS `mix-blend-mode` + existing
  `--graticule-*` / `--color-accent` tokens) so photos read as instrument imagery, not generic stock.
  Dark-mode variant via existing theme tokens.
- **`components/ui/Figure.tsx`:** standard wrapper — fixed ratio (no CLS), lazy below the fold,
  overlay, and **required descriptive `alt`**. Alt text and captions sourced from `lib/business.ts`.
- **`standards/image-credits.md`:** ledger of every asset's source URL + license.

## B. Interaction system — one distinct signature per section
Shared low-level hooks (`useInView`, `usePointer`, `usePrefersReducedMotion`) keep mechanics
consistent; each *expression* is unique. Every interaction: keyboard-operable, AA-contrast,
and degrades to a complete static, readable state under no-JS / reduced-motion.

| Section / route | Unique interaction | Static fallback |
|---|---|---|
| Hero | Pointer/scroll-reactive oscilloscope graticule + power-on photo reveal | Static graticule + visible photo |
| Stats | VU-meter needles animating to value on scroll (extends `CountUp`) | Final values shown |
| ServicesGrid | Spec-sheet rows expand on hover/focus to a fault→fix readout | Rows shown expanded-equivalent |
| Brands | Parts-manifest ticker: auto-scroll, pause-on-hover, drag-to-scrub | Static manifest grid |
| ScrollStory | Existing pinned cross-fade + scrubbable diagnostic timeline | Both panels visible |
| WarrantyTeaser | Flip-panel coverage cards (front: system / back: coverage) | Both faces visible stacked |
| /how-it-works | Pinned 6-step diagnostic sequence, clickable progress rail | Numbered step list |
| Service detail | Before/after diagnostic image slider (drag handle) | Two labeled images |
| /contact | Live-validating form + interactive service-area map readout | Labeled form + static map/list |
| /faq | Accordion, smooth height, deep-linkable anchors | All answers visible |

## C. MCP audit-and-fix loop (accessibility + language + SEO)
Per route, run a cycle and record before/after numbers:
1. `PORT=3000 npm run dev`; **playwright** opens the route at desktop 1280 + mobile 390.
2. **uimax `accessibility_audit`** → fix WCAG 2.2 AA: contrast, labels, landmarks, focus order, alt text,
   skip-link, heading order (one `h1`/route).
3. **uimax `seo_audit`** → fix meta/title/description/canonical, structured data, descriptive links.
4. **uimax `lighthouse_audit` + `performance_audit`** → drive toward ≥95 in all four categories;
   fix any LCP/CLS/INP regressions introduced by imagery.
5. **Language pass:** clarity, reading level, voice consistency; benefit-led copy; keep §10 softeners
   ("can help", "designed to", "typically", "may"); no new liability/guarantee claims; fix grammar/voice drift.
6. Re-audit to confirm green; capture numbers into the route's verification note.

## D. Rollout (all ~16 routes)
1. **Homepage first** as the reference build — lock the `Figure` wrapper, the interaction pattern,
   and the audit cycle; get owner sign-off before propagating.
2. Fan out: `/services` + `/appliance` `/tv` `/commercial` `/audio` → `/home-warranty` → `/service-area`
   → `/how-it-works` → `/faq` → `/contact` → `/privacy-policy` `/terms` (+ any cookie page) → `not-found` (404) + error boundary (500).
3. `npm run build` (production build + typecheck — the test gate) stays green throughout.
4. Update `docs/.../project-bible` (record the maximal/photos override) and `DECISIONS.md`
   (one-line why per non-obvious choice).

## Definition of done (per route and overall)
- Tokens-only styling; no hardcoded values. Distinct from any template.
- Desktop + mobile screenshots clean; zero console errors.
- Readability audit (bible §9) passes; AA contrast verified per use; focus outlines intact.
- Every interaction keyboard-operable and reduced-motion-safe with a complete static fallback.
- All images self-hosted, optimized, sized (no CLS), with descriptive alt; credits logged.
- SEO meta + JSON-LD + sitemap/robots intact; per-route audits green.
- Lighthouse ≥95 (perf/a11y/best-practices/SEO) reported.
- `npm run build` + typecheck pass with zero errors; `DECISIONS.md` updated.

## Risks / mitigations
- **Maximal interactions reading as templated** → each is a distinct, on-subject instrument metaphor,
  disciplined and reduced-motion-safe; homepage reviewed before propagation.
- **Photos hurting Core Web Vitals** → AVIF/WebP, sized, lazy below fold, LCP image preloaded;
  re-audit after adding imagery.
- **Photos clashing with the restrained aesthetic** → duotone/graticule overlay + tokenized treatment.
