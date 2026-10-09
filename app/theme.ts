import {
  colorsTuple,
  createTheme,
  type CSSVariablesResolver,
} from "@mantine/core";

/**
 * Design tokens from the Cherry design spec (DESIGN_SPEC.md §1–3).
 * This is the single source of truth: MantineProvider emits every entry as a
 * CSS variable on :root (see `cssVariablesResolver`), and component CSS
 * modules read them as `var(--cherry)`, `var(--radius-card)`, etc.
 */
export const designTokens = {
  // Colour
  "--cherry": "#75070C",
  "--cherry-tint": "#DDBDBF",
  "--cherry-50": "#F4EBEC",
  "--cherry-300": "#CFA8AA",
  "--cherry-ink": "#5E060A",
  "--chill-white": "#FFF9FA",
  "--white": "#FFFFFF",
  "--ink": "#0E0E0E",
  "--ink-2": "#1A1A1A",
  "--muted": "#5E5457",
  "--muted-dark": "#CFC6C8",
  "--line": "#F2DDE2",
  "--line-dark": "#2A2A2A",

  // Type (the --font-* families come from next/font in app/fonts.ts)
  "--font-display": "var(--font-anton), Impact, sans-serif",
  "--font-body": "var(--font-onest), system-ui, sans-serif",
  "--font-mono": "var(--font-dm-mono), ui-monospace, monospace",

  // Radius
  "--radius-slab": "36px",
  "--radius-card": "28px",
  "--radius-card-sm": "24px",
  "--radius-pill": "999px",

  // Spacing & layout. --container is a content width: containers use
  // box-sizing: content-box so their side padding sits outside it.
  "--container": "1400px",
  "--gutter": "clamp(16px, 3vw, 40px)",
  "--gutter-slab": "clamp(12px, 2vw, 24px)",
  "--section-space": "clamp(80px, 9vw, 136px)",
} as const;

export const theme = createTheme({
  primaryColor: "cherry",
  colors: { cherry: colorsTuple(designTokens["--cherry"]) },
  black: designTokens["--ink"],
  white: designTokens["--white"],
  fontFamily: designTokens["--font-body"],
  fontFamilyMonospace: designTokens["--font-mono"],
  headings: { fontFamily: designTokens["--font-display"], fontWeight: "400" },
  fontSizes: { md: "17px" },
  lineHeights: { md: "1.6" },
  // The design renders with the browser's default text smoothing.
  fontSmoothing: false,
});

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: designTokens,
  light: {
    "--mantine-color-body": designTokens["--chill-white"],
    "--mantine-color-text": designTokens["--ink"],
  },
  dark: {},
});
