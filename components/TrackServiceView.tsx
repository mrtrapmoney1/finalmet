"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/**
 * Fires `service_page_view` with the service slug, once per mount.
 *
 * This is separate from GA4's automatic page_view on purpose: it lets you build
 * a "which service actually drives calls" report without parsing URLs, and it is
 * gated behind document visibility for the same reason page_view is — a
 * prefetched or preview-rendered document must not report itself as a view.
 */
export function TrackServiceView({ slug }: { slug: string }) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;

    const send = () => {
      if (sent.current || document.visibilityState !== "visible") return;
      sent.current = true;
      track("service_page_view", { service: slug, link_position: "service_detail" });
    };

    send();
    if (!sent.current) {
      document.addEventListener("visibilitychange", send);
      return () => document.removeEventListener("visibilitychange", send);
    }
  }, [slug]);

  return null;
}
