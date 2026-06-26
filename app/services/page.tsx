import Link from "next/link";
import { SERVICES } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Figure } from "@/components/ui/Figure";
import { CTA } from "@/components/sections/CTA";
import type { ImageName } from "@/lib/images";
import styles from "./page.module.css";

const PHOTO_BY_SLUG: Record<string, ImageName> = {
  appliance: "washer",
  tv: "tv-living",
  commercial: "kitchen",
  audio: "speaker",
};

export const metadata = pageMeta({
  title: "Repair Services",
  description:
    "Appliance, TV, audio, and commercial microwave repair from Metro TV & Appliances in Lincoln, NE. Factory-authorized, root-cause diagnosis, original manufacturer parts.",
  path: "/services",
});

const ICON_BY_SLUG: Record<string, IconName> = {
  appliance: "home",
  tv: "tv",
  commercial: "bolt",
  audio: "speaker",
};

export default function ServicesPage() {
  return (
    <>
      <section className={styles.head}>
        <div className={`container ${styles.headInner}`}>
          <p className={`eyebrow ${styles.eyebrow}`}>What We Repair</p>
          <h1 className={`${styles.title} display`}>
            Built to get it right<span className="dot">.</span>
          </h1>
          <p className={styles.sub}>
            Four specialties. Factory authorization, root-cause diagnosis, original
            manufacturer parts. In-home for appliances; shop drop-off for TVs, audio
            and commercial microwaves.
          </p>
          <p className={styles.headMeta}>
            // 4 specialties · 50+ authorized brands · OEM parts only
          </p>
        </div>
      </section>

      <section className={`section ${styles.list}`}>
        <div className="container">
          {SERVICES.map((s, i) => (
            <article key={s.slug} className={`${styles.row} reveal`} id={s.slug}>
              <div className={styles.rowMain}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon name={ICON_BY_SLUG[s.slug] ?? "wrench"} size={28} />
                </span>
                <div>
                  <p className={styles.delivery}>
                    {s.delivery === "in-home" ? "In-home service" : "Shop drop-off"}
                    {" · "}
                    {s.audience}
                  </p>
                  <h2 className={`${styles.rowTitle} display`}>{s.title}</h2>
                  <p className={styles.rowTagline}>{s.tagline}</p>
                  <p className={styles.rowBody}>{s.description}</p>
                  <ul className={styles.caps}>
                    {s.capabilities.map((c) => (
                      <li key={c} className={styles.cap}>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${s.slug}`} className={styles.rowLink}>
                    Learn more about {s.title.toLowerCase()}
                    <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </div>
              <div className={styles.brands}>
                <Figure
                  name={PHOTO_BY_SLUG[s.slug] ?? "repair-hands"}
                  alt=""
                  ratio={16 / 9}
                  sizes="(min-width: 900px) 32vw, 100vw"
                  className={styles.rowPhoto}
                />
                <p className={styles.brandsLabel}>Authorized brands</p>
                <ul className={styles.brandList}>
                  {s.brands.map((b) => (
                    <li key={b} className={styles.brand}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              {i < SERVICES.length - 1 && <hr className={styles.divider} />}
            </article>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
