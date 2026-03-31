import { buildMetadata } from "@/lib/metadata";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Return & Refund Policy",
  description: "Metro TV & Appliances 7-day return policy for OEM parts. Defective products exchanged at no charge. Buyer pays return shipping.",
  path: "/return-policy",
  keywords: ["return policy", "refund policy", "OEM parts return", "defective parts", "Metro TV Appliances"],
});

const POLICY_SECTIONS = [
  {
    icon: "calendar_today",
    title: "7-Day Return Window",
    body: "Parts may be returned within 7 days of purchase for a full refund or exchange. Items must be unused, in original packaging, and accompanied by proof of purchase.",
  },
  {
    icon: "swap_horiz",
    title: "Defective Products — Exchange at No Charge",
    body: "If a part is defective or does not match the listed specification, we will exchange it at no additional cost. Contact us within 7 days of receipt to initiate a defective product exchange.",
  },
  {
    icon: "local_shipping",
    title: "Buyer Pays Return Shipping",
    body: "Return shipping costs are the responsibility of the buyer unless the return is due to our error (wrong part shipped) or a confirmed defective product. We recommend using a trackable shipping method.",
  },
  {
    icon: "store",
    title: "In-Store Returns (Preferred)",
    body: `Bring the item to our Lincoln shop at ${BUSINESS.address} during business hours (${BUSINESS.hours}). In-store returns are processed immediately.`,
  },
  {
    icon: "credit_card",
    title: "Refund Method",
    body: "Refunds are issued to the original payment method within 3–5 business days of receiving the returned item in acceptable condition.",
  },
  {
    icon: "block",
    title: "Non-Returnable Items",
    body: "Electrical parts that have been installed and tested, items with physical damage caused by the buyer, and parts returned beyond the 7-day window are not eligible for return or refund.",
  },
];

export default function ReturnPolicyPage() {
  return (
    <div className="bg-surface">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-6">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-3">Customer Protection</p>
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-on-surface mb-3 text-balance">
          Return &amp; Refund Policy
        </h1>
        <p className="text-on-surface-variant leading-relaxed max-w-2xl">
          We stand behind every OEM part we sell. If something isn&apos;t right, we make it right — quickly and without hassle.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base text-secondary" aria-hidden="true">check_circle</span>
            7-day return window
          </span>
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base text-secondary" aria-hidden="true">check_circle</span>
            Defective exchange at no charge
          </span>
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base text-secondary" aria-hidden="true">check_circle</span>
            Buyer pays return shipping
          </span>
        </div>
      </div>

      {/* Policy sections */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-2 gap-4">
          {POLICY_SECTIONS.map((section) => (
            <div key={section.title} className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/20">
              <div className="flex items-start gap-3 mb-2">
                <span className="material-symbols-outlined text-xl text-secondary mt-0.5" aria-hidden="true">{section.icon}</span>
                <h2 className="text-sm font-bold font-headline text-on-surface">{section.title}</h2>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed pl-8">{section.body}</p>
            </div>
          ))}
        </div>

        {/* Contact for returns */}
        <div className="mt-8 bg-primary rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <p className="text-white font-bold font-headline mb-1">Need to start a return?</p>
            <p className="text-white/70 text-sm">Call or visit us — we resolve most returns same day in-store.</p>
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
              href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/20 transition"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">directions</span>
              Get Directions
            </a>
          </div>
        </div>

        {/* Legal note */}
        <p className="text-xs text-on-surface-variant mt-6 leading-relaxed">
          This policy applies to OEM parts purchased directly from Metro TV &amp; Appliances at {BUSINESS.address}.
          For service warranties (labor and parts used in repairs), see our{" "}
          <a href="/warranty" className="text-primary hover:underline">Warranty page</a>.
          Policy effective 2026. Subject to change — contact us for the most current terms.
        </p>
      </div>
    </div>
  );
}
