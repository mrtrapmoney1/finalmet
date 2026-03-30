import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-secondary text-on-secondary hover:opacity-90 shadow-ambient",
  secondary:
    "bg-surface-container-highest text-primary hover:bg-surface-container-high",
  ghost:
    "border border-outline-variant/40 text-on-surface hover:bg-surface-container-low",
};

const baseStyles =
  "inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold font-label transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

export function Button({
  variant = "primary",
  href,
  external = false,
  children,
  className = "",
  ...props
}: ButtonProps & Omit<ComponentPropsWithoutRef<"button">, keyof ButtonProps>) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
