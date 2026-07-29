"use client";

import { useEffect } from "react";
import { track, type LinkPosition } from "@/lib/analytics";

/**
 * One delegated click listener for every outbound-intent link on the site.
 *
 * Why delegation instead of onClick on <Button>: Button, Header, Footer and the
 * section components are server components. Adding handlers would push a large
 * part of the tree to the client for the sake of an analytics call. A single
 * document-level listener catches every tel:/sms:/directions link that exists
 * today AND any added later, with no per-component wiring to forget.
 *
 * Mounted once in app/layout.tsx.
 */

function positionOf(el: Element): LinkPosition {
  const explicit = el.closest<HTMLElement>("[data-analytics-position]");
  if (explicit?.dataset.analyticsPosition) {
    return explicit.dataset.analyticsPosition as LinkPosition;
  }
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  if (el.closest("form")) return "contact_page";
  return "body";
}

export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Ignore synthetic/programmatic clicks and modified clicks that don't
      // represent a real intent to use the link.
      if (!e.isTrusted) return;
      const target = e.target as Element | null;
      const link = target?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      const href = link.getAttribute("href") ?? "";
      const link_position = positionOf(link);

      if (href.startsWith("tel:")) {
        track("phone_click", { link_position, label: href.replace("tel:", "") });
        return;
      }
      if (href.startsWith("sms:")) {
        track("sms_click", { link_position, label: href.replace("sms:", "") });
        return;
      }
      // Directions = any link out to a maps host.
      if (/^https?:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.google|maps\.app\.goo\.gl)/.test(href)) {
        track("directions_click", { link_position });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
