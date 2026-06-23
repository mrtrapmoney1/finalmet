import { notFound } from "next/navigation";
import { BUSINESS, SERVICES } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CTA } from "@/components/sections/CTA";
import styles from "./ServiceDetail.module.css";

export function ServiceDetail({ slug }: { slug: string }) {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const inHome = service.delivery === "in-home";
  const diag = inHome
    ? BUSINESS.diagnostic.inHomeLincolnOmaha
    : BUSINESS.diagnostic.dropOff;

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className={`eyebrow ${styles.heroEyebrow}`}>
            {inHome ? "In-home service" : "Shop drop-off"}
          </p>
          <h1 className={`${styles.title} display`}>
            {service.title}<span className="dot">.</span>
          </h1>
          <p className={styles.tagline}>{service.tagline}</p>
          <p className={styles.body}>{service.description}</p>
          <div className={styles.actions}>
            <Button href="/contact" variant="accent" size="lg">
              {inHome ? "Schedule in-home service" : "Plan a drop-off"}
              <Icon name="arrow" size={20} />
            </Button>
            <Button href={BUSINESS.phoneHref} variant="outline" size="lg">
              <Icon name="phone" size={20} />
              {BUSINESS.phone}
            </Button>
          </div>
        </div>
      </section>

      <section className={`section ${styles.detail}`}>
        <div className={`container ${styles.grid}`}>
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className={`${styles.h2} display`}>
              What to expect<span className="dot">.</span>
            </h2>
            <ul className={styles.points}>
              <li className={styles.point}>
                <Icon name="check" size={20} />
                <span>
                  {inHome
                    ? "We schedule a convenient time window and come to you."
                    : "Walk in during shop hours — no appointment needed to drop off."}
                </span>
              </li>
              <li className={styles.point}>
                <Icon name="check" size={20} />
                <span>
                  Root-cause diagnosis, then a written estimate before any work
                  begins.
                </span>
              </li>
              <li className={styles.point}>
                <Icon name="check" size={20} />
                <span>Repairs completed with original manufacturer parts.</span>
              </li>
              {service.slug === "audio" && (
                <li className={styles.point}>
                  <Icon name="clock" size={20} />
                  <span>
                    Audio is our deepest specialty and stays in high demand —
                    turnaround typically runs 1–3 months.
                  </span>
                </li>
              )}
            </ul>
          </div>

          <aside className={styles.card}>
            <p className={styles.cardLabel}>Diagnostic deductible</p>
            <p className={styles.cardPrice}>{diag}</p>
            <p className={styles.cardNote}>
              Applied toward your repair when you choose to proceed.
            </p>
            <hr className={styles.cardDivider} />
            <p className={styles.cardLabel}>Authorized brands</p>
            <ul className={styles.brandList}>
              {service.brands.map((b) => (
                <li key={b} className={styles.brand}>
                  {b}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <CTA />
    </>
  );
}
