import type { Metadata } from "next";
import { SERVICES, BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const service = SERVICES.find((s) => s.slug === "audio")!;

export const metadata: Metadata = {
  title: "TV & Audio Repair",
  description: service.tagline,
};

const REPAIRS = [
  { icon: "electrical_services", name: "BJT & Amplifier Repair" },
  { icon: "graphic_eq", name: "RIAA Phono Preamp" },
  { icon: "speed", name: "ESR Cap Testing" },
  { icon: "tune", name: "VTA & Azimuth Alignment" },
  { icon: "speaker", name: "Speaker Crossover" },
  { icon: "radio", name: "Receiver & Tuner" },
];

export default function AudioPage() {
  return (
    <div className="bg-surface">
      {/* Hero */}
      <div className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-primary-fixed/80 uppercase mb-4">
            Drop-Off · Lincoln Shop · Since 1947
          </p>
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-white mb-4 leading-tight">
            TV &amp; Audio Repair.
          </h1>
          <p className="text-white/70 max-w-xl leading-relaxed mb-8">
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

      {/* What we repair */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold font-headline text-on-surface mb-3">Precision Audio Service</h2>
        <p className="text-on-surface-variant text-sm mb-8 max-w-2xl leading-relaxed">
          We speak the language of your equipment — analog warmth meets digital precision.
          From vintage receivers to modern AV systems, we repair to component level.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPAIRS.map((r) => (
            <div key={r.name} className="flex items-center gap-4 bg-surface-container-low rounded-xl p-5 shadow-ambient">
              <span className="material-symbols-outlined text-2xl text-secondary">{r.icon}</span>
              <span className="text-sm font-semibold text-on-surface">{r.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold font-headline text-on-surface mb-8">Authorized Brands</h2>
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

      {/* Drop-off info */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-surface-container-low rounded-2xl p-8 shadow-ambient">
          <div className="flex items-start gap-4 mb-6">
            <span className="material-symbols-outlined text-3xl text-secondary">store</span>
            <div>
              <h3 className="text-xl font-bold font-headline text-on-surface mb-1">Drop-Off Service</h3>
              <p className="text-sm text-on-surface-variant">No appointment needed. Walk in during business hours.</p>
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
