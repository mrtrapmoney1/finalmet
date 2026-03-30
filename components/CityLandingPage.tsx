import Link from "next/link";
import { BUSINESS, SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { ZipChecker } from "@/components/ZipChecker";

interface CityPageProps {
  city: string;
  state: string;
  region: string;
  nearbyAreas: string[];
  localContext: string;
  zips: string[];
  diagnosticFee: string;
  serviceFocus?: string;
  cityHighlight?: string;
}

const TRUST_BADGES = [
  { icon: "verified", text: "Samsung Established ASC" },
  { icon: "workspace_premium", text: "BBB A+ Accredited" },
  { icon: "build", text: "OEM Parts Only" },
  { icon: "shield", text: "90-Day Warranty" },
];

export function CityLandingPage({
  city,
  state,
  region,
  nearbyAreas,
  localContext,
  diagnosticFee,
  serviceFocus,
  cityHighlight,
}: CityPageProps) {
  return (
    <div className="bg-surface">
      {/* Hero — matches homepage pattern */}
      <section className="hero-gradient relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="diagnostic-overlay absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 grid md:grid-cols-[1fr_auto] gap-12 items-center w-full">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-primary-fixed/80 uppercase mb-6">
              Factory-Authorized Service · {region}
            </p>
            <h1 className="text-display-lg font-bold font-headline text-white mb-4 text-balance">
              Appliance Repair in {city}, {state}
            </h1>
            <p
              className="text-body-lg text-white/70 max-w-xl leading-relaxed mb-8"
              data-speakable
            >
              {BUSINESS.name} provides factory-authorized in-home appliance repair
              in {city} and the surrounding {region} area. {diagnosticFee} in-home
              diagnostic — deductible toward your repair.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact" variant="primary">
                Schedule Service
              </Button>
              <Button
                href={`tel:${BUSINESS.phone}`}
                variant="ghost"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">phone</span>
                Call {BUSINESS.phone}
              </Button>
            </div>

            {/* Trust badges row — matches homepage Hero */}
            <div className="flex flex-wrap gap-6 mt-10 pt-6 border-t border-white/10">
              {TRUST_BADGES.map((badge) => (
                <div key={badge.text} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="text-xs text-white/60 font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic pricing card — matches homepage */}
          <div className="hidden lg:block w-72">
            <div className="glass-dark rounded-2xl p-8 border border-white/10">
              <p className="text-xs text-white/50 font-label uppercase tracking-widest mb-4">
                In-Home Diagnostic
              </p>
              <p className="text-4xl font-bold font-headline text-white mb-1">
                {diagnosticFee}
              </p>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Deductible toward your repair. Written estimate before any work begins.
              </p>
              <div className="space-y-3">
                {[
                  ["Mon – Fri", "8:30 AM – 6:00 PM"],
                  ["Phone", BUSINESS.phone],
                  ["Coverage", `${city} & ${region}`],
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

      {/* Trust bar — matches homepage TrustBar */}
      <section className="py-10 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "1947", label: "Founded in Lincoln, NE" },
              { value: "200+", label: "Zip codes covered" },
              { value: "13+", label: "Authorized brands" },
              { value: diagnosticFee, label: "In-home diagnostic" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-2xl font-bold font-headline text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City-specific context + highlight */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
                Local Service
              </p>
              <h2 className="text-display-sm font-bold font-headline text-on-surface mb-4">
                Serving {city} &amp; {region}
              </h2>
              <p className="text-body-md text-on-surface-variant leading-relaxed mb-6">
                {localContext}
              </p>
              {serviceFocus && (
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  {serviceFocus}
                </p>
              )}
            </div>
            <div>
              {cityHighlight && (
                <div className="bg-surface-container-low rounded-2xl p-8 shadow-ambient mb-6">
                  <span className="material-symbols-outlined text-3xl text-secondary mb-4 block" aria-hidden="true">
                    location_on
                  </span>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {cityHighlight}
                  </p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold tracking-widest text-on-surface-variant/60 uppercase mb-3">
                  Nearby Areas We Serve
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {nearbyAreas.map((area) => (
                    <li
                      key={area}
                      className="bg-surface-container-low rounded-full px-4 py-1.5 text-sm font-medium text-on-surface shadow-ambient border border-outline-variant/20"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid — matches homepage Services section */}
      <section className="py-16 md:py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
              What We Fix
            </p>
            <h2 className="text-display-sm font-bold font-headline text-on-surface mb-4">
              Authorized for the Brands You Rely On.
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Factory authorization means access to OEM parts, technical service
              manuals, and manufacturer training — not just generic tools.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={service.href}
                className="group bg-surface hover:bg-surface-container rounded-2xl p-6 shadow-ambient hover:shadow-ambient-lg border border-outline-variant/20 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold font-headline text-on-surface group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <span className="text-xs font-medium text-on-surface-variant bg-surface-variant px-3 py-1 rounded-full capitalize">
                    {service.deliveryModel}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.brands.slice(0, 4).map((brand) => (
                    <span
                      key={brand}
                      className="bg-surface-container-low rounded-full px-3 py-1 text-xs font-medium text-on-surface-variant"
                    >
                      {brand}
                    </span>
                  ))}
                  {service.brands.length > 4 && (
                    <span className="bg-surface-container-low rounded-full px-3 py-1 text-xs font-medium text-on-surface-variant">
                      +{service.brands.length - 4} more
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Learn more
                  <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic pricing breakdown */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-primary-container rounded-2xl p-8">
              <p className="text-3xl font-bold font-headline text-white mb-2">{BUSINESS.diagnosticDropOff}</p>
              <p className="text-xs font-semibold tracking-widest text-on-primary-container/80 uppercase mb-3">Drop-Off Diagnostic</p>
              <p className="text-on-primary-container/80 text-sm leading-relaxed">
                TV, audio, and commercial microwave. Bring it to our Lincoln shop — no appointment needed.
              </p>
            </div>
            <div className="bg-secondary rounded-2xl p-8">
              <p className="text-3xl font-bold font-headline text-white mb-2">{BUSINESS.diagnosticLincolnOmaha}</p>
              <p className="text-xs font-semibold tracking-widest text-white/80 uppercase mb-3">In-Home · Lincoln &amp; Omaha</p>
              <p className="text-white/80 text-sm leading-relaxed">
                Appliance repair at your home. Covers Lincoln, Omaha, Council Bluffs, and surrounding metro areas.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-2xl p-8 shadow-ambient border border-outline-variant/20">
              <p className="text-3xl font-bold font-headline text-on-surface mb-2">{BUSINESS.diagnosticExtended}</p>
              <p className="text-xs font-semibold tracking-widest text-on-surface-variant/60 uppercase mb-3">In-Home · Extended</p>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Grand Island, Southeast Nebraska, and other covered areas. All fees deductible toward repair.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & reputation — matches homepage Testimonials layout */}
      <section className="py-16 md:py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
                Our Reputation
              </p>
              <h2 className="text-display-sm font-bold font-headline text-on-surface mb-4">
                Precision Earns Trust.
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                We&apos;ve been serving Nebraska homes and businesses since 1947.
                Our BBB A+ accreditation and factory authorizations reflect eight
                decades of doing the job right.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/contact" variant="primary">
                  Schedule Service
                </Button>
                <Button href="/how-it-works" variant="ghost">
                  How It Works
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.text}
                  className="bg-surface rounded-2xl p-6 shadow-ambient flex flex-col gap-3"
                >
                  <span
                    className="material-symbols-outlined text-3xl text-secondary"
                    aria-hidden="true"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {badge.icon}
                  </span>
                  <p className="text-sm font-bold font-headline text-on-surface">
                    {badge.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Zip checker */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-display-sm font-bold font-headline text-on-surface mb-3">
            Check Your Coverage
          </h2>
          <p className="text-body-md text-on-surface-variant mb-8">
            Enter your zip code to confirm in-home service availability in your area.
          </p>
          <ZipChecker />
        </div>
      </section>

      {/* CTA — matches homepage CTA */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-primary-fixed/70 uppercase mb-4">
              Ready to Book?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-white leading-tight mb-4 text-balance">
              Don&apos;t Wait for a Small Problem to Grow.
            </h2>
            <p className="text-white/70 leading-relaxed max-w-md">
              A {diagnosticFee} in-home diagnostic tells you exactly what&apos;s wrong —
              and that fee applies to your repair if you proceed. No guesswork, no surprises.
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
    </div>
  );
}
