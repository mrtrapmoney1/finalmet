import { SERVICES } from "@/lib/business";
import styles from "./Brands.module.css";

// Every brand we service — breadth is the selling point, don't trim it.
const BRANDS = Array.from(new Set(SERVICES.flatMap((s) => s.brands)));

export function Brands() {
  return (
    <section className={`section ${styles.wrap}`} aria-labelledby="brands-heading">
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={`${styles.head} reveal`}>
          <p className="eyebrow">Authorized &amp; Trusted</p>
          <h2 id="brands-heading" className={`${styles.title} display`}>
            The brands we&apos;re built for<span className="dot">.</span>
          </h2>
          <p className={styles.lede}>
            Factory authorization means direct access to original manufacturer
            parts and service documentation.
          </p>
        </div>

        <ul className={`${styles.list} reveal`}>
          {BRANDS.map((b) => (
            <li key={b} className={styles.brand}>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
