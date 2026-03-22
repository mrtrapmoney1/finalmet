import { buildMetadata } from "@/lib/metadata";
import { CityLandingPage } from "@/components/CityLandingPage";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title:
    "Appliance Repair in Southeast Nebraska — Factory-Authorized Service",
  description:
    `Factory-authorized in-home appliance repair across southeast Nebraska. Samsung, LG, GE, Electrolux & more. ${BUSINESS.diagnosticExtended} in-home diagnostic — deductible toward your repair. Call ${BUSINESS.phone}.`,
  path: "/appliance-repair-southeast-nebraska",
  keywords: [
    "appliance repair southeast Nebraska",
    "factory authorized appliance repair Nebraska",
    "in-home appliance repair Nebraska City",
    "appliance repair Beatrice NE",
    "appliance repair Falls City NE",
  ],
});

export default function ApplianceRepairSoutheastNebraskaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${BUSINESS.url}/appliance-repair-southeast-nebraska#business`,
            name: BUSINESS.name,
            image: `${BUSINESS.url}/docs/metro-logo.png`,
            url: `${BUSINESS.url}/appliance-repair-southeast-nebraska`,
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
              "@type": "AdministrativeArea",
              name: "Southeast Nebraska",
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
        city="Southeast Nebraska"
        state="NE"
        region="Southeast Nebraska"
        nearbyAreas={["Nebraska City", "Beatrice", "Falls City", "Auburn"]}
        localContext="We provide factory-authorized in-home appliance repair to communities across southeast Nebraska, from Nebraska City to Beatrice and beyond."
        diagnosticFee={BUSINESS.diagnosticExtended}
        serviceFocus="Southeast Nebraska communities are part of our extended coverage area. We schedule dedicated route days south of Lincoln to ensure reliable service across Gage, Otoe, Richardson, and Nemaha counties."
        cityHighlight="Rural Nebraska often gets overlooked by factory-authorized services. We've been making the drive since 1947 — bringing the same OEM parts, factory training, and diagnostic precision to small-town Nebraska."
        zips={[]}
      />
    </>
  );
}
