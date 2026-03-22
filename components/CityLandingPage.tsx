import Link from "next/link";
import { BUSINESS, SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { ZipChecker } from "@/components/ZipChecker";
import { CTA } from "@/components/sections/CTA";

interface CityPageProps {
  city: string;
  state: string;
  region: string;
  nearbyAreas: string[];
  localContext: string;
  zips: string[];
}

export function CityLandingPage({
  city,
  state,
  region,
  nearbyAreas,
  localContext,
  zips,
}: CityPageProps) {
  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="hero-gradient py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-primary-fixed/70 uppercase mb-4">
            Factory-Authorized Service · {region}
          </p>
          <h1 className="text-display-lg font-bold font-headline text-white mb-6 text-balance">
            Factory-Authorized Appliance Repair in {city}, {state}
          </h1>
          <p
            className="text-body-lg text-white/70 max-w-2xl leading-relaxed mb-8"
            data-speakable
          >
            {BUSINESS.name} provides factory-authorized in-home appliance repair
            in {city} and the surrounding {region} area. {BUSINESS.diagnostic}{" "}
            diagnostic fee — applied toward your repair.
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
              <span className="material-symbols-outlined text-base">phone</span>
              Call {BUSINESS.phone}
            </Button>
          </div>
        </div>
      </section>

      {/* Local context */}
      <section className="bg-surface-container-low py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-display-sm font-bold font-headline text-on-surface mb-4">
            Serving {city} &amp; {region}
          </h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed max-w-3xl mb-8">
            {localContext}
          </p>
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-on-surface-variant/60 uppercase mb-3">
              Nearby Areas We Serve
            </h3>
            <ul className="flex flex-wrap gap-2">
              {nearbyAreas.map((area) => (
                <li
                  key={area}
                  className="bg-surface rounded-full px-4 py-1.5 text-sm font-medium text-on-surface shadow-ambient border border-outline-variant/20"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-display-sm font-bold font-headline text-on-surface mb-8">
            Our Repair Services
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={service.href}
                className="group bg-surface-container-low rounded-2xl p-6 shadow-ambient hover:shadow-ambient-lg border border-outline-variant/20 transition-all duration-200"
              >
                <h3 className="text-lg font-bold font-headline text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-on-surface-variant/60">
                  <span className="material-symbols-outlined text-sm">
                    {service.deliveryModel === "in-home" ? "home" : "storefront"}
                  </span>
                  {service.deliveryModel === "in-home"
                    ? "In-Home Service"
                    : "Drop-Off at Lincoln Shop"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Zip checker */}
      <section className="bg-surface-container-low py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-display-sm font-bold font-headline text-on-surface mb-3">
            Check Your Coverage
          </h2>
          <p className="text-body-md text-on-surface-variant mb-8">
            Enter your zip code to confirm in-home service availability in your
            area.
          </p>
          <ZipChecker />
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </div>
  );
}
