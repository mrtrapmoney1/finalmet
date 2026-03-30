import { buildMetadata } from "@/lib/metadata";
import Link from "next/link";
import { SERVICES, BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Factory-authorized appliance, TV, audio, and commercial microwave repair in Lincoln, NE. Serving Nebraska since 1947.",
  path: "/services",
  keywords: ["repair services", "appliance repair", "TV repair", "audio repair", "commercial microwave repair", "Lincoln NE"],
});

const icons: Record<string, string> = {
  appliance: "home_repair_service",
  tv: "tv",
  audio: "speaker",
  commercial: "microwave",
};

export default function ServicesPage() {
  return (
    <div className="bg-surface">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
          What We Repair
        </p>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-on-surface mb-4">
          Factory-Authorized Repair<br />Since {BUSINESS.founded}.
        </h1>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed">
          We hold factory authorization directly from manufacturers — giving us
          access to OEM parts, technical service manuals, and brand training.
          Four service categories. One shop you can trust.
        </p>
      </div>

      {/* Service cards */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={service.href}
              className="group bg-surface-container-low hover:bg-surface-container rounded-2xl p-8 transition-all duration-200 shadow-ambient hover:shadow-ambient-lg"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="material-symbols-outlined text-3xl text-primary-container">
                  {icons[service.slug]}
                </span>
                <span className="text-xs font-medium font-label text-on-surface-variant bg-surface-variant px-3 py-1 rounded-full capitalize">
                  {service.deliveryModel}
                </span>
              </div>

              <h2 className="text-xl font-bold font-headline text-on-surface mb-2">
                {service.title}
              </h2>
              <p className="text-sm text-secondary font-medium mb-3">{service.tagline}</p>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {service.brands.slice(0, 5).map((brand) => (
                  <span
                    key={brand}
                    className="text-xs bg-surface-container-highest px-3 py-1 rounded-full text-on-surface-variant font-label"
                  >
                    {brand}
                  </span>
                ))}
                {service.brands.length > 5 && (
                  <span className="text-xs bg-surface-container-highest px-3 py-1 rounded-full text-on-surface-variant font-label">
                    +{service.brands.length - 5} more
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Learn more
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-16 bg-primary rounded-2xl p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold font-headline text-2xl mb-2">
              Not sure which service you need?
            </p>
            <p className="text-white/70 text-sm">
              Call us and describe what&apos;s happening — we&apos;ll point you in the right direction.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button href="/contact" variant="ghost" className="border-white/30 text-white hover:bg-white/10">
              Send a Message
            </Button>
            <Button href={`tel:${BUSINESS.phone}`} variant="primary">
              <span className="material-symbols-outlined text-base">phone</span>
              {BUSINESS.phone}
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/troubleshooting" variant="secondary">Troubleshooting Guides</Button>
          <Button href="/products" variant="ghost">OEM Parts Catalog</Button>
          <Button href="/service-area" variant="ghost">Check Coverage Area</Button>
        </div>
      </div>
    </div>
  );
}
