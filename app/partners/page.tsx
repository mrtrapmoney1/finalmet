import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Partners & Authorizations",
  description:
    "Metro TV & Appliances holds factory authorization from Samsung, LG, GE Appliances, Electrolux, and many other leading brands.",
};

const PARTNER_CATEGORIES = [
  {
    title: "Appliance Brands",
    icon: "home_repair_service",
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
  },
  {
    title: "TV & Display",
    icon: "tv",
    brands: ["Samsung", "LG", "Sony", "Vizio", "TCL"],
  },
  {
    title: "Audio & AV",
    icon: "speaker",
    brands: ["Yamaha", "Denon", "Marantz", "Pioneer"],
  },
  {
    title: "Commercial Microwave",
    icon: "microwave",
    brands: ["Amana", "Sharp", "Panasonic", "Menumaster"],
  },
];

const WHY = [
  {
    icon: "inventory_2",
    title: "OEM Parts Access",
    body: "Factory authorization gives us direct access to original manufacturer parts — not aftermarket alternatives.",
  },
  {
    icon: "menu_book",
    title: "Technical Documentation",
    body: "Service bulletins, schematics, and technical manuals from manufacturers, not third-party sources.",
  },
  {
    icon: "school",
    title: "Manufacturer Training",
    body: "Technicians trained directly by manufacturers on specific product lines — not generic repair courses.",
  },
];

export default function PartnersPage() {
  return (
    <div className="bg-surface">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
          Factory Authorization
        </p>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-on-surface mb-4">
          Our Partners &amp; Authorizations.
        </h1>
        <p className="text-on-surface-variant max-w-xl leading-relaxed">
          Metro TV &amp; Appliances has held factory authorization from leading
          manufacturers since {BUSINESS.founded}. Authorization isn&apos;t a
          badge — it&apos;s a commitment to using the right parts and following
          manufacturer-approved repair procedures.
        </p>
      </div>

      {/* Why it matters */}
      <div className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold font-headline text-on-surface mb-10">
            Why Authorization Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {WHY.map((item) => (
              <div key={item.title} className="bg-surface rounded-2xl p-8 shadow-ambient">
                <span className="material-symbols-outlined text-3xl text-secondary mb-4 block">{item.icon}</span>
                <h3 className="text-lg font-bold font-headline text-on-surface mb-2">{item.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand grid by category */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        {PARTNER_CATEGORIES.map((cat) => (
          <div key={cat.title}>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-2xl text-secondary">{cat.icon}</span>
              <h2 className="text-2xl font-bold font-headline text-on-surface">{cat.title}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {cat.brands.map((brand) => (
                <div
                  key={brand}
                  className="bg-surface-container-low rounded-xl px-5 py-3 text-sm font-semibold text-on-surface shadow-ambient border border-outline-variant/20"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-primary rounded-2xl p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold font-headline text-xl mb-1">
              Don&apos;t see your brand?
            </p>
            <p className="text-white/70 text-sm">
              Call us — we may still be able to help, or refer you to the right authorized center.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button href="/contact" variant="ghost" className="border-white/30 text-white hover:bg-white/10">
              Contact Us
            </Button>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-secondary text-on-secondary hover:opacity-90 transition"
            >
              <span className="material-symbols-outlined text-base">phone</span>
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
