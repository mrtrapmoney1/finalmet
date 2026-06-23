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
This is the lead segment for near-term page work. Their need isn't "find a repair
shop," it's "don't get surprised by a repair bill." Appliance parts pricing swings
hard by brand and model — a control board or compressor can cost dramatically more on
one brand than another — so the cost risk is genuinely unpredictable for a homeowner
shopping without coverage.

**Positioning:** we recommend home warranty coverage *because* of that price variance,
not as an upsell. Lean into "we're warranty-claim-friendly" — we already have an
in-house 90-day warranty process and handle third-party claim dispatch (see
SquareTrade flow in `company-facts.md`), so we know how to work with a homeowner's
existing plan, file paperwork correctly, and avoid the back-and-forth that stalls
warranty repairs elsewhere.

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
