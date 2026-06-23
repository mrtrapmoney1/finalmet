# nmet (`/home/aaron/code/nmet`, :3002) — review

Next 15 · same design DNA as met (Manrope headings / Inter body, navy + orange, identical service
cards). nmet is the **predecessor**; met is the evolved fork. Screens in `reviews/_screens/nmet/`.

## How nmet differs from met (structural)
- **No Parts Store / `/products`, no cart** — nmet has no e-commerce surface at all.
- **No legal pages** (`terms`, `privacy-policy`, `return-policy`) and no `squaretrade`.
- Troubleshooting exists as flat top-level dirs (`troubleshooting-appliances/` …), not met's nested
  `/troubleshooting/*` route group.
- Nav: `Services · Service Areas▾ · How It Works · FAQ · Contact · [Schedule Service]`
  (Service Areas is a dropdown here; met flattened it to a single "Service Area" + added "Parts Store").

## Homepage (`/`) — denser and more practical than met's
Screens: `home-desktop.jpeg`, `home-mobile.jpeg`. h1 = Manrope **72px** (met's is ~108px).
This is nmet's strongest asset and the thing met regressed on:
- **Hero carries real content**: headline + a full body paragraph ("When something breaks, trust
  matters… Eight decades of precision, no shortcuts.") + two CTAs + trust badges, AND a
  **`$42.90` diagnostic price card** docked in the hero-right. met's hero-right is empty whitespace.
- Stat band (`1947 / 200+ / 13+ / $42.90`) sits immediately under the hero — useful facts above the
  fold instead of met's large empty navy band.
- Reputation section ("77 Years of Work That Speaks for Itself") has **filled** BBB / Google /
  Founded cards on the right — no dead space.
- Result: more information per screen, less scrolling-through-emptiness. On **mobile** this reads
  especially well — no giant empty bands, visible hamburger, sections stack tightly (`home-mobile.jpeg`).

## `/contact` — two real problems + one thing to keep
Screen: `contact-desktop.jpeg`.
1. **BROKEN Google Map.** The map panel renders a raw error string:
   `"Google Maps Platform rejected your request. The provided API key is invalid."`
   A large grey box with an error message is the single most damaging visible defect on either site.
   (met sidesteps this — its contact page has no map embed.)
2. **No contact form.** `input/textarea/select` count = **0**. nmet relies entirely on phone /
   walk-in. met's `/contact` has a proper labeled 5-field form → met is functionally superior for
   lead capture.
3. **KEEP:** the business-info card is excellent — Address / Phone / Fax / Hours with icons and a
   prominent "Get Directions" button. met's contact lacks this richer NAP panel; the rebuild should
   merge met's form + nmet's info card (with a *working* map or a static map image).

## Shared issues (same as met — these live in the common component layer)
- **Low-contrast text is systemic**: 36 low-alpha (`rgba(...,<0.7)`) text nodes on the homepage —
  hero subtext / price-card labels / badges set with faded white. Same WCAG-AA failures as met.
- **Sub-14px type**: `minFontPx` 12; ~19% of homepage text nodes are <14px (eyebrows, chips, badges).
- **No imagery**: `numImg: 0` on the homepage — all type/icons, zero product or service photography.
- **Mobile tap targets**: ~20 interactive elements under 40px tall at 390px (nav + footer links).
- No horizontal overflow at 1280 or 390 — responsive plumbing is sound (same as met).

## Net
nmet "loses" on polish, drama, and features (no commerce, smaller hero, a broken map) but "wins" on
**homepage information density and mobile economy**. Its hero composition (copy + price card) and its
contact info-card are the parts worth carrying into the rebuild.
