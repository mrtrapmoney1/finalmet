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
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onDark = false,
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
  return <button className={cls}>{children}</button>;
}
