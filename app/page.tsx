import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Brands } from "@/components/sections/Brands";
import { WarrantyTeaser } from "@/components/sections/WarrantyTeaser";
import { CTA } from "@/components/sections/CTA";
import { BrandRails } from "@/components/BrandRails";

export default function HomePage() {
  return (
    <>
      <BrandRails />
      <Hero />
      <Stats />
      <ServicesGrid />
      <Brands />
      <WarrantyTeaser />
      <CTA />
    </>
  );
}
