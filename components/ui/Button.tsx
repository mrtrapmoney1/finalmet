import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "md" | "lg";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onDark?: boolean;
  /** Native button props (only used when no href is provided). */
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onDark = false,
  type = "submit",
  disabled = false,
}: ButtonProps) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    onDark ? styles.onDark : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    const external = href.startsWith("http") || href.startsWith("tel:");
    if (external) {
      return (
        <a className={cls} href={href}>
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} type={type} disabled={disabled} aria-busy={disabled}>
      {children}
    </button>
  );
}
