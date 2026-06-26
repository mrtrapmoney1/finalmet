import Link from "next/link";
import { SERVICES } from "@/lib/business";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Figure } from "@/components/ui/Figure";
import type { ImageName } from "@/lib/images";
import styles from "./ServicesGrid.module.css";

const ICON_BY_SLUG: Record<string, IconName> = {
  appliance: "home",
  tv: "tv",
  commercial: "bolt",
  audio: "speaker",
};

const PHOTO_BY_SLUG: Record<string, ImageName> = {
  appliance: "washer",
  tv: "tv-living",
  commercial: "kitchen",
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
            In-home visit or shop drop-off — diagnosed to the root cause and
            repaired with original manufacturer parts.
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
                <span className={styles.media}>
                  <Figure
                    name={PHOTO_BY_SLUG[s.slug] ?? "repair-hands"}
                    ratio={16 / 9}
                    framed={false}
                    sizes="(min-width: 1040px) 22vw, (min-width: 700px) 45vw, 78vw"
                    className={styles.photo}
                  />
                  <span className={styles.scan} aria-hidden="true" />
                  <span className={styles.icon} aria-hidden="true">
                    <Icon name={ICON_BY_SLUG[s.slug] ?? "wrench"} size={22} />
                  </span>
                </span>
                <span className={styles.body}>
                  <span className={styles.delivery}>
                    {s.delivery === "in-home" ? "In-home service" : "Shop drop-off"}
                  </span>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.cardText}>{s.description}</p>
                  <ul className={styles.caps} aria-label={`${s.title}: board-level capabilities`}>
                    {s.capabilities.map((c) => (
                      <li key={c} className={styles.cap}>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <span className={styles.cardLink}>
                    Learn more
                    <Icon name="arrow" size={16} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
