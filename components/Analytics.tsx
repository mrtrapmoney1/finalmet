import Script from "next/script";

/**
 * Google tag (gtag.js) / GA4. The measurement ID is fully public — it ships in
 * the page source no matter what — so we hardcode the live ID as a fallback and
 * allow an env override (mirrors the NEXT_PUBLIC_* pattern used for Web3Forms).
 * Loaded with `afterInteractive` so it never blocks first paint.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-91M6FW7C7B";

export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
