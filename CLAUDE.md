# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

METROTV is the **rebuild** of *Metro TV & Appliances* — an appliance / TV / audio repair
business in Lincoln, NE. It is a built-out **Next.js 16 (App Router) + React 19 + TypeScript** app,
styled with **plain CSS Modules consuming `standards/tokens.css`** — deliberately **no Tailwind, no
external UI libraries, no web fonts** (system stack only). Zero runtime dependencies beyond
`next` / `react`.

The visual direction is modeled on the **Prometheus Fuels** site: bold UPPERCASE display
headlines ending in a **red period accent**, broadcast-red (`#DE1F27`) on near-black ink or white,
gradient cards, and a scroll-driven motion layer.

### Commands
- `npm run dev` — dev server. Use `PORT=3000` (the reference repos met/nmet use 3001/3002).
- `npm run build` — production build + TypeScript check. **This is the test gate** — run it to catch
  type errors across all routes (there is no separate test runner).
- `npm run start` — serve the production build. `npm run lint` — Next.js lint.
- Visual verification is done with Playwright: screenshot every route at desktop (1280) and mobile
  (390), check the browser console for errors, and run the readability audit (no sub-12px real text,
  no opacity-as-color, no `opacity:0` content).

## Architecture

- `app/` — App Router routes. Homepage composes section components; `/services` + four service
  detail routes (`/appliance`, `/tv`, `/commercial`, `/audio`, all via `components/ServiceDetail.tsx`)
  + `/home-warranty` + `/contact` (NAP card + `components/ContactForm.tsx`, a client component that
  POSTs to **Web3Forms** via `fetch` for server-side lead capture — gated on the public
  `NEXT_PUBLIC_WEB3FORMS_KEY` env var (see `.env.example`). With no key set it degrades gracefully to a
  `mailto:` draft; on network failure it surfaces phone + email fallbacks. No npm SDK — keeps the
  zero-runtime-deps constraint). The informational routes are now built out: `/service-area`
  (interactive-leaning zip/region content from `lib/service-area.ts`), `/how-it-works`, `/faq`, and
  the legal pages all render real content. `components/ui/Placeholder.tsx` survives only as the
  fallback for stubs (`/cod`) and `not-found.tsx` so nav never dead-ends.
- `lib/business.ts` — single source of truth for business facts and the `SERVICES`, `STATS`,
  `NAV_LINKS` data that components map over. Mirrors `standards/company-facts.md`. Edit content here,
  not in components.
- `components/sections/*` — the homepage building blocks (`Hero`, `Stats`, `ServicesGrid`,
  `ScrollStory`, `Brands`, `WarrantyTeaser`, `CTA`). Each has a co-located `*.module.css`.
- `components/ui/` — primitives: `Button` (shared CTA), `Icon` (inline SVG, no icon web font),
  `ThemeToggle`, `CountUp`, `Placeholder`.
- **SEO / structured data lives in `app/layout.tsx`** — a non-obvious layer driven entirely off
  `lib/business.ts`. It exports the root `metadata` (title template, description, keywords, OpenGraph,
  `metadataBase`/canonical from `BUSINESS.url`) and injects a `LocalBusiness` + `HomeAndConstructionBusiness`
  JSON-LD block built from `BUSINESS` facts (address, phone, geo, hours, founding 1947). Per-route
  titles use the `%s | ${BUSINESS.name}` template, so route pages set only their own `metadata.title`.
  Keep all of this sourced from `lib/business.ts` — don't hardcode NAP/SEO strings in components.
- `app/globals.css` `@import`s `standards/tokens.css`, then sets the reset + base type + utilities
  (`.container`, `.section`, `.display`, `.dot`, `.eyebrow`, `.divider`, `.reveal`, `.reading-progress`).

## Theming — light default, dark ("night mode") toggle

This is the most important non-obvious system. Do not reintroduce `prefers-color-scheme`-driven theming.

- **Light is the default.** `tokens.css` defines LIGHT semantic tokens in `:root` and overrides them
  under `html[data-theme="dark"]`. `color-scheme` is set per theme there too.
- The active theme is chosen by `components/ui/ThemeToggle.tsx` and **persisted in `localStorage`
  under `theme`**. An inline script in `app/layout.tsx` reads it and sets `data-theme` on `<html>`
  **before paint** (default `light`) so there's no flash. That same script adds `class="js"`; `<html>`
  carries `suppressHydrationWarning` because of this pre-hydration mutation.
- **Every section is theme-adaptive** — including the hero, scroll-story, CTA, and footer. They flip
  via `--gradient-hero`, `--gradient-feature`, `--gradient-cta`, `--color-footer-*`. Use `--color-text`
  / `--color-text-muted` for foreground in these sections; the legacy `--color-on-dark*` tokens exist
  but are no longer the right choice for theme-adaptive text.

