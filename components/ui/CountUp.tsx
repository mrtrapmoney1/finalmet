"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric stat up to its value when it scrolls into view.
 * Handles a trailing suffix (e.g. "200+"). Non-numeric values (e.g. "A+")
 * render as-is. Respects prefers-reduced-motion: shows the final value
 * immediately, so the number is always correct without animation.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const suffix = match ? match[2] : "";
  // Initialize to the FINAL value so SSR, no-JS, and screen readers always
  // expose the real number; the count-up only animates from 0 once in view.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (target === null) return;

    // `display` already initializes to the final value, so under reduced motion
    // we simply skip the animation — no state update needed.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;
    const animate = (start: number) => {
      const duration = 1100;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(`${Math.round(target * eased)}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            raf = requestAnimationFrame(animate);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [target, suffix]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
