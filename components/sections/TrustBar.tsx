const STATS = [
  { value: "1947", label: "Founded in Lincoln, NE" },
  { value: "200+", label: "Zip codes covered" },
  { value: "13+", label: "Authorized brands" },
  { value: "$42.90", label: "Flat diagnostic fee" },
];

export function TrustBar() {
  return (
    <section className="py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-3xl font-bold font-headline text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-white/50 font-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
