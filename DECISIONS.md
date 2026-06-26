# DECISIONS

Running log of non-obvious choices, newest first. One line of "why" each.
Aesthetic anchor: **Broadcast Service-Bench** (see the project bible in
`docs/superpowers/specs/`).

## 2026-06-24 — De-pill + icon audit + debug pass

- **Killed all rounded "pill" chips** (`--radius-full` + glowing-dot `::before` +
  hover-lift) in favor of flat, square, hairline treatments. *Why:* rounded dot-pills
  are the templated "AI-slop" tell; flat spec-sheet labels read as an instrument/manifest
  and fit the Broadcast Service-Bench anchor.
  - **Hero trust badges** → a monospace **credential plate** segmented by hairline rules
    (`SAMSUNG AUTHORIZED │ BBB A+ │ …`). Removed the 4× repeated `check` glyph. *Why:* one
    repeated icon across four items is meaningless decoration.
  - **Brands (13+)** → a **parts-manifest grid**: hairline cells + monospace
    `counter(...)` index (`01 Samsung │ 02 LG …`). No dots, no lift. *Why:* a manifest
    encodes "authorized list" better than a pill cloud; the index is structural, not decor.
  - **Services brand pills** → flat square hairline labels (`--radius-sm`); **capability
    chips** keep their mono tag but trade the red dot for a leading `+` marker. *Why:* "+"
    reads as an added capability/spec; the dot was ornamental.
  - **Home-warranty coverage pills** → flat uppercase **monospace coverage tags**. *Why:*
    a covered-systems list should look like a spec readout, not marketing chips.
- **Icon audit / fixes.** Added two on-theme glyphs — `chip` (IC/board, true to
  board-level repair) and `printer` (fax) — and remapped mismatches:
  `shield`→`chip` for "Original manufacturer parts," `doc`→`printer` for "Fax,"
  `check`→`shield` for "Backed by a repair warranty." *Why:* shield means protection, not a
  part; doc is not a fax; `check` was an overused catch-all.
- **Debug findings (no code bugs).** The mid-page "empty bands" are the pinned
  `ScrollStory` scroll runway + below-fold `.reveal` content captured before the scroll
  observer fires in a *static* screenshot — DOM confirms every section is `opacity:1` with
  real content (bible-compliant). The floating "N" circle is the Next.js **dev-tools**
  indicator, not a site element. Console: 0 errors (1 trivial preload warning on a
  `Placeholder` CSS chunk — still outstanding).
- **Header nav wrapping fixed.** Added `white-space: nowrap` to nav links + phone and
  tightened the desktop-nav gap to `--sp-5`; bar no longer overflows at 1280. *Why:* flex
  was shrinking items below content width, wrapping "Home Warranty" / the phone number.

Gate: `npm run build` passes (20/20 static routes, zero TS/lint errors).

## 2026-06-24 — "Power-on the bench" signature + instrument readouts

- **Hero oscilloscope graticule (the signature).** A faint measurement grid behind the
  hero, radially masked (`mask-image`) so it fades behind the copy and reads strongest in
  the open right side — plus a one-shot **power-on signal sweep** (`heroSweep`, 1 iteration,
  staggered 0.35s after load) that crosses once and settles. Brand-red sweep = broadcast
  "on-air" signal (chose red over amber: more on-brand, no new primitive). Reduced-motion
  shows the grid static, sweep suppressed. New semantic tokens `--graticule-line/-gap/-sweep`
  in both themes (grid reads brighter on the dark bench). *Why:* one orchestrated, on-subject
  moment beats scattered micro-interactions and ties the whole brand to the test bench.
- **Stats → bench channel readouts.** Each stat now has its own hairline channel rule with a
  red "active" tick, a big tabular value, and a monospace key; left-aligned, replacing the
  centered 4-up with per-cell dividers. *Why:* reinforces the instrument language; a readout
  row is more characteristic than a generic stat strip.
- Verified in light + dark at 1280; `npm run build` passes 20/20; 0 console errors;
  mono labels sit at the 12px floor (`--fs-xs`), AA preserved (graticule is masked away from
  text, no opacity-as-color introduced).
