"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS, NAV_LINKS } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close the mobile menu on Escape and return focus to the toggle (expected
  // disclosure behavior). Only listens while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the mobile menu whenever the route changes. This covers browser
  // back/forward, which never fires the links' onClick. Adjusting state during
  // render is React's documented pattern for "reset state when a value changes";
  // an effect here fired a second render pass on every navigation.
  const [routeAtRender, setRouteAtRender] = useState(pathname);
  if (routeAtRender !== pathname) {
    setRouteAtRender(pathname);
    if (open) setOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label={`${BUSINESS.name} home`}>
          <span className={styles.brandText}>
            Metro TV <span className={styles.brandAmp}>&amp;</span> Appliances
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ""}`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.desktopCta}>
          <ThemeToggle />
          <Button href={BUSINESS.phoneHref} variant="accent">
            <Icon name="phone" size={18} />
            {BUSINESS.phone}
          </Button>
        </div>

        <button
          ref={toggleRef}
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={26} />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className={styles.mobileNav} aria-label="Primary mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${isActive(link.href) ? styles.mobileLinkActive : ""}`}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileCta}>
            <div className={styles.mobileThemeRow}>
              <span>Appearance</span>
              <ThemeToggle />
            </div>
            <Button href={BUSINESS.phoneHref} variant="accent" className={styles.mobileButton}>
              <Icon name="phone" size={18} />
              Call {BUSINESS.phone}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
