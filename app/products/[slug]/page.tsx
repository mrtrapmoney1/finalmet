import { buildMetadata } from "@/lib/metadata";
import { BUSINESS } from "@/lib/constants";
import { OEM_PARTS } from "@/lib/parts";
import { Button } from "@/components/ui/Button";
import { notFound } from "next/navigation";
import Link from "next/link";
import { STORE_COPY } from "@/lib/content";

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
          
          {/* Image Placeholder Skeleton */}
          <div className="bg-surface-container-highest border border-outline-variant/20 rounded-3xl aspect-[4/3] md:aspect-square flex flex-col items-center justify-center p-10 relative overflow-hidden group animate-pulse">
            <span className="material-symbols-outlined text-9xl text-primary/20" aria-hidden="true">
              image
            </span>
            {part.availability === "in_stock" && (
              <span className="absolute top-6 left-6 bg-secondary text-white text-[12px] font-bold px-3 py-1.5 flex items-center rounded-full uppercase tracking-wider">
                In Stock
              </span>
            )}
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

            <div className="mt-auto flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mb-1">Price</span>
                <span className="text-4xl font-black text-on-surface">${part.price.toFixed(2)}</span>
              </div>
              
              <Button href="/contact" variant="primary" className="ml-auto">
                <span className="material-symbols-outlined text-lg mr-2 drop-shadow-sm" aria-hidden="true">shopping_cart</span>
                Buy Locally
              </Button>
            </div>
          </div>
          
        </div>

        {/* Related Services */}
        <div className="border-t border-outline-variant/20 mt-16 pt-12">
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
