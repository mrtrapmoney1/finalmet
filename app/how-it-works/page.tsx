import { BUSINESS } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { CTA } from "@/components/sections/CTA";
import styles from "@/components/content/Content.module.css";

export const metadata = pageMeta({
  title: "How It Works",
  description:
    "How repair works at Metro TV & Appliances: request service, root-cause diagnosis, a written estimate before any work, OEM-parts repair, and a 90-day warranty. Lincoln, NE.",
  path: "/how-it-works",
});

const STEPS = [
  {
    title: "Tell us what's going on",
    body: "Call the shop or send a request with your equipment and the symptoms you're seeing. The more detail — brand, model, what it's doing — the better we can come prepared.",
  },
  {
    title: "Schedule your service",
    body: "Appliances are repaired in-home, so we set a convenient appointment window. TVs, audio gear and commercial microwaves are shop drop-offs — walk in during hours, no appointment needed.",
  },
  {
    title: "Root-cause diagnosis",
    body: "We diagnose to the actual fault rather than swapping parts and hoping. The diagnostic fee is collected at this step and is applied toward your repair if you choose to proceed.",
  },
  {
    title: "A written estimate — before any work",
    body: "You get a written estimate covering parts and labor before we touch the repair. Nothing moves forward without your approval, so there are no surprise charges.",
  },
  {
    title: "Repair with original manufacturer parts",
    body: "As a factory-authorized center we repair with original manufacturer (OEM) parts and service documentation for the brands we carry — no aftermarket substitutes.",
  },
  {
    title: "Quality check & warranty",
    body: "We verify the fix before it goes back to you, and every repair is backed by our 90-day parts-and-labor warranty.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className={`section ${styles.wrap}`}>
        <div className={`container ${styles.inner}`}>
          <p className="eyebrow">How It Works</p>
          <h1 className={`${styles.title} display`}>
            Simple, honest, no guesswork<span className="dot">.</span>
          </h1>
          <p className={styles.lede}>
            Whether it&apos;s an in-home appliance visit or a shop drop-off, every
            job follows the same path — diagnose to the root cause, put the estimate
            in writing, and repair with original manufacturer parts.
          </p>

          <ol className={styles.steps}>
            {STEPS.map((s) => (
              <li key={s.title} className={styles.step}>
                <span className={styles.stepNum} aria-hidden="true" />
                <div>
                  <h2 className={styles.stepTitle}>{s.title}</h2>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTA
        heading="Ready when you are."
        body={`Call ${BUSINESS.phone} or send a request and we'll figure out the next step together.`}
      />
    </>
  );
}
