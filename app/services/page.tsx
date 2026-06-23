import Link from "next/link";
import { SERVICES } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CTA } from "@/components/sections/CTA";
import styles from "./page.module.css";

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
        </div>
      </section>

      <section className={`section ${styles.list}`}>
        <div className="container">
          {SERVICES.map((s, i) => (
            <article key={s.slug} className={styles.row} id={s.slug}>
              <div className={styles.rowMain}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon name={ICON_BY_SLUG[s.slug] ?? "wrench"} size={26} />
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
                  <Link href={`/${s.slug}`} className={styles.rowLink}>
                    Learn more about {s.title.toLowerCase()}
                    <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </div>
              <div className={styles.brands}>
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
