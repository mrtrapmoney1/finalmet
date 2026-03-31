import { buildMetadata } from "@/lib/metadata";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms of use for Metro TV & Appliances — OEM parts sales, website use, limitation of liability, and governing law for metrotv-audiotech.com.",
  path: "/terms",
  keywords: ["terms of use", "terms and conditions", "OEM parts terms", "Metro TV Appliances", "Lincoln NE"],
});

const TERMS_SECTIONS = [
  {
    icon: "gavel",
    title: "Acceptance of Terms",
    body: "By accessing metrotv-audiotech.com, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use this site.",
  },
  {
    icon: "inventory_2",
    title: "OEM Parts — Pricing & Availability",
    body: "Parts listed on this site are OEM (Original Equipment Manufacturer) components. Prices and availability are subject to change without notice. Listing a part does not guarantee it is in stock. Contact us to confirm availability before placing an order.",
  },
  {
    icon: "warning",
    title: "No Guarantee of Fitness Without Professional Assessment",
    body: "Parts are listed by appliance type and common application, but we make no warranty that any part is suitable for your specific model or failure mode without professional diagnosis. Metro TV & Appliances recommends having repairs performed by a qualified technician.",
  },
  {
    icon: "handshake",
    title: "Purchasing — Call or Visit to Complete Orders",
    body: "This website does not currently process payments online. The parts cart is a browsing and inquiry tool only. To complete a purchase, call us at " + BUSINESS.phone + " or visit our shop at " + BUSINESS.address + " during business hours.",
  },
  {
    icon: "edit_note",
    title: "Returns & Refunds",
    body: "All parts sales are subject to our Return & Refund Policy, which provides a 7-day return window for unused items in original packaging. Defective products are exchanged at no charge. See /return-policy for full details.",
  },
  {
    icon: "block",
    title: "Prohibited Uses",
    body: "You may not use this site to scrape product data, run automated queries, attempt to circumvent rate limiting, harvest contact information, or engage in any activity that places unreasonable load on our infrastructure. Violations may result in access being blocked.",
  },
  {
    icon: "balance",
    title: "Limitation of Liability",
    body: "Metro TV & Appliances shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or reliance on information presented herein, including parts compatibility information. Our total liability for any claim shall not exceed the price paid for the specific part in dispute.",
  },
  {
    icon: "phone_in_talk",
    title: "Governing Law & Disputes",
    body: "These Terms of Use are governed by the laws of the State of Nebraska. Any dispute arising under these terms shall be resolved in the courts of Lancaster County, Nebraska. You consent to the personal jurisdiction of those courts.",
  },
];

export default function TermsPage() {
  return (
    <div className="bg-surface">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-6">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-3">Legal</p>
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-on-surface mb-3 text-balance">
          Terms of Use
        </h1>
        <p className="text-on-surface-variant leading-relaxed max-w-2xl">
          These terms govern your use of metrotv-audiotech.com, including browsing our OEM parts catalog, using the cart, and contacting us. Please read them before using the site.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base text-secondary" aria-hidden="true">check_circle</span>
            OEM parts sold as-described
          </span>
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base text-secondary" aria-hidden="true">check_circle</span>
            7-day return window
          </span>
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base text-secondary" aria-hidden="true">check_circle</span>
            Nebraska law governs
          </span>
        </div>
      </div>

      {/* Terms sections */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-2 gap-4">
          {TERMS_SECTIONS.map((section) => (
            <div key={section.title} className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/20">
              <div className="flex items-start gap-3 mb-2">
                <span className="material-symbols-outlined text-xl text-secondary mt-0.5" aria-hidden="true">{section.icon}</span>
                <h2 className="text-sm font-bold font-headline text-on-surface">{section.title}</h2>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed pl-8">{section.body}</p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-8 bg-primary rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <p className="text-white font-bold font-headline mb-1">Questions about these terms?</p>
            <p className="text-white/70 text-sm">Call or email us — we&apos;re a family business and happy to talk through anything.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">phone</span>
              {BUSINESS.phone}
            </a>
            <a
              href="mailto:info@metrotv-audiotech.com"
              className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/20 transition"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">mail</span>
              Email Us
            </a>
          </div>
        </div>

        {/* Legal note */}
        <p className="text-xs text-on-surface-variant mt-6 leading-relaxed">
          Effective date: January 1, 2026. {BUSINESS.name}, {BUSINESS.address}.
          These terms may be updated periodically — continued use of the site constitutes acceptance of any changes.
          For return and refund details, see our{" "}
          <a href="/return-policy" className="text-primary hover:underline">Return &amp; Refund Policy</a>.
          For privacy information, see our{" "}
          <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
