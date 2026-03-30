import { buildMetadata } from "@/lib/metadata";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "SquareTrade Warranty Service",
  description:
    "SquareTrade warranty repairs at Metro TV & Appliances. Learn how the SquareTrade process works — parts ship to you, then we complete the repair.",
  path: "/squaretrade",
  keywords: [
    "SquareTrade warranty repair",
    "SquareTrade service",
    "appliance repair Lincoln NE",
    "extended warranty repair",
  ],
});

const faqItems = [
  {
    question:
      "Why do I need to call you when parts arrive? Won't SquareTrade let you know?",
    answer:
      "SquareTrade doesn't always send us updated tracking information. We may not know your parts have been delivered. Calling us when you receive them ensures your repair gets booked without delay.",
  },
  {
    question: "Why doesn't Metro TV triage my SquareTrade claim?",
    answer:
      "SquareTrade performs their own parts triage before dispatching us. They determine which parts are needed and ship them directly to you. Our role is the in-home installation and repair.",
  },
  {
    question: "How fast is the SquareTrade process?",
    answer:
      "SquareTrade is one of the fastest extended warranty processes overall. Once parts arrive at your home and you call us, we're typically dispatched and on-site quickly. The biggest factor in turnaround is how soon you let us know your parts are in hand.",
  },
  {
    question: "Will I have to pay anything?",
    answer:
      "For covered SquareTrade warranty repairs, there is no cost to you (unless your plan requires a deductible). Parts and labor are covered by your SquareTrade plan.",
  },
  {
    question:
      "What if the wrong parts were sent or the repair doesn't fix the issue?",
    answer:
      "If additional parts are needed, our technician will work with SquareTrade to order what's required. SquareTrade handles the parts authorization and re-shipment. We'll get you booked for a follow-up visit once the correct parts arrive.",
  },
  {
    question:
      "I have a different warranty (not SquareTrade). Does this page apply to me?",
    answer:
      "No — manufacturer and other extended warranties follow a different process. Please see our Warranty Service Process page for details.",
  },
];

export default function SquareTradePage() {
  return (
    <section className="py-20 px-6 bg-surface">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
          Warranty Service
        </p>
        <h1 className="text-display-lg font-headline font-bold text-on-surface mb-4">
          SquareTrade Warranty Service
        </h1>
        <p
          className="text-body-lg text-on-surface-variant mb-12"
          data-speakable
        >
          SquareTrade is one of the fastest extended warranty processes. They
          handle parts triage and ship parts directly to your home. We handle
          the repair. Here&apos;s how it works and what you need to do.
        </p>

        {/* How it works */}
        <h2 className="text-display-md font-headline font-bold text-on-surface mb-8">
          How SquareTrade Warranty Repair Works
        </h2>
        <ol className="space-y-6 mb-12">
          {[
            {
              step: "You file a claim with SquareTrade",
              desc: "Contact SquareTrade to open your warranty claim. They will diagnose the issue and determine which parts are needed.",
            },
            {
              step: "SquareTrade ships parts to your home",
              desc: "SquareTrade orders the necessary parts and ships them directly to your address. You'll receive the package at your door.",
            },
            {
              step: "You call us when parts arrive",
              desc: `This is the most important step. When your parts arrive, call us at ${BUSINESS.phone} so we can get you on the schedule.`,
            },
            {
              step: "We complete your repair",
              desc: "SquareTrade dispatches us on a given day and we generally go that day. Our technician arrives, installs the parts, and completes the repair.",
            },
          ].map((item, i) => (
            <li
              key={i}
              className="flex gap-4 items-start bg-surface-container-low rounded-2xl p-6"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <div>
                <p className="font-bold font-headline mb-1">{item.step}</p>
                <p className="text-sm text-on-surface-variant">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Call-out */}
        <div className="mb-12 rounded-2xl border-l-4 border-secondary bg-secondary-container/20 p-6">
          <p className="font-bold font-headline mb-2">
            Parts Arrived? Call Us Immediately.
          </p>
          <p className="text-sm text-on-surface-variant">
            SquareTrade doesn&apos;t always provide us with the most up-to-date
            tracking information for your shipment. We may not know your parts
            have arrived unless you tell us. A quick phone call to{" "}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-primary font-medium hover:underline"
            >
              {BUSINESS.phone}
            </a>{" "}
            ensures there&apos;s no gap between your parts arriving and your
            repair being booked.
          </p>
        </div>

        {/* FAQ */}
        <h2 className="text-display-md font-headline font-bold text-on-surface mb-6">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={faqItems} />

        {/* CTA */}
        <div className="mt-16 bg-secondary-container rounded-2xl p-8 md:p-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold font-headline text-on-surface mb-3">
            Ready to schedule your SquareTrade repair?
          </h2>
          <p className="text-on-surface-variant text-sm mb-6 max-w-lg mx-auto">
            Call us as soon as your parts arrive so we can book your repair
            appointment. We prioritize fast turnaround.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={`tel:${BUSINESS.phone}`} variant="primary">
              <span className="material-symbols-outlined text-base" aria-hidden="true">call</span>
              Call {BUSINESS.phone}
            </Button>
            <Button href="/warranty" variant="ghost">
              Other Warranty Info
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
