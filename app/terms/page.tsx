import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";
import { Icon } from "@/components/ui/Icon";
import styles from "@/components/content/Content.module.css";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for Metro TV & Appliances.",
  alternates: { canonical: `${BUSINESS.url}/terms` },
  robots: { index: false, follow: true },
};

const UPDATED = "June 22, 2026";

export default function TermsPage() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">Terms of Use</p>
        <h1 className={`${styles.title} display`}>
          The fine print, kept simple<span className="dot">.</span>
        </h1>
        <p className={styles.lede}>
          These terms govern your use of this website. Last updated {UPDATED}.
        </p>

        <div className={styles.notice}>
          <Icon name="shield" size={20} />
          <span>
            These are provisional terms pending final review and are not legal
            advice. For questions, call {BUSINESS.phone}.
          </span>
        </div>

        <div className={styles.prose}>
          <h2>Using this site</h2>
          <p>
            This website provides information about {BUSINESS.name} and our repair
            services. We aim to keep it accurate, but content — including pricing and
            availability — may change without notice.
          </p>

          <h2>Repair services & estimates</h2>
          <p>
            Submitting a request through this site is not a binding service contract.
            Any repair is performed only after a diagnosis and a written estimate that
            you approve. Diagnostic fees and pricing shown here are current figures and
            may vary by equipment and condition.
          </p>

          <h2>Warranty</h2>
          <p>
            Repairs are backed by our 90-day parts-and-labor warranty as described
            during service. Warranty coverage for manufacturer or extended-plan claims
            is determined by the applicable manufacturer or warranty provider.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The content, branding and design of this site belong to {BUSINESS.name}.
            Brand names referenced are the trademarks of their respective owners and
            are used to indicate the equipment we service.
          </p>

          <h2>Disclaimer & liability</h2>
          <p>
            This site is provided &quot;as is&quot; for informational purposes. To the
            extent permitted by law, we are not liable for damages arising from use of
            the site itself, separate from the repair services we provide.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Nebraska.
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
