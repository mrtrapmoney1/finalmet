import { buildMetadata } from "@/lib/metadata";
import { CityLandingPage } from "@/components/CityLandingPage";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Appliance Repair in Lincoln, NE — Factory-Authorized Service",
  description:
    `Factory-authorized in-home appliance repair in Lincoln, NE. Samsung, LG, GE, Electrolux & more. ${BUSINESS.diagnosticLincolnOmaha} in-home diagnostic — deductible toward your repair. Call ${BUSINESS.phone}.`,
  path: "/appliance-repair-lincoln",
  keywords: [
    "appliance repair Lincoln NE",
    "factory authorized appliance repair Lincoln",
    "in-home appliance repair Lincoln Nebraska",
    "washer dryer repair Lincoln NE",
    "refrigerator repair Lincoln NE",
  ],
});

export default function ApplianceRepairLincolnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${BUSINESS.url}/appliance-repair-lincoln#business`,
            name: BUSINESS.name,
            image: `${BUSINESS.url}/docs/metro-logo.png`,
            url: `${BUSINESS.url}/appliance-repair-lincoln`,
            telephone: BUSINESS.phone,
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1107 North Cotner Blvd",
              addressLocality: "Lincoln",
              addressRegion: "NE",
              postalCode: "68505",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 40.8241127,
              longitude: -96.6336259,
            },
            areaServed: {
              "@type": "City",
              name: "Lincoln",
              containedInPlace: {
                "@type": "State",
                name: "Nebraska",
              },
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "08:30",
                closes: "18:00",
              },
            ],
          }),
        }}
      />
      <CityLandingPage
        city="Lincoln"
        state="NE"
        region="Lincoln Metro"
        nearbyAreas={["Waverly", "Hickman", "Crete", "Seward", "Milford"]}
        localContext="Located at 1107 North Cotner Blvd, we're minutes from the University of Nebraska campus and serve all of Lancaster County. Same-day and next-day appointments available for most appliance repairs."
        diagnosticFee={BUSINESS.diagnosticLincolnOmaha}
        serviceFocus="As our home base, Lincoln customers get priority scheduling and the fastest response times. Most Lincoln repairs are completed within 24–48 hours of diagnosis."
        cityHighlight="Our shop is centrally located near 11th & Cotner — easy access from anywhere in Lincoln. We've been a fixture of the neighborhood since 1947, three blocks from Cotner Center."
        zips={[]}
      />
    </>
  );
}
