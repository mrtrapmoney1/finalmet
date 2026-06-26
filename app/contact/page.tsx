import { BUSINESS } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/ContactForm";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Contact & Schedule Service",
  description:
    "Contact Metro TV & Appliances in Lincoln, NE. Call (402) 466-9090 or send a service request. Walk-in shop drop-off and in-home appliance scheduling.",
  path: "/contact",
});

const INFO = [
  { icon: "phone" as const, label: "Phone", value: BUSINESS.phone, href: BUSINESS.phoneHref },
  { icon: "mail" as const, label: "Email", value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
  { icon: "printer" as const, label: "Fax", value: BUSINESS.fax },
  { icon: "pin" as const, label: "Address", value: BUSINESS.address, href: BUSINESS.directionsUrl },
  { icon: "clock" as const, label: "Hours", value: BUSINESS.hours },
];

export default function ContactPage() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Get In Touch</p>
          <h1 className={`${styles.title} display`}>
            Let&apos;s get it moving<span className="dot">.</span>
          </h1>
          <p className={styles.lede}>
            Call during shop hours, walk in — no appointment needed for TV, audio
            and commercial microwave service — or send a request and we&apos;ll
            follow up to schedule in-home appliance repair.
          </p>

          <ul className={styles.info}>
            {INFO.map((item) => (
              <li key={item.label} className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden="true">
                  <Icon name={item.icon} size={20} />
                </span>
                <div>
                  <p className={styles.infoLabel}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className={styles.infoValue}>
                      {item.value}
                    </a>
                  ) : (
                    <p className={styles.infoValue}>{item.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <a href={BUSINESS.directionsUrl} className={styles.directions}>
            Get directions
            <Icon name="arrow" size={18} />
          </a>
        </div>

        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Send a service request</h2>
          <p className={styles.formSub}>
            Share a few details and we&apos;ll be in touch. For the fastest help,
            give us a call.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
