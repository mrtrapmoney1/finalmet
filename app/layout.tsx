import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { BUSINESS } from "@/lib/business";
import { SERVED_CITIES, SERVED_COUNTIES } from "@/lib/service-area";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: `${BUSINESS.name} | Factory-Authorized Repair — Lincoln, NE`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    "Factory-authorized appliance, TV, audio, and commercial microwave repair in Lincoln, NE. BBB A+ accredited. Serving Nebraska since 1947. Call (402) 466-9090.",
  keywords: [
    "appliance repair Lincoln NE",
    "TV repair Lincoln Nebraska",
    "home warranty appliance repair",
    "factory authorized appliance repair",
    "commercial microwave repair Nebraska",
    "audio equipment repair Lincoln",
  ],
  alternates: { canonical: BUSINESS.url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} | Factory-Authorized Repair — Lincoln, NE`,
    description:
      "Appliance, TV, audio & commercial microwave repair in Lincoln, NE. We diagnose to the root cause with original manufacturer parts. BBB A+ accredited. Serving Nebraska since 1947.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} | Factory-Authorized Repair — Lincoln, NE`,
    description:
      "Appliance, TV, audio & commercial microwave repair in Lincoln, NE. BBB A+ accredited. Serving Nebraska since 1947.",
  },
  robots: { index: true, follow: true },
};

function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${BUSINESS.url}/#business`,
    name: BUSINESS.name,
    alternateName: BUSINESS.legalAlt,
    description:
      "Factory-authorized appliance, TV, audio, and commercial microwave repair in Lincoln, NE. Serving Nebraska since 1947.",
    url: BUSINESS.url,
    telephone: "+1-402-466-9090",
    faxNumber: "+1-402-466-2757",
    foundingDate: "1947",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.state,
      postalCode: BUSINESS.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    hasMap: BUSINESS.mapUrl,
    // Geometric in-home service region: a circle centered on the shop that
    // covers the named metro spread (Lincoln–Omaha–Grand Island–Council Bluffs).
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS.geo.lat,
        longitude: BUSINESS.geo.lng,
      },
      geoRadius: "160000", // meters (~160 km)
    },
    areaServed: [
      ...SERVED_CITIES.map((c) => ({
        "@type": "City",
        name: c.name,
        ...(c.geo && {
          geo: { "@type": "GeoCoordinates", latitude: c.geo.lat, longitude: c.geo.lng },
        }),
        address: { "@type": "PostalAddress", addressRegion: c.state, addressCountry: "US" },
      })),
      ...SERVED_COUNTIES.map((c) => ({
        "@type": "AdministrativeArea",
        name: c.name,
        address: { "@type": "PostalAddress", addressRegion: c.state, addressCountry: "US" },
      })),
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "18:00",
      },
    ],
    sameAs: [BUSINESS.social.facebook, BUSINESS.social.instagram, BUSINESS.social.bbb],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="US-NE" />
        <meta name="geo.placename" content="Lincoln, Nebraska" />
        <meta name="geo.position" content="40.8241127;-96.6336259" />
        {/* Set the JS flag + restore the saved theme before paint (no flash). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='light';document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}document.documentElement.classList.add('js');})()",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
      </head>
      <body>
        <div id="reading-progress" className="reading-progress" aria-hidden="true" />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionRoot />
      </body>
    </html>
  );
}
