import { STATS } from "@/lib/business";
import { CountUp } from "@/components/ui/CountUp";
import { StatMeter } from "./StatMeter";
import styles from "./Stats.module.css";

// Decorative meter levels per channel — stable, illustrative "signal" levels.
const METER_LEVELS = [0.82, 0.95, 0.68, 0.9];

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
            <StatMeter level={METER_LEVELS[i % METER_LEVELS.length]} />
          </div>
        ))}
      </div>
    </section>
  );
}
