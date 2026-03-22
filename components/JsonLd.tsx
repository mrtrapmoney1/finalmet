import { BUSINESS } from "@/lib/constants";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": `${BUSINESS.url}/#business`,
        name: "Metro TV & Appliances",
        alternateName: "Metro TV/Audiotech and Appliance Services",
        description:
          "Factory-authorized appliance, TV, audio, and commercial microwave repair in Lincoln, NE. Samsung Established Authorized Service Center. Serving Nebraska since 1947.",
        url: BUSINESS.url,
        telephone: "+1-402-466-9090",
        faxNumber: "+1-402-466-2757",
        foundingDate: "1947",
        priceRange: "$$",
        image: `${BUSINESS.url}/docs/metro-logo.png`,
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
        hasMap:
          "https://www.google.com/maps/place/Metro+TV%2FAudiotech+and+Appliance+Services/@40.8241167,-96.6362008,17z",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:30",
            closes: "18:00",
          },
        ],
        areaServed: [
          { "@type": "City", name: "Lincoln", containedInPlace: { "@type": "State", name: "Nebraska" } },
          { "@type": "City", name: "Omaha", containedInPlace: { "@type": "State", name: "Nebraska" } },
          { "@type": "City", name: "Grand Island", containedInPlace: { "@type": "State", name: "Nebraska" } },
          { "@type": "City", name: "Council Bluffs", containedInPlace: { "@type": "State", name: "Iowa" } },
          { "@type": "City", name: "Nebraska City", containedInPlace: { "@type": "State", name: "Nebraska" } },
          { "@type": "City", name: "Ashland", containedInPlace: { "@type": "State", name: "Nebraska" } },
          { "@type": "City", name: "Seward", containedInPlace: { "@type": "State", name: "Nebraska" } },
          { "@type": "AdministrativeArea", name: "Lancaster County, Nebraska" },
          { "@type": "AdministrativeArea", name: "Douglas County, Nebraska" },
          { "@type": "AdministrativeArea", name: "Saunders County, Nebraska" },
          { "@type": "AdministrativeArea", name: "Cass County, Nebraska" },
          { "@type": "AdministrativeArea", name: "Saline County, Nebraska" },
        ],
        knowsAbout: [
          "Appliance Repair",
          "Refrigerator Repair",
          "Washer and Dryer Repair",
          "Dishwasher Repair",
          "TV Repair",
          "Audio Equipment Repair",
          "Commercial Microwave Repair",
          "Samsung Authorized Service",
          "LG Appliance Repair",
          "GE Appliance Repair",
        ],
        sameAs: [
          "https://www.google.com/maps/place/Metro+TV%2FAudiotech+and+Appliance+Services/@40.8241167,-96.6362008,17z",
          "https://instagram.com/metrotva/",
          "https://www.facebook.com/profile.php?id=61561967326627",
        ],
        accreditation: "BBB Accredited Business — A+ Rating",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: "[data-speakable]",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BUSINESS.url}/#website`,
        url: BUSINESS.url,
        name: "Metro TV & Appliances",
        publisher: { "@id": `${BUSINESS.url}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
