import { BUSINESS } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./Placeholder.module.css";

interface PlaceholderProps {
  eyebrow: string;
  title: string;
  body: string;
}

/**
 * Branded interim page for routes that are linked in nav but not yet
 * fully built out. Keeps navigation from dead-ending in a 404 and always
 * routes the visitor to a working next step (call / contact).
 */
export function Placeholder({ eyebrow, title, body }: PlaceholderProps) {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.body}>{body}</p>
        <div className={styles.actions}>
          <Button href={BUSINESS.phoneHref} variant="accent" size="lg">
            <Icon name="phone" size={20} />
            {BUSINESS.phone}
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Send a message
          </Button>
          <Button href="/" variant="ghost" size="lg">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
