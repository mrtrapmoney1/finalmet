# Metro TV & Appliances — Company Facts

Source of truth for rebuild copy. Extracted from `../met/lib/constants.ts`,
`../met/components/JsonLd.tsx`, `../met/lib/zip-codes.ts`, and the FAQ/warranty/
how-it-works pages in both reference repos (`../met` and `../nmet` agree on every
fact below unless noted). Use this to write real content — don't invent facts not
listed here, and flag anything you need that isn't here instead of guessing.

## Identity

- **Legal/trade name:** Metro TV & Appliances
- **Also seen as (Google Business listing / alternate name):** Metro TV/Audiotech and Appliance Services
- **Founded:** 1947, by **Mr. Fiedler** — 77+ years in business
- **Website domain:** `https://metrotv-audiotech.com`
- **Positioning line (from schema):** "Factory-authorized appliance, TV, audio, and commercial microwave repair in Lincoln, NE. Samsung Established Authorized Service Center. Serving Nebraska since 1947."

## Location & contact

- **Address:** 1107 North Cotner Blvd, Lincoln, NE 68505
- **Phone:** (402) 466-9090 — `tel:+14024669090`
- **Fax:** (402) 466-2757
- **Hours:** Monday–Friday, 8:30 AM – 6:00 PM (closed weekends; walk-ins welcome during hours, no appointment needed for drop-off)
- **Geo coordinates:** 40.8241127, -96.6336259
- **Google Maps listing:** `https://www.google.com/maps/place/Metro+TV%2FAudiotech+and+Appliance+Services/@40.8241167,-96.6362008,17z`

## Trust signals / accreditation

- **BBB Accredited Business — A+ Rating.** BBB profile: `https://www.bbb.org/us/ne/lincoln/profile/computer-repair/metro-tvaudio-tech-0714-207002332`
- **Samsung Established Authorized Service Center**
- Factory-authorized for 13+ brands (see Brands below)
- Social: Instagram `instagram.com/metrotva`, Facebook `facebook.com/profile.php?id=61561967326627`

## Services & delivery model

| Service | Delivery | Notes |
|---|---|---|
| **Appliance Repair** | In-home, 200+ zip codes | Washers, dryers, refrigerators, dishwashers, etc. Diagnoses to root cause (fault codes, ECM reads, motor-terminal voltage). |
| **TV Repair** | Drop-off at Lincoln shop only | Board-level repair (PSU, T-Con, LED driver, A-board) — not panel-swapping. |
| **TV & Audio Repair** | Drop-off at Lincoln shop only | Analog + digital gear: BJTs, RIAA phono preamps, ESR checks, VTA/azimuth alignment. |
| **Commercial Microwave Repair** | Drop-off at Lincoln shop only | HV circuit, mode stirrer motor, mica cover panel, membrane switch matrix. |

No in-home service for TV/audio/commercial — appliances are the only in-home category.

## Brands serviced (factory-authorized)

**Appliance:** Samsung, LG, GE Appliances, Electrolux, Maytag, KitchenAid, JennAir, Amana, Frigidaire, Sharp, Panasonic, Speed Queen, Hisense
**TV:** Samsung, LG, Sony, Vizio, TCL
**Audio:** Yamaha, Denon, Marantz, Pioneer
**Commercial microwave:** Amana, Sharp, Panasonic, Menumaster

(13+ authorized brands total is the headline stat used across both sites.)

## Pricing — diagnostic fees

- **Drop-off (TV / audio / commercial microwave):** $42.90
- **In-home appliance, Lincoln/Omaha area:** $149.08
- **In-home appliance, extended coverage area:** $175.08
- Diagnostic fee is **applied toward the repair cost** if the customer proceeds.
- **Always a written estimate before work begins** — no work without explicit customer approval, no surprise charges.
- OEM parts exclusively — no aftermarket substitutes.

## Repair process (6 steps, used on "How It Works")

1. Call or submit a contact-form request — describe equipment + symptoms.
2. Schedule service — in-home appointment window for appliances; walk-in drop-off (no appointment) for TV/audio/commercial.
3. Diagnosis to root cause; diagnostic fee charged here, credited toward repair.
4. Written estimate (parts + labor) presented before any work starts.
5. Repair performed with OEM parts.
6. Quality check; repair backed by warranty.

## Warranty

- **90-day parts and labor warranty** on every repair.
- Covers: defective OEM parts installed by Metro TV, and recurrence of the same issue due to their workmanship.
- Excludes: misuse/power-surge damage after repair, new unrelated failures, consumables (filters, bulbs, belts), physical damage/modification after service.
- Claim process: contact within 90 days, reference repair date/issue, free follow-up inspection, no-cost repair if covered.
- Also performs **in-warranty manufacturer repairs** for authorized brands (subject to manufacturer eligibility).
- Supports **SquareTrade extended-warranty claims**: customer files with SquareTrade first, SquareTrade ships parts directly to the customer, Metro TV does the in-home install once parts arrive (customer must call Metro TV to trigger dispatch — SquareTrade doesn't reliably notify them). No cost to customer unless their plan has a deductible.

## Service area

- **200+ zip codes** across Nebraska and Iowa (221 zips enumerated in `zip-codes.ts`).
- **Cities called out by name (schema `areaServed`):** Lincoln, Omaha, Grand Island, Council Bluffs (IA), Nebraska City, Ashland, Seward.
- **Counties called out by name:** Lancaster, Douglas, Saunders, Cass, Saline (all NE).
- Regions covered by the zip list: Council Bluffs IA, Omaha metro (east side + city), Southeast Nebraska, Lincoln metro + city, North/Central Nebraska, Grand Island.
- City-specific landing pages exist for: Lincoln, Omaha, Bellevue, Council Bluffs, Grand Island, Southeast Nebraska.

## What is NOT a fact — placeholder content to replace, not reuse

The reference repos ship explicit placeholder content that must **not** be copied into the rebuild as if real:
- **Testimonials** (`lib/content.ts` `TESTIMONIALS`) — fabricated names/quotes marked `PLACEHOLDER`.
- **Team bios** (`TEAM`) — fabricated technician name/bio marked `PLACEHOLDER`.
- **Featured photos** — placeholder logo image, no real shop/team photography exists yet (both prior sites have zero real photos — flagged in `reviews/SUMMARY.md` as the biggest credibility gap).
- **Announcements** — inactive placeholder banner, not real promo copy.

If real testimonials, staff bios, or photos are needed, they must come from the business owner — don't invent them.
