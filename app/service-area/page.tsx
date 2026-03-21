import type { Metadata } from "next";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { COVERED_ZIPS, SERVICE_REGIONS } from "@/lib/zip-codes";
import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Service Area",
  description:
    "Metro TV & Appliances provides factory-authorized in-home appliance repair across 221 zip codes in Lincoln, Omaha, Council Bluffs, Grand Island, and surrounding Nebraska and Iowa communities.",
};

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
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
            Appliance Repair Coverage
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-on-surface mb-4">
            We Come to You.
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
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <ServiceAreaMap />
          <p className="text-xs text-on-surface-variant mt-3 text-center">
            Orange markers = regional coverage hubs · Blue marker = our Lincoln shop
          </p>
        </div>

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

        {/* Full zip code list — SEO content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold font-headline text-on-surface mb-2">
            All Covered Zip Codes
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            In-home appliance repair available at these locations. Not sure if you&apos;re
            covered?{" "}
            <a href={`tel:${BUSINESS.phone}`} className="text-primary hover:underline">
              Call us
            </a>{" "}
            and we&apos;ll confirm.
          </p>
          <div className="flex flex-wrap gap-2">
            {COVERED_ZIPS.map((zip) => (
              <span
                key={zip}
                className="text-xs font-label bg-surface-container-low border border-outline-variant/20 px-3 py-1 rounded-full text-on-surface-variant"
              >
                {zip}
              </span>
            ))}
          </div>
        </div>

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
