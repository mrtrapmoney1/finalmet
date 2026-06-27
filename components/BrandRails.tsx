import { SERVICES } from "@/lib/business";
import styles from "./BrandRails.module.css";

// Every authorized brand, de-duped — same source as the Brands section ticker.
const BRANDS = Array.from(new Set(SERVICES.flatMap((s) => s.brands)));

/**
 * Side-gutter brand banner. A single vertical line of authorized-brand names
 * runs continuously up the left margin and down the right margin, fixed to the
 * viewport so it "follows" the reader down the page. It lives only in the empty
 * side gutters (shown once the viewport is wider than the content column) and
 * sits behind the content column, so it reads as background texture and never
 * overlaps real copy.
 *
 * Purely decorative — the same brand list is presented semantically in the
 * Brands section — so the whole layer is aria-hidden. No JS: the marquee is a
 * CSS animation that is disabled under reduced motion (the brands stay visible,
 * just static).
 */
function Rail({ side }: { side: "left" | "right" }) {
  // One seamless loop = two identical sequences; the track animates by -50%.
  const seq = (
    <span className={styles.seq}>
      {BRANDS.map((b) => (
        <span key={b} className={styles.brand}>
          {b}
          <span className={styles.sep} aria-hidden="true">
            ·
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div className={`${styles.rail} ${styles[side]}`} aria-hidden="true">
      <div className={styles.track}>
        {seq}
        {seq}
      </div>
    </div>
  );
}

export function BrandRails() {
  return (
    <div className={styles.rails} aria-hidden="true">
      <Rail side="left" />
      <Rail side="right" />
    </div>
  );
}
