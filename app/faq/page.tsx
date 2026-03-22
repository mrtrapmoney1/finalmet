"use client";

import { useState } from "react";
import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const FAQS = [
  {
    category: "Getting Started",
    items: [
      {
        q: "Do I need an appointment for drop-off service?",
        a: "No appointment needed — we're a walk-in shop. Bring your TV, audio equipment, or commercial microwave to 1107 North Cotner Blvd, Lincoln, NE 68505 during business hours (Mon–Fri 8:30 AM – 6:00 PM).",
      },
      {
        q: "How do I schedule in-home appliance repair?",
        a: "Call us at (402) 466-9090 or send a message through our contact form. We'll schedule a convenient time and dispatch a technician directly to your home. We cover 200+ zip codes across Nebraska and Iowa.",
      },
      {
        q: "What brands do you service?",
        a: "We hold factory authorization for Samsung, LG, GE Appliances, Electrolux, Maytag, KitchenAid, JennAir, Amana, Frigidaire, Sharp, Panasonic, Speed Queen, Hisense, Yamaha, Denon, Marantz, Pioneer, Menumaster, and Vizio — among others.",
      },
    ],
  },
  {
    category: "Pricing & Diagnosis",
    items: [
      {
        q: "What is the diagnostic fee?",
        a: `Our diagnostic deductible is ${BUSINESS.diagnostic}. This fee is applied toward the cost of your repair if you choose to proceed. You will always receive a written estimate before any repair work begins.`,
      },
      {
        q: "Will I receive a quote before any work is done?",
        a: "Always. We diagnose the issue, then present you with a detailed estimate. No work proceeds without your explicit approval. There are no surprise charges.",
      },
      {
        q: "Do you use OEM (original manufacturer) parts?",
        a: "Yes — exclusively. Factory authorization gives us direct access to OEM parts and technical service manuals. We do not use aftermarket substitutes.",
      },
    ],
  },
  {
    category: "Warranty & Coverage",
    items: [
      {
        q: "Is there a warranty on repairs?",
        a: "Yes. Our repairs are backed by a parts and labor warranty. Visit our Warranty page for full details on coverage terms.",
      },
      {
        q: "Are you authorized for manufacturer warranty repairs?",
        a: "Yes. As a factory-authorized service center, we can perform in-warranty repairs for many of the brands we carry. Check with your manufacturer or contact us to confirm coverage for your specific model.",
      },
      {
        q: "What if my appliance can't be repaired economically?",
        a: "We'll tell you honestly. If the repair cost approaches or exceeds replacement value, we'll say so — and explain the trade-offs — rather than recommending a repair that doesn't make financial sense.",
      },
    ],
  },
  {
    category: "Service Area",
    items: [
      {
        q: "What areas do you cover for in-home appliance repair?",
        a: "We cover 200+ zip codes including Lincoln, Omaha, Council Bluffs, Grand Island, and surrounding communities. See our full Service Area map for details.",
      },
      {
        q: "Do you offer in-home service for TVs and audio equipment?",
        a: "TV, audio, and commercial microwave service is drop-off only at our Lincoln shop. In-home service is available for appliances (washers, dryers, refrigerators, dishwashers, etc.).",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-outline-variant/30 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-on-surface leading-snug group-hover:text-primary transition-colors">
          {q}
        </span>
        <span className="material-symbols-outlined text-xl text-on-surface-variant shrink-0 mt-0.5 transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : undefined }}>
          expand_more
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm text-on-surface-variant leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="bg-surface">
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
            <div className="bg-surface-container-low rounded-2xl px-6 shadow-ambient">
              {section.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
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
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-secondary text-on-secondary hover:opacity-90 transition"
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
