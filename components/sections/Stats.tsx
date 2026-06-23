import { STATS } from "@/lib/business";
import { CountUp } from "@/components/ui/CountUp";
import styles from "./Stats.module.css";

export function Stats() {
  return (
    <section className={styles.stats} aria-label="By the numbers">
      <div className={`container ${styles.grid}`}>
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`${styles.item} reveal`}
            style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
          >
            <p className={styles.value}>
              <CountUp value={stat.value} />
            </p>
            <p className={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
