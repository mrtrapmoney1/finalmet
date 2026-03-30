"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-surface-container-low rounded-2xl overflow-hidden shadow-ambient"
        >
          <button
            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-surface-container transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="font-semibold text-on-surface">{item.question}</span>
            <span className="material-symbols-outlined text-on-surface-variant shrink-0 transition-transform duration-200"
              aria-hidden="true"
              style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              expand_more
            </span>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-6 text-on-surface-variant leading-relaxed text-sm">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
