"use client";

import { useEffect, useState } from "react";

/**
 * True when the user has requested reduced motion. SSR-safe: defaults to false
 * on the server / first paint, then syncs on mount and on preference change.
 * Every interaction in this codebase must check this and fall back to a static,
 * fully-readable state when it is true.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
