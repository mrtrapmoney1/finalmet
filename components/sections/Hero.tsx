import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { HERO_COPY } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="diagnostic-overlay absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 grid md:grid-cols-[1fr_auto] gap-16 items-center w-full">
        {/* Left — editorial text block */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-widest text-primary-fixed/80 uppercase mb-6">
            Nebraska's Factory-Authorized Repair — Since {BUSINESS.founded}
          </p>

          <h1 className="text-5xl md:text-7xl font-bold font-headline text-white leading-[1.05] mb-4 text-balance">
            Metro TV &amp; Appliances
          </h1>

          <p className="text-2xl md:text-3xl font-semibold font-headline text-primary-fixed mb-6">
            Factory-Authorized Repair in Lincoln, NE
          </p>

          <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl">
            {HERO_COPY.body}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button href="/contact" variant="primary">
              Schedule Service
            </Button>
            <Button href="/products" variant="secondary" className="shadow-ambient">
              Shop OEM Parts
            </Button>
            <Button href="/how-it-works" variant="ghost" className="border-white/30 text-white hover:bg-white/10 hidden sm:inline-flex">
              How It Works
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/10">
            {HERO_COPY.badges.map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="text-xs text-white/60 font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — diagnostic stat card */}
        <div className="hidden lg:block w-80">
          <div className="glass-dark rounded-2xl p-8 border border-white/10">
            <p className="text-xs text-white/50 font-label uppercase tracking-widest mb-6">
              Diagnostic Fee — Applied to Repair
            </p>
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-3xl font-bold font-headline text-white">{BUSINESS.diagnosticDropOff}</p>
                <p className="text-xs text-white/50">Drop-off (TV, Audio, Commercial)</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-headline text-white">{BUSINESS.diagnosticLincolnOmaha}</p>
                <p className="text-xs text-white/50">In-Home (Lincoln &amp; Omaha area)</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-headline text-white">{BUSINESS.diagnosticExtended}</p>
                <p className="text-xs text-white/50">In-Home (Extended coverage)</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              All fees deductible toward your repair. You approve before any work begins.
            </p>
            <div className="mt-8 space-y-3">
              {[
                ["Mon – Fri", "8:30 AM – 6:00 PM"],
                ["Phone", BUSINESS.phone],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-white/40">{label}</span>
                  <span className="text-white/80 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
