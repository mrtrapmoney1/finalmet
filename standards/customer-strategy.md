# Metro TV & Appliances — Customer Strategy & Page Roadmap

Companion to `standards/company-facts.md` (hard facts). This file is the *positioning*
layer: who we're building pages for, why, and in what order. Confirmed with the business
owner on 2026-06-21 — treat as current direction until told otherwise.

## About Us synopsis (for an About/Home page)

> Metro TV & Appliances has been repairing what Nebraska homes and businesses rely on
> since 1947. We're a factory-authorized service center — Samsung, LG, GE, Yamaha,
> Denon, and 13+ other brands — which means we diagnose to the root cause with real
> manufacturer parts and documentation, not guesswork or aftermarket substitutes. BBB
> A+ accredited, based in Lincoln, NE, serving 200+ zip codes across Nebraska and Iowa.

Keep the "since 1947" framing — that's the lineage the brand uses publicly. Don't
introduce alternate founding dates without checking with the owner first.

## Customer segments, ranked by current priority

### 1. Homeowners with (or shopping for) a home warranty — primary target
This is the lead segment for near-term page work. Skews **middle-to-high income**, and
this group is the most likely to already carry a home warranty. Their need isn't "find a
repair shop," it's "don't get surprised by a repair bill." Appliance parts pricing swings
hard by brand and model — a control board or compressor can cost dramatically more on
one brand than another — so the cost risk is genuinely unpredictable for a homeowner
shopping without coverage. Note the cost shape: **parts are the expensive part, not
labor** — so coverage that offsets parts is where the real savings is.

A common entry point for this segment: a **recently bought appliance that's already
failed.** Teach them the coverage they may not realize they have (all trust-builders, not
upsells):
- **Manufacturer warranty** typically runs **~1 year** for general defects, but often
  **5–10 years on sealed-system issues** (the refrigeration/compressor circuit) on many
  brands — always worth checking before assuming a repair is out-of-pocket.
- **Call the manufacturer even if it looks out of warranty** — they sometimes cover the
  full cost or part of it (goodwill / partial coverage), especially on a newer unit.
- **If there's no extended warranty, check home *insurance* coverage** — distinct from a
  home warranty; some policies cover certain appliance failures.

(We are not the coverage provider for any of the above — frame each as "worth checking,"
keep the provider-disclaimer pattern and the softener language from the content rules.)

**Positioning:** we recommend home warranty coverage *because* of that price variance,
not as an upsell. Lean into "we're warranty-claim-friendly" — we have an in-house
repair-warranty process and handle third-party claim dispatch (see the warranty terms /
SquareTrade flow in `company-facts.md`), so we know how to work with a homeowner's
existing plan, file paperwork correctly, and avoid the back-and-forth that stalls
warranty repairs elsewhere. The manufacturer-warranty / home-insurance tips above are
the trust hook — we help you *not* spend money where you don't have to, which earns the
job when you do need to pay.

**This is the consumer-focused page to build first** — see Phase 1 below.

### 2. Local businesses with heavy TV usage — restaurants, bars, gyms
Multiple screens running long hours, downtime directly costs them customers/revenue.
Distinct from a homeowner replacing one living-room TV: this segment needs board-level
repair turnaround they can plan around, and probably values a standing relationship
(call when *any* screen in the building goes down) over a one-off transaction.
Pair this with the existing consumer TV repair offering rather than replacing it —
same service, two different landing experiences.

### 3. Restaurants needing commercial microwave repair
Same logic as TV-for-business: kitchen equipment uptime is revenue-critical. Builds on
the existing `/commercial` page (Amana, Sharp, Panasonic, Menumaster authorized) — the
new work here is messaging aimed at kitchen managers/owners, not consumers.

Market is bigger than it looks: **nearly every restaurant runs a commercial microwave,
and fast-food kitchens lean on them heavily** — high-cycle units that fail under volume.
What this buyer needs is **fast turnaround** (a dead unit stalls the line), so the
offering to lead with is **loaner units while we repair** and **discounted/competitive
repair cost** to win the relationship. Pitch it as keeping the kitchen running, not as a
one-off fix.

> ⚠️ **Flag for the owner:** `company-facts.md` currently lists commercial microwave as
> **drop-off at the Lincoln shop only** ($42.90 drop-off fee), which conflicts with
> "quick fixes + loaners" for a restaurant that can't bring the unit in mid-service.
> Confirm the loaner program, any on-site/pickup option, and the discounted-cost terms
> before putting them in customer-facing copy — and update `company-facts.md` once
> confirmed so the hard-facts file stays the source of truth.

### 4. Audio equipment owners — niche, highest-expertise, drop-off only
Smallest segment, but the deepest technical specialty (board-level analog/digital
work — BJTs, RIAA phono preamps, ESR testing, VTA/azimuth alignment). Demand currently
outpaces capacity: **set expectations of a 1–3 month minimum wait** rather than
hiding it. This filters toward customers who want it done right over customers who
want it done fast, which matches the "heirloom-quality" positioning already in the
brand voice. Don't undersell the wait to win a job — it'll cause support friction.

## Why this order

Appliance/warranty work is the highest-volume, most predictable lead source (200+ zip
codes, in-home, recurring demand). TV and commercial microwave are still real revenue
but require reaching a B2B buyer, which is a slower page-by-page sales motion. Audio is
intentionally last — it's capacity-constrained, so growing its top-of-funnel before
fixing the wait-time problem would just lengthen the backlog.

## Page-build roadmap

1. **Phase 1 — Consumer home-warranty page (next to build).** A residential landing
   page that explains: appliance repair costs vary widely by brand/model, a home
   warranty smooths that risk, and Metro TV is experienced at working *with* warranty
   claims (in-house + manufacturer + third-party/SquareTrade-style dispatch). CTA
   toward scheduling in-home service. This is the "first step" page referenced by the
   owner — build it before the B2B pages below.
2. **Phase 2 — TV, split by audience.** Keep/refresh the existing consumer TV repair
   page, and add a business-facing variant (or a clearly separated section) targeting
   restaurants/bars/gyms with multiple screens — emphasize reliability and a repeat
   relationship over a one-time fix.
3. **Phase 3 — Commercial microwave, restaurant-focused.** Extend the existing
   `/commercial` page with copy aimed at restaurant owners/kitchen managers rather than
   general consumers.
4. **Phase 4 — Audio, niche/expertise page.** Lead with technical depth and brand
   authorization (Yamaha, Denon, Marantz, Pioneer); state the 1–3 month wait plainly as
   a function of demand for a specialty service, not a weakness.
