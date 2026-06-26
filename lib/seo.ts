import type { Metadata } from "next";
import { BUSINESS } from "./business";

/**
 * Per-page metadata helper. Produces the page <title>/description plus a
 * complete, page-specific OpenGraph + Twitter block and the canonical URL —
 * so each route has its own share preview rather than inheriting the home
 * page's. The og:image / twitter:image point at the shared app/opengraph-image.tsx
 * (resolved against metadataBase). A route that defines its own openGraph block
 * does NOT inherit the root file-based image, so we wire it in explicitly here.
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${BUSINESS.url}${path}`;
  const ogTitle = `${title} | ${BUSINESS.name}`;
  // Shared share card from app/opengraph-image.tsx; relative URL resolves
  // against metadataBase (set in app/layout.tsx).
  const ogImage = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: ogTitle,
  };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: BUSINESS.name,
      title: ogTitle,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
