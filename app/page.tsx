import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { Brands } from "@/components/sections/Brands";
import { WarrantyTeaser } from "@/components/sections/WarrantyTeaser";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesGrid />
      <ScrollStory
        panels={[
          {
            eyebrow: "How We Work",
            title: (
              <>
                We diagnose to the root cause<span className="dot">.</span>
              </>
            ),
            body: "No parts-cannon guessing. We find what actually failed — then put it in writing, with a real estimate, before we touch your repair.",
          },
          {
            eyebrow: "How We Work",
            title: (
              <>
                Then we fix it with OEM parts<span className="dot">.</span>
              </>
            ),
            body: "Factory authorization means original manufacturer parts and service docs for the brands you own. Fixed right — the first time.",
          },
        ]}
      />
      <Brands />
      <WarrantyTeaser />
      <CTA />
    </>
  );
}
