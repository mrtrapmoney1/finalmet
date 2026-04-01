import { buildMetadata } from "@/lib/metadata";
import { BUSINESS } from "@/lib/constants";
import { OEM_PARTS } from "@/lib/parts";
import { AddToCartButton } from "@/components/AddToCartButton";
import { notFound } from "next/navigation";
import Link from "next/link";
import { STORE_COPY } from "@/lib/content";
import { ProductImageGallery } from "@/components/ProductImageGallery";

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
  if (!part) notFound();

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: part.title,
    image: part.images && part.images.length > 0
      ? part.images.map(img => img.startsWith("/") ? `${BUSINESS.url}${img}` : img)
      : part.image_link,
    description: part.description,
    sku: part.mpn,
    mpn: part.mpn,
    brand: { "@type": "Brand", name: part.brand },
    offers: {
      "@type": "Offer",
      url: `${BUSINESS.url}/products/${part.slug}`,
      priceCurrency: "USD",
      price: part.price.toString(),
      priceValidUntil: "2028-12-31",
      availability:
        part.availability === "in_stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const VERDICT_COLORS: Record<string, string> = {
    "Motor likely needed": "text-secondary",
    "Not the motor": "text-green-700",
    "Check the blower fan first": "text-amber-600",
  };

  return (
    <div className="bg-surface min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-on-surface-variant mb-6" aria-label="Breadcrumb">
          <Link href="/products" className="hover:text-primary transition-colors">Parts</Link>
          <span aria-hidden="true">/</span>
          <span className="text-on-surface">{part.brand}</span>
          <span aria-hidden="true">/</span>
          <span className="text-on-surface font-medium">{part.mpn}</span>
        </nav>

        {/* ── Hero grid ─────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-10">

          {/* Image / Gallery */}
          {part.images && part.images.length > 0 ? (
            <ProductImageGallery
              images={part.images}
              alt={part.title}
              mpn={part.mpn}
              inStock={part.availability === "in_stock"}
            />
          ) : (
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl aspect-square flex flex-col items-center justify-center p-8 relative overflow-hidden">
              <span className="material-symbols-outlined text-[96px] text-primary/20" aria-hidden="true">
                {getPartIcon(part.category)}
              </span>
              <p className="text-xs font-mono text-on-surface-variant/50 mt-3">{part.mpn}</p>
              {part.availability === "in_stock" && (
                <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">
                  In Stock
                </span>
              )}
            </div>
          )}

          {/* Details */}
          <div className="flex flex-col">

            {/* OEM badge + title */}
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">verified</span>
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">Genuine OEM Part</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-on-surface mb-3 text-balance leading-tight">
              {part.title}
            </h1>
            <p className="text-base text-on-surface-variant leading-relaxed mb-5">
              {part.description}
            </p>

            {/* Part metadata */}
            <div className="border-t border-b border-outline-variant/20 py-3 mb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Brand</span>
                <span className="font-medium text-on-surface">{part.brand}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Part Number (MPN)</span>
                <span className="font-mono bg-surface border border-outline-variant/30 px-1.5 py-0.5 rounded text-on-surface text-xs">{part.mpn}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Internal ID</span>
                <span className="text-on-surface">{part.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Condition</span>
                <span className="font-medium text-on-surface capitalize">{part.condition}</span>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="mt-auto">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-black text-on-surface">${part.price.toFixed(2)}</span>
                {part.availability === "out_of_stock" && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-on-surface-variant bg-surface-container-highest px-2.5 py-1 rounded uppercase tracking-wide">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">inventory_2</span>
                    Out of Stock
                  </span>
                )}
              </div>

              {part.availability === "out_of_stock" ? (
                <div className="space-y-2.5">
                  <p className="text-sm text-on-surface-variant mb-3">
                    Currently out of stock. Contact us to check availability or place a special order — we source OEM parts daily.
                  </p>
                  <a
                    href={`mailto:service@metrotv-audiotech.com?subject=Part Inquiry: ${encodeURIComponent(part.mpn)}&body=${encodeURIComponent(`Hello,\n\nI'm interested in ordering the following part:\n\nPart: ${part.title}\nMPN: ${part.mpn}\nPrice: $${part.price.toFixed(2)}\n\nPlease let me know availability and lead time.\n\nThank you`)}`}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-white rounded-md py-3 text-sm font-semibold hover:opacity-90 transition active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-base" aria-hidden="true">mail</span>
                    Email to Order
                  </a>
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={`tel:${BUSINESS.phone}`}
                      className="flex items-center justify-center gap-2 bg-surface-container-highest text-on-surface rounded-md py-2.5 text-sm font-semibold hover:bg-surface-container transition active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-base" aria-hidden="true">phone</span>
                      Call Us
                    </a>
                    <a
                      href="/contact"
                      className="flex items-center justify-center gap-2 bg-surface-container-highest text-on-surface rounded-md py-2.5 text-sm font-semibold hover:bg-surface-container transition active:scale-[0.98]"
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

        {/* ── Symptoms ─────────────────────────────────────── */}
        {part.symptoms && part.symptoms.length > 0 && (
          <section className="border-t border-outline-variant/20 pt-8 mb-8">
            <h2 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-4">Symptoms This Part Fixes</h2>
            <ul className="space-y-1.5">
              {part.symptoms.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-sm text-on-surface">
                  <span className="material-symbols-outlined text-base text-secondary mt-0.5 shrink-0" aria-hidden="true">check_circle</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Technical specs ───────────────────────────────── */}
        {part.specs && Object.keys(part.specs).length > 0 && (
          <section className="border-t border-outline-variant/20 pt-8 mb-8">
            <h2 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-4">Technical Specifications</h2>
            <div className="grid sm:grid-cols-2 gap-px bg-outline-variant/20 rounded-lg overflow-hidden border border-outline-variant/20">
              {Object.entries(part.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between gap-4 bg-surface px-4 py-2.5">
                  <span className="text-sm text-on-surface-variant">{key}</span>
                  <span className="text-sm font-medium text-on-surface text-right">{val}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Diagnosis Guide ───────────────────────────────── */}
        {part.diagnosisGuide && (
          <section className="border-t border-outline-variant/20 pt-8 mb-8">
            <h2 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-1">Diagnosis Guide</h2>
            <p className="text-sm text-on-surface-variant mb-6">Confirm this is the right part before you order.</p>

            {/* Noise triage table */}
            <h3 className="text-base font-semibold text-on-surface mb-3">Step 1 — Identify the noise</h3>
            <div className="rounded-lg border border-outline-variant/20 overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant/20">
                    <th className="text-left px-4 py-2.5 font-semibold text-on-surface-variant">Noise type</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-on-surface-variant">Verdict</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-on-surface-variant hidden sm:table-cell">What to check</th>
                  </tr>
                </thead>
                <tbody>
                  {part.diagnosisGuide.noiseTriage.map((row, i) => (
                    <tr key={i} className="border-b border-outline-variant/10 last:border-0">
                      <td className="px-4 py-3 font-medium text-on-surface">{row.noise}</td>
                      <td className={`px-4 py-3 font-semibold whitespace-nowrap ${VERDICT_COLORS[row.verdict] ?? "text-on-surface"}`}>
                        {row.verdict}
                      </td>
                      <td className="px-4 py-3 text-on-surface-variant hidden sm:table-cell">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Detail rows on mobile (verdict hidden) */}
            <div className="sm:hidden space-y-3 mb-6">
              {part.diagnosisGuide.noiseTriage.map((row, i) => (
                <div key={i} className="bg-surface-container-low rounded-lg px-4 py-3 text-sm">
                  <p className="font-medium text-on-surface mb-0.5">{row.noise}</p>
                  <p className={`font-semibold mb-1 ${VERDICT_COLORS[row.verdict] ?? "text-on-surface"}`}>{row.verdict}</p>
                  <p className="text-on-surface-variant">{row.detail}</p>
                </div>
              ))}
            </div>

            {/* No-spin note */}
            <h3 className="text-base font-semibold text-on-surface mb-2">Step 2 — Drum won&apos;t spin?</h3>
            <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6">
              <span className="material-symbols-outlined text-lg text-amber-600 shrink-0 mt-0.5" aria-hidden="true">warning</span>
              <p className="text-sm text-on-surface leading-relaxed">{part.diagnosisGuide.noSpinNote}</p>
            </div>

            {/* Repair steps */}
            <h3 className="text-base font-semibold text-on-surface mb-3">Step 3 — DIY replacement</h3>
            <div className="flex gap-3 bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 mb-4">
              <span className="material-symbols-outlined text-base text-secondary shrink-0 mt-0.5" aria-hidden="true">info</span>
              <p className="text-sm text-on-surface-variant">Intermediate difficulty. Requires a screwdriver and multimeter. Professional installation available — <Link href="/contact" className="text-primary hover:underline">contact us to schedule</Link>.</p>
            </div>
            <ol className="space-y-2.5">
              {part.diagnosisGuide.repairSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-on-surface">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* ── Compatible models ─────────────────────────────── */}
        {part.compatibleModels && part.compatibleModels.length > 0 && (
          <section className="border-t border-outline-variant/20 pt-8 mb-8">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none mb-1">
                <h2 className="text-sm font-semibold text-secondary uppercase tracking-wide">Works With These Models</h2>
                <span className="flex items-center gap-2 text-sm text-on-surface-variant select-none">
                  <span>{part.compatibleModels.length} verified fits · 500+ total</span>
                  <span className="material-symbols-outlined text-base transition-transform group-open:rotate-180" aria-hidden="true">expand_more</span>
                </span>
              </summary>
              <p className="text-sm text-on-surface-variant mt-1 mb-4">Contact us to confirm your specific model number.</p>
              <div className="rounded-lg border border-outline-variant/20 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/20">
                      <th className="text-left px-4 py-2.5 font-semibold text-on-surface-variant">Brand</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-on-surface-variant">Model Number</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-on-surface-variant">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {part.compatibleModels.map(({ brand, model, description }, i) => (
                      <tr key={model} className={`border-b border-outline-variant/10 last:border-0 ${i % 2 === 1 ? "bg-surface-container-low/40" : ""}`}>
                        <td className="px-4 py-2.5 text-on-surface-variant whitespace-nowrap">{brand}</td>
                        <td className="px-4 py-2.5 font-mono font-medium text-on-surface whitespace-nowrap">{model}</td>
                        <td className="px-4 py-2.5 text-on-surface-variant">{description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </section>
        )}

        {/* ── Also replaces ─────────────────────────────────── */}
        {part.replacesPartNumbers && part.replacesPartNumbers.length > 0 && (
          <section className="border-t border-outline-variant/20 pt-8 mb-8">
            <h2 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-1">Also Replaces These Part Numbers</h2>
            <p className="text-sm text-on-surface-variant mb-4">This is a direct OEM replacement for the following part numbers.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {part.replacesPartNumbers.map((n) => (
                <div key={n} className="text-sm font-mono bg-surface-container-low border border-outline-variant/20 text-on-surface px-3 py-2 rounded">
                  {n}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Related resources ─────────────────────────────── */}
        <section className="border-t border-outline-variant/20 pt-8">
          <h2 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-4">Related Resources</h2>
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {[
              { icon: "build", label: "Schedule Installation", sub: "We install what we sell", href: "/contact" },
              { icon: "search", label: "Troubleshooting Guides", sub: "Diagnose before you buy", href: "/troubleshooting" },
              { icon: "inventory_2", label: "All Parts", sub: "Full catalog", href: "/products" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 bg-surface-container-low rounded-lg p-4 hover:bg-surface-container transition-colors group"
              >
                <span className="material-symbols-outlined text-xl text-secondary shrink-0" aria-hidden="true">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">{item.label}</p>
                  <p className="text-xs text-on-surface-variant">{item.sub}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-sm text-on-surface-variant">{STORE_COPY.purchaseNote}</p>
        </section>

      </div>
    </div>
  );
}
