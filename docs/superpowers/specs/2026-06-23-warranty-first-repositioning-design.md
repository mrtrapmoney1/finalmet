# METROTV — Warranty-First Repositioning & Visual Overhaul

**Date:** 2026-06-23
**Status:** Approved (design) — pending spec review
**Scope:** Header/brand mark, fonts, icon system, brand/warranty representation,
homepage (bright-first card + vertical service carousel + two tracks), Warranty
Service page (was "How It Works"), interactive service-area map, contact (forms removed).

---

## 1. Strategic shift

The site moves from a **direct-pay retail** framing ("schedule a repair, pay a
diagnostic fee") to **two explicit, parallel tracks**:

- **Warranty customer** — the primary, lead journey. The customer contacts *their
  warranty company* first; the warranty company dispatches Metro through its
  authorized service network; Metro then texts the customer to run the repair.
- **Paying directly** — secondary but clearly present. Out-of-warranty / retail
  drop-off (TV, audio, commercial microwave) and direct in-home appliance repair.
  Existing diagnostic-fee + written-estimate content lives here, not on the front
  page.

Both tracks converge on the same text line for ongoing contact.

### Naming decisions (delegated creative calls)
- **"Authorized Service Network"** — the concise name for what the brief called
  "authorized servicers partners." Metro is described as *your warranty's
  authorized servicer*, dispatched through the warranty company's Authorized
  Service Network.
- **Brand mark** = **bolt-flame**: a lightning bolt whose lower half tapers into a
  flame. Signifies powered electronics + bringing dead units back to life; ties to
  the broadcast-red accent.

---

## 2. Contact / phone model

- **402-803-1799** — new **primary text line**. The customer-facing touchpoint
  sitewide ("Text us"). This is the number the brief specified for messaging.
- **(402) 466-9090** — retained as the **voice / shop line** (footer + contact).
- Add to `lib/business.ts`:
  - `textLine: "402-803-1799"`, `textHref: "sms:+14028031799"`
  - keep existing `phone` / `phoneHref` as the voice line.
- The whole site leads with **text**; voice is the fallback.

---

## 3. Fonts (self-hosted, bundled — no CDN, no runtime dep)

- Use `next/font/local` with **self-hosted woff2** files committed to the repo
  (`app/fonts/`). No network fetch at runtime; preserves the zero-runtime-deps
  intent (no npm font packages, no Google Fonts CDN).
- **Body / UI:** Inter (variable woff2) — replaces the system sans for readability.
- **Display headlines:** a strong condensed face (Archivo Expanded/Black or
  Anton-style) for the UPPERCASE display headlines.
- Wire through new semantic tokens in `tokens.css`:
  - `--font-sans` → Inter stack (falls back to system sans if font fails)
  - `--font-display` → display face (falls back to `--font-sans`)
  - The existing serif (`--font-serif`, long-form article body) is unchanged.
- `next/font` exposes CSS variables on `<html>`; map those into the token values so
  components keep consuming `--font-*` only. Nothing hardcodes a family.
- Verify readability per CLAUDE.md: 16px body floor, 12px hard floor, AA contrast.

---

## 4. Header (concise + trustable)

- **Remove** the `M` `brandMark` box.
- **Logo:** new `Icon` `boltflame` mark + tightened wordmark. Desktop:
  "Metro TV & Appliances"; mobile collapses to "Metro TV".
- **Bar layout:** `[mark + wordmark] … [nav] … [Start a repair] [ThemeToggle]`.
  The phone link is **removed from the header** (lives in footer + contact) to
  keep the bar short.
- **Primary CTA:** "Schedule Service" → **"Start a repair"**, linking to the
  homepage two-track section / a chooser. (Confirmed default; user may swap to the
  literal text number.)
- **Trust line:** rendered in the **hero**, directly under the headline (not in the
  header, to keep height down): `Since 1947 · BBB A+ · Samsung Authorized`.
- **Nav change:** `How It Works` → **`Warranty Service`** in `NAV_LINKS`.

---

## 5. Icon system audit

Icons are inline SVG in `components/ui/Icon.tsx` (no icon web font — keep this).
Audit + changes:

| Icon | Current use | Action |
|---|---|---|
| `boltflame` | — | **New** brand mark (bolt → flame). |
| `message` | — | **New** — "Text us" (SMS). Primary contact glyph. |
| `camera` | — | **New** — photo of model/serial number step. |
| `dispatch`/`truck` | — | **New** — warranty dispatch / on-the-way. |
| `calendar` | — | **New** — 2-day rolling schedule. |
| `box`/`parts` | — | **New** — parts ordered / parts arrive. |
| `doc` | fax **and** estimate (double duty) | Split into `fax` + `estimate`. |
| `speaker` | audio | Redraw — current glyph is muddy at small sizes. |
| `phone`,`pin`,`clock`,`check`,`shield`,`wrench`,`bolt`,`star`,`arrow`,`menu`,`close`,`mail`,`home`,`tv`,`sun`,`moon`,`facebook`,`instagram` | various | Keep; redraw only any that fail legibility at 18–24px. |

Each icon's meaning is documented in the spec; every glyph must read clearly at
18px and 24px and inherit `currentColor`.

---

## 6. Brands & warranties (replace the pill cloud)

- **Brands:** a **Factory-Authorized** block, brands grouped by category
  (Appliance / TV / Audio / Commercial) as quiet text under a seal-style heading.
  Reads as a credential, not decoration. No brand logos (no rights/assets).
- **Warranties:** a compact **"Works with your warranty"** band —
  "We're an authorized servicer for most major warranty & protection plans," plus
  the brief's line: *"Brands and warranties may vary; most start online now."*
  No fabricated warranty-company logos.
- Remove the existing pill styling from `Brands` (and any pill use in service
  pages that the brief's intent covers — brands only, keep capability content).

---

## 7. Homepage

Composition (`app/page.tsx`) reworked:

1. **Hero** — headline + trust line + primary CTA "Contact your warranty company"
   (warranty track), secondary "Paying directly?" path.
2. **Stats** — unchanged data, restyled to new fonts.
3. **Service carousel (new `ServiceCarousel`)** — a **pinned, scroll-driven
   vertical carousel**: as the user scrolls, the panel advances one service branch
   at a time (Appliance → TV → Commercial Microwave → Audio), shortening the page.
   - **First branch is the brightest card in light mode** to catch the eye —
     achieved with **elevation + accent edge**, NOT a red wash (per the
     studio-white light-mode rule; dark mode keeps its `--glow-*`).
   - **Static accessible fallback:** without JS / under reduced motion, all four
     branches render stacked and fully visible at `opacity:1`. Same discipline as
     `ScrollStory.tsx`. CSS-module global hooks wrapped in `:global(...)`.
4. **Two-track section** — "Have a warranty?" vs "Paying directly?" → two clear
   cards/paths. Warranty card → Warranty Service page; direct card → services /
   contact.
5. **Brands (factory-authorized block)** + **Warranty band** (section 6).
6. **CTA** — primary "Contact your warranty company"; secondary text/call.

`ScrollStory` may be retired or repurposed if the carousel covers its role —
decide during planning; do not keep two redundant pinned components.

---

## 8. Warranty Service page (renames `/how-it-works` content)

Route note: keep the URL `/how-it-works` **or** add `/warranty-service` — decide in
the plan (prefer renaming the route to `/warranty-service` with a redirect from the
old path if cheap; otherwise keep the path and just change nav label + content).
Page rebuilt around the brief's exact process:

1. **You contact your warranty company.** They dispatch Metro through their
   **Authorized Service Network**.
2. **Respond to our text.** We reach out within **1 business day** of receiving the
   dispatch — usually the **same day**.
3. **Send a photo** of the **model + serial number** and a short note on **what the
   unit isn't doing**.
4. **We order parts.** From your description we notify the warranty company of the
   parts we expect it needs and order through **their trusted distributors**.
5. **We schedule.** When parts arrive, our scheduler contacts you with a date on a
   **2-day rolling schedule** — built around busy customer schedules.
6. **In-home repair.** The technician diagnoses in person, verifies parts, and
   replaces them.
7. **You inspect & confirm.** You check the unit works and ask any questions; the
   technician shares tips to minimize future issues.

Plus a **callout**: *"How do you know which parts to order?" → "Because it's our
job. We learn from every repair and log our findings internally."*

Content rules preserved: advertising softeners ("typically", "usually", "designed
to"), no definitive guarantees, warranty coverage attributed to the provider.

---

## 9. Service area — interactive, no dependencies

- **Custom inline-SVG map** of Nebraska / western Iowa with covered regions
  highlighted (regions from `lib/service-area.ts`). Hand-built paths; no Leaflet,
  no tile source, no npm dep.
- **"Check your zip" search box** (client component): instant covered /
  not-covered against the existing zip data. Accessible, keyboard-friendly.
- **Crawlable zip list stays** below (may be collapsible per region) so SEO is
  preserved — the static enumeration remains in the HTML.

---

## 10. Contact — forms removed

- **Delete `ContactForm.tsx` + `ContactForm.module.css`** and the Web3Forms
  integration. Remove the `NEXT_PUBLIC_WEB3FORMS_KEY` references / `.env.example`
  entry tied to it. Update `CLAUDE.md` architecture notes accordingly.
- Contact page becomes a clean **NAP + action** card:
  - **Text us — 402-803-1799** (primary, `sms:` link, `message` icon).
  - **Call — (402) 466-9090** (voice).
  - Address + directions, hours, fax, email.
- Any "Send a service request" / "Send a message" CTAs elsewhere repoint to the
  text line or the two-track chooser.

---

## 11. Cross-cutting

- All new visual values flow through `tokens.css` (primitive → semantic → consume);
  new theme-sensitive values get dark overrides. No hardcoded colors/spacing/type.
- Keep light = studio white (no red wash); glow is dark-only (`--glow-*`).
- Use `--color-accent-text` for any small red text (brand red fails AA at body
  size).
- Build gate: `npm run build` (TS check). Visual gate: Playwright screenshots at
  1280 + 390, console-error check, readability audit (no sub-12px text, no
  opacity-as-color, no `opacity:0` content).
- Update `lib/business.ts` (text line), `NAV_LINKS` (Warranty Service), and
  `CLAUDE.md` where architecture changes (forms removed, fonts added, carousel).

---

## 12. Out of scope (YAGNI)

- No real warranty-company or brand logo assets (none licensed/available).
- No backend / SMS automation — links open the user's SMS app.
- No mapping library or live tiles.
- No testimonials/team/photos invented (per company-facts placeholder rule).

---

## 13. Open items to settle in planning

- `/how-it-works` rename vs relabel (+ redirect cost).
- Whether `ScrollStory` is retired in favor of `ServiceCarousel`.
- Exact display font choice (Archivo vs Anton-style) — pick during build, verify
  readability.
