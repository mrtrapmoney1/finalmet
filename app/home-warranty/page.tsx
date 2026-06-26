import { BUSINESS } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CTA } from "@/components/sections/CTA";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Home Warranty Appliance Repair",
  description:
    "Your appliance, TV, audio or microwave repair may already be covered. Metro TV & Appliances is factory-authorized in Lincoln, NE — start by checking your warranty, then ask for us by name.",
  path: "/home-warranty",
});

const SEGMENTS = [
  {
    tag: "Homeowners",
    title: "Appliances",
    line: "Washer, dryer, fridge or range down at home.",
    covers: ["Home warranties", "Manufacturer warranty"],
  },
  {
    tag: "Homes & businesses",
    title: "TVs & screens",
    line: "The set in the den — or a wall of screens at the bar.",
    covers: ["Extended plans", "Allstate SquareTrade"],
  },
  {
    tag: "Collectors",
    title: "Audio gear",
    line: "A receiver, amp or turntable gone quiet.",
    covers: ["Manufacturer warranty", "Extended coverage"],
  },
  {
    tag: "Restaurants",
    title: "Commercial microwaves",
    line: "The workhorse your kitchen runs on.",
    covers: ["Manufacturer warranty", "Service agreements"],
  },
];

const STEPS = [
  {
    n: "01",
    title: "Start at the brand",
    body: "Most manufacturers let you check warranty status and file a claim right on their website. Look up your unit's brand first.",
  },
  {
    n: "02",
    title: "Call your warranty or plan",
    body: "Home warranty, extended plan, or Allstate SquareTrade — in our opinion one of the best out there. Open a claim, then ask for Metro TV & Appliances by name.",
  },
  {
    n: "03",
    title: "Check your home insurance",
    body: "Some policies quietly cover appliances. A two-minute look could cover the whole repair before you ever pay out of pocket.",
  },
];

const FAQ = [
  {
    q: "How do I know if I'm covered?",
    a: "Start with whoever sold you the coverage — the manufacturer, your home-warranty or extended-plan provider, or your home insurer. Each sets its own terms, so a quick call or website check is the fastest way to know.",
  },
  {
    q: "Will it cover the whole repair?",
    a: "That depends on your plan's terms, deductible and limits — those are set by your provider, not by us. We always give you a written estimate up front so nothing about cost is a surprise.",
  },
  {
    q: "What if I'm not covered?",
    a: "No problem — we repair plenty of equipment without coverage, with original manufacturer parts and a written estimate before any work begins.",
  },
];

export default function HomeWarrantyPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className={`eyebrow ${styles.heroEyebrow}`}>You may already be covered</p>
          <h1 className={`${styles.heroTitle} display`}>
            Your repair may already be covered<span className="dot">.</span>
          </h1>
          <p className={styles.heroSub}>
            A dead dishwasher at home. A wall of dark TVs at the bar. A receiver gone
            silent. A kitchen down its microwave. Different gear, same good news — a
            warranty, plan, or manufacturer coverage may already pay for the fix.
            Before you pay out of pocket, it&apos;s worth a look.
          </p>
          <div className={styles.heroActions}>
            <Button href="#first-steps" variant="accent" size="lg">
              See your first steps
              <Icon name="arrow" size={20} />
            </Button>
            <Button href={BUSINESS.phoneHref} variant="outline" size="lg">
              <Icon name="phone" size={20} />
              {BUSINESS.phone}
            </Button>
          </div>
          <p className={styles.heroMeta}>
            {"// factory-authorized · OEM parts only · Nebraska since "}
            {BUSINESS.founded}
          </p>
        </div>
      </section>

      <section className={`section ${styles.segments}`} aria-labelledby="seg-heading">
        <div className="container">
          <div className={`${styles.head} reveal`}>
            <p className="eyebrow">Whatever you&apos;re bringing us</p>
            <h2 id="seg-heading" className={`${styles.h2} display`}>
              Odds are, something already covers it<span className="dot">.</span>
            </h2>
            <p className={styles.lede}>
              Four kinds of customer, one habit worth keeping: check what&apos;s
              covering your equipment before the repair comes out of your pocket.
            </p>
          </div>
          <ul className={styles.segGrid}>
            {SEGMENTS.map((seg, i) => (
              <li
                key={seg.title}
                className={`${styles.segCard} reveal`}
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
              >
                <p className={styles.segTag}>{seg.tag}</p>
                <h3 className={styles.segTitle}>{seg.title}</h3>
                <p className={styles.segLine}>{seg.line}</p>
                <p className={styles.segCoversLabel}>Often covered by</p>
                <ul className={styles.pills}>
                  {seg.covers.map((c) => (
                    <li key={c} className={styles.pill}>
                      {c}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="first-steps"
        className={`section ${styles.steps}`}
        aria-labelledby="steps-heading"
      >
        <div className="container">
          <div className={`${styles.head} reveal`}>
            <p className="eyebrow">Your first steps</p>
            <h2 id="steps-heading" className={`${styles.h2} display`}>
              How to get it fixed<span className="dot">.</span>
            </h2>
            <p className={styles.lede}>
              The fastest path starts with your coverage — not with us. Here&apos;s
              where to look, in order.
            </p>
          </div>
          <ol className={styles.stepGrid}>
            {STEPS.map((step, i) => (
              <li
                key={step.n}
                className={`${styles.step} reveal`}
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
              >
                <span className={styles.stepNum} aria-hidden="true">{step.n}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>

          <div className={`${styles.split} reveal`}>
            <p className={styles.splitText}>
              <strong>Covered?</strong> Request Metro TV &amp; Appliances and call us to
              schedule — we&apos;ll take it from there with original manufacturer parts.
            </p>
            <p className={styles.splitText}>
              <strong>Paying out of pocket?</strong> See what a repair runs.{" "}
              <a href="/cod" className={styles.splitLink}>
                Out-of-pocket repair
                <Icon name="arrow" size={16} />
              </a>
            </p>
          </div>

          <p className={styles.disclaimer}>
            Coverage, deductibles and approvals are determined by your provider and the
            terms of your plan. Metro TV &amp; Appliances performs the repair work — we
            don&apos;t set or guarantee your plan&apos;s coverage.
          </p>
        </div>
      </section>

      <section className={`section ${styles.faq}`} aria-labelledby="faq-heading">
        <div className={`container ${styles.faqInner}`}>
          <h2 id="faq-heading" className={`${styles.h2} display`}>
            Quick questions<span className="dot">.</span>
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
        heading="Not sure where you stand?"
        body="Call the shop — tell us what's broken and we'll help you figure out the fastest way to get it covered and fixed."
      />
    </>
  );
}
