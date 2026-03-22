import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://metrotv-audiotech.com/sitemap.xml",
    host: "metrotv-audiotech.com",
  };
}
