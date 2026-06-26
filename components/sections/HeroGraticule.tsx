"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import styles from "./Hero.module.css";

/**
 * The hero's signature interaction: the oscilloscope graticule's radial focus
 * and a live vertical "cursor readout" line track the pointer across the hero.
 * The layer stays pointer-events:none (so it never blocks the CTAs) and listens
 * on the window, mapping coordinates into its own rect. Under reduced motion or a
 * coarse/touch pointer it never attaches — the grid simply renders at its rest
 * position with the one-shot power-on sweep, exactly as before.
 */
export function HeroGraticule() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [p, setP] = useState({ x: 0.78, y: 0.26, active: false });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) {
        setP((s) => (s.active ? { ...s, active: false } : s));
        return;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setP({ x, y, active: true }));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  const style = {
    ["--mask-x" as string]: `${(p.active ? p.x : 0.78) * 100}%`,
    ["--mask-y" as string]: `${(p.active ? p.y : 0.26) * 100}%`,
    ["--sweep-x" as string]: `${p.x * 100}%`,
    ["--cursor-op" as string]: p.active ? "1" : "0",
  } as React.CSSProperties;

  return <div ref={ref} className={styles.graticule} style={style} aria-hidden="true" />;
}
