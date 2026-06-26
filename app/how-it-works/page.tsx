import { BUSINESS } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { CTA } from "@/components/sections/CTA";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Figure } from "@/components/ui/Figure";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "How It Works",
  description:
    "How repair works at Metro TV & Appliances: request service, root-cause diagnosis, a written estimate before any work, OEM-parts repair, and a parts-and-labor repair warranty. Lincoln, NE.",
  path: "/how-it-works",
});

const STEPS = [
  {
    title: "Tell us what's going on",
    body: "Call the shop or send a request with your equipment and the symptoms you're seeing. The more detail — brand, model, what it's doing — the better we come prepared.",
  },
  {
    title: "Schedule your service",
    body: "Appliances are repaired in-home, so we set a convenient appointment window. TVs, audio gear and commercial microwaves are shop drop-offs — walk in during hours, no appointment needed.",
  },
  {
    title: "Root-cause diagnosis",
    body: "We diagnose to the actual fault rather than swapping parts and hoping. The diagnostic fee is collected here and is applied toward your repair if you choose to proceed.",
  },
  {
    title: "A written estimate — before any work",
    body: "You get a written estimate covering parts and labor before we touch the repair. Nothing moves forward without your approval, so there are no surprise charges.",
  },
  {
    title: "Repair with original parts",
    body: "As a factory-authorized center we repair with original manufacturer (OEM) parts and service documentation for the brands we carry — no aftermarket substitutes.",
  },
  {
    title: "Quality check & warranty",
    body: "We verify the fix before it goes back to you, and your repair is backed by a parts-and-labor repair warranty.",
  },
];

const ASSURANCES: { icon: IconName; label: string }[] = [
  { icon: "doc", label: "A written estimate before any work" },
  { icon: "chip", label: "Original manufacturer parts only" },
  { icon: "shield", label: "Backed by a repair warranty" },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className={`section ${styles.wrap}`}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.lead}>
            <p className="eyebrow">How It Works</p>
            <h1 className={`${styles.title} display`}>
              Six steps<span className="dot">.</span> Zero guesswork<span className="dot">.</span>
            </h1>
            <p className={styles.lede}>
              In-home visit or shop drop-off, every job runs the same way —
              diagnose to the root cause, put the estimate in writing, and repair
              with original manufacturer parts.
            </p>
            <ul className={styles.leadMeta}>
              {ASSURANCES.map((a) => (
                <li key={a.label} className={styles.leadMetaItem}>
                  <Icon name={a.icon} size={18} />
                  {a.label}
                </li>
              ))}
            </ul>
            <Figure
              name="cpu-board"
              alt="Close-up of board-level diagnostics on a circuit board."
              ratio={4 / 3}
              sizes="(min-width: 900px) 40vw, 100vw"
              caption="Root-cause diagnosis at the bench"
              className={styles.leadPhoto}
            />
          </div>

          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className={`${styles.step} reveal`}
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
              >
                <span className={styles.num} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={styles.stepBody}>
                  <h2 className={styles.stepTitle}>{s.title}</h2>
                  <p className={styles.stepText}>{s.body}</p>
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
