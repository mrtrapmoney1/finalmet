import { buildMetadata } from "@/lib/metadata";
import { BUSINESS } from "@/lib/constants";
import { OEM_PARTS } from "@/lib/parts";
import { AddToCartButton } from "@/components/AddToCartButton";
import { notFound } from "next/navigation";
import Link from "next/link";
import { STORE_COPY } from "@/lib/content";

const BRAND_BG: Record<string, string> = {
  Samsung: "bg-blue-50",
  LG: "bg-red-50",
  "GE Appliances": "bg-slate-100",
  Whirlpool: "bg-indigo-50",
  Electrolux: "bg-cyan-50",
};

function getPartIcon(category: string): string {
  const cat = category.toLowerCase();
  if (cat.includes("refrigerator") || cat.includes("freezer")) return "kitchen";
  if (cat.includes("washer") || cat.includes("dryer")) return "local_laundry_service";
  if (cat.includes("range") || cat.includes("oven") || cat.includes("bake")) return "outdoor_grill";
  if (cat.includes("dishwasher")) return "dishwasher";
  if (cat.includes("microwave")) return "microwave";
  if (cat.includes("filter") || cat.includes("water")) return "water_drop";
  return "build_circle";
}

export async function generateStaticParams() {
  return OEM_PARTS.map((part) => ({
    slug: part.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const part = OEM_PARTS.find((p_item) => p_item.slug === p.slug);
  
  if (!part) return {};

  return buildMetadata({
    title: part.title,
    description: part.description,
    path: `/products/${part.slug}`,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await params;
  const part = OEM_PARTS.find((p_item) => p_item.slug === p.slug);

  if (!part) {
    notFound();
  }

  // Generate Merchant Center compliant Product Structured Data
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: part.title,
    image: part.image_link,
    description: part.description,
    sku: part.mpn,
    mpn: part.mpn,
    brand: {
      "@type": "Brand",
      name: part.brand,
    },
    offers: {
      "@type": "Offer",
      url: `${BUSINESS.url}/products/${part.slug}`,
      priceCurrency: "USD",
      price: part.price.toString(),
      priceValidUntil: "2028-12-31", // Optional Google warning fix
      availability:
        part.availability === "in_stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <div className="bg-surface min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Part image — category icon with brand-tinted background */}
          <div className={`${BRAND_BG[part.brand] ?? "bg-surface-container-low"} border border-outline-variant/20 rounded-3xl aspect-[4/3] md:aspect-square flex flex-col items-center justify-center p-10 relative overflow-hidden`}>
            <span className="material-symbols-outlined text-[120px] text-primary/20" aria-hidden="true">
              {getPartIcon(part.category)}
            </span>
            <p className="text-xs font-mono text-on-surface-variant/50 mt-4">{part.mpn}</p>
            {part.availability === "in_stock" && (
              <span className="absolute top-6 left-6 bg-secondary text-white text-[12px] font-bold px-3 py-1.5 flex items-center rounded-full uppercase tracking-wider">
                In Stock
              </span>
            )}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/5 to-transparent h-16" />
          </div>

          {/* Details */}
          <div className="flex flex-col flex-grow">
            <div className="mb-8">
              <span className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-base" aria-hidden="true">verified</span>
                Original Equipment Manufacturer
              </span>
              <h1 className="text-display-md font-bold font-headline text-on-surface mb-4 text-balance">
                {part.title}
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                {part.description}
              </p>
            </div>

            <div className="bg-surface-container-low p-6 rounded-2xl mb-8 space-y-4">
               <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
                 <span className="text-on-surface-variant">Brand</span>
                 <span className="font-semibold text-on-surface">{part.brand}</span>
               </div>
               <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
                 <span className="text-on-surface-variant">Part Number (MPN)</span>
                 <span className="font-mono bg-surface px-2 py-0.5 rounded text-on-surface font-semibold">{part.mpn}</span>
               </div>
               <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
                 <span className="text-on-surface-variant">Internal ID</span>
                 <span className="text-on-surface font-medium">{part.id}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-on-surface-variant">Condition</span>
                 <span className="uppercase text-sm font-bold tracking-wide text-on-surface">{part.condition}</span>
               </div>
            </div>

            <div className="mt-auto">
              {/* Price row */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mb-1">Price</span>
                  <span className="text-4xl font-black text-on-surface">${part.price.toFixed(2)}</span>
                </div>
                {part.availability === "out_of_stock" && (
                  <span className="flex items-center gap-1.5 bg-surface-container-highest text-on-surface-variant text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">inventory_2</span>
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Order options when out of stock */}
              {part.availability === "out_of_stock" ? (
                <div className="space-y-3">
                  <p className="text-sm text-on-surface-variant mb-4">
                    This part is currently out of stock. Contact us to check availability or place a special order — we source OEM parts daily.
                  </p>
                  <a
                    href={`mailto:service@metrotv-audiotech.com?subject=Part Inquiry: ${encodeURIComponent(part.mpn)}&body=${encodeURIComponent(`Hello,\n\nI'm interested in ordering the following part:\n\nPart: ${part.title}\nMPN: ${part.mpn}\nPrice: $${part.price.toFixed(2)}\n\nPlease let me know availability and lead time.\n\nThank you`)}`}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-white rounded-full py-3.5 text-sm font-semibold hover:opacity-90 transition active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-base" aria-hidden="true">mail</span>
                    Email to Order
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`tel:${BUSINESS.phone}`}
                      className="flex items-center justify-center gap-2 bg-surface-container-highest text-on-surface rounded-full py-3 text-sm font-semibold hover:bg-surface-container transition active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-base" aria-hidden="true">phone</span>
                      Call Us
                    </a>
                    <a
                      href="/contact"
                      className="flex items-center justify-center gap-2 bg-surface-container-highest text-on-surface rounded-full py-3 text-sm font-semibold hover:bg-surface-container transition active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-base" aria-hidden="true">store</span>
                      Visit Store
                    </a>
                  </div>
                </div>
              ) : (
                <AddToCartButton
                  id={part.id}
                  mpn={part.mpn}
                  title={part.title}
                  price={part.price}
                />
              )}
            </div>
          </div>
          
        </div>

        {/* ── Extended Part Details ─────────────────────────────── */}

        {/* Symptoms this fixes */}
        {part.symptoms && part.symptoms.length > 0 && (
          <div className="border-t border-outline-variant/20 mt-12 pt-10">
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">Symptoms This Part Fixes</p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {part.symptoms.map((s) => (
                <li key={s} className="flex items-start gap-3 bg-surface-container-low rounded-xl px-4 py-3 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-base text-secondary mt-0.5 shrink-0" aria-hidden="true">check_circle</span>
                  <span className="text-sm text-on-surface">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technical specs */}
        {part.specs && Object.keys(part.specs).length > 0 && (
          <div className="border-t border-outline-variant/20 mt-10 pt-10">
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">Technical Specifications</p>
            <div className="grid sm:grid-cols-2 gap-px bg-outline-variant/20 rounded-xl overflow-hidden border border-outline-variant/20">
              {Object.entries(part.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between gap-4 bg-surface-container-low px-4 py-3">
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">{key}</span>
                  <span className="text-sm font-medium text-on-surface text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Installation notes */}
        {part.installNotes && (
          <div className="border-t border-outline-variant/20 mt-10 pt-10">
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-3">Installation Notes</p>
            <div className="flex gap-3 bg-surface-container-low rounded-xl px-5 py-4 border border-outline-variant/20">
              <span className="material-symbols-outlined text-xl text-primary shrink-0 mt-0.5" aria-hidden="true">info</span>
              <p className="text-sm text-on-surface-variant leading-relaxed">{part.installNotes}</p>
            </div>
          </div>
        )}

        {/* Compatible models */}
        {part.compatibleModels && part.compatibleModels.length > 0 && (
          <div className="border-t border-outline-variant/20 mt-10 pt-10">
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-1">Compatible Models</p>
            <p className="text-xs text-on-surface-variant mb-4">Verified fits for this part. 500+ Samsung and Kenmore models total — contact us to confirm your specific model.</p>
            <div className="flex flex-wrap gap-2">
              {part.compatibleModels.map((m) => (
                <span key={m} className="text-xs font-mono bg-surface-container-low border border-outline-variant/30 text-on-surface-variant px-2.5 py-1 rounded-lg">
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Cross-reference / replaces */}
        {part.replacesPartNumbers && part.replacesPartNumbers.length > 0 && (
          <div className="border-t border-outline-variant/20 mt-10 pt-10">
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-1">Also Replaces</p>
            <p className="text-xs text-on-surface-variant mb-4">This part is a direct OEM replacement for the following part numbers.</p>
            <div className="flex flex-wrap gap-2">
              {part.replacesPartNumbers.map((n) => (
                <span key={n} className="text-xs font-mono bg-primary/5 border border-primary/20 text-primary px-2.5 py-1 rounded-lg">
                  {n}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Services */}
        <div className="border-t border-outline-variant/20 mt-12 pt-10">
          <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
            Related Resources
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: "build", label: "Schedule Installation", sub: "We install what we sell", href: "/contact" },
              { icon: "search", label: "Troubleshooting Guides", sub: "Diagnose before you buy", href: "/troubleshooting" },
              { icon: "inventory_2", label: "All Parts", sub: "Full catalog", href: "/products" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 bg-surface-container-low rounded-xl p-5 shadow-ambient hover:bg-surface-container transition-colors group"
              >
                <span className="material-symbols-outlined text-2xl text-secondary" aria-hidden="true">{item.icon}</span>
                <div>
                  <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{item.label}</p>
                  <p className="text-xs text-on-surface-variant">{item.sub}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-sm text-on-surface-variant">{STORE_COPY.purchaseNote}</p>
        </div>

      </div>
    </div>
  );
}
