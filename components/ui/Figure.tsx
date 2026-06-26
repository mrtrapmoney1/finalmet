import Image from "next/image";
import { img, type ImageName } from "@/lib/images";
import styles from "./Figure.module.css";

interface FigureProps {
  /** Key into the self-hosted image manifest. */
  name: ImageName;
  /** Override the manifest alt text. Pass "" only for purely decorative use. */
  alt?: string;
  /** Crop to an aspect ratio (width / height). Omit to use the photo's intrinsic ratio. */
  ratio?: number;
  /** Above-the-fold hero image — disables lazy loading and preloads. */
  priority?: boolean;
  /** Responsive `sizes` hint; defaults to full-viewport-width. */
  sizes?: string;
  /** Apply the instrument duotone + graticule overlay (default true). */
  overlay?: boolean;
  /** Optional monospace caption rendered under the frame. */
  caption?: string;
  /** Rounded frame + hairline border (default true). */
  framed?: boolean;
  className?: string;
}

/**
 * Standard self-hosted photo wrapper. Always sized from the manifest (no CLS),
 * lazy below the fold, AVIF/WebP via next/image, with a tokenized "instrument"
 * overlay so photography reads as part of the bench. The overlay is pure CSS and
 * static, so this stays a server component and is reduced-motion-safe by default.
 */
export function Figure({
  name,
  alt,
  ratio,
  priority = false,
  sizes = "100vw",
  overlay = true,
  caption,
  framed = true,
  className,
}: FigureProps) {
  const meta = img(name);
  const resolvedAlt = alt ?? meta.alt;

  const frameClass = [styles.figure, framed ? styles.framed : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={frameClass}>
      <span
        className={styles.frame}
        style={ratio ? ({ ["--ratio" as string]: String(ratio) }) : undefined}
      >
        {ratio ? (
          <Image
            className={styles.img}
            src={meta.src}
            alt={resolvedAlt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            blurDataURL={meta.blurDataURL}
          />
        ) : (
          <Image
            className={styles.img}
            src={meta.src}
            alt={resolvedAlt}
            width={meta.width}
            height={meta.height}
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            blurDataURL={meta.blurDataURL}
          />
        )}
        {overlay && <span className={styles.overlay} aria-hidden="true" />}
      </span>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
