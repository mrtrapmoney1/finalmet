import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { BUSINESS, SERVICES } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* JSON-LD: LocalBusiness for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${BUSINESS.url}/#business`,
            name: BUSINESS.name,
            alternateName: "Metro TV Audio Tech",
            image: `${BUSINESS.url}/docs/metro-logo.png`,
            url: BUSINESS.url,
            telephone: BUSINESS.phone,
            faxNumber: BUSINESS.fax,
            foundingDate: "1947",
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
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                opens: "08:30",
                closes: "18:00",
              },
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Repair Services",
              itemListElement: SERVICES.map((s) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: s.title,
                  description: s.description,
                  url: `${BUSINESS.url}${s.href}`,
                },
              })),
            },
            areaServed: [
              { "@type": "City", name: "Lincoln", containedInPlace: { "@type": "State", name: "Nebraska" } },
              { "@type": "City", name: "Omaha", containedInPlace: { "@type": "State", name: "Nebraska" } },
              { "@type": "City", name: "Council Bluffs", containedInPlace: { "@type": "State", name: "Iowa" } },
              { "@type": "City", name: "Grand Island", containedInPlace: { "@type": "State", name: "Nebraska" } },
            ],
            sameAs: [
              "https://www.facebook.com/MetroTVLincoln",
              "https://www.bbb.org/us/ne/lincoln/profile/computer-repair/metro-tvaudio-tech-0714-207002332",
              "https://www.google.com/maps/place/Metro+TV+%26+Appliances/@40.8241167,-96.6362008,17z",
            ],
          }),
        }}
      />
      <Hero />
      <TrustBar />
      <Services />
      <Testimonials />
      <CTA />
    </>
  );
}
