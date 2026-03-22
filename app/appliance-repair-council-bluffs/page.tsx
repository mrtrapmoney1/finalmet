import { buildMetadata } from "@/lib/metadata";
import { CityLandingPage } from "@/components/CityLandingPage";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Appliance Repair in Council Bluffs, IA — Factory-Authorized Service",
  description:
    "Factory-authorized in-home appliance repair in Council Bluffs, IA. Samsung, LG, GE, Electrolux & more. $42.90 diagnostic — applied toward your repair. Call (402) 466-9090.",
  path: "/appliance-repair-council-bluffs",
  keywords: [
    "appliance repair Council Bluffs IA",
    "factory authorized appliance repair Council Bluffs",
    "in-home appliance repair Council Bluffs Iowa",
    "appliance repair Pottawattamie County",
    "appliance repair western Iowa",
  ],
});

export default function ApplianceRepairCouncilBluffsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${BUSINESS.url}/appliance-repair-council-bluffs#business`,
            name: BUSINESS.name,
            image: `${BUSINESS.url}/docs/metro-logo.png`,
            url: `${BUSINESS.url}/appliance-repair-council-bluffs`,
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
              name: "Council Bluffs",
              containedInPlace: {
                "@type": "State",
                name: "Iowa",
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
        city="Council Bluffs"
        state="IA"
        region="Pottawattamie County"
        nearbyAreas={["Carter Lake", "Crescent", "Treynor"]}
        localContext="We cross the Missouri River to serve Council Bluffs and western Iowa with factory-authorized appliance repair from our Lincoln shop."
        zips={[]}
      />
    </>
  );
}
