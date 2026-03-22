export const BUSINESS = {
  name: "Metro TV & Appliances",
  shortName: "Metro TV & Appliances",
  address: "1107 North Cotner Blvd, Lincoln, NE 68505",
  phone: "(402) 466-9090",
  fax: "(402) 466-2757",
  hours: "Monday–Friday 8:30 AM – 6:00 PM",
  founded: 1947,
  founder: "Mr. Fiedler",
  diagnostic: "$42.90",
  url: "https://metrotv-audiotech.com",
} as const;

export const SERVICES = [
  {
    slug: "appliance",
    title: "Appliance Repair",
    tagline: "Factory-authorized in-home repair across 200+ zip codes.",
    description:
      "We diagnose to the root cause — fault codes, ECM reads, voltage at motor terminals — then fix it right the first time with OEM parts.",
    href: "/appliance",
    brands: [
      "Samsung",
      "LG",
      "GE Appliances",
      "Electrolux",
      "Maytag",
      "KitchenAid",
      "JennAir",
      "Amana",
      "Frigidaire",
      "Sharp",
      "Panasonic",
      "Speed Queen",
      "Hisense",
    ],
    deliveryModel: "in-home",
  },
  {
    slug: "tv",
    title: "TV Repair",
    tagline: "PSU, T-Con, LED driver, A-board — drop off at our Lincoln shop.",
    description:
      "We repair to board level, not just swap panels. Get it back working correctly, not just quickly.",
    href: "/tv",
    brands: ["Samsung", "LG", "Sony", "Vizio", "TCL"],
    deliveryModel: "drop-off",
  },
  {
    slug: "audio",
    title: "TV & Audio Repair",
    tagline: "Analog warmth meets digital precision since 1947.",
    description:
      "BJTs, RIAA phono preamps, ESR checks, VTA and azimuth alignment — we speak the language of your equipment.",
    href: "/audio",
    brands: ["Yamaha", "Denon", "Marantz", "Pioneer"],
    deliveryModel: "drop-off",
  },
  {
    slug: "commercial",
    title: "Commercial Microwave Repair",
    tagline: "Four authorized brands. Drop off in Lincoln.",
    description:
      "HV circuit, mode stirrer motor, mica cover panel, membrane switch matrix — authorized for Amana, Sharp, Panasonic, and Menumaster.",
    href: "/commercial",
    brands: ["Amana", "Sharp", "Panasonic", "Menumaster"],
    deliveryModel: "drop-off",
  },
] as const;

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Service Area", href: "/service-area" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;
