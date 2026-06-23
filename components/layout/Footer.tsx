import Link from "next/link";
import { BUSINESS, NAV_LINKS, SERVICES } from "@/lib/business";
import { Icon } from "@/components/ui/Icon";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <p className={styles.brand}>{BUSINESS.shortName}</p>
          <p className={styles.tagline}>
            Factory-authorized repair serving Nebraska since {BUSINESS.founded}.
            Technical precision and honest estimates for homes and local businesses.
          </p>
          <div className={styles.social}>
            <a href={BUSINESS.social.facebook} aria-label="Facebook" className={styles.socialLink}>
              <Icon name="facebook" size={18} />
            </a>
            <a href={BUSINESS.social.instagram} aria-label="Instagram" className={styles.socialLink}>
              <Icon name="instagram" size={18} />
            </a>
            <a href={BUSINESS.social.bbb} aria-label="BBB profile" className={styles.bbb}>
              BBB A+ Accredited
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <p className={styles.heading}>Services</p>
          <ul className={styles.list}>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className={styles.link}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.heading}>Company</p>
          <ul className={styles.list}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.heading}>Visit / Call</p>
          <a href={BUSINESS.phoneHref} className={styles.phone}>
            {BUSINESS.phone}
          </a>
          <address className={styles.address}>
            <span className={styles.addrLine}>
              <Icon name="pin" size={16} /> {BUSINESS.address}
            </span>
            <span className={styles.addrLine}>
              <Icon name="clock" size={16} /> {BUSINESS.hours}
            </span>
          </address>
          <a href={BUSINESS.directionsUrl} className={styles.directions}>
            Get Directions
            <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
        </p>
        <div className={styles.legal}>
          <Link href="/privacy-policy" className={styles.legalLink}>
            Privacy
          </Link>
          <Link href="/terms" className={styles.legalLink}>
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
