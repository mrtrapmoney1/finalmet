import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Figure } from "@/components/ui/Figure";
import styles from "./WarrantyTeaser.module.css";

const POINTS = [
  {
    icon: "doc" as const,
    title: "Parts prices swing by brand & model",
    body: "A control board on one brand can cost a fraction of the same part on another. A home warranty can help smooth out that surprise.",
  },
  {
    icon: "shield" as const,
    title: "We work with your warranty",
    body: "From in-home appliance claims to extended plans like SquareTrade, we handle the paperwork so covered repairs keep moving.",
  },
  {
    icon: "check" as const,
    title: "Authorized for the brands we service",
    body: "Factory authorization means direct access to original manufacturer parts and service documentation.",
  },
];

export function WarrantyTeaser() {
  return (
    <section className={`section ${styles.wrap}`} aria-labelledby="warranty-heading">
      <div className={`container ${styles.inner}`}>
        <div className={`${styles.copy} reveal`}>
          <p className="eyebrow">Home Warranty Help</p>
          <h2 id="warranty-heading" className={`${styles.title} display`}>
            Got a warranty? Start here<span className="dot">.</span>
          </h2>
          <p className={styles.lede}>
            Parts pricing swings hard by brand, so repair bills are tough to
            predict. Carry a home warranty and we can help you put it to work — and
            if you don&apos;t, we&apos;ll walk you through the options before any
            work begins.
          </p>
          <Button href="/home-warranty" variant="accent" size="lg">
            How warranty service works
            <Icon name="arrow" size={20} />
          </Button>
          <Figure
            name="kitchen"
            alt=""
            ratio={16 / 9}
            sizes="(min-width: 900px) 40vw, 100vw"
            caption="In-home appliance service across 200+ zip codes"
            className={`${styles.copyPhoto} reveal`}
          />
        </div>

        <ul className={styles.points}>
          {POINTS.map((p, i) => (
            <li
              key={p.title}
              className={`${styles.point} reveal`}
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              {/* Flip card: the headline point is on the front; the detail flips
                  into view on hover or keyboard focus. Reduced-motion shows both. */}
              <div className={styles.flip} tabIndex={0} role="group" aria-label={p.title}>
                <div className={styles.flipInner}>
                  <div className={`${styles.face} ${styles.front}`}>
                    <span className={styles.pointIcon} aria-hidden="true">
                      <Icon name={p.icon} size={22} />
                    </span>
                    <h3 className={styles.pointTitle}>{p.title}</h3>
                    <span className={styles.flipHint} aria-hidden="true">
                      Hover or focus to read
                    </span>
                  </div>
                  <div className={`${styles.face} ${styles.back}`}>
                    <p className={styles.pointBody}>{p.body}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
