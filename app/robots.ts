import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

// Generates /robots.txt. Everything is crawlable; the noindex pages
// (privacy, terms) carry a meta noindex instead of a robots disallow so
// crawlers can reach them and honor the directive.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BUSINESS.url}/sitemap.xml`,
    host: BUSINESS.url,
  };
}
