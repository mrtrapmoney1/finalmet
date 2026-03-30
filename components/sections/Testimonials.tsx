import { Button } from "@/components/ui/Button";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Metro+TV+%26+Appliances/@40.8241167,-96.6362008,17z/data=!3m1!4b1!4m6!3m5!1s0x8796bc2475ec7a6b:0xe65e1da93aca1d0d!8m2!3d40.8241127!4d-96.6336259!16s%2Fg%2F1tfkwtnn";

const TRUST_ITEMS = [
  {
    icon: "verified",
    label: "BBB Accredited",
    sub: "A+ Rating",
    href: "https://www.bbb.org/us/ne/lincoln/profile/computer-repair/metro-tvaudio-tech-0714-207002332",
  },
  {
    icon: "star",
    label: "Google Reviews",
    sub: "Lincoln, NE",
    href: GOOGLE_REVIEWS_URL,
  },
  {
    icon: "workspace_premium",
    label: "Factory Authorized",
    sub: "13+ Brands",
    href: "/partners",
  },
  {
    icon: "history",
    label: "Serving Nebraska",
    sub: "Since 1947",
    href: "/service-area",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — heading + CTAs */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
              Our Reputation
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-on-surface leading-tight mb-4">
              Precision Earns Trust.
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              We&apos;ve been serving Nebraska homes and businesses since 1947.
              Our BBB A+ accreditation and Google reviews reflect eight decades
              of doing the job right.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                href={GOOGLE_REVIEWS_URL}
                variant="primary"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">reviews</span>
                Read Our Reviews
              </Button>
              <Button
                href={`${GOOGLE_REVIEWS_URL}&hl=en#lrd=0x8796bc2475ec7a6b:0xe65e1da93aca1d0d,3`}
                variant="ghost"
              >
                Leave a Review
              </Button>
            </div>
          </div>

          {/* Right — trust grid */}
          <div className="grid grid-cols-2 gap-4">
            {TRUST_ITEMS.map((item) => {
              const inner = (
                <div className="bg-surface rounded-2xl p-6 shadow-ambient flex flex-col gap-3 h-full">
                  <span
                    className="material-symbols-outlined text-3xl text-secondary"
                    aria-hidden="true"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-base font-bold font-headline text-on-surface">
                      {item.label}
                    </p>
                    <p className="text-sm text-on-surface-variant">{item.sub}</p>
                  </div>
                </div>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover:scale-[1.02] transition-transform duration-200"
                >
                  {inner}
                </a>
              ) : (
                <div key={item.label}>{inner}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
