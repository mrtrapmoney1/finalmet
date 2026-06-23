"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the site's motion layer:
 *  - reveals elements marked `.reveal` as they scroll into view
 *    (content is already visible without JS; this only enhances)
 *  - updates the top reading-progress bar
 *
 * Re-runs its element scan on route changes so client-navigated pages
 * still animate. Respects prefers-reduced-motion (the CSS forces the
 * revealed state, so nothing is ever hidden for those users).
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (reduce || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.setAttribute("data-revealed", "true"));
      return;
    }

    const reveal = (el: Element) => {
      el.setAttribute("data-revealed", "true");
      observer.unobserve(el);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target);
        });
      },
      // Pre-trigger 120px before entry so fast scrollers never see blank content.
      { rootMargin: "0px 0px 120px 0px", threshold: 0 },
    );

    els.forEach((el) => {
      // Anything already in/above the viewport on mount reveals immediately.
      if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
      else observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const bar = document.getElementById("reading-progress");
    if (!bar) return;

    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      bar.style.setProperty("--progress", `${pct}%`);
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

  return null;
}
