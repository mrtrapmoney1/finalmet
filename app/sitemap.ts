import type { MetadataRoute } from "next";
import { OEM_PARTS } from "@/lib/parts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://metrotv-audiotech.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/appliance`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tv`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/audio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/commercial`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/service-area`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/schedule`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/warranty`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/partners`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/squaretrade`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/troubleshooting`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/troubleshooting/appliances`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/troubleshooting/tv`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/troubleshooting/audio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/troubleshooting/commercial`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/appliance-repair-lincoln`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/appliance-repair-omaha`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/appliance-repair-bellevue`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/appliance-repair-council-bluffs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/appliance-repair-grand-island`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/appliance-repair-southeast-nebraska`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...OEM_PARTS.map((part) => ({
      url: `${base}/products/${part.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
