"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BUSINESS, NAV_LINKS } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label={`${BUSINESS.name} home`}>
          <span className={styles.brandMark} aria-hidden="true">
            M
          </span>
          <span className={styles.brandText}>
            Metro TV <span className={styles.brandAmp}>&amp;</span> Appliances
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.desktopCta}>
          <a href={BUSINESS.phoneHref} className={styles.phone}>
            <Icon name="phone" size={18} />
            {BUSINESS.phone}
          </a>
          <ThemeToggle />
          <Button href="/contact" variant="accent">
            Schedule Service
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
              className={styles.mobileLink}
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
            <a href={BUSINESS.phoneHref} className={styles.mobilePhone}>
              <Icon name="phone" size={18} />
              {BUSINESS.phone}
            </a>
            <Button href="/contact" variant="accent" className={styles.mobileButton}>
              Schedule Service
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
