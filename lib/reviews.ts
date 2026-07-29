// Real, verbatim-trimmed Google reviews (public). Curated for range + expertise.
// Names shortened to first-name + last-initial as shown publicly. No reviews that
// name a brand we don't promote. Keep RATING in sync with BUSINESS.reviews.

import { BUSINESS } from "./business";

export const RATING = BUSINESS.reviews;

export interface Testimonial {
  quote: string;
  name: string;
  context: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "My washing machine was broken. When Gary was done, the 10-year-old Maytag was running like new — and now it's super quiet. Highly recommend.",
    name: "Mark P.",
    context: "Washing machine repair",
  },
  {
    quote:
      "Fantastic service on my Pioneer stereo receiver. Very customer-friendly small business — I highly recommend these professionals.",
    name: "Russell M.",
    context: "Audio repair",
  },
  {
    quote:
      "I've had them fix a couple of TVs for me. They are prompt, professional, and do a great job.",
    name: "Omar A.",
    context: "TV repair",
  },
  {
    quote:
      "They've fixed everything from the factory stereo in my Honda to an old VCR I wanted working for the kids at Christmas.",
    name: "Paul I.",
    context: "Electronics repair",
  },
  {
    quote:
      "They always show me what broke and what caused the trouble, and they teach me something about my machine each time.",
    name: "Pam S.",
    context: "Dishwasher repair",
  },
  {
    quote:
      "Gary explained everything in terms we could understand and went above and beyond. He is a model service technician.",
    name: "Bob F.",
    context: "In-home service",
  },
];
