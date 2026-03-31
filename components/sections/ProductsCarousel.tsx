import Link from "next/link";
import { OEM_PARTS } from "@/lib/parts";

const CATEGORY_ICONS: Record<string, string> = {
  "Home & Garden > Appliances > Appliance Accessories > Refrigerator Parts & Accessories": "kitchen",
  "Home & Garden > Appliances > Appliance Accessories > Washer & Dryer Parts & Accessories": "local_laundry_service",
  "Home & Garden > Appliances > Appliance Accessories > Range Parts & Accessories": "outdoor_grill",
  "Home & Garden > Appliances > Appliance Accessories > Dishwasher Parts & Accessories": "dishwasher",
};

function getIcon(category: string): string {
  return CATEGORY_ICONS[category] ?? "build_circle";
}

const BRAND_COLORS: Record<string, string> = {
  Samsung: "from-blue-900/20 to-blue-800/10",
  LG: "from-red-900/20 to-red-800/10",
  "GE Appliances": "from-slate-800/20 to-slate-700/10",
  Whirlpool: "from-indigo-900/20 to-indigo-800/10",
  Electrolux: "from-cyan-900/20 to-cyan-800/10",
};

export function ProductsCarousel() {
  return (
    <section className="py-12 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-2">OEM Parts</p>
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-on-surface">
              Parts Store — Coming Soon
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Order in-store at our Lincoln shop. Online ordering launching soon.
            </p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline shrink-0">
            Browse all parts
            <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>

        {/* Horizontal scroll carousel */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6"
          style={{ scrollbarWidth: "none" }}
        >
          {OEM_PARTS.map((part) => (
            <Link
              key={part.id}
              href={`/products/${part.slug}`}
              className={`snap-start shrink-0 w-56 bg-gradient-to-br ${BRAND_COLORS[part.brand] ?? "from-surface-container to-surface"} bg-surface-container rounded-2xl border border-outline-variant/20 overflow-hidden hover:shadow-ambient-lg active:scale-[0.98] transition-all group`}
            >
              {/* Image area */}
              <div className="aspect-square flex items-center justify-center relative bg-surface/40 p-6">
                <span className="material-symbols-outlined text-6xl text-primary/30 group-hover:scale-110 transition-transform" aria-hidden="true">
                  {getIcon(part.category)}
                </span>
                {/* Coming Soon overlay */}
                <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl">
                  <span className="text-white text-xs font-bold tracking-widest uppercase">Online Soon</span>
                </div>
                <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {part.brand}
                </span>
              </div>
              {/* Info */}
              <div className="p-4">
                <p className="text-xs text-on-surface-variant font-mono mb-1">{part.mpn}</p>
                <p className="text-sm font-bold text-on-surface leading-tight line-clamp-2 mb-2">{part.title}</p>
                <p className="text-lg font-black text-on-surface">${part.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}

          {/* "More coming" placeholder */}
          <div className="snap-start shrink-0 w-56 bg-surface-container rounded-2xl border border-outline-variant/20 border-dashed flex flex-col items-center justify-center p-8 text-center gap-3">
            <span className="material-symbols-outlined text-4xl text-outline" aria-hidden="true">add_circle</span>
            <p className="text-sm font-semibold text-on-surface-variant">More parts added weekly</p>
            <Link href="/products" className="text-xs text-primary font-semibold hover:underline">
              View full catalog →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
