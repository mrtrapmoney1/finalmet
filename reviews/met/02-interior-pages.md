# met — Interior pages review

Templates sampled (cover all distinct layouts; remaining routes reuse these components):
`/services`, `/contact`, `/appliance-repair-lincoln` (city SEO template), `/products`.
Screens in `reviews/_screens/met/`.

## Overall
Interior pages are **consistent, well-structured, and readable on light backgrounds**. The header,
footer, service-card grid, CTA band, and coverage-checker are shared components reused cleanly
across pages. The recurring weaknesses are the same as the homepage (low-contrast text on dark
sections, sub-14px labels) plus a couple of content gaps.

## `/services` — index
- Clean, readable. Dark-on-light body copy passes contrast. Good service-card grid with brand chips.
- `minFontPx: 12`, but **27% of text nodes are <14px** (chips, eyebrows, "+8 more" tags).
- Top-right of the hero is empty negative space — intentional and calm, but a candidate for imagery.
- Audit still flagged **20 low-alpha text nodes** (the dark CTA band "Not sure which service you
  need?" uses `text-white/*` subtext).

## `/contact` — form (a STRENGTH, keep this)
Form is the best-implemented interactive element across both sites:
- All 5 fields programmatically labeled (`labeled: true`): name/email/phone/service(select)/message.
- Correct input types (`email`, `tel`) → right mobile keyboards.
- Field heights 45–46px (textarea 106px) → meet the 44px tap-target floor.
- Helpful placeholders. Source: `met/components/ScheduleForm.tsx` / contact form component.
- Only nit: input border is `border-outline-variant/60` (`ScheduleForm.tsx:51`) — faint, but ok on light.

## `/appliance-repair-lincoln` — city SEO landing (`components/CityLandingPage.tsx`)
- Comprehensive, on-brand: dark hero + pricing card, stat band, local-intro, reused service cards,
  3 pricing tiers (diagnostic $42.90 / in-home $149.08 / extended $175.08), reputation, coverage
  checker, CTA. Good SEO template, one component drives all 6 city pages.
- **Highest low-contrast count of any page: 35 low-alpha text nodes.** Hero subtext and badges are
  `text-white/60` (`CityLandingPage.tsx:75,90`) on navy — the systemic contrast issue at its worst.
- Long page (3948px) but well-paced.

## `/products` — parts catalog (content gap)
- **Only one real product** renders (Samsung OEM Dryer Drive Motor, $54.29) despite filter chips for
  All/Samsung/LG/GE/Whirlpool/Electrolux. Catalog is effectively empty (`OEM_PARTS` in
  `met/lib/parts.ts` is largely unpopulated).
- **No product images** (`numImg: 0`) — cards show a generic inline SVG icon placeholder. For an
  e-commerce/parts surface this is the weakest content area.
- Layout/filtering UI itself is clean and would shine once populated.

## `/faq` — accordion (a STRENGTH)
- Excellent IA: quick-answer cards up top, then questions grouped into categories (Getting Started,
  Pricing & Diagnosis, Warranty & Coverage, Service Area). Clean, readable, on-brand.
- **A11y nit:** toggles are not semantic — audit found 0 `<details>` and 0 `[role=button][aria-expanded]`.
  The chevron rows likely don't expose expanded/collapsed state to screen readers or keyboard. Verify
  and switch to `<details>`/`<button aria-expanded>` in the rebuild.

## Cross-page notes
- No horizontal overflow on any sampled page at 1280 or 390 — responsive plumbing is solid.
- The floating circular "N" on the left edge is the **Next.js dev-mode indicator**, not site content.
- `minFontPx` floors at 12 on interior pages (better than the homepage's 9–10 from the brand marquee).
