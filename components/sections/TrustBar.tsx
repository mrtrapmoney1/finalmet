import { BUSINESS } from "@/lib/constants";

const STATS = [
  { value: BUSINESS.founded.toString(), label: "Founded in Lincoln, NE" },
  { value: "200+", label: "Zip codes covered" },
  { value: "13+", label: "Authorized brands" },
  { value: `From ${BUSINESS.diagnosticDropOff}`, label: "Drop-off diagnostic" },
];

export function TrustBar() {
  return (
    <section className="py-8 bg-primary fade-in">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className="text-center md:text-left"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <p className="text-3xl font-bold font-headline text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-white/70 font-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
