import type { MetadataRoute } from "next";
import { BUSINESS, SERVICES } from "@/lib/business";

// Generates /sitemap.xml. Lists indexable canonical pages only — the
// noindex legal pages (privacy, terms) are intentionally excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = BUSINESS.url;
  const now = new Date();

  const staticPaths = [
    "",
    "/services",
    "/home-warranty",
    "/service-area",
    "/how-it-works",
    "/faq",
    "/contact",
  ];
  const servicePaths = SERVICES.map((s) => `/${s.slug}`);

  return [...staticPaths, ...servicePaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
