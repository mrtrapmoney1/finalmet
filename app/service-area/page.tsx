import { buildMetadata } from "@/lib/metadata";
import { NebraskaMap } from "@/components/NebraskaMap";
import { COVERED_ZIPS, SERVICE_REGIONS } from "@/lib/zip-codes";
import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { ZipChecker } from "@/components/ZipChecker";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = buildMetadata({
  title: "Service Area",
  description:
    "Metro TV & Appliances provides factory-authorized in-home appliance repair across 221 zip codes in Lincoln, Omaha, Council Bluffs, Grand Island, and surrounding Nebraska and Iowa communities.",
  path: "/service-area",
  keywords: ["service area", "appliance repair coverage", "Lincoln", "Omaha", "Nebraska", "Iowa", "zip codes"],
});

export default function ServiceAreaPage() {
  return (
    <>
      {/* JSON-LD: areaServed with all zip codes */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            name: BUSINESS.name,
            url: BUSINESS.url,
            telephone: BUSINESS.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: "1107 North Cotner Blvd",
              addressLocality: "Lincoln",
              addressRegion: "NE",
              postalCode: "68505",
              addressCountry: "US",
            },
            areaServed: COVERED_ZIPS.map((zip) => ({
              "@type": "PostalAddress",
              postalCode: zip,
              addressCountry: "US",
            })),
          }),
        }}
      />

      <div className="bg-surface">
        {/* Page header */}
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 fade-up">
          <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
            Appliance Repair Coverage
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-on-surface mb-4">
            Appliance Repair Service Area — Lincoln, Omaha &amp; Surrounding Nebraska
          </h1>
          <p className="text-on-surface-variant max-w-2xl leading-relaxed mb-6">
            Factory-authorized in-home appliance repair across{" "}
            <strong className="text-on-surface">{COVERED_ZIPS.length} zip codes</strong> in
            Nebraska and Iowa — Lincoln, Omaha, Council Bluffs, Grand Island, and
            every community in between.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              Schedule In-Home Service
            </Button>
            <Button href={`tel:${BUSINESS.phone}`} variant="ghost">
              Call {BUSINESS.phone}
            </Button>
          </div>
        </div>

        {/* Map */}
        <ScrollReveal className="max-w-7xl mx-auto px-6 pb-10" delay={150}>
          <NebraskaMap />
        </ScrollReveal>

        {/* Region breakdown */}
        <div className="bg-surface-container-low py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold font-headline text-on-surface mb-10">
              Coverage by Region
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICE_REGIONS.map((region) => (
                <div
                  key={region.name}
                  className="bg-surface rounded-2xl p-6 shadow-ambient"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold font-headline text-on-surface">
                        {region.name}
                      </h3>
                      <p className="text-xs text-on-surface-variant">{region.state}</p>
                    </div>
                    <span className="text-xs font-semibold bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      {region.zips.length} zips
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                    {region.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {region.zips.slice(0, 12).map((zip) => (
                      <span
                        key={zip}
                        className="text-xs bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-label"
                      >
                        {zip}
                      </span>
                    ))}
                    {region.zips.length > 12 && (
                      <span className="text-xs text-on-surface-variant px-1 py-0.5 font-label">
                        +{region.zips.length - 12} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ZIP coverage — marquee ticker + checker */}
        <ScrollReveal className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-5">
            <div>
              <h2 className="text-xl font-bold font-headline text-on-surface">
                {COVERED_ZIPS.length} Zip Codes Covered
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Enter your ZIP to confirm coverage and see your diagnostic fee.
              </p>
            </div>
            <div className="shrink-0">
              <ZipChecker />
            </div>
          </div>

          {/* Marquee ticker — all zips in DOM for SEO, visually compact */}
          <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low overflow-hidden py-3 space-y-2.5">
            {/* Row 1 — scrolls left */}
            <div className="flex gap-3 animate-marquee whitespace-nowrap will-change-transform">
              {[...COVERED_ZIPS, ...COVERED_ZIPS].map((zip, i) => (
                <span key={i} className="text-[11px] font-mono text-on-surface-variant/50 tabular-nums">
                  {zip}
                </span>
              ))}
            </div>
            {/* Row 2 — scrolls right (reversed slice for visual variety) */}
            <div className="flex gap-3 animate-marquee-reverse whitespace-nowrap will-change-transform">
              {[...[...COVERED_ZIPS].reverse(), ...[...COVERED_ZIPS].reverse()].map((zip, i) => (
                <span key={i} className="text-[11px] font-mono text-on-surface-variant/40 tabular-nums">
                  {zip}
                </span>
              ))}
            </div>
            {/* Row 3 — scrolls left, slower */}
            <div className="flex gap-3 whitespace-nowrap will-change-transform" style={{ animation: "marquee 80s linear infinite" }}>
              {[...COVERED_ZIPS, ...COVERED_ZIPS].map((zip, i) => (
                <span key={i} className="text-[11px] font-mono text-on-surface-variant/30 tabular-nums">
                  {zip}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-on-surface-variant mt-2 text-right">
            Not listed?{" "}
            <a href={`tel:${BUSINESS.phone}`} className="text-primary hover:underline font-medium">Call us</a>
            {" "}— extended coverage may be available.
          </p>
        </ScrollReveal>

        {/* Note: drop-off services */}
        <div className="bg-primary py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-white font-bold font-headline text-lg mb-1">
                TV, Audio &amp; Commercial Microwave Repair
              </p>
              <p className="text-white/70 text-sm">
                Drop-off only at our Lincoln shop — not covered by in-home service area.
              </p>
            </div>
            <Button href="/contact" variant="ghost" className="border-white/30 text-white hover:bg-white/10 shrink-0">
              Get Directions to Our Shop
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
