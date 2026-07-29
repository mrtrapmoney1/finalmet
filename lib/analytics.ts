// Thin, dependency-free wrapper over gtag. Every conversion event on the site
// goes through `track()` so parameter names stay consistent and so there is a
// single place to disable reporting.
//
// Design notes:
//  - Never throws. Analytics failing must never break a phone link.
//  - No-ops when gtag is absent (dev, no-JS, blocked by an ad blocker, or a
//    host that isn't the production domain — see components/Analytics.tsx).
//  - `page_path` and `link_position` are attached to every event so reports can
//    answer "which CTA on which page actually converts".

export type AnalyticsEvent =
  | "phone_click"
  | "sms_click"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "directions_click"
  | "service_page_view"
  | "faq_expand"
  | "game_played";

/** Where on the page the interaction happened — header, hero, footer, etc. */
export type LinkPosition =
  | "header"
  | "hero"
  | "footer"
  | "cta"
  | "contact_page"
  | "faq"
  | "service_detail"
  | "sticky"
  | "body";

interface TrackParams {
  link_position?: LinkPosition;
  /** Service slug, for service-scoped events. */
  service?: string;
  /** Free-form detail, e.g. the FAQ question that was opened. */
  label?: string;
  [key: string]: string | number | boolean | undefined;
}

type GtagFn = (
  command: "event" | "config" | "js" | "set",
  targetOrName: string | Date,
  params?: Record<string, unknown>,
) => void;

function gtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const fn = (window as unknown as { gtag?: GtagFn }).gtag;
  return typeof fn === "function" ? fn : null;
}

export function track(event: AnalyticsEvent, params: TrackParams = {}): void {
  try {
    const send = gtag();
    if (!send) return;
    send("event", event, {
      page_path:
        typeof window !== "undefined" ? window.location.pathname : undefined,
      ...params,
    });
  } catch {
    /* analytics must never break the page */
  }
}

/**
 * True when reporting is live. Exposed so UI can avoid pretending to track in
 * environments where it doesn't (used by the internal dashboard).
 */
export function analyticsActive(): boolean {
  return gtag() !== null;
}
