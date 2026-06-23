// Business facts — single source of truth, mirrors standards/company-facts.md.
// Keep copy advertising-oriented; avoid definitive liability/guarantee statements.

export const BUSINESS = {
  name: "Metro TV & Appliances",
  shortName: "Metro TV & Appliances",
  legalAlt: "Metro TV/Audiotech and Appliance Services",
  address: "1107 North Cotner Blvd, Lincoln, NE 68505",
  street: "1107 North Cotner Blvd",
  city: "Lincoln",
  state: "NE",
  zip: "68505",
  phone: "(402) 466-9090",
  phoneHref: "tel:+14024669090",
  fax: "(402) 466-2757",
  email: "service@metrotv-audiotech.com", // CONFIRM: monitored inbox for contact-form requests
  hours: "Monday–Friday, 8:30 AM – 6:00 PM",
  hoursShort: "Mon–Fri 8:30a–6p",
  founded: 1947,
  yearsInService: new Date().getFullYear() - 1947,
  url: "https://metrotv-audiotech.com",
  geo: { lat: 40.8241127, lng: -96.6336259 },
  mapUrl:
    "https://www.google.com/maps/place/Metro+TV%2FAudiotech+and+Appliance+Services/@40.8241167,-96.6362008,17z",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=1107+North+Cotner+Blvd+Lincoln+NE+68505",
  social: {
    facebook: "https://www.facebook.com/MetroTVLincoln/",
    instagram: "https://instagram.com/metrotva/",
    bbb: "https://www.bbb.org/us/ne/lincoln/profile/computer-repair/metro-tvaudio-tech-0714-207002332",
  },
  // Diagnostic deductibles — applied toward the repair if you proceed.
  diagnostic: {
    dropOff: "$42.90",
    inHomeLincolnOmaha: "$149.08",
    inHomeExtended: "$175.08",
  },
} as const;

export type DeliveryModel = "in-home" | "drop-off";

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  brands: string[];
  delivery: DeliveryModel;
  audience: string;
}

export const SERVICES: Service[] = [
  {
    slug: "appliance",
    title: "Appliance Repair",
    tagline: "Factory-authorized in-home repair across 200+ zip codes.",
    description:
      "Washers, dryers, refrigerators, dishwashers and ranges — diagnosed to the root cause and repaired with original manufacturer parts.",
    brands: [
      "Samsung", "LG", "GE Appliances", "Electrolux", "Maytag", "KitchenAid",
      "JennAir", "Amana", "Frigidaire", "Sharp", "Panasonic", "Speed Queen", "Hisense",
    ],
    delivery: "in-home",
    audience: "Homeowners across Nebraska & western Iowa",
  },
  {
    slug: "tv",
    title: "TV Repair",
    tagline: "Board-level repair — drop off at our Lincoln shop.",
    description:
      "PSU, T-Con, LED driver and A-board work for homes and for the bars, restaurants and gyms that run screens all day.",
    brands: ["Samsung", "LG", "Sony", "Vizio", "TCL"],
    delivery: "drop-off",
    audience: "Households & local businesses",
  },
  {
    slug: "commercial",
    title: "Commercial Microwave Repair",
    tagline: "Four authorized brands. Built for busy kitchens.",
    description:
      "HV circuit, mode stirrer motor, mica cover panel and membrane switch work for the commercial microwaves restaurants depend on.",
    brands: ["Amana", "Sharp", "Panasonic", "Menumaster"],
    delivery: "drop-off",
    audience: "Restaurants & food service",
  },
  {
    slug: "audio",
    title: "Audio Equipment Repair",
    tagline: "Our deepest specialty — analog warmth meets digital precision.",
    description:
      "BJTs, RIAA phono preamps, ESR checks, VTA and azimuth alignment. Demand is high; typical turnaround runs 1–3 months.",
    brands: ["Yamaha", "Denon", "Marantz", "Pioneer"],
    delivery: "drop-off",
    audience: "Audio enthusiasts & collectors",
  },
];

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Home Warranty", href: "/home-warranty" },
  { label: "Service Area", href: "/service-area" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

// Trust badges shown in the hero (all derived from verified facts).
export const TRUST_BADGES = [
  "Samsung Authorized",
  "BBB A+ Accredited",
  "200+ Zip Codes",
  "OEM Parts Only",
] as const;

// Headline figures used across the site.
export const STATS = [
  { value: "1947", label: "Serving Nebraska since" },
  { value: "200+", label: "Zip codes covered" },
  { value: "18+", label: "Authorized brands" },
  { value: "A+", label: "BBB accredited rating" },
] as const;
