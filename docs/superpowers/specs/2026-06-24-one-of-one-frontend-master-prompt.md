# One-of-One Frontend — Master Build Prompt (Claude Code · Opus 4.8)

> Reusable, project-agnostic. Fill every `[BRACKET]`, delete what you don't need, then paste the
> whole thing into Claude Code as the opening message. Front-end only. Built for a distinctive,
> risk-averse, long-horizon site.

---

```
You are building a ONE-OF-ONE marketing/front-end website — unique in every aspect, engineered to
age well and never look templated. This is front-end only (no backend, no DB). Work at effort=high;
switch to /effort xhigh for the design-direction and visual-polish passes. Think and plan before you
build, use a dynamic workflow for the large multi-route work, and VERIFY your own output with the
browser before claiming anything is done.

## 0. PROJECT FACTS (fill these in)
- Name / brand: [NAME]
- What it sells / does: [ONE SENTENCE]
- Audience & the feeling they should have in 5 seconds: [AUDIENCE + FEELING]
- Pages/routes: [home, /about, /services, /contact, ...]
- Real content source (use ONLY this — invent nothing): [paste facts / link / "ask me per section"]
- Stack: [e.g. Next.js (App Router) + React + TypeScript], styling via CSS variables / design tokens.
  No UI kit, no component library, no AI-slop starter theme.
- Deploy target: [Vercel / Netlify / static export]

## 1. WORKFLOW & HOW TO USE YOU (Opus 4.8)
1. FIRST produce a short plan: routes, component tree, token system, and the design direction —
   then wait for my OK before writing code. Do not scaffold before the plan is approved.
2. Build in vertical slices (one route fully done — markup, styles, responsive, a11y — before the
   next). Use a dynamic workflow / parallel subagents for independent routes once the system is set.
3. SELF-VERIFY every slice with Playwright before saying it's done: screenshot desktop (1280) AND
   mobile (390), read the browser console (zero errors), and run the readability audit below. Treat
   your own work adversarially — you are good at catching your own flaws, so actually look.
4. The production build + typecheck is the test gate. It must pass with zero errors/warnings.
5. Keep a running DECISIONS.md: every non-obvious choice (font, palette, library, tradeoff) with a
   one-line "why," so the site is maintainable years from now.

## 2. DISTINCTIVENESS — DO NOT SHIP "AI SLOP"
You converge toward generic defaults; consciously resist it. This site must look like it was made by
one specific studio for one specific brand.
- Anchor the whole look to a NAMED reference I can recognize — a cultural/era/material aesthetic
  (e.g. "Swiss editorial," "80s broadcast," "brutalist print," "warm analog film"): [PICK ONE].
- TYPOGRAPHY: choose a distinctive, SELF-HOSTED typeface (self-host for performance + privacy — no
  Google CDN). Avoid Inter/Roboto/Open Sans/Lato/Arial/system-default as the display face. Use
  EXTREME weight contrast (e.g. 200 vs 900) and large size jumps (3×+) for hierarchy. One decisive
  voice, not a salad of fonts.
- COLOR: one dominant color + one or two sharp accents, committed via CSS variables. NOT a timid
  evenly-spread palette, and NOT purple-gradient-on-white. Define light and dark as first-class.
- MOTION: invest in ONE well-orchestrated page-load reveal with staggered delays over scattered
  micro-interactions. CSS-first. Everything must respect prefers-reduced-motion.
- BACKGROUNDS: build depth/atmosphere (layered gradients, grain, geometric pattern, subtle texture)
  — never a flat default fill.
- LAYOUT: break the predictable hero→3-cards→footer template at least twice with intentional,
  asymmetric, content-driven composition.

## 3. DESIGN-TOKEN SYSTEM (the durability backbone)
- Single source of truth for color, type scale, spacing, radii, shadows, motion, breakpoints —
  as CSS custom properties (primitive → semantic tiers). Components consume SEMANTIC tokens only;
  never hardcode a raw color/size/duration anywhere in a component.
- Theme = light default + dark override on a data attribute, persisted to localStorage and applied
  before first paint (no flash). No prefers-color-scheme-driven theming.

## 4. FOUNDATIONAL SYSTEMS (all required — this is the "risk-averse, long-term" part)
A. ANALYTICS — Google Analytics 4
   - Add GA4 via [NEXT_PUBLIC_GA_ID / measurement id env var], loaded with the framework's script
     primitive (afterInteractive), never inline-hardcoded.
   - GA MUST NOT fire until consent is granted (see B). Wire Consent Mode v2 defaults to "denied,"
     upgrade on accept. Track route changes as page_views in the SPA. Add a small typed event helper
     for CTA/form/outbound clicks. No analytics in dev.
B. PRIVACY & CONSENT
   - Cookie-consent banner (accept / reject / preferences) that GATES GA4. Granular categories.
     Persist choice; provide a way to change it later.
   - Real /privacy-policy and /cookie-policy pages. GDPR/CCPA-safe by default (no tracking pre-consent).
C. SEO & STRUCTURED DATA
   - Per-route title/description from a central config; title template; canonical URLs; metadataBase.
   - OpenGraph + Twitter cards (+ a generated/placeholder OG image). robots.txt + sitemap.xml
     (generated, not hand-maintained). JSON-LD appropriate to the site (Organization/LocalBusiness +
     per-page types), sourced from the project facts — never duplicated NAP strings in components.
   - Semantic HTML: one h1/route, logical heading order, landmark elements, descriptive link text.
D. PERFORMANCE & CORE WEB VITALS
   - Budgets: LCP < 2.5s, CLS < 0.1, INP < 200ms; Lighthouse ≥ 95 across the board on the built site.
   - Optimized responsive images (modern formats, width/height to prevent CLS, lazy below the fold);
     self-hosted fonts with font-display:swap + preload of the critical face; minimal/zero JS where
     static suffices; no layout shift. Report the Lighthouse numbers back to me after the build.
E. ACCESSIBILITY — WCAG 2.2 AA
   - All text AA-contrast (verify per use; never use opacity-as-color, never sub-12px real text).
   - CONTENT VISIBLE WITHOUT JS and under reduced motion — scroll-reveal may only hide content when
     JS is active; no-JS, reduced-motion, and crawlers always see opacity:1. This is non-negotiable.
   - Visible :focus-visible outline everywhere (never removed), full keyboard operability, labeled
     forms, alt text, aria only where semantics fall short, skip-to-content link.
F. ERROR HANDLING & OBSERVABILITY
   - Custom, on-brand 404 and 500 pages (never dead-ends). Error boundary around the app.
   - A pluggable error/perf hook (e.g. Sentry-ready or a no-op shim behind an env var) so monitoring
     can be switched on without a refactor. Forms degrade gracefully (mailto/phone fallback on failure).

## 5. READABILITY AUDIT (run as part of every self-verification)
Fail the slice if ANY of these are true: real text below 12px; text color set as an opacity of the
foreground; meaningful content stuck at opacity:0 (JS-gated); contrast below AA; focus outline missing;
console errors present; layout shifts on load.

## 6. CONTENT RULES
- Use only the facts I gave you. Invent nothing — no fake testimonials, stats, team, or logos.
- If a section needs content I haven't supplied, ASK rather than fabricate.

## 7. DEFINITION OF DONE (per route AND overall)
[ ] Plan approved before code   [ ] Tokens-only styling, no hardcoded values
[ ] Distinct from any template; matches the named aesthetic   [ ] Desktop + mobile screenshots clean
[ ] Zero console errors   [ ] Readability audit passes   [ ] AA contrast verified
[ ] GA4 gated behind consent; fires on accept only   [ ] SEO meta + JSON-LD + sitemap/robots present
[ ] Lighthouse ≥ 95 (perf/a11y/best-practices/SEO) reported   [ ] 404/500 + error boundary in place
[ ] Build + typecheck pass with zero errors   [ ] DECISIONS.md updated

Start with the PLAN only (section 1.1). Ask me anything ambiguous before building.
```

---

### Notes for whoever runs it
- **Opus 4.8 levers baked in:** plan-first gate, dynamic-workflow fan-out for routes, `/effort xhigh`
  for design passes, and forced Playwright self-verification (the model is ~4× less likely than 4.7 to
  let its own flaws pass — make it actually look).
- **The one tension to decide per project:** self-hosted distinctive fonts (recommended here for
  uniqueness + privacy + perf) vs. a strict system-font constraint. If a project bans web fonts,
  delete the typeface line in §2 and get distinctiveness from weight/size contrast, color, and layout.
- **Front-end only:** consent, analytics, SEO, and error handling are all client/edge-side; no server
  or DB is assumed. Swap the framework lines in §0 if not using Next.js.
