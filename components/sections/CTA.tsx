import { BUSINESS } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Figure } from "@/components/ui/Figure";
import type { ImageName } from "@/lib/images";
import styles from "./CTA.module.css";

interface CTAProps {
  heading?: string;
  body?: string;
  /** Photo beside the call-to-action. Defaults to the broadcast bench. */
  photo?: ImageName;
}

export function CTA({
  heading = "Something acting up? Let's take a look.",
  body = "Call the shop or send a message — we'll figure out the next step with you: in-home appointment or shop drop-off.",
  photo = "control-room",
}: CTAProps) {
  return (
    <section className={styles.cta}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={`${styles.text} reveal`}>
          <h2 className={`${styles.heading} display`}>{heading}</h2>
          <p className={styles.body}>{body}</p>
          <div className={styles.actions}>
            <Button href={BUSINESS.phoneHref} variant="accent" size="lg">
              <Icon name="phone" size={20} />
              {BUSINESS.phone}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Send a message
            </Button>
          </div>
        </div>
        <Figure
          name={photo}
          ratio={4 / 3}
          sizes="(min-width: 900px) 38vw, 100vw"
          caption="Calibrated, factory-authorized — since 1947"
          className={`${styles.photo} reveal`}
        />
      </div>
    </section>
  );
}
