import { BUSINESS } from "@/lib/business";
import { TESTIMONIALS } from "@/lib/reviews";
import { Icon } from "@/components/ui/Icon";
import styles from "./Testimonials.module.css";

export function Testimonials() {
  const { rating, count, url } = BUSINESS.reviews;
  return (
    <section className={`section ${styles.wrap}`} aria-labelledby="reviews-heading">
      <div className="container">
        <div className={`${styles.head} reveal`}>
          <p className="eyebrow">What customers say</p>
          <h2 id="reviews-heading" className={`${styles.title} display`}>
            Rated {rating.toFixed(1)} by Nebraska<span className="dot">.</span>
          </h2>
          <a href={url} className={styles.ratingLink}>
            <span className={styles.stars} aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" size={18} className={styles.star} />
              ))}
            </span>
            {count} Google reviews
            <Icon name="arrow" size={16} />
          </a>
        </div>

        <ul className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <li
              key={t.name}
              className={`${styles.card} reveal`}
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 60}ms` }}
            >
              {/* No per-card star row: we don't store each reviewer's actual score,
                  so painting five stars on every quote would assert a rating we
                  can't back — and it contradicts the 4.2 aggregate shown above.
                  Add stars back only alongside a real `rating` field in lib/reviews.ts. */}
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <p className={styles.author}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.context}>{t.context}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
