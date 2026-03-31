import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { ProductsCarousel } from "@/components/sections/ProductsCarousel";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { ZipChecker } from "@/components/ZipChecker";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Factory-Authorized Appliance & TV Repair — Lincoln, NE",
  description:
    "Metro TV & Appliances: factory-authorized repair for Samsung, LG, GE, Whirlpool, and more. Serving Lincoln, Omaha, and 200+ Nebraska zip codes since 1947.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <ProductsCarousel />
      <Testimonials />
      <section className="py-12 bg-surface-container-low">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-3">Coverage Check</p>
          <h2 className="text-2xl font-bold font-headline text-on-surface mb-2">Are You In Our Service Area?</h2>
          <p className="text-sm text-on-surface-variant mb-6">Enter your ZIP code to check coverage and see your diagnostic fee.</p>
          <ZipChecker />
        </div>
      </section>
      <CTA />
    </>
  );
}
