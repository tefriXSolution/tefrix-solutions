import {
  colorsTuple,
  createTheme,
  type CSSVariablesResolver,
} from "@mantine/core";

/**
 * Design tokens from the homepage design spec (design-handoff/DESIGN_SPEC.md §1–3).
 * This is the single source of truth: MantineProvider emits every entry as a
 * CSS variable on :root (see `cssVariablesResolver`), and component CSS
 * modules read them as `var(--rose-300)`, `var(--radius-card)`, etc.
 */
export const designTokens = {
  // Colour (dark theme)
  "--bg": "#0A0607",
  "--panel": "#110A0C",
  "--card": "linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.012))",
  "--card-flat": "rgba(255,255,255,.03)",
  "--border": "rgba(255,226,232,.10)",
  "--border-subtle": "rgba(255,226,232,.08)",
  "--border-input": "rgba(255,226,232,.14)",
  "--border-strong": "rgba(255,226,232,.18)",
  "--text": "#FFF9FA",
  "--text-2": "#E2D0D4",
  "--text-3": "#CDBCC0",
  "--muted": "#BFAEB2",
  "--faint": "#9F8D92",
  "--cherry": "#75070C",
  "--cherry-600": "#9F0C1F",
  "--crimson": "#C8102E",
  "--red": "#E11D48",
  "--rose": "#FF4D6D",
  "--rose-300": "#FF8FA3",
  "--blush": "#FFC2CF",
  "--success": "#6EE7B7",

  // Gradients and shadows
  "--gradient-primary": "linear-gradient(135deg, #E11D48, #9F0C1F)",
  "--shadow-primary": "0 14px 40px -16px rgba(255,77,109,.8)",
  "--gradient-highlight":
    "linear-gradient(100deg, #FFC2CF 0%, #FF4D6D 35%, #E11D48 60%, #FF4D6D 85%, #FFC2CF 100%)",
  "--gradient-glow":
    "radial-gradient(circle, rgba(200,16,46,.42), rgba(117,7,12,.18) 42%, transparent 70%)",
  "--gradient-quote":
    "radial-gradient(120% 160% at 0% 0%, #9F0C1F 0%, #4A0710 40%, #170B0E 80%)",

  // Type (the --font-geist* families come from next/font in app/fonts.ts)
  "--font-sans": "var(--font-geist), system-ui, sans-serif",
  "--font-mono": "var(--font-geist-mono), ui-monospace, monospace",

  // Radius
  "--radius-button-sm": "10px",
  "--radius-button": "12px",
  "--radius-card": "20px",
  "--radius-card-lg": "22px",
  "--radius-panel": "24px",
  "--radius-panel-lg": "28px",
  "--radius-pill": "999px",

  // Spacing & layout. --container is a content width: containers use
  // box-sizing: content-box so their side padding sits outside it, as in the
  // reference page.
  "--container": "1280px",
  "--gutter": "clamp(16px, 4vw, 40px)",
  "--section-space": "clamp(96px, 10vw, 140px)",
  // Phone layout (< 768px, DESIGN_SPEC §13).
  "--phone-gutter": "20px",
  "--phone-section-space": "64px",
  "--radius-button-phone": "14px",

  // Motion
  "--ease-out": "cubic-bezier(.2,.7,.2,1)",
} as const;

export const theme = createTheme({
  primaryColor: "rose",
  colors: { rose: colorsTuple(designTokens["--red"]) },
  black: designTokens["--bg"],
  white: designTokens["--text"],
  fontFamily: designTokens["--font-sans"],
  fontFamilyMonospace: designTokens["--font-mono"],
  headings: { fontFamily: designTokens["--font-sans"], fontWeight: "600" },
  fontSizes: { md: "17px" },
  lineHeights: { md: "1.6" },
  // The design renders with the browser's default text smoothing.
  fontSmoothing: false,
});

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: designTokens,
  light: {},
  dark: {
    "--mantine-color-body": designTokens["--bg"],
    "--mantine-color-text": designTokens["--text"],
  },
});
