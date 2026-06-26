import { BUSINESS, TRUST_BADGES } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Figure } from "@/components/ui/Figure";
import { HeroGraticule } from "./HeroGraticule";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <HeroGraticule />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.eyebrow} reveal`}>
            Factory-Authorized Repair — Lincoln, NE
          </p>
          <h1 className={`display ${styles.headline} reveal`} style={{ ["--reveal-delay" as string]: "80ms" }}>
            Fixed right<span className="dot">.</span>
          </h1>
          <p className={`${styles.sub} reveal`} style={{ ["--reveal-delay" as string]: "160ms" }}>
            Appliances, TVs, audio gear and commercial microwaves — diagnosed to
            the root cause and repaired with original manufacturer parts. Serving
            Nebraska since {BUSINESS.founded}.
          </p>

          <div className={`${styles.actions} reveal`} style={{ ["--reveal-delay" as string]: "240ms" }}>
            <Button href="/contact" variant="accent" size="lg">
              Schedule Service
              <Icon name="arrow" size={20} />
            </Button>
            <Button href={BUSINESS.phoneHref} variant="outline" size="lg">
              <Icon name="phone" size={20} />
              {BUSINESS.phone}
            </Button>
          </div>

          <ul className={`${styles.creds} reveal`} aria-label="Credentials" style={{ ["--reveal-delay" as string]: "320ms" }}>
            {TRUST_BADGES.map((b) => (
              <li key={b} className={styles.cred}>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.media}>
        <Figure
          name="repair-hands"
          ratio={16 / 10}
          priority
          sizes="(min-width: 960px) 38vw, 100vw"
          className={`${styles.heroPhoto} reveal`}
        />
        <aside className={`${styles.card} reveal`} aria-label="Diagnostic pricing" style={{ ["--reveal-delay" as string]: "200ms" }}>
          <p className={styles.cardEyebrow}>Drop-off diagnostic</p>
          <p className={styles.price}>
            {BUSINESS.diagnostic.dropOff}
            <span className={styles.priceNote}>deductible</span>
          </p>
          <p className={styles.cardBody}>
            Applied toward your repair when you choose to proceed. You always get a
            written estimate before any work begins.
          </p>
          <ul className={styles.cardList}>
            <li>
              <Icon name="check" size={18} />
              No appointment needed for shop drop-off
            </li>
            <li>
              <Icon name="check" size={18} />
              In-home appliance service across 200+ zips
            </li>
            <li>
              <Icon name="check" size={18} />
              Original manufacturer parts
            </li>
          </ul>
          <Button href="/services" variant="primary" className={styles.cardButton}>
            See all services
          </Button>
        </aside>
        </div>
      </div>
    </section>
  );
}