## Design tokens — the core constraint

`standards/tokens.css` is the single source of truth for all visual values. **Never hardcode colors,
spacing, type sizes, radii, shadows, or motion.** The system is tiered per the W3C Design Tokens spec:

- **Primitives** (`--c-*`, `--fs-*`, `--sp-*`, `--radius-*`, `--dur-*`, …): raw values. Never use in
  components.
- **Semantics** (`--color-*`, `--gradient-*`, `--space-*`, `--card-*`, `--action-*`): what components
  consume. Light values in `:root`, dark overrides in `[data-theme="dark"]`.
- Adding a value: primitive → semantic → consume the semantic. Don't shortcut the chain. New
  theme-sensitive values must be semantic tokens (and usually need a dark override) to flip correctly.
- `--c-red-500` (`#DE1F27`) is the brand accent → use `--color-accent` / `--color-accent-bright`
  (`-bright` is the lighter tint used on dark surfaces). The serif family is reserved for long-form
  article body only; default is the system sans stack.

### Built-in behaviors to preserve (handled centrally — don't reimplement per-page)
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` collapses durations to `1ms`. Animate
  via `--action-duration` / `--dur-*` so this is automatic, and ensure the reduced-motion path leaves
  content fully visible.
- **Focus visibility**: a global `:focus-visible` outline (`--color-focus`). Keep it; never remove
  outlines.

## Motion layer

- **Scroll reveals**: add the `reveal` class (optionally `--reveal-delay`) to an element.
  `components/motion/MotionRoot.tsx` (mounted once in the layout) sets `data-revealed` via
  IntersectionObserver and drives the reading-progress bar. **Content is visible by default** — the
  hide-then-reveal only applies under `html.js` (see `.reveal` in `globals.css`), so no-JS, reduced
  motion, and crawlers always see content at `opacity:1`. This is non-negotiable (see review findings).
- `ScrollStory.tsx` is a pinned two-panel cross-fade; `CountUp.tsx` animates stat numbers on view.
  Both render a complete, static, accessible fallback without JS / under reduced motion.
- **CSS Modules gotcha**: in `*.module.css`, global hooks like `html.js` and `html[data-theme="dark"]`
  **must be wrapped in `:global(...)`** — otherwise the `.js` / attribute class gets scoped/hashed and
  the selector silently never matches. (Global selectors in `globals.css` don't need this.)

## Content rules (carry into all new pages)
- **No definitive liability/guarantee statements.** Use advertising language with softeners ("can
  help", "designed to", "typically", "may"). Coverage/approvals belong to the warranty provider, not
  us — keep the provider-disclaimer pattern from `/home-warranty`.
- Copy is bold and benefit-led: short lines, UPPERCASE display headlines, the red-period accent
  (`<span className="dot">.</span>`). Base all facts on `standards/company-facts.md` /
  `lib/business.ts`; don't invent content, and don't reuse the reference repos' placeholder
  testimonials/team/photos as if real.
- Readability is non-negotiable: solid AA-passing text (no opacity-as-color), 16px body / 12px floor,
  all content visible at `opacity:1`. Red (`#DE1F27`) is borderline for normal text — reserve it for
  large text, accents, dividers, and button fills, and verify contrast per use.

## Reference material (read, don't re-derive)
- `standards/company-facts.md` — real, verified business facts (address, phone, hours, founding,
  brands, pricing, warranty terms, service area). Also flags which reference-repo content is placeholder.
- `standards/customer-strategy.md` — customer segments and the page-build roadmap; consult before
  writing audience-targeted copy or deciding what page to build next.
- `reviews/SUMMARY.md` — cross-site verdict + rebuild blueprint (the entry point), with per-site
  findings in `reviews/met|nmet/*.md` and captures in `reviews/_screens/`. Headline conclusion carried
  into the build: **readability is priority #1**; both prior sites failed it by setting text as an
  opacity of the foreground, bottoming type out at 9–10px, and gating content behind JS scroll-reveal
  at `opacity:0`. Don't reproduce these.
- `docs/superpowers/specs/` — design specs written during brainstorming sessions.

### Two reference implementations live outside this repo (both reviewed in `reviews/`)
- `../met` — newer fork, Next 16 + Tailwind + shadcn/base-ui. `cd ../met && PORT=3001 npm run dev`.
- `../nmet` — predecessor, Next 15. `cd ../nmet && PORT=3002 npm run dev`.
They are the source of truth for "what the rebuild should keep" — but the rebuild deliberately rejects
their Tailwind/web-font/opacity-as-color approach.
