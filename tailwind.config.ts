import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — visible navy blue (lightened from #002045)
        primary: "#1a4494",
        "primary-container": "#0b2554",
        "on-primary": "#ffffff",
        "on-primary-container": "#c2d4f7",
        "primary-fixed": "#d6e3ff",
        "primary-fixed-dim": "#adc7f7",
        "inverse-primary": "#adc7f7",

        // Secondary (CTA orange)
        secondary: "#ae3100",
        "secondary-container": "#fe6431",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#5b1500",
        "secondary-fixed": "#ffdbd0",
        "secondary-fixed-dim": "#ffb59f",

        // Tertiary (deep plum/red)
        tertiary: "#4b0002",
        "tertiary-container": "#730006",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#ff7366",

        // Surface scale
        surface: "#fbf9f8",
        "surface-dim": "#dcd9d9",
        "surface-bright": "#fbf9f8",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f3f2",
        "surface-container": "#f0eded",
        "surface-container-high": "#eae8e7",
        "surface-container-highest": "#e4e2e1",
        "surface-variant": "#e4e2e1",
        "surface-tint": "#455f88",

        // On-surface
        "on-surface": "#1b1c1c",
        "on-surface-variant": "#43474e",
        "inverse-surface": "#303030",
        "inverse-on-surface": "#f3f0f0",

        // Outline
        outline: "#74777f",
        "outline-variant": "#c4c6cf",

        // Utility
        background: "#fbf9f8",
        "on-background": "#1b1c1c",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
      },
      fontFamily: {
        headline: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        label: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        full: "9999px",
      },
      boxShadow: {
        ambient:
          "0 8px 32px 0 rgba(0, 32, 69, 0.06), 0 2px 8px 0 rgba(0, 32, 69, 0.04)",
        "ambient-lg":
          "0 16px 64px 0 rgba(0, 32, 69, 0.08), 0 4px 16px 0 rgba(0, 32, 69, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
