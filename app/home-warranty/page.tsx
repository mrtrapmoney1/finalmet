import { BUSINESS } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CTA } from "@/components/sections/CTA";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Home Warranty Appliance Repair",
  description:
    "Have a home warranty? Metro TV & Appliances helps Nebraska homeowners put their coverage to work — factory-authorized in-home appliance repair with original manufacturer parts.",
  path: "/home-warranty",
});

const WHY = [
  {
    icon: "doc" as const,
    title: "Parts pricing is unpredictable",
    body: "The same kind of part — a control board, a compressor, a drive motor — can vary widely in price from one brand or model to the next. That makes an out-of-pocket repair bill genuinely hard to forecast.",
  },
  {
    icon: "shield" as const,
    title: "A warranty can smooth the cost",
    body: "A home warranty is designed to help spread that risk out, so an unexpected failure is easier to plan for. It's often the most practical first step before a major repair.",
  },
  {
    icon: "wrench" as const,
    title: "We speak warranty fluently",
    body: "We work with home-warranty and extended-plan claims every week. We know what documentation tends to be needed and how to keep a covered repair moving.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "File your claim",
    body: "Open a claim with your home-warranty or extended-plan provider for the appliance that's giving you trouble. They'll review it and, in many cases, dispatch the repair to a service provider.",
  },
  {
    n: "02",
    title: "Get us assigned, or call us",
    body: `If your plan lets you choose, ask for Metro TV & Appliances. Already have parts on the way from your provider? Call us at ${BUSINESS.phone} as soon as they arrive so we can get you on the schedule.`,
  },
  {
    n: "03",
    title: "Root-cause diagnosis",
    body: "Our technician diagnoses the real cause — not just the obvious symptom — and documents what's needed so it lines up with how your plan handles approvals.",
  },
  {
    n: "04",
    title: "Repair with original parts",
    body: "Once your repair is approved, we complete it using original manufacturer parts. You'll know what's happening at each step, with no work done before it's authorized.",
  },
];

const FAQ = [
  {
    q: "Do you accept my home warranty?",
    a: "Coverage and approved-provider lists vary by plan, so the surest path is to ask your provider whether you can request Metro TV & Appliances. We're happy to talk through how your specific plan tends to work.",
  },
  {
    q: "Will my warranty cover the whole repair?",
    a: "That depends entirely on your plan's terms, deductible and coverage limits — those are set by your provider, not by us. We'll always give you a written estimate up front so there are no surprises about what falls outside coverage.",
  },
  {
    q: "What if I don't have a warranty yet?",
    a: "No problem — we repair plenty of appliances without one. Because parts prices vary so much, we simply recommend looking into coverage as a smart first step, then we'll walk you through your options either way.",
  },
];

export default function HomeWarrantyPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className={`eyebrow ${styles.heroEyebrow}`}>Home Warranty Help</p>
          <h1 className={`${styles.heroTitle} display`}>
            Put your warranty to work<span className="dot">.</span>
          </h1>
          <p className={styles.heroSub}>
            Most home warranties are built to help cover home-appliance repairs —
            and as a factory-authorized service center, Metro TV &amp; Appliances
            is set up to help Nebraska homeowners turn that coverage into a finished
            repair, with original manufacturer parts.
          </p>
          <div className={styles.heroActions}>
            <Button href="/contact" variant="accent" size="lg">
              Start your repair
              <Icon name="arrow" size={20} />
            </Button>
            <Button href={BUSINESS.phoneHref} variant="outline" size="lg">
              <Icon name="phone" size={20} />
              {BUSINESS.phone}
            </Button>
          </div>
        </div>
      </section>

      <section className={`section ${styles.why}`} aria-labelledby="why-heading">
        <div className="container">
          <div className={styles.head}>
            <p className="eyebrow">Why we recommend coverage</p>
            <h2 id="why-heading" className={styles.h2}>
              Appliance parts don&apos;t cost what you&apos;d expect.
            </h2>
            <p className={styles.lede}>
              We recommend home-warranty coverage for one honest reason: appliance
              part prices vary so widely that a repair bill is tough to predict.
              Coverage is designed to take the guesswork out.
            </p>
          </div>
          <ul className={styles.whyGrid}>
            {WHY.map((item) => (
              <li key={item.title} className={styles.whyCard}>
                <span className={styles.whyIcon} aria-hidden="true">
                  <Icon name={item.icon} size={24} />
                </span>
                <h3 className={styles.whyTitle}>{item.title}</h3>
                <p className={styles.whyBody}>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.steps}`} aria-labelledby="steps-heading">
        <div className="container">
          <div className={styles.head}>
            <p className="eyebrow">How warranty service works</p>
            <h2 id="steps-heading" className={styles.h2}>
              From claim to finished repair.
            </h2>
          </div>
          <ol className={styles.stepGrid}>
            {STEPS.map((step) => (
              <li key={step.n} className={styles.step}>
                <span className={styles.stepNum}>{step.n}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
          <p className={styles.disclaimer}>
            Coverage, deductibles and approvals are determined by your warranty
            provider and the terms of your plan. Metro TV &amp; Appliances performs
            the repair work — we don&apos;t set or guarantee your plan&apos;s coverage.
          </p>
        </div>
      </section>

      <section className={`section ${styles.faq}`} aria-labelledby="faq-heading">
        <div className={`container ${styles.faqInner}`}>
          <h2 id="faq-heading" className={styles.h2}>
            Common warranty questions
          </h2>
          <div className={styles.faqList}>
            {FAQ.map((item) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqQ}>
                  {item.q}
                  <Icon name="arrow" size={18} className={styles.faqChevron} />
                </summary>
                <p className={styles.faqA}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA
        heading="Ready to start a warranty repair?"
        body="Call the shop or send a message — we'll help you figure out the right next step for your plan and your appliance."
      />
    </>
  );
}
