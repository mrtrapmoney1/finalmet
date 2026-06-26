"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const THEME_EVENT = "metrotv:themechange";

// The active theme lives on <html data-theme> — set before paint by an inline
// script in the layout (reads localStorage, defaults to light). That attribute
// is the single source of truth, so we read it via useSyncExternalStore rather
// than mirroring it into local state: the server snapshot is always "light"
// (matching the pre-hydration default, so no hydration mismatch), and toggles
// notify every mounted switch through a window event.
function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}
function getSnapshot(): Theme {
  return (document.documentElement.dataset.theme as Theme) || "light";
}
function getServerSnapshot(): Theme {
  return "light";
}

/**
 * Light/dark ("night mode") switch. The actual theme is set before paint by
 * an inline script in the layout (reads localStorage, defaults to light), so
 * there's no flash. This control just flips the attribute and persists it.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const toggle = () => {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still applies for the session */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`${styles.toggle} ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to night mode"}
      aria-pressed={isDark}
      title={isDark ? "Light mode" : "Night mode"}
    >
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb}>
          <Icon name={isDark ? "moon" : "sun"} size={15} />
        </span>
      </span>
    </button>
  );
}
