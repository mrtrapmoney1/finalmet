// Inline SVG icons — zero web-font cost (no Material Symbols dependency).
// Stroke-based, inherits currentColor. Decorative by default (aria-hidden).

import type { SVGProps } from "react";

const ICONS = {
  phone:
    "M2.5 5.5c0 8 6 14 14 14a2 2 0 0 0 2-1.7l.4-2.3a1.5 1.5 0 0 0-1-1.6l-3-1a1.5 1.5 0 0 0-1.6.4l-1 1a11 11 0 0 1-4.6-4.6l1-1a1.5 1.5 0 0 0 .4-1.6l-1-3A1.5 1.5 0 0 0 6.5 2H4.2A1.7 1.7 0 0 0 2.5 4z",
  pin: "M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z M12 10.5a2 2 0 1 0 0-.001",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 2",
  check: "M20 6 9 17l-5-5",
  shield: "M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z M9 12l2 2 4-4",
  wrench:
    "M14.5 5.5a4 4 0 0 0 5 5l-3 3-7 7-3-3 7-7 3-3a4 4 0 0 1-2-2z",
  bolt: "M13 2 4 14h6l-1 8 9-12h-6z",
  star: "M12 3l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9z",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  menu: "M4 7h16 M4 12h16 M4 17h16",
  close: "M6 6 18 18 M18 6 6 18",
  doc: "M7 3h7l4 4v14H7z M14 3v4h4 M9 13h6 M9 17h6",
  mail: "M3 6h18v12H3z M3 7l9 6 9-6",
  home: "M4 11 12 4l8 7 M6 10v9h12v-9",
  speaker:
    "M8 4h8v16H8z M12 9.5a2.5 2.5 0 1 0 0 5.01 M12 7.2a.4.4 0 1 0 0 .01",
  tv: "M4 5h16v11H4z M9 20h6 M12 16v4",
  chip: "M8 8h8v8H8z M10 8V5 M14 8V5 M10 19v-3 M14 19v-3 M8 10H5 M8 14H5 M19 10h-3 M19 14h-3",
  printer: "M7 9V3h10v6 M6 9h12a2 2 0 0 1 2 2v6h-4 M18 13H6v8h12z M6 17H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  facebook:
    "M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M15 8h-1.6a1.9 1.9 0 0 0-1.9 1.9V11H10v2.4h1.5V20 M11.5 13.4H14",
  instagram:
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M16.7 7.3a.3.3 0 1 0 0 .01",
} as const;

export type IconName = keyof typeof ICONS;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  title?: string;
}

export function Icon({ name, size = 24, title, ...rest }: IconProps) {
  const d = ICONS[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {d.split(" M").map((seg, i) => (
        <path key={i} d={i === 0 ? seg : `M${seg}`} />
      ))}
    </svg>
  );
}
