import { buildMetadata } from "@/lib/metadata";
import { CityLandingPage } from "@/components/CityLandingPage";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Appliance Repair in Bellevue, NE — Factory-Authorized Service",
  description:
    `Factory-authorized in-home appliance repair in Bellevue, NE. Samsung, LG, GE, Electrolux & more. ${BUSINESS.diagnosticLincolnOmaha} in-home diagnostic — deductible toward your repair. Call ${BUSINESS.phone}.`,
  path: "/appliance-repair-bellevue",
  keywords: [
    "appliance repair Bellevue NE",
    "factory authorized appliance repair Bellevue",
    "in-home appliance repair Bellevue Nebraska",
    "appliance repair Sarpy County",
    "appliance repair near Offutt AFB",
  ],
});

export default function ApplianceRepairBellevuePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${BUSINESS.url}/appliance-repair-bellevue#business`,
            name: BUSINESS.name,
            image: `${BUSINESS.url}/docs/metro-logo.png`,
            url: `${BUSINESS.url}/appliance-repair-bellevue`,
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
              name: "Bellevue",
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
        city="Bellevue"
        state="NE"
        region="Sarpy County"
        nearbyAreas={["Papillion", "La Vista", "Offutt AFB area"]}
        localContext="Serving Bellevue and all of Sarpy County with factory-authorized in-home appliance repair. We cover zip codes 68005, 68123, and 68147."
        diagnosticFee={BUSINESS.diagnosticLincolnOmaha}
        serviceFocus="Bellevue and Sarpy County are part of our Omaha metro routes. Military families near Offutt AFB and residents across Bellevue get the same responsive scheduling as our Omaha customers."
        cityHighlight="Nebraska's third-largest city deserves factory-authorized service. From Fontenelle Forest to Twin Creek, we bring Samsung, LG, and GE expertise directly to your Bellevue home."
        zips={[]}
      />
    </>
  );
}
