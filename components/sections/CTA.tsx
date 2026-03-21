import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";

export function CTA() {
  return (
    <section className="py-24 hero-gradient relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold tracking-widest text-primary-fixed/70 uppercase mb-4">
            Ready to Book?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white leading-tight mb-4 text-balance">
            Don&apos;t Wait for a<br />Small Problem to Grow.
          </h2>
          <p className="text-white/70 leading-relaxed max-w-md">
            A {BUSINESS.diagnostic} diagnostic tells you exactly what&apos;s wrong —
            and that fee applies to your repair if you proceed. No guesswork, no
            surprises.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 md:justify-end">
          <Button href="/contact" variant="primary">
            Schedule Service
          </Button>
          <Button
            href={`tel:${BUSINESS.phone}`}
            variant="ghost"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Call {BUSINESS.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
