import { BUSINESS } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import {
  ZIP_REGIONS,
  COVERED_ZIP_COUNT,
  SERVED_CITIES,
  SERVED_COUNTIES,
} from "@/lib/service-area";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CTA } from "@/components/sections/CTA";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Service Area",
  description:
    "Metro TV & Appliances covers 200+ zip codes across Nebraska and western Iowa for in-home appliance repair — including Lincoln, Omaha, Grand Island and Council Bluffs. See every city, county and zip code we reach.",
  path: "/service-area",
});

export default function ServiceAreaPage() {
  return (
    <>
      <section className={styles.head}>
        <div className={`container ${styles.headInner}`}>
          <p className={`eyebrow ${styles.eyebrow}`}>Service Area</p>
          <h1 className={`${styles.title} display`}>
            {COVERED_ZIP_COUNT}+ zip codes across Nebraska &amp; western Iowa
            <span className="dot">.</span>
          </h1>
          <p className={styles.sub}>
            In-home appliance service reaches {SERVED_CITIES.length} named cities and the
            communities around them. TV, audio and commercial microwave repair is
            drop-off at our Lincoln shop — available no matter where you are. Not sure if
            you&apos;re covered? Call and we&apos;ll check your zip in seconds.
          </p>
          <div className={styles.actions}>
            <Button href={BUSINESS.phoneHref} variant="accent" size="lg">
              <Icon name="phone" size={20} />
              {BUSINESS.phone}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Send a message
            </Button>
          </div>
        </div>
      </section>

      {/* Named cities & counties — the high-value terms crawlers look for. */}
      <section className={`section ${styles.named}`}>
        <div className="container">
          <div className={styles.namedGrid}>
            <div>
              <h2 className={styles.h2}>Cities we serve</h2>
              <ul className={styles.placeList}>
                {SERVED_CITIES.map((c) => (
                  <li key={`${c.name}-${c.state}`} className={styles.place}>
                    {c.name}, {c.state}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={styles.h2}>Counties we serve</h2>
              <ul className={styles.placeList}>
                {SERVED_COUNTIES.map((c) => (
                  <li key={`${c.name}-${c.state}`} className={styles.place}>
                    {c.name}, {c.state}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Full zip enumeration, grouped by region. Static HTML so every zip
          is crawlable without JS. */}
      <section className={`section ${styles.regions}`}>
        <div className="container">
          <h2 className={styles.h2}>Covered zip codes by region</h2>
          <p className={styles.regionsLead}>
            Every zip code below is within our in-home appliance service area.
          </p>
          <div className={styles.regionGrid}>
            {ZIP_REGIONS.map((region) => (
              <article key={region.name} className={styles.region}>
                <h3 className={styles.regionName}>
                  {region.name} <span className={styles.regionState}>({region.state})</span>
                </h3>
                <p className={styles.regionDesc}>{region.description}</p>
                <p className={styles.regionCount}>{region.zips.length} zip codes</p>
                <ul className={styles.zipList}>
                  {region.zips.map((zip) => (
                    <li key={zip} className={styles.zip}>
                      {zip}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
