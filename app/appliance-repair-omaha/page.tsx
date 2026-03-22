import { buildMetadata } from "@/lib/metadata";
import { CityLandingPage } from "@/components/CityLandingPage";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Appliance Repair in Omaha, NE — Factory-Authorized Service",
  description:
    `Factory-authorized in-home appliance repair in Omaha, NE. Samsung, LG, GE, Electrolux & more. ${BUSINESS.diagnosticLincolnOmaha} in-home diagnostic — deductible toward your repair. Call ${BUSINESS.phone}.`,
  path: "/appliance-repair-omaha",
  keywords: [
    "appliance repair Omaha NE",
    "factory authorized appliance repair Omaha",
    "in-home appliance repair Omaha Nebraska",
    "washer dryer repair Omaha NE",
    "refrigerator repair Omaha NE",
  ],
});

export default function ApplianceRepairOmahaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${BUSINESS.url}/appliance-repair-omaha#business`,
            name: BUSINESS.name,
            image: `${BUSINESS.url}/docs/metro-logo.png`,
            url: `${BUSINESS.url}/appliance-repair-omaha`,
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
              name: "Omaha",
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
        city="Omaha"
        state="NE"
        region="Omaha Metro"
        nearbyAreas={["Papillion", "La Vista", "Ralston", "Elkhorn"]}
        localContext="We provide factory-authorized in-home appliance repair across Douglas County and the greater Omaha metro. Our Lincoln-based technicians serve Omaha with same-week scheduling for most repairs."
        diagnosticFee={BUSINESS.diagnosticLincolnOmaha}
        serviceFocus="Omaha metro customers benefit from dedicated route scheduling — our technicians group Omaha-area appointments for efficient same-week service across Douglas and Sarpy counties."
        cityHighlight="From West Omaha to Benson, Dundee to South O — we cover every Omaha neighborhood. Samsung, LG, GE, and Electrolux owners across the metro trust our factory-authorized expertise."
        zips={[]}
      />
    </>
  );
}
