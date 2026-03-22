import { buildMetadata } from "@/lib/metadata";
import { SERVICES, BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const service = SERVICES.find((s) => s.slug === "appliance")!;

export const metadata = buildMetadata({
  title: "Appliance Repair",
  description: service.tagline,
  path: "/appliance",
  keywords: ["appliance repair", "in-home appliance repair", "Lincoln NE", "factory authorized", "washer repair", "dryer repair", "refrigerator repair"],
});

const APPLIANCES = [
  { icon: "local_laundry_service", name: "Washers & Dryers" },
  { icon: "kitchen", name: "Refrigerators & Freezers" },
  { icon: "countertops", name: "Dishwashers" },
  { icon: "oven_gen", name: "Ovens & Ranges" },
  { icon: "microwave", name: "Microwaves" },
  { icon: "air", name: "Air Conditioners" },
];

export default function AppliancePage() {
  return (
    <div className="bg-surface">
      {/* Hero */}
      <div className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-primary-fixed/80 uppercase mb-4">
            In-Home Service · 200+ Zip Codes
          </p>
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-white mb-4 leading-tight">
            Factory-Authorized Appliance Repair in Lincoln, NE
          </h1>
          <p className="text-white/70 max-w-xl leading-relaxed mb-8">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">Schedule In-Home Service</Button>
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

      {/* Appliance types */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold font-headline text-on-surface mb-8">What We Fix</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {APPLIANCES.map((a) => (
            <div key={a.name} className="flex items-center gap-4 bg-surface-container-low rounded-xl p-5 shadow-ambient">
              <span className="material-symbols-outlined text-2xl text-secondary">{a.icon}</span>
              <span className="text-sm font-semibold text-on-surface">{a.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Authorized brands */}
      <div className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold font-headline text-on-surface mb-4">
            Factory-Authorized Brands
          </h2>
          <p className="text-on-surface-variant mb-8 text-sm leading-relaxed max-w-2xl">
            Factory authorization means access to OEM parts, technical service bulletins,
            and manufacturer training — not just general repair knowledge.
          </p>
          <div className="flex flex-wrap gap-3">
            {service.brands.map((brand) => (
              <span
                key={brand}
                className="bg-surface rounded-full px-4 py-2 text-sm font-semibold text-on-surface shadow-ambient border border-outline-variant/20"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Diagnostic fee */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-primary-container rounded-2xl p-10 flex flex-col md:flex-row gap-8 items-start">
          <div>
            <p className="text-4xl font-bold font-headline text-white mb-2">{BUSINESS.diagnostic}</p>
            <p className="text-xs font-semibold tracking-widest text-on-primary-container/60 uppercase">
              Diagnostic Deductible
            </p>
          </div>
          <div>
            <p className="text-on-primary-container font-semibold mb-2">Applied toward your repair.</p>
            <p className="text-on-primary-container/70 text-sm leading-relaxed">
              We diagnose to root cause — fault codes, ECM reads, voltage at motor terminals.
              You receive a written estimate before any work begins. No surprises.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-secondary rounded-2xl p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold font-headline text-xl mb-1">Ready to book in-home service?</p>
            <p className="text-white/70 text-sm">We come to you — across 200+ Nebraska and Iowa zip codes.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button href="/contact" variant="ghost" className="border-white/30 text-white hover:bg-white/10">
              Schedule Now
            </Button>
            <Button href="/service-area" variant="ghost" className="border-white/30 text-white hover:bg-white/10">
              Check Coverage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
