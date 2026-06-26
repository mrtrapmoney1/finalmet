import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";
import { Icon } from "@/components/ui/Icon";
import styles from "@/components/content/Content.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Metro TV & Appliances collects, uses, and protects the information you share when you contact us or request service — and the choices you have.",
  alternates: { canonical: `${BUSINESS.url}/privacy-policy` },
  robots: { index: false, follow: true },
};

const UPDATED = "June 22, 2026";

export default function PrivacyPage() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">Privacy Policy</p>
        <h1 className={`${styles.title} display`}>
          Your information, handled with care<span className="dot">.</span>
        </h1>
        <p className={styles.lede}>
          This policy explains what information {BUSINESS.name} collects when you use
          this website and how we use it. Last updated {UPDATED}.
        </p>

        <div className={styles.notice}>
          <Icon name="shield" size={20} />
          <span>
            This is a provisional policy describing how the site works today and is
            pending final review. It is not legal advice. For questions, call{" "}
            {BUSINESS.phone}.
          </span>
        </div>

        <div className={styles.prose}>
          <h2>Information we collect</h2>
          <p>
            This site has no user accounts and processes no payments online. The
            contact form assembles the details you enter — name, phone, email,
            service type and your message — into a message in your own email
            application for you to send. We only receive that information if you
            choose to send it, or if you call or email us directly.
          </p>

          <h2>How we use your information</h2>
          <p>
            We use the details you share solely to respond to your request, schedule
            and perform repair service, and follow up about your equipment. We do not
            sell your information.
          </p>

          <h2>Cookies & analytics</h2>
          <p>
            The site uses system fonts and no third-party advertising trackers. Your
            light/dark theme preference is stored locally in your browser and is not
            transmitted to us. If we add analytics in the future, this policy will be
            updated to describe it.
          </p>

          <h2>Sharing</h2>
          <p>
            We share information only as needed to perform a repair — for example with
            a manufacturer or a warranty provider when processing an authorized or
            covered claim — or where required by law.
          </p>

          <h2>Your choices</h2>
          <p>
            You can contact us at any time to ask what information we hold from your
            inquiries or to request that we delete it. Reach us at {BUSINESS.phone} or{" "}
            {BUSINESS.email}.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy as our practices evolve. Material changes will
            be reflected by the &quot;last updated&quot; date above.
          </p>

          <h2>Contact</h2>
          <p>
            {BUSINESS.name}, {BUSINESS.address}. Phone {BUSINESS.phone}, email{" "}
            {BUSINESS.email}.
          </p>
        </div>
      </div>
    </section>
  );
}
