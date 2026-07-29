import Script from "next/script";
import { BUSINESS } from "@/lib/business";

/**
 * Google tag (gtag.js) / GA4, loaded `afterInteractive` so it never blocks paint.
 *
 * HOST GATING (added 2026-07-29 — do not remove without reading this):
 * The measurement ID used to be a hardcoded fallback with no environment guard,
 * which meant the LIVE production property received hits from every `npm run dev`
 * session, every preview/staging deploy, every CI or Lighthouse run, every clone
 * of this repo, and every headless bot that executes JS. All of that arrives with
 * no referrer, i.e. as Direct / (none), and geolocates to whatever datacenter it
 * ran in. That is the most likely explanation for a Lincoln, NE business showing
 * a large Direct skew and top-country traffic from a cloud region.
 *
 * The tag now loads only on the real public hostnames. Everywhere else the site
 * behaves identically but reports nothing.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-91M6FW7C7B";

// Derived from BUSINESS.url so there is one source of truth for the domain.
const PROD_HOST = new URL(BUSINESS.url).hostname;
const ALLOWED_HOSTS = [PROD_HOST, `www.${PROD_HOST}`];

export function Analytics() {
  if (!GA_ID) return null;

  const allowList = JSON.stringify(ALLOWED_HOSTS);

  return (
    <Script id="ga-bootstrap" strategy="afterInteractive">
      {`
        (function(){
          var allowed = ${allowList};
          if (allowed.indexOf(location.hostname) === -1) return;

          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(GA_ID)}, {
            // Cookieless-friendly + privacy defaults. These keep the tag out of
            // scope for a consent banner in most readings: no ad personalisation,
            // no cross-site signals, and IP handling left to GA4's built-in
            // anonymisation (which is always on for GA4 and cannot be disabled).
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            // We fire an explicit page_view below so that prefetched/prerendered
            // documents don't self-report before the user actually navigates.
            send_page_view: false
          });

          // Only count a page view once the document is genuinely visible. A
          // Next.js <Link> prefetch or a browser preview-render must not inflate
          // sessions; those documents stay hidden until the user commits.
          function sendView(){
            gtag('event', 'page_view', {
              page_path: location.pathname,
              page_location: location.href,
              page_title: document.title
            });
          }
          if (document.visibilityState === 'visible') {
            sendView();
          } else {
            document.addEventListener('visibilitychange', function onVis(){
              if (document.visibilityState === 'visible') {
                document.removeEventListener('visibilitychange', onVis);
                sendView();
              }
            });
          }

          var s = document.createElement('script');
          s.async = true;
          s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ${JSON.stringify(GA_ID)};
          document.head.appendChild(s);
        })();
      `}
    </Script>
  );
}
