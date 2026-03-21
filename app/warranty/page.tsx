import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Warranty",
  description:
    "Metro TV & Appliances backs every repair with a parts and labor warranty. Learn what's covered and how to make a warranty claim.",
};

const COVERAGE = [
  {
    icon: "build_circle",
    title: "Parts Warranty",
    body: "All OEM replacement parts we install are covered against defects for 90 days from the date of repair completion.",
  },
  {
    icon: "engineering",
    title: "Labor Warranty",
    body: "Our workmanship is warranted for 90 days. If the same issue recurs within that period due to our repair, we fix it at no additional labor charge.",
  },
  {
    icon: "gpp_good",
    title: "Factory-Authorized Coverage",
    body: "As an authorized service center, many in-warranty manufacturer repairs are also available through us — check with your manufacturer for model eligibility.",
  },
];

const EXCLUSIONS = [
  "Damage caused by misuse, power surges, or external factors after repair",
  "New, unrelated failures that occur after repair completion",
  "Consumable components (filters, light bulbs, belts under normal wear)",
  "Physical damage or modifications made after service",
];

export default function WarrantyPage() {
  return (
    <div className="bg-surface">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
          Our Guarantee
        </p>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-on-surface mb-4">
          We Stand Behind Our Work.
        </h1>
        <p className="text-on-surface-variant max-w-xl leading-relaxed">
          Every repair performed by Metro TV &amp; Appliances is backed by a
          90-day parts and labor warranty. No fine print — if something we fixed
          fails, we fix it again.
        </p>
      </div>

      {/* Coverage cards */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {COVERAGE.map((item) => (
            <div key={item.title} className="bg-surface-container-low rounded-2xl p-8 shadow-ambient">
              <span className="material-symbols-outlined text-3xl text-secondary mb-4 block">{item.icon}</span>
              <h2 className="text-lg font-bold font-headline text-on-surface mb-3">{item.title}</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Exclusions */}
      <div className="bg-surface-container-low py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold font-headline text-on-surface mb-6">What&apos;s Not Covered</h2>
          <ul className="space-y-4">
            {EXCLUSIONS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-base text-outline mt-0.5">remove_circle</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* How to claim */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-surface-container-low rounded-2xl p-10 shadow-ambient">
          <h2 className="text-2xl font-bold font-headline text-on-surface mb-4">
            How to Make a Warranty Claim
          </h2>
          <div className="space-y-4 mb-8">
            {[
              "Contact us by phone or through our contact form within the 90-day warranty period.",
              "Reference your repair date and the original issue — your service record is on file.",
              "We'll schedule a follow-up inspection at no additional diagnostic charge.",
              "If the failure is covered, we'll complete the repair at no cost.",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4 text-sm text-on-surface-variant">
                <span className="shrink-0 w-7 h-7 rounded-full bg-secondary/10 text-secondary text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" variant="primary">Contact Us</Button>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-outline-variant/40 text-on-surface hover:bg-surface-container-low transition"
            >
              <span className="material-symbols-outlined text-base">phone</span>
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
