import { notFound } from "next/navigation";
import { BUSINESS, SERVICES } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CTA } from "@/components/sections/CTA";
import { DiagnosticSlider } from "@/components/DiagnosticSlider";
import type { ImageName } from "@/lib/images";
import styles from "./ServiceDetail.module.css";

const PHOTO_BY_SLUG: Record<string, ImageName> = {
  appliance: "washer",
  tv: "tv-living",
  commercial: "kitchen",
  audio: "bt-speaker",
};

const CTA_PHOTO_BY_SLUG: Record<string, ImageName> = {
  appliance: "kitchen",
  tv: "display",
  commercial: "electrical-panel",
  audio: "speaker",
};

export function ServiceDetail({ slug }: { slug: string }) {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const inHome = service.delivery === "in-home";
  const diag = inHome
    ? BUSINESS.diagnostic.inHomeLincolnOmaha
    : BUSINESS.diagnostic.dropOff;
  const isAudio = service.slug === "audio";

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
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

          <dl className={styles.meta}>
            <div className={styles.metaItem}>
              <dt className={styles.metaLabel}>Delivery</dt>
              <dd className={styles.metaValue}>
                {inHome ? "In-home · 200+ zips" : "Lincoln shop drop-off"}
              </dd>
            </div>
            <div className={styles.metaItem}>
              <dt className={styles.metaLabel}>Diagnostic</dt>
              <dd className={styles.metaValue}>{diag}</dd>
            </div>
            <div className={styles.metaItem}>
              <dt className={styles.metaLabel}>
                {isAudio ? "Turnaround" : "Parts"}
              </dt>
              <dd className={styles.metaValue}>
                {isAudio ? "1–3 months" : "OEM only"}
              </dd>
            </div>
          </dl>
          </div>
          <div className={`${styles.heroMedia} reveal`}>
            <DiagnosticSlider
              name={PHOTO_BY_SLUG[service.slug] ?? "repair-hands"}
              label={`${service.title} on the bench`}
              priority
            />
          </div>
        </div>
      </section>

      <section className={`section ${styles.specs}`}>
        <div className="container">
          <div className={`${styles.specsHead} reveal`}>
            <p className="eyebrow">Under the hood</p>
            <h2 className={`${styles.h2} display`}>
              What we actually repair<span className="dot">.</span>
            </h2>
            <p className={styles.lede}>
              We work at the component and board level — diagnosing to the root
              cause, not swapping boxes and hoping. A sample of the work this
              bench handles:
            </p>
          </div>

          <ul className={styles.specGrid}>
            {service.capabilities.map((cap, i) => (
              <li
                key={cap}
                className={`${styles.spec} reveal`}
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
              >
                <span className={styles.specIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.specLabel}>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.detail}`}>
        <div className={`container ${styles.grid}`}>
          <div className="reveal">
            <p className="eyebrow">How it works</p>
            <h2 className={`${styles.h2} display`}>
              What to expect<span className="dot">.</span>
            </h2>
            <ul className={styles.points}>
              <li className={styles.point}>
                <Icon name="check" size={22} />
                <span>
                  {inHome
                    ? "We schedule a convenient time window and come to you."
                    : "Walk in during shop hours — no appointment needed to drop off."}
                </span>
              </li>
              <li className={styles.point}>
                <Icon name="check" size={22} />
                <span>
                  Root-cause diagnosis, then a written estimate before any work
                  begins.
                </span>
              </li>
              <li className={styles.point}>
                <Icon name="check" size={22} />
                <span>Repairs completed with original manufacturer parts.</span>
              </li>
              {isAudio && (
                <li className={styles.point}>
                  <Icon name="clock" size={22} />
                  <span>
                    Audio is our deepest specialty and stays in high demand —
                    turnaround typically runs 1–3 months.
                  </span>
                </li>
              )}
            </ul>
          </div>

          <aside className={`${styles.card} reveal`}>
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

      <CTA photo={CTA_PHOTO_BY_SLUG[service.slug] ?? "control-room"} />
    </>
  );
}
