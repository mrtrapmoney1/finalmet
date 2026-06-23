import type { Metadata } from "next";
import { BUSINESS } from "./business";

/**
 * Per-page metadata helper. Produces the page <title>/description plus a
 * complete, page-specific OpenGraph + Twitter block and the canonical URL —
 * so each route has its own share preview rather than inheriting the home
 * page's. The og:image / twitter:image come from app/opengraph-image.tsx.
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
    },
    twitter: { title: ogTitle, description },
  };
}
