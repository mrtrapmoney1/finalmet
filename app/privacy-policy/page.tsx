import { buildMetadata } from "@/lib/metadata";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Metro TV & Appliances privacy policy. We do not collect, store, or sell personal data. Contact forms open your email app — no data is sent to our servers.",
  path: "/privacy-policy",
  keywords: ["privacy policy", "data privacy", "Metro TV Appliances", "no data collection", "Lincoln NE"],
});

const POLICY_SECTIONS = [
  {
    icon: "mail",
    title: "Contact Forms — Your Email App Handles Everything",
    body: "Our contact and scheduling forms use mailto: links, which open your own email application. No form data is transmitted to or stored on our servers. We only receive what you choose to send from your own email account.",
  },
  {
    icon: "storage",
    title: "Parts Cart — Stored in Your Browser Only",
    body: "The parts cart on this site uses your browser's localStorage to remember items you add. This data never leaves your device and is never transmitted to us. Clearing your browser data will empty the cart.",
  },
  {
    icon: "location_off",
    title: "Google Maps — Third-Party Data Practices",
    body: "Our Contact page embeds a Google Maps iframe using the Google Maps API. When you view that page, Google may collect your IP address and location data per their own Privacy Policy (policies.google.com/privacy). We have no access to that data.",
  },
  {
    icon: "cookie",
    title: "Cookies & Analytics",
    body: "We do not currently use any analytics platforms, advertising trackers, or first-party cookies. No tracking pixels, session recording tools, or behavioral analytics are installed on this site.",
  },
  {
    icon: "credit_card_off",
    title: "No Payment Processing",
    body: "This website does not process payments online. The parts cart is for browsing and quoting only. To complete a purchase, you must call us or visit our shop. No payment card data is entered, stored, or transmitted through this site.",
  },
  {
    icon: "privacy_tip",
    title: "Information You Voluntarily Send Us",
    body: "If you email us directly at info@metrotv-audiotech.com or call us, any information you share is used solely to answer your question or complete your service request. We do not sell, rent, or share your contact information with third parties.",
  },
  {
    icon: "shield",
    title: "Data Security",
    body: "Because we do not collect or store personal data on our servers, there is no database of customer information to protect or breach on our end. Your email provider's security practices govern any email correspondence you send us.",
  },
  {
    icon: "gavel",
    title: "Governing Law",
    body: "This Privacy Policy is governed by the laws of the State of Nebraska. Any disputes arising under this policy shall be resolved in the courts of Lancaster County, Nebraska.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-surface">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-6">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-3">Legal</p>
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-on-surface mb-3 text-balance">
          Privacy Policy
        </h1>
        <p className="text-on-surface-variant leading-relaxed max-w-2xl">
          We built this site to give you information, not to harvest yours. Here&apos;s a plain-language explanation of what data is and isn&apos;t collected when you use metrotv-audiotech.com.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base text-secondary" aria-hidden="true">check_circle</span>
            No server-side form collection
          </span>
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base text-secondary" aria-hidden="true">check_circle</span>
            No analytics or tracking
          </span>
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base text-secondary" aria-hidden="true">check_circle</span>
            No online payment processing
          </span>
        </div>
      </div>

      {/* Policy sections */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-2 gap-4">
          {POLICY_SECTIONS.map((section) => (
            <div key={section.title} className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/20">
              <div className="flex items-start gap-3 mb-2">
                <span className="material-symbols-outlined text-xl text-secondary mt-0.5" aria-hidden="true">{section.icon}</span>
                <h2 className="text-sm font-bold font-headline text-on-surface">{section.title}</h2>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed pl-8">{section.body}</p>
            </div>
          ))}
        </div>

        {/* Contact for privacy questions */}
        <div className="mt-8 bg-primary rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <p className="text-white font-bold font-headline mb-1">Privacy questions?</p>
            <p className="text-white/70 text-sm">Contact us by phone or email — we&apos;re happy to clarify anything in this policy.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">phone</span>
              {BUSINESS.phone}
            </a>
            <a
              href="mailto:info@metrotv-audiotech.com"
              className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/20 transition"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">mail</span>
              Email Us
            </a>
          </div>
        </div>

        {/* Legal note */}
        <p className="text-xs text-on-surface-variant mt-6 leading-relaxed">
          Effective date: January 1, 2026. {BUSINESS.name}, {BUSINESS.address}.
          This policy may be updated periodically — contact us for the most current version.
          For our parts return policy, see our{" "}
          <a href="/return-policy" className="text-primary hover:underline">Return &amp; Refund Policy</a>.
        </p>
      </div>
    </div>
  );
}
