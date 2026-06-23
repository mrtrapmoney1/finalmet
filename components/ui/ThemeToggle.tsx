"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

/**
 * Light/dark ("night mode") switch. The actual theme is set before paint by
 * an inline script in the layout (reads localStorage, defaults to light), so
 * there's no flash. This control just flips the attribute and persists it.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) || "light";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still applies for the session */
    }
  };

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      className={`${styles.toggle} ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to night mode"}
      aria-pressed={mounted ? isDark : undefined}
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
