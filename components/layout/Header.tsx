"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, BUSINESS } from "@/lib/constants";
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
            {NAV_LINKS.map((link) =>
              link.href === "/services" ? (
                <li key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-0.5"
                  >
                    {link.label}
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">expand_more</span>
                  </Link>
                  {/* Dropdown flyout */}
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                    <div className="bg-surface border border-outline-variant/30 rounded-2xl shadow-ambient-lg p-2 w-64">
                      {[
                        { href: "/appliance", icon: "home_repair_service", label: "Appliance Repair", sub: "In-home · 200+ zip codes" },
                        { href: "/tv", icon: "tv", label: "TV Repair", sub: "Drop-off · Lincoln shop" },
                        { href: "/audio", icon: "speaker", label: "TV & Audio Repair", sub: "Drop-off · Lincoln shop" },
                        { href: "/commercial", icon: "microwave", label: "Commercial Microwave", sub: "Drop-off · Lincoln shop" },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container transition-colors group/item"
                        >
                          <span className="material-symbols-outlined text-xl text-secondary" aria-hidden="true">{item.icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-on-surface group-hover/item:text-primary transition-colors">{item.label}</p>
                            <p className="text-xs text-on-surface-variant">{item.sub}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-container transition"
              aria-label={`Open cart${count > 0 ? `, ${count} item${count !== 1 ? "s" : ""}` : ""}`}
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">shopping_cart</span>
              {count > 0 ? (
                <span className="font-bold">Cart ({count})</span>
              ) : (
                <span>Cart</span>
              )}
            </button>
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
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
