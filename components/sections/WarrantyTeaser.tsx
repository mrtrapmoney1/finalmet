import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
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
    title: "Authorized for the brands you own",
    body: "Factory authorization means direct access to original parts and service documentation for the brands we carry.",
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
        </div>

        <ul className={styles.points}>
          {POINTS.map((p, i) => (
            <li
              key={p.title}
              className={`${styles.point} reveal`}
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <span className={styles.pointIcon} aria-hidden="true">
                <Icon name={p.icon} size={22} />
              </span>
              <div>
                <h3 className={styles.pointTitle}>{p.title}</h3>
                <p className={styles.pointBody}>{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
