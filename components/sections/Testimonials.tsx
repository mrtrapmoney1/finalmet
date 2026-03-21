import { Button } from "@/components/ui/Button";

// Replace GOOGLE_PLACE_ID with your actual Google Place ID once you've
// verified your Google Business Profile at business.google.com.
// Find your Place ID at: https://developers.google.com/maps/documentation/places/web-service/place-id
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Metro+TV+%26+Appliances/@40.8358,-96.6467,17z";

export function Testimonials() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — heading */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
              Customer Reviews
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-on-surface leading-tight mb-4">
              Precision Earns Trust.
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              We&apos;ve been serving Nebraska homes since 1947. See what our
              customers say on Google — and if you&apos;ve worked with us,
              we&apos;d love to hear from you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href={GOOGLE_REVIEWS_URL} variant="primary">
                Read Google Reviews
              </Button>
              <Button href={`${GOOGLE_REVIEWS_URL}/review`} variant="ghost">
                Leave a Review
              </Button>
            </div>
          </div>

          {/* Right — Google rating card */}
          <div className="bg-surface rounded-2xl p-10 shadow-ambient flex flex-col gap-6">
            {/* Google logo + label */}
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 48 48"
                className="w-8 h-8 flex-shrink-0"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              <span className="text-sm font-semibold text-on-surface-variant">
                Google Reviews
              </span>
            </div>

            {/* Star display */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-5xl font-bold font-headline text-on-surface">
                  4.9
                </span>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-2xl text-secondary"
                      style={{
                        fontVariationSettings:
                          i < 4 ? "'FILL' 1" : "'FILL' 1",
                      }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-on-surface-variant">
                Based on Google reviews — Lincoln, NE
              </p>
            </div>

            <div className="border-t border-outline-variant/30 pt-6 space-y-2">
              {[
                "Factory-authorized parts & service",
                "Transparent pricing, no surprises",
                "Serving Nebraska since 1947",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-base text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
