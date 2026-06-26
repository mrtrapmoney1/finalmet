"use client";

import { useInView } from "@/components/motion/useInView";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import styles from "./Stats.module.css";

/**
 * Decorative VU-meter level for a stat. Sweeps from 0 to `level` when scrolled
 * into view. Purely visual (aria-hidden); the real figure lives in the value text.
 * Under reduced motion it renders filled immediately with no transition.
 */
export function StatMeter({ level }: { level: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });
  const reduced = usePrefersReducedMotion();
  const filled = reduced || inView;
  const pct = `${Math.round(Math.min(Math.max(level, 0), 1) * 100)}%`;

  return (
    <div
      ref={ref}
      className={styles.meter}
      aria-hidden="true"
      style={{ ["--level" as string]: filled ? pct : "0%" }}
    >
      <span className={styles.meterFill} />
      <span className={styles.meterTick} />
    </div>
  );
}
