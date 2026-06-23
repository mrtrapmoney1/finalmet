import { BUSINESS } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./CTA.module.css";

interface CTAProps {
  heading?: string;
  body?: string;
}

export function CTA({
  heading = "Something acting up? Let's take a look.",
  body = "Call the shop or send a message — we'll figure out the next step with you: in-home appointment or shop drop-off.",
}: CTAProps) {
  return (
    <section className={styles.cta}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className="reveal">
          <h2 className={`${styles.heading} display`}>{heading}</h2>
          <p className={styles.body}>{body}</p>
        </div>
        <div className={`${styles.actions} reveal`} style={{ ["--reveal-delay" as string]: "120ms" }}>
          <Button href={BUSINESS.phoneHref} variant="accent" size="lg">
            <Icon name="phone" size={20} />
            {BUSINESS.phone}
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Send a message
          </Button>
        </div>
      </div>
    </section>
  );
}
