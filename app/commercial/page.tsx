import { buildMetadata } from "@/lib/metadata";
import { SERVICES, BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const service = SERVICES.find((s) => s.slug === "commercial")!;

export const metadata = buildMetadata({
  title: "Commercial Microwave Repair",
  description: service.tagline,
  path: "/commercial",
  keywords: ["commercial microwave repair", "Lincoln NE", "Menumaster", "Sharp commercial", "Amana commercial", "magnetron repair"],
});

const REPAIRS = [
  { icon: "bolt", name: "HV Circuit Repair" },
  { icon: "rotate_right", name: "Mode Stirrer Motor" },
  { icon: "grid_on", name: "Mica Cover Panel" },
  { icon: "touch_app", name: "Membrane Switch Matrix" },
  { icon: "wifi_tethering", name: "Magnetron Service" },
  { icon: "thermostat", name: "Thermal Cutout / Fuse" },
];

export default function CommercialPage() {
  return (
    <div className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: "Commercial Microwave Repair",
                provider: { "@id": `${BUSINESS.url}/#business` },
                description: service.description,
                areaServed: { "@type": "State", name: "Nebraska" },
                serviceType: "Commercial Microwave Repair",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.url },
                  { "@type": "ListItem", position: 2, name: "Commercial Microwave Repair", item: `${BUSINESS.url}/commercial` },
                ],
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <div className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-primary-fixed/80 uppercase mb-4">
            Commercial Service · Drop-Off · Lincoln
          </p>
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-white mb-4 leading-tight">
            Commercial Microwave Repair in Lincoln, NE
          </h1>
          <p data-speakable className="text-white/70 max-w-xl leading-relaxed mb-8">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">Get Directions</Button>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition"
            >
              <span className="material-symbols-outlined text-base">phone</span>
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Four authorized brands callout */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold font-headline text-on-surface mb-3">Four Authorized Brands</h2>
        <p className="text-on-surface-variant text-sm mb-8 max-w-2xl leading-relaxed">
          Factory authorization for commercial microwave repair means direct access to OEM parts,
          HV schematics, and manufacturer training for the four major commercial brands.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.brands.map((brand) => (
            <div
              key={brand}
              className="bg-primary-container rounded-2xl p-6 text-center shadow-ambient"
            >
              <span className="material-symbols-outlined text-3xl text-on-primary-container mb-3 block">microwave</span>
              <p className="text-lg font-bold font-headline text-on-primary-container">{brand}</p>
              <p className="text-xs text-on-primary-container/60 mt-1">Factory Authorized</p>
            </div>
          ))}
        </div>
      </div>

      {/* Repair types */}
      <div className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold font-headline text-on-surface mb-8">What We Repair</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REPAIRS.map((r) => (
              <div key={r.name} className="flex items-center gap-4 bg-surface rounded-xl p-5 shadow-ambient">
                <span className="material-symbols-outlined text-2xl text-secondary">{r.icon}</span>
                <span className="text-sm font-semibold text-on-surface">{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drop-off info */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-surface-container-low rounded-2xl p-8 shadow-ambient">
          <div className="flex items-start gap-4 mb-6">
            <span className="material-symbols-outlined text-3xl text-secondary">store</span>
            <div>
              <h3 className="text-xl font-bold font-headline text-on-surface mb-1">Drop-Off Service</h3>
              <p className="text-sm text-on-surface-variant">
                Bring your commercial microwave to our Lincoln shop — no appointment required.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-semibold text-on-surface mb-1">Location</p>
              <p className="text-on-surface-variant">{BUSINESS.address}</p>
            </div>
            <div>
              <p className="font-semibold text-on-surface mb-1">Hours</p>
              <p className="text-on-surface-variant">{BUSINESS.hours}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-secondary text-on-secondary hover:opacity-90 transition"
            >
              <span className="material-symbols-outlined text-base">directions</span>
              Get Directions
            </a>
            <Button href="/contact" variant="ghost">Send a Message</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
