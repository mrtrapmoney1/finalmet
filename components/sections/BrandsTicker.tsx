"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import styles from "./Brands.module.css";

/**
 * Parts-manifest ticker: the authorized-brand list scrolls continuously, pauses
 * on hover/focus, and can be grabbed and scrubbed by pointer. The brand list is
 * rendered once for assistive tech (the looped copy is aria-hidden). Under reduced
 * motion the auto-scroll is disabled and it becomes a normal horizontally
 * scrollable row, so the content is always reachable without motion.
 */
export function BrandsTicker({ brands }: { brands: string[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = scroller.current;
    if (!el) return;

    let raf = 0;
    let paused = false;
    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const half = () => el.scrollWidth / 2;
    const step = () => {
      if (!paused && !dragging) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= half()) el.scrollLeft -= half();
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pause = () => (paused = true);
    const resume = () => (paused = false);
    const onDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.dataset.dragging = "true";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
      if (el.scrollLeft < 0) el.scrollLeft += half();
      if (el.scrollLeft >= half()) el.scrollLeft -= half();
    };
    const onUp = () => {
      dragging = false;
      delete el.dataset.dragging;
    };

    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", () => { resume(); onUp(); });
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
    };
  }, [reduced]);

  return (
    <div className={`${styles.ticker} reveal`} ref={scroller} aria-label="Authorized brands we service">
      <ul className={styles.track}>
        {brands.map((b, i) => (
          <li key={b} className={styles.brand}>
            <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>
            {b}
          </li>
        ))}
      </ul>
      {!reduced && (
        <ul className={styles.track} aria-hidden="true">
          {brands.map((b, i) => (
            <li key={`dup-${b}`} className={styles.brand}>
              <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
