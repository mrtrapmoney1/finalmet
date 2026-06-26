import { BUSINESS } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Figure } from "@/components/ui/Figure";
import { CTA } from "@/components/sections/CTA";
import styles from "./page.module.css";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const metadata = pageMeta({
  title: "FAQ",
  description:
    "Common questions about appliance, TV, audio and commercial microwave repair at Metro TV & Appliances — appointments, diagnostic fees, estimates, OEM parts, warranty, and service area.",
  path: "/faq",
});

interface Faq {
  q: string;
  a: string;
  link?: { href: string; label: string };
}

const FAQS: Faq[] = [
  {
    q: "Do I need an appointment?",
    a: "Not for shop drop-offs. TV, audio and commercial microwave repairs are walk-in during shop hours — no appointment needed. In-home appliance repair is scheduled, so we set a convenient appointment window for those.",
  },
  {
    q: "What does a diagnostic cost?",
    a: "Shop drop-off diagnostics (TV, audio, commercial microwave) are $42.90. In-home appliance diagnostics are $149.08 in the Lincoln/Omaha area and $175.08 in the extended coverage area. The diagnostic fee is applied toward your repair if you choose to proceed.",
  },
  {
    q: "Will I get an estimate before any work is done?",
    a: "Yes. You always receive a written estimate covering parts and labor before any repair begins — nothing moves forward without your approval, so there are no surprise charges.",
  },
  {
    q: "Do you use original manufacturer parts?",
    a: "Yes. As a factory-authorized service center we repair with original manufacturer (OEM) parts and service documentation for the brands we carry — no aftermarket substitutes.",
  },
  {
    q: "Do you offer in-home service for TVs and audio gear?",
    a: "Appliances are our only in-home category. TVs, audio equipment and commercial microwaves are board-level repairs handled at our Lincoln shop as drop-offs.",
  },
  {
    q: "How long does audio repair take?",
    a: "Audio is our deepest specialty and stays in high demand, so turnaround typically runs one to three months. We'll give you a realistic timeframe when you drop off.",
  },
  {
    q: "Is the repair covered by a warranty?",
    a: "Out-of-pocket repairs are backed by a 30-day parts-and-labor warranty, covering defective OEM parts we installed and recurrence of the same issue due to our workmanship. Coverage on manufacturer-warranty or extended-plan repairs follows the terms of that plan.",
  },
  {
    q: "Can you work with my home warranty or extended plan?",
    a: "Yes — from in-home appliance claims to extended plans like SquareTrade, we can help put your coverage to work. Approvals and coverage are determined by your warranty provider.",
    link: { href: "/home-warranty", label: "How warranty service works" },
  },
  {
    q: "What brands are you authorized for?",
    a: "We're factory-authorized for 50+ brands across appliances, TVs, audio and commercial microwaves — including Samsung, LG, GE Appliances, Sony, Yamaha and more.",
    link: { href: "/services", label: "See all services & brands" },
  },
  {
    q: "What areas do you serve?",
    a: "In-home appliance service reaches 200+ zip codes across Nebraska and western Iowa, including Lincoln, Omaha, Grand Island, Council Bluffs, Nebraska City, Ashland and Seward.",
    link: { href: "/service-area", label: "Check your area" },
  },
  {
    q: "Where are you located and what are your hours?",
    a: `We're at ${BUSINESS.address}, open ${BUSINESS.hours}. Walk-ins are welcome during shop hours.`,
    link: { href: BUSINESS.directionsUrl, label: "Get directions" },
  },
];

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <section className={`section ${styles.wrap}`}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.aside}>
            <p className="eyebrow">Frequently Asked</p>
            <h1 className={`${styles.title} display`}>
              Answers, straight up<span className="dot">.</span>
            </h1>
            <p className={styles.lede}>
              Appointments, diagnostic fees, parts, warranty and where we work.
              Don&apos;t see yours? We&apos;re a phone call away.
            </p>
            <div className={styles.callCard}>
              <p className={styles.callLabel}>Fastest answer</p>
              <a href={BUSINESS.phoneHref} className={styles.callPhone}>
                {BUSINESS.phone}
              </a>
              <p className={styles.callNote}>{BUSINESS.hours}. Walk-ins welcome.</p>
              <Button href="/contact" variant="accent">
                Send a request
                <Icon name="arrow" size={18} />
              </Button>
            </div>
            <Figure
              name="tools"
              alt=""
              ratio={4 / 3}
              sizes="(min-width: 900px) 38vw, 100vw"
              className={styles.asidePhoto}
            />
          </div>

          <div className={styles.faq}>
            {FAQS.map((f) => (
              <details key={f.q} id={slugify(f.q)} className={styles.faqItem}>
                <summary className={styles.faqQ}>{f.q}</summary>
                <div className={styles.faqA}>
                  <p>{f.a}</p>
                  {f.link && (
                    <p>
                      <a href={f.link.href}>{f.link.label}</a>
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
