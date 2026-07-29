"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// The server can't know the preference; false keeps markup identical to the
// pre-hydration HTML, and the real value arrives on the first client render.
const getServerSnapshot = () => false;

/**
 * True when the user has requested reduced motion. Reads the media query through
 * useSyncExternalStore rather than an effect, so the correct value is available on
 * the very first client render instead of after a second, cascading one.
 * Every interaction in this codebase must check this and fall back to a static,
 * fully-readable state when it is true.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
