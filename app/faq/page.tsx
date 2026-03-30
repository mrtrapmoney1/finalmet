import { buildMetadata } from "@/lib/metadata";
import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions — Metro TV & Appliances",
  description:
    "Common questions about appliance, TV, audio, and commercial microwave repair at Metro TV & Appliances in Lincoln, NE.",
  path: "/faq",
  keywords: ["FAQ", "frequently asked questions", "appliance repair questions", "warranty", "diagnostic fee", "Lincoln NE"],
});

const FAQS = [
  {
    category: "Getting Started",
    items: [
      {
        question: "Do I need an appointment for drop-off service?",
        answer:
          "No appointment needed — we're a walk-in shop. Bring your TV, audio equipment, or commercial microwave to 1107 North Cotner Blvd, Lincoln, NE 68505 during business hours (Mon–Fri 8:30 AM – 6:00 PM).",
      },
      {
        question: "How do I schedule in-home appliance repair?",
        answer:
          "Call us at (402) 466-9090 or send a message through our contact form. We'll schedule a convenient time and dispatch a technician directly to your home. We cover 200+ zip codes across Nebraska and Iowa.",
      },
      {
        question: "What brands do you service?",
        answer:
          "We hold factory authorization for Samsung, LG, GE Appliances, Electrolux, Maytag, KitchenAid, JennAir, Amana, Frigidaire, Sharp, Panasonic, Speed Queen, Hisense, Yamaha, Denon, Marantz, Pioneer, Menumaster, and Vizio — among others.",
      },
    ],
  },
  {
    category: "Pricing & Diagnosis",
    items: [
      {
        question: "What is the diagnostic fee?",
        answer: `Our diagnostic deductible starts at ${BUSINESS.diagnosticDropOff} for drop-off services (TV, audio, commercial microwave). For in-home appliance repair, the diagnostic is ${BUSINESS.diagnosticLincolnOmaha} in the Lincoln and Omaha area, or ${BUSINESS.diagnosticExtended} for extended coverage areas. This fee is applied toward the cost of your repair if you choose to proceed. You will always receive a written estimate before any repair work begins.`,
      },
      {
        question: "Will I receive a quote before any work is done?",
        answer:
          "Always. We diagnose the issue, then present you with a detailed estimate. No work proceeds without your explicit approval. There are no surprise charges.",
      },
      {
        question: "Do you use OEM (original manufacturer) parts?",
        answer:
          "Yes — exclusively. Factory authorization gives us direct access to OEM parts and technical service manuals. We do not use aftermarket substitutes.",
      },
    ],
  },
  {
    category: "Warranty & Coverage",
    items: [
      {
        question: "Is there a warranty on repairs?",
        answer:
          "Yes. Our repairs are backed by a parts and labor warranty. Visit our Warranty page for full details on coverage terms.",
      },
      {
        question: "Are you authorized for manufacturer warranty repairs?",
        answer:
          "Yes. As a factory-authorized service center, we can perform in-warranty repairs for many of the brands we carry. Check with your manufacturer or contact us to confirm coverage for your specific model.",
      },
      {
        question: "What if my appliance can't be repaired economically?",
        answer:
          "We'll tell you honestly. If the repair cost approaches or exceeds replacement value, we'll say so — and explain the trade-offs — rather than recommending a repair that doesn't make financial sense.",
      },
    ],
  },
  {
    category: "Service Area",
    items: [
      {
        question: "What areas do you cover for in-home appliance repair?",
        answer:
          "We cover 200+ zip codes including Lincoln, Omaha, Council Bluffs, Grand Island, and surrounding communities. See our full Service Area map for details.",
      },
      {
        question: "Do you offer in-home service for TVs and audio equipment?",
        answer:
          "TV, audio, and commercial microwave service is drop-off only at our Lincoln shop. In-home service is available for appliances (washers, dryers, refrigerators, dishwashers, etc.).",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.flatMap((section) =>
              section.items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              }))
            ),
          }),
        }}
      />

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
          Common Questions
        </p>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-on-surface mb-4">
          Frequently Asked Questions — Metro TV &amp; Appliances
        </h1>
        <p className="text-on-surface-variant max-w-xl leading-relaxed">
          Everything you need to know before bringing in or scheduling your repair.
        </p>
      </div>

      {/* FAQ sections */}
      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-10">
        {FAQS.map((section) => (
          <div key={section.category}>
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
              {section.category}
            </p>
            <FaqAccordion items={section.items} />
          </div>
        ))}

        {/* Still have questions? */}
        <div className="bg-primary rounded-2xl p-10 text-center">
          <p className="text-white font-bold font-headline text-xl mb-2">
            Still have a question?
          </p>
          <p className="text-white/70 text-sm mb-6">
            We&apos;re happy to answer before you commit to anything.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="ghost" className="border-white/30 text-white hover:bg-white/10">
              Send a Message
            </Button>
            <Button href={`tel:${BUSINESS.phone}`} variant="primary">
              <span className="material-symbols-outlined text-base" aria-hidden="true">phone</span>
              {BUSINESS.phone}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
