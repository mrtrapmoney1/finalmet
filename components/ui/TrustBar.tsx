import { BUSINESS } from "@/lib/business";
import { Icon } from "@/components/ui/Icon";
import styles from "./TrustBar.module.css";

// Compact social-proof strip: real Google rating + count + credentials.
// The aggregate rating is the top local-conversion signal, so it sits in the hero.
export function TrustBar() {
  const { rating, count, url } = BUSINESS.reviews;
  const full = Math.round(rating);
  return (
    <a
      href={url}
      className={styles.bar}
      aria-label={`Rated ${rating.toFixed(1)} out of 5 from ${count} Google reviews`}
    >
      <span className={styles.rating}>{rating.toFixed(1)}</span>
      <span className={styles.stars} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon
            key={i}
            name="star"
            size={15}
            className={i < full ? styles.starFull : styles.starEmpty}
          />
        ))}
      </span>
      <span className={styles.meta}>{count} Google reviews</span>
      <span className={styles.sep} aria-hidden="true">
        ·
      </span>
      <span className={styles.meta}>BBB A+</span>
      <span className={styles.sep} aria-hidden="true">
        ·
      </span>
      <span className={styles.meta}>Since {BUSINESS.founded}</span>
    </a>
  );
}
