import { Metadata } from "next";
import { BUSINESS } from "./constants";

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function buildMetadata(opts: PageMetaOptions): Metadata {
  const url = `${BUSINESS.url}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: BUSINESS.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: opts.title,
      description: opts.description,
    },
    robots: opts.noIndex ? { index: false } : undefined,
  };
}
