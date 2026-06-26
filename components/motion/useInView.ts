"use client";

import { useEffect, useRef, useState } from "react";

interface InViewOptions {
  /** Fraction of the element visible before firing (0..1). */
  threshold?: number;
  /** Margin around the root, e.g. "0px 0px -10% 0px". */
  rootMargin?: string;
  /** Keep observing after first entry (default false → fire once, then disconnect). */
  repeat?: boolean;
}

/**
 * Returns `[ref, inView]`. Attach `ref` to the element to watch. `inView` flips
 * true when it scrolls into view. Fires once by default (good for reveal/animate-in).
 * If IntersectionObserver is unavailable, reports `true` immediately so content is
 * never gated behind the observer.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: InViewOptions = {},
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.3, rootMargin = "0px 0px -10% 0px", repeat = false } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (!repeat) io.disconnect();
          } else if (repeat) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, repeat]);

  return [ref, inView];
}
