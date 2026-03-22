import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
import { ContactForm } from "@/components/layout/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Metro TV & Appliances at ${BUSINESS.address}. Call ${BUSINESS.phone}. Hours: ${BUSINESS.hours}.`,
};

const MAP_EMBED_URL = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=Metro+TV+%26+Appliances,Lincoln+NE&zoom=15`;

const CONTACT_DETAILS = [
  {
    icon: "location_on",
    label: "Address",
    value: BUSINESS.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`,
  },
  {
    icon: "phone",
    label: "Phone",
    value: BUSINESS.phone,
    href: `tel:${BUSINESS.phone}`,
  },
  {
    icon: "fax",
    label: "Fax",
    value: BUSINESS.fax,
    href: undefined,
  },
  {
    icon: "schedule",
    label: "Hours",
    value: BUSINESS.hours,
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD: LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: BUSINESS.name,
            url: BUSINESS.url,
            telephone: BUSINESS.phone,
            faxNumber: BUSINESS.fax,
            address: {
              "@type": "PostalAddress",
              streetAddress: "1107 North Cotner Blvd",
              addressLocality: "Lincoln",
              addressRegion: "NE",
              postalCode: "68505",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 40.8241127,
              longitude: -96.6336259,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:30",
                closes: "18:00",
              },
            ],
          }),
        }}
      />

      <div className="bg-surface">
        {/* Page header */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-on-surface mb-4">
            Visit Us in Lincoln.
          </h1>
          <p className="text-on-surface-variant max-w-xl leading-relaxed">
            Walk-in shop — no appointment needed for drop-off. For in-home
            appliance service, call or send a message below.
          </p>
        </div>

        {/* Map + details + form */}
        <div className="max-w-7xl mx-auto px-6 pb-24 space-y-8">
          {/* Top row: map + contact details */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* Embedded map */}
            <div className="rounded-2xl overflow-hidden shadow-ambient-lg aspect-[4/3] lg:aspect-auto lg:min-h-[400px] bg-surface-container-low">
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Metro TV & Appliances location map"
              />
            </div>

            {/* Contact details card */}
            <div className="bg-surface-container-low rounded-2xl p-8 shadow-ambient space-y-8">
              <div>
                <h2 className="text-xl font-bold font-headline text-on-surface mb-1">
                  Metro TV &amp; Appliances
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Factory-authorized repair since {BUSINESS.founded}
                </p>
              </div>

              <div className="space-y-6">
                {CONTACT_DETAILS.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-xl text-secondary mt-0.5">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium text-on-surface hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-on-surface">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-secondary text-on-secondary rounded-full py-3 text-sm font-semibold hover:opacity-90 transition"
              >
                <span className="material-symbols-outlined text-base">directions</span>
                Get Directions
              </a>

              <div className="border-t border-outline-variant/30 pt-6 space-y-3">
                <div className="flex items-start gap-3 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-base text-primary mt-0.5">home</span>
                  <span>
                    <strong className="text-on-surface">Appliance repair</strong> — in-home service across 200+ zip codes
                  </span>
                </div>
                <div className="flex items-start gap-3 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-base text-primary mt-0.5">store</span>
                  <span>
                    <strong className="text-on-surface">TV, Audio &amp; Commercial</strong> — drop off at this location
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="max-w-2xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
