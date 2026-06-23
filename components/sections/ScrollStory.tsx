"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ScrollStory.module.css";

interface Panel {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
}

interface ScrollStoryProps {
  panels: [Panel, Panel];
}

/**
 * Prometheus-style pinned two-state panel: as you scroll through a tall
 * section, the sticky panel cross-fades from the first state to the second.
 *
 * Accessible by construction: without JS or under reduced-motion the two
 * states render as normal stacked, fully-visible blocks (the pinned/absolute
 * layout is gated behind `html.js` in CSS, and disabled for reduced-motion).
 */
export function ScrollStory({ panels }: ScrollStoryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [second, setSecond] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total > 0) setSecond(-rect.top / total >= 0.45);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={ref}
      className={styles.story}
      data-second={second}
      aria-label="How we work"
    >
      <div className={styles.sticky}>
        <div className={`container ${styles.stage}`}>
          {panels.map((p, i) => (
            <div key={i} className={`${styles.panel} ${i === 0 ? styles.first : styles.last}`}>
              <p className="eyebrow">{p.eyebrow}</p>
              <h2 className={`${styles.title} display`}>{p.title}</h2>
              <p className={styles.body}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
