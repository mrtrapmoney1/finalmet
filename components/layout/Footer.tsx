import Link from "next/link";
import { BUSINESS, NAV_LINKS, SERVICES } from "@/lib/constants";

const FOOTER_YEAR = 2026;

export function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="text-2xl font-bold font-headline mb-3">
              {BUSINESS.shortName}
            </p>
            <p className="text-sm text-inverse-on-surface/60 leading-relaxed">
              Factory-authorized repair since {BUSINESS.founded}. Technical
              precision and heirloom-quality service for Nebraska homes.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-sm font-semibold font-headline mb-4 text-inverse-on-surface/80 uppercase tracking-wider">
              Services
            </p>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    className="text-sm text-inverse-on-surface/60 hover:text-inverse-on-surface transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-sm font-semibold font-headline mb-4 text-inverse-on-surface/80 uppercase tracking-wider">
              Company
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-inverse-on-surface/60 hover:text-inverse-on-surface transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold font-headline mb-4 text-inverse-on-surface/80 uppercase tracking-wider">
              Contact
            </p>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-2xl font-bold font-headline hover:text-inverse-on-surface/80 transition-colors block mb-3"
            >
              {BUSINESS.phone}
            </a>
            <p className="text-sm text-inverse-on-surface/60 mb-1">
              {BUSINESS.address}
            </p>
            <p className="text-sm text-inverse-on-surface/60">{BUSINESS.hours}</p>
          </div>
        </div>

        <div className="border-t border-inverse-on-surface/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-inverse-on-surface/40">
          <p>
            © {FOOTER_YEAR} {BUSINESS.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/warranty" className="hover:text-inverse-on-surface/60 transition-colors">
              Warranty
            </Link>
            <Link href="/partners" className="hover:text-inverse-on-surface/60 transition-colors">
              Partners
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
