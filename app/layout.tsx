import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BUSINESS } from "@/lib/constants";
import { JsonLd } from "@/components/JsonLd";
import { CartProvider } from "@/components/CartProvider";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

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
    "factory authorized appliance repair",
    "Samsung appliance repair Lincoln",
    "LG appliance repair Lincoln",
    "commercial microwave repair Nebraska",
    "BBB accredited appliance repair",
    "Metro TV Appliances Lincoln",
  ],
  authors: [{ name: BUSINESS.name }],
  alternates: {
    canonical: BUSINESS.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} | Factory-Authorized Repair — Lincoln, NE`,
    description:
      "Factory-authorized appliance, TV, audio, and commercial microwave repair in Lincoln, NE. BBB A+ accredited. Serving Nebraska since 1947.",
  },
  twitter: {
    card: "summary",
    title: `${BUSINESS.name} | Factory-Authorized Repair`,
    description:
      "Factory-authorized appliance, TV, audio, and commercial microwave repair in Lincoln, NE. BBB A+ accredited since 1947.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, manrope.variable, "font-sans")}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          />
        </noscript>
        {/* Local SEO geo meta tags */}
        <meta name="geo.region" content="US-NE" />
        <meta name="geo.placename" content="Lincoln, Nebraska" />
        <meta name="geo.position" content="40.8241127;-96.6336259" />
        <meta name="ICBM" content="40.8241127, -96.6336259" />
      </head>
      <body suppressHydrationWarning>
        <CartProvider>
          <JsonLd />
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
