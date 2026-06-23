import Link from "next/link";
import { SERVICES } from "@/lib/business";
import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./ServicesGrid.module.css";

const ICON_BY_SLUG: Record<string, IconName> = {
  appliance: "home",
  tv: "tv",
  commercial: "bolt",
  audio: "speaker",
};

export function ServicesGrid() {
  return (
    <section className={`section ${styles.wrap}`} aria-labelledby="services-heading">
      <div className="container">
        <div className={`${styles.head} reveal`}>
          <p className="eyebrow">What We Repair</p>
          <h2 id="services-heading" className={`${styles.title} display`}>
            Four specialties<span className="dot">.</span> One standard<span className="dot">.</span>
          </h2>
          <p className={styles.lede}>
            In-home visit or shop drop-off — every job gets the same root-cause
            diagnosis and original manufacturer parts. No guesswork, no upsell.
          </p>
        </div>

        <p className={styles.swipeHint} aria-hidden="true">
          Swipe for all four
          <Icon name="arrow" size={15} />
        </p>

        <ul className={styles.grid}>
          {SERVICES.map((s, i) => (
            <li key={s.slug} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
              <Link href={`/${s.slug}`} className={styles.card}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon name={ICON_BY_SLUG[s.slug] ?? "wrench"} size={24} />
                </span>
                <span className={styles.delivery}>
                  {s.delivery === "in-home" ? "In-home service" : "Shop drop-off"}
                </span>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardText}>{s.description}</p>
                <span className={styles.cardLink}>
                  Learn more
                  <Icon name="arrow" size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
