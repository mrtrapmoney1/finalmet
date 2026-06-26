"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export interface PointerState {
  /** Normalized 0..1 within the element (0.5/0.5 at rest / center). */
  x: number;
  y: number;
  /** True while a fine pointer is actually hovering the element. */
  active: boolean;
}

const REST: PointerState = { x: 0.5, y: 0.5, active: false };

/**
 * Tracks the pointer position normalized within the referenced element. No-ops
 * (stays at rest, centered) under reduced motion or on coarse/touch pointers, so
 * pointer-reactive effects are purely an enhancement and never required for use.
 */
export function usePointer<T extends HTMLElement = HTMLDivElement>(): [
  React.RefObject<T | null>,
  PointerState,
] {
  const ref = useRef<T>(null);
  const [state, setState] = useState<PointerState>(REST);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setState({ x: Math.min(Math.max(x, 0), 1), y: Math.min(Math.max(y, 0), 1), active: true }),
      );
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      setState(REST);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return [ref, state];
}
