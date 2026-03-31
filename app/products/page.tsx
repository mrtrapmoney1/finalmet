import { buildMetadata } from "@/lib/metadata";
import { BUSINESS } from "@/lib/constants";
import { OEM_PARTS } from "@/lib/parts";
import { STORE_COPY } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { PageCTA } from "@/components/ui/PageCTA";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = buildMetadata({
  title: "OEM Appliance Parts",
  description: "Browse our inventory of genuine OEM appliance parts for Samsung, LG, GE, Whirlpool, and Electrolux.",
  path: "/products",
  keywords: ["appliance parts", "OEM parts", "Samsung appliance parts", "LG appliance parts"],
});

const BRAND_BG: Record<string, string> = {
  Samsung: "bg-blue-50",
  LG: "bg-red-50",
  "GE Appliances": "bg-slate-100",
  Whirlpool: "bg-indigo-50",
  Electrolux: "bg-cyan-50",
};

function getPartIcon(part: { category: string; brand: string }): string {
  const cat = part.category.toLowerCase();
  if (cat.includes("refrigerator") || cat.includes("freezer")) return "kitchen";
  if (cat.includes("washer") || cat.includes("dryer")) return "local_laundry_service";
  if (cat.includes("range") || cat.includes("oven") || cat.includes("bake")) return "outdoor_grill";
  if (cat.includes("dishwasher")) return "dishwasher";
  if (cat.includes("microwave")) return "microwave";
  if (cat.includes("filter") || cat.includes("water")) return "water_drop";
  return "build_circle";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const params = await searchParams;
  const activeBrand = params?.brand ?? "All";

  const filteredParts = activeBrand === "All" || !activeBrand
    ? OEM_PARTS
    : OEM_PARTS.filter(p => p.brand === activeBrand);

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero section */}
      <div className="hero-gradient py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-primary-fixed/80 uppercase mb-4">
            In-Stock · Genuine OEM
          </p>
          <h1 className="text-display-lg font-bold font-headline text-white mb-4 text-balance">
            Appliance Parts Catalog
          </h1>
          <p className="text-white/70 max-w-xl leading-relaxed mb-8">
            We stock genuine, factory-authorized OEM parts for a variety of major appliance
            brands. Whether you&apos;re doing a DIY repair or requesting our service, we have
            what you need right here in our local warehouse.
          </p>
          <p className="text-sm text-white/60 mt-4">
            {STORE_COPY.heroTagline}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button href="/schedule" variant="primary">Schedule a Repair</Button>
            <Button href="/services" variant="ghost" className="border-white/30 text-white hover:bg-white/10">
              Our Services
            </Button>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filter toolbar */}
        <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-outline-variant/20">
          <p className="text-sm font-semibold text-on-surface-variant self-center mr-2">Filter by:</p>
          {["All", "Samsung", "LG", "GE Appliances", "Whirlpool", "Electrolux"].map((brand) => (
            <Link
              key={brand}
              href={brand === "All" ? "/products" : `/products?brand=${encodeURIComponent(brand)}`}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all text-center ${
                (activeBrand === brand || (brand === "All" && (!activeBrand || activeBrand === "All")))
                  ? "bg-primary text-white border-primary"
                  : "border-outline-variant/40 text-on-surface-variant hover:bg-surface-container hover:border-primary/30"
              }`}
              aria-label={`Filter by ${brand}`}
            >
              {brand}
            </Link>
          ))}
        </div>
        <Suspense fallback={<div className="animate-pulse h-96 bg-surface-container-low rounded-xl w-full border border-outline-variant/20 shadow-ambient flex items-center justify-center text-on-surface-variant font-medium">Loading catalog...</div>}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredParts.map((part, idx) => (
              <Link
                href={`/products/${part.slug}`}
                key={part.id}
                className="bg-surface-container-low rounded-xl overflow-hidden shadow-ambient hover:shadow-ambient-lg active:scale-[0.98] transition-all flex flex-col group border border-outline-variant/20 animate-in fade-in duration-500 slide-in-from-bottom-4"
                style={{ animationFillMode: "both", animationDelay: `${idx * 50}ms` }}
              >
                <div className={`aspect-square ${BRAND_BG[part.brand] ?? "bg-surface-container"} flex items-center justify-center p-6 relative`}>
                  <span className="material-symbols-outlined text-6xl text-primary/40 group-hover:scale-110 transition-transform" aria-hidden="true">
                    {getPartIcon(part)}
                  </span>
                  {part.availability === "in_stock" && (
                    <span className="absolute top-4 right-4 bg-secondary text-white text-[10px] font-bold px-2 py-1 flex items-center rounded-full uppercase tracking-wider">
                      In Stock
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wide mb-1">
                    {part.brand} · {part.mpn}
                  </span>
                  <h2 className="text-lg font-bold font-headline text-on-surface mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {part.title}
                  </h2>
                  <div className="mt-auto flex items-end justify-between pt-4">
                    <span className="text-2xl font-bold text-on-surface">
                      ${part.price.toFixed(2)}
                    </span>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform" aria-hidden="true">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <PageCTA
          heading="Need a part installed?"
          body="Our technicians use OEM parts. Schedule in-home service or drop off at our Lincoln shop."
          primaryLabel="Schedule Service"
          primaryHref="/contact"
          secondaryLabel="View All Services"
          secondaryHref="/services"
          secondaryIcon={null}
        />
      </div>
    </div>
  );
}
