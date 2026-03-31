"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-outline-variant/40">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold font-headline text-primary tracking-tight"
          >
            {BUSINESS.shortName}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition"
              aria-label={`Open cart${count > 0 ? `, ${count} item${count !== 1 ? "s" : ""}` : ""}`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">shopping_cart</span>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-secondary text-on-secondary text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
            <Button href="/contact" variant="primary">
              Schedule Service
            </Button>
          </div>

          {/* Mobile right actions */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition"
              aria-label={`Open cart${count > 0 ? `, ${count} item${count !== 1 ? "s" : ""}` : ""}`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">shopping_cart</span>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-secondary text-on-secondary text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
            <button
              className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {menuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-surface border-t border-outline-variant/40 px-6 py-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-on-surface-variant hover:text-on-surface py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" variant="primary" className="w-full justify-center">
              Schedule Service
            </Button>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
