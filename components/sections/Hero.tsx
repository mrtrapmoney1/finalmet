import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";

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

          <h1 className="text-5xl md:text-7xl font-bold font-headline text-white leading-[1.05] mb-6 text-balance">
            When something breaks,<br />
            <span className="text-primary-fixed">trust matters.</span>
          </h1>

          <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl">
            We diagnose to the root cause — fault codes, ECM reads, voltage at motor
            terminals — then fix it correctly with OEM parts. Eight decades of
            precision, no shortcuts.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              Schedule Service
            </Button>
            <Button href="/what-to-expect" variant="ghost" className="border-white/30 text-white hover:bg-white/10">
              What to Expect
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/10">
            {[
              "Samsung Authorized",
              "BBB Accredited",
              "200+ Zip Codes",
              "OEM Parts Only",
            ].map((badge) => (
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
              Diagnostic Deductible
            </p>
            <p className="text-5xl font-bold font-headline text-white mb-2">
              {BUSINESS.diagnostic}
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              Applied toward your repair. Transparent pricing — you approve before
              any work begins.
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
