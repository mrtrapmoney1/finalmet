import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
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
      <Testimonials />
      <CTA />
    </>
  );
}
