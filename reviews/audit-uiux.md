# METROTV — Accessibility / UI-UX Risk Audit

**Date:** 2026-06-22
**Scope:** all 14 routes (live dev server) + every component, desktop 1280 & mobile 390, light + dark themes, keyboard/interaction, and data/content accuracy.
**Console:** 0 errors site-wide; one non-blocking warning (unused CSS preload — see L5).
**Method:** read-only observation. Live contrast math composited over the real ancestor background (alpha + `color(srgb …)` aware); structure/heading/alt/tap-target checks via DOM evaluation; interaction tested with real clicks/keys.

---

## Resolution status (2026-06-22)

**Fixed & verified (build green, re-checked live in both themes):**
- **H1** — email now included in the contact mailto body (`ContactForm.tsx`).
- **H2** — added AA-safe `--color-accent-text` token (red-600 light / red-300 dark); small red text on home / services / service-area / contact now passes in both themes. Only the exempt logo ampersand remains red-on-dark.
- **M1** — footer link / legal / directions tap targets now ≥24px (`Footer.module.css`); no footer link under 24px.
- **M3** — added `facebook` + `instagram` glyphs to `Icon.tsx`; footer renders correct Facebook icon and the previously-missing Instagram link.
- **M4** — mobile menu now closes on Escape and returns focus to the toggle (`Header.tsx`).
- **M2** — `/how-it-works` and `/faq` rebuilt as real pages from `company-facts.md` (6-step process; 11-item native `<details>` accordion + FAQPage JSON-LD). `/privacy-policy` and `/terms` replaced with grounded, clearly-marked **provisional** scaffolds (shared `components/content/Content.module.css`).
- **L1** — mobile services carousel now shows a "Swipe for all four →" affordance (hidden ≥700px).
- **L2** — contact email centralized into `BUSINESS.email`; `ContactForm` consumes it.
- **L3** — hero badges moved to `TRUST_BADGES` in `lib/business.ts`.
- **L4** — `Placeholder` (incl. 404) now has a "Back to home" action.
- **L6** — `CountUp` initializes to the final value (correct for SSR / no-JS / screen readers); animates only when scrolled into view.

**Benign / not changed:**
- **L5** — the unused-preload console warning is Next.js auto-preloading the `not-found` boundary's CSS; harmless, left as-is.
- **Logo "&"** — red wordmark on dark (3.87:1); WCAG exempts logotypes, brand styling preserved.

**Needs your confirmation (flagged, not silently changed):**
- `BUSINESS.email` (`service@metrotv-audiotech.com`) — confirm it's a monitored inbox.
- **Facebook URL discrepancy:** `lib/business.ts` has `facebook.com/MetroTVLincoln/` but `company-facts.md` lists `facebook.com/profile.php?id=61561967326627`. Left the existing value; confirm which is the live page.

All verified live in both themes after fixes; `npm run build` green (16 static routes).

---

## Methodology caveats (audited my own assumptions)

1. **Contrast parser fix.** First pass mis-read the header's `color(srgb 1 1 1 / .88)` background as near-black and false-flagged every dark-on-light header item (~1.1:1). The CSS Color-4 `color()` channels are 0–1, not 0–255. Re-ran after fixing — those were false positives.
2. **Theme must be tested with a real reload.** Flipping `data-theme` via JS does not recompute custom-property `color` values, producing 17 phantom dark-mode failures. Verified via `localStorage` + reload instead.
3. **"Stuck reveals" was a scroll-timing artifact.** Fast programmatic scrolling left `.reveal` elements measured before their IntersectionObserver callback fired. At human cadence all 23 reveal elements reach `opacity:1`; reduced-motion / no-JS force visibility. CLAUDE.md's "no content hidden behind JS reveal" requirement is **met**.

---

## HIGH

### H1 — Contact form silently discards the customer's email
`components/ContactForm.tsx` (collects `email` at line 48; `handleSubmit` lines 14–26 never read it; the `mailto:` body omits it). A customer who supplies their email loses it entirely.
**Fix:** read `email` from FormData and include it in the mailto body.

### H2 — Red text fails WCAG AA contrast for normal/small text (systemic)
`standards/tokens.css:139-141,203` — `--color-accent` / `--color-accent-bright` (red-500/red-400) used for sub-18.66px text, contrary to CLAUDE.md ("reserve red for large text, accents, dividers, button fills").

| Where | Color | Size | Ratio | Need |
|---|---|---|---|---|
| Footer "Get Directions" (light) | `#DE1F27` | 14px | 4.17 | 4.5 |
| `/services` card labels (dark) | `#DE1F27` | 12px | 3.87 | 4.5 |
| `/service-area` "N zip codes" (dark) | `#DE1F27` | 12px | 3.87 | 4.5 |
| `/contact` "Get directions" (dark) | `#ec2f38` | 16px | 4.22 | 4.5 |
| Hero diagnostic eyebrow (dark) | `#ec2f38` | 12px | 4.49 | borderline |

red-500 also does not brighten to red-400 on dark surfaces in the `/services` labels.
**Fix:** add a contrast-safe `--color-accent-text` semantic token (darker on light, brighter on dark) and consume it for small red text; keep bright red for large display/buttons. Logo "&" (3.87) is exempt (brand mark).

---

## MEDIUM

- **M1 — Mobile tap targets < WCAG 2.5.8 (24×24).** Footer links 16px tall, "Get Directions" 22px, "FAQ" 28×16. `components/layout/Footer.module.css`. Add vertical padding to reach ≥24px (ideally 44px).
- **M2 — Legal pages are placeholders.** `app/privacy-policy`, `app/terms` are footer-linked but render generic `Placeholder` copy with no actual policy/terms text — legal completeness gap.
- **M3 — Footer social wrong/incomplete.** `components/layout/Footer.tsx:17-23` — Facebook link renders `<Icon name="home">` (house glyph); Instagram (`BUSINESS.social.instagram`) is not rendered at all.
- **M4 — Mobile menu ignores Escape; no focus return.** `components/layout/Header.tsx:45-82`. Disclosure (not modal) so not a keyboard trap, but Escape-to-close is expected.

## LOW

- **L1 — Services carousel has no affordance.** `ServicesGrid.module.css` mobile `overflow-x:auto` + hidden scrollbar; cards 2–4 have no visual hint.
- **L2 — Contact email hardcoded.** `ContactForm.tsx:24` `service@metrotv-audiotech.com` not sourced from `lib/business.ts` (no `email` field exists to verify against). Confirm inbox + move into the data layer.
- **L3 — Hero badges hardcoded.** `Hero.tsx:6-11` duplicates facts instead of sourcing `lib/business.ts`.
- **L4 — 404 says "Head back home" but offers no Home link** (`not-found.tsx`; header logo covers it).
- **L5 — Unused CSS preload on homepage** (`Placeholder_module…css`) — the single console warning.
- **L6 — CountUp shows "0+" pre-scroll** with JS+motion until intersection; reduced-motion renders final value correctly.

---

## Verified clean
Single `<h1>` + no heading skips on every page; no `<img>` missing alt (icons decorative `aria-hidden` SVG); no real text < 12px; all form inputs `<label for>`-associated; semantic landmarks + named regions; global `:focus-visible` + working skip link; theme flips correctly on real reload; dark mode clean except red accents (H2); 0 console errors.
