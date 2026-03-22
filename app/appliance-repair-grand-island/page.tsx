import { buildMetadata } from "@/lib/metadata";
import { CityLandingPage } from "@/components/CityLandingPage";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Appliance Repair in Grand Island, NE — Factory-Authorized Service",
  description:
    "Factory-authorized in-home appliance repair in Grand Island, NE. Samsung, LG, GE, Electrolux & more. $42.90 diagnostic — applied toward your repair. Call (402) 466-9090.",
  path: "/appliance-repair-grand-island",
  keywords: [
    "appliance repair Grand Island NE",
    "factory authorized appliance repair Grand Island",
    "in-home appliance repair Grand Island Nebraska",
    "appliance repair Hall County",
    "appliance repair central Nebraska",
  ],
});

export default function ApplianceRepairGrandIslandPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${BUSINESS.url}/appliance-repair-grand-island#business`,
            name: BUSINESS.name,
            image: `${BUSINESS.url}/docs/metro-logo.png`,
            url: `${BUSINESS.url}/appliance-repair-grand-island`,
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
              name: "Grand Island",
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
        city="Grand Island"
        state="NE"
        region="Hall County"
        nearbyAreas={["Hastings", "Kearney", "Aurora"]}
        localContext="Serving Grand Island and central Nebraska communities with factory-authorized in-home appliance repair. Extended coverage for Hall County and surrounding areas."
        zips={[]}
      />
    </>
  );
}
