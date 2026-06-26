"use client";

import { useState } from "react";
import { Figure } from "@/components/ui/Figure";
import type { ImageName } from "@/lib/images";
import styles from "./DiagnosticSlider.module.css";

/**
 * Drag-to-reveal "diagnostic scan": the base photo on the left, a graticule +
 * red phosphor scan treatment wiped in from the right by a draggable handle.
 * The control is a native range input — keyboard-operable (arrow keys) and
 * labeled — so it works without a pointer. With no interaction it rests at the
 * midpoint showing both states, which is also the reduced-motion experience.
 */
export function DiagnosticSlider({
  name,
  label,
  priority = false,
}: {
  name: ImageName;
  label: string;
  priority?: boolean;
}) {
  const [v, setV] = useState(50);

  return (
    <div className={styles.wrap} style={{ ["--reveal" as string]: `${v}%` }}>
      <Figure
        name={name}
        alt={label}
        ratio={16 / 10}
        overlay={false}
        priority={priority}
        sizes="(min-width: 900px) 48vw, 100vw"
        className={styles.base}
      />
      <div className={styles.scan} aria-hidden="true" />
      <span className={styles.readout} aria-hidden="true">
        DIAGNOSTIC SCAN
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        className={styles.range}
        aria-label={`${label}: drag to reveal the diagnostic scan overlay`}
      />
    </div>
  );
}
