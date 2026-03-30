import { buildMetadata } from "@/lib/metadata";
import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "How It Works",
  description:
    "See exactly how our repair process works — from your first call to completed repair. Transparent pricing, OEM parts, and no surprises at Metro TV & Appliances.",
  path: "/how-it-works",
  keywords: ["how it works", "repair process", "diagnostic", "OEM parts", "written estimate", "Lincoln NE"],
});

const STEPS = [
  {
    number: "01",
    icon: "phone_in_talk",
    title: "Call or Submit a Request",
    body: "Reach us by phone or through our contact form. We'll ask a few quick questions about your equipment and the symptoms — this helps us come prepared with the right parts and tools for in-home visits.",
  },
  {
    number: "02",
    icon: "calendar_month",
    title: "Schedule Your Service",
    body: "For in-home appliance repair, we'll confirm a convenient date and time window. For TV, audio, or commercial microwave service, drop off at our shop — no appointment required.",
  },
  {
    number: "03",
    icon: "search",
    title: "Diagnosis",
    body: `Our technicians diagnose to the root cause — fault codes, ECM reads, voltage at motor terminals — not just surface symptoms. Diagnostic fees start at ${BUSINESS.diagnosticDropOff} for drop-off or ${BUSINESS.diagnosticLincolnOmaha} for in-home service — credited toward your repair.`,
  },
  {
    number: "04",
    icon: "receipt_long",
    title: "Written Estimate",
    body: "Before any repair work begins, you receive a written estimate including parts and labor. We explain what we found and what we recommend. You decide — no pressure, no hidden fees.",
  },
  {
    number: "05",
    icon: "build",
    title: "Repair with OEM Parts",
    body: "Once approved, we repair your equipment using original manufacturer (OEM) parts. Factory authorization gives us direct access to genuine components and technical service documentation.",
  },
  {
    number: "06",
    icon: "verified",
    title: "Quality Check & Warranty",
    body: "Every repair is tested before return or completion. Our work is backed by a parts and labor warranty — so if the same issue returns, we stand behind it.",
  },
];

export default function WhatToExpectPage() {
  return (
    <div className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How Our Repair Process Works",
            description:
              "No surprises, no pressure. Here's exactly how we work — from your first contact through a completed repair.",
            step: STEPS.map((step, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: step.title,
              text: step.body,
            })),
          }),
        }}
      />

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
          Metro TV &amp; Appliances
        </p>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-on-surface mb-4">
          How Our Repair Process Works
        </h1>
        <p className="text-on-surface-variant max-w-xl leading-relaxed">
          No surprises, no pressure. Here&apos;s exactly how we work — from your first
          contact through a completed repair.
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-outline-variant/30 hidden md:block" />

          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div key={step.number} className="flex gap-6 md:gap-8 items-start">
                {/* Step indicator */}
                <div className="relative shrink-0">
                  <div className="w-[4.5rem] h-[4.5rem] rounded-2xl bg-primary-container flex items-center justify-center shadow-ambient">
                    <span className="material-symbols-outlined text-2xl text-on-primary-container">
                      {step.icon}
                    </span>
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold font-headline text-secondary bg-secondary-fixed rounded-full w-5 h-5 flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="bg-surface-container-low rounded-2xl p-6 flex-1 shadow-ambient">
                  <h2 className="text-lg font-bold font-headline text-on-surface mb-2">
                    {step.title}
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust callouts */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          {[
            { icon: "gpp_good", label: "OEM Parts Only", sub: "No aftermarket substitutes." },
            { icon: "receipt", label: "Approve Before We Start", sub: "Written estimate every time." },
            { icon: "support_agent", label: "Factory Authorized", sub: "Direct manufacturer training." },
          ].map((item) => (
            <div key={item.label} className="bg-surface-container-low rounded-2xl p-6 text-center shadow-ambient">
              <span className="material-symbols-outlined text-3xl text-secondary mb-3 block">{item.icon}</span>
              <p className="text-sm font-bold font-headline text-on-surface mb-1">{item.label}</p>
              <p className="text-xs text-on-surface-variant">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-primary rounded-2xl p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold font-headline text-xl mb-1">Ready to get started?</p>
            <p className="text-white/70 text-sm">Call or schedule online — takes less than a minute.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button href="/contact" variant="ghost" className="border-white/30 text-white hover:bg-white/10">
              Schedule Service
            </Button>
            <Button href={`tel:${BUSINESS.phone}`} variant="primary">
              <span className="material-symbols-outlined text-base">phone</span>
              {BUSINESS.phone}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
