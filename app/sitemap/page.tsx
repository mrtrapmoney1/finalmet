import { buildMetadata } from "@/lib/metadata";
import { OEM_PARTS } from "@/lib/parts";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Site Map",
  description: "All pages on the Metro TV & Appliances website — services, parts, troubleshooting, coverage, and company info.",
  path: "/sitemap",
});

interface PageLink {
  href: string;
  label: string;
  sub?: string;
}

interface Section {
  icon: string;
  title: string;
  pages: PageLink[];
}

const SECTIONS: Section[] = [
  {
    icon: "build",
    title: "Repair Services",
    pages: [
      { href: "/services", label: "All Services", sub: "Overview of everything we repair" },
      { href: "/appliance", label: "Appliance Repair", sub: "In-home · 200+ zip codes" },
      { href: "/tv", label: "TV Repair", sub: "Drop-off · Lincoln shop" },
      { href: "/audio", label: "Audio Repair", sub: "Drop-off · Lincoln shop" },
      { href: "/commercial", label: "Commercial Microwave", sub: "Drop-off · Lincoln shop" },
    ],
  },
  {
    icon: "inventory_2",
    title: "Parts Store",
    pages: [
      { href: "/products", label: "All OEM Parts", sub: "Genuine replacement parts catalog" },
    ],
  },
  {
    icon: "troubleshoot",
    title: "Troubleshooting",
    pages: [
      { href: "/troubleshooting", label: "Troubleshooting Hub", sub: "Error codes and guides" },
      { href: "/troubleshooting/appliances", label: "Appliance Error Codes" },
      { href: "/troubleshooting/tv", label: "TV Error Codes" },
      { href: "/troubleshooting/audio", label: "Audio Equipment Guides" },
      { href: "/troubleshooting/commercial", label: "Commercial Microwave Codes" },
    ],
  },
  {
    icon: "map",
    title: "Service Coverage",
    pages: [
      { href: "/service-area", label: "Service Area", sub: "221 zip codes across NE & IA" },
      { href: "/appliance-repair-lincoln", label: "Lincoln, NE" },
      { href: "/appliance-repair-omaha", label: "Omaha, NE" },
      { href: "/appliance-repair-bellevue", label: "Bellevue, NE" },
      { href: "/appliance-repair-council-bluffs", label: "Council Bluffs, IA" },
      { href: "/appliance-repair-grand-island", label: "Grand Island, NE" },
      { href: "/appliance-repair-southeast-nebraska", label: "Southeast Nebraska" },
    ],
  },
  {
    icon: "info",
    title: "Company",
    pages: [
      { href: "/how-it-works", label: "How It Works", sub: "What to expect at your appointment" },
      { href: "/faq", label: "FAQ", sub: "Common questions answered" },
      { href: "/warranty", label: "Warranty", sub: "Labor and parts coverage" },
      { href: "/partners", label: "Partners", sub: "Brands we're authorized to repair" },
      { href: "/squaretrade", label: "SquareTrade", sub: "Extended warranty service" },
    ],
  },
  {
    icon: "call",
    title: "Contact & Scheduling",
    pages: [
      { href: "/contact", label: "Contact Us", sub: "Call, visit, or send a message" },
      { href: "/schedule", label: "Schedule Service", sub: "Book your repair" },
    ],
  },
  {
    icon: "gavel",
    title: "Legal",
    pages: [
      { href: "/return-policy", label: "Return & Refund Policy", sub: "7-day window for OEM parts" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export default function SiteMapPage() {
  const partPages: PageLink[] = OEM_PARTS.map((p) => ({
    href: `/products/${p.slug}`,
    label: p.title,
    sub: `MPN: ${p.mpn}`,
  }));

  const sectionsWithParts = SECTIONS.map((s) =>
    s.title === "Parts Store" ? { ...s, pages: [...s.pages, ...partPages] } : s
  );

  return (
    <div className="bg-surface min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-12">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-2">
            Navigation
          </p>
          <h1 className="text-3xl font-bold font-headline text-on-surface mb-2">
            Site Map
          </h1>
          <p className="text-sm text-on-surface-variant">
            Every page on this site, organized by section.
          </p>
        </div>

        {/* Section grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectionsWithParts.map((section) => (
            <div
              key={section.title}
              className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/20"
            >
              {/* Section header */}
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-outline-variant/20">
                <span
                  className="material-symbols-outlined text-lg text-secondary"
                  aria-hidden="true"
                >
                  {section.icon}
                </span>
                <h2 className="text-sm font-bold font-headline text-on-surface">
                  {section.title}
                </h2>
              </div>

              {/* Page links */}
              <ul className="space-y-1.5">
                {section.pages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="group flex flex-col hover:text-primary transition-colors"
                    >
                      <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors leading-tight">
                        {page.label}
                      </span>
                      {page.sub && (
                        <span className="text-xs text-on-surface-variant mt-0.5">
                          {page.sub}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
