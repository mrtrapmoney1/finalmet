import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { ServiceChip } from "@/components/ui/ServiceChip";

const icons: Record<string, string> = {
  appliance: "home_repair_service",
  tv: "tv",
  audio: "speaker",
  commercial: "microwave",
};

export function Services() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
            What We Fix
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-on-surface leading-tight mb-4">
            Authorized for the Brands<br />You Rely On.
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Factory authorization means we have access to OEM parts, technical
            service manuals, and manufacturer training — not just generic tools.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={service.href}
              className="group bg-surface-container-low hover:bg-surface-container rounded-2xl p-8 transition-all duration-200 shadow-ambient hover:shadow-ambient-lg"
            >
              {/* Icon + delivery model */}
              <div className="flex items-start justify-between mb-6">
                <span className="material-symbols-outlined text-3xl text-primary-container">
                  {icons[service.slug]}
                </span>
                <span className="text-xs font-medium font-label text-on-surface-variant bg-surface-variant px-3 py-1 rounded-full capitalize">
                  {service.deliveryModel}
                </span>
              </div>

              <h3 className="text-xl font-bold font-headline text-on-surface mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-secondary font-medium mb-3">
                {service.tagline}
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Brand chips */}
              <div className="flex flex-wrap gap-2">
                {service.brands.slice(0, 5).map((brand) => (
                  <ServiceChip key={brand} label={brand} />
                ))}
                {service.brands.length > 5 && (
                  <ServiceChip label={`+${service.brands.length - 5} more`} />
                )}
              </div>

              {/* Arrow */}
              <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Learn more
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
