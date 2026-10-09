import { Anton, DM_Mono, Onest } from "next/font/google";

// Self-hosted by next/font with metric-matched fallbacks, so text doesn't
// shift when the web fonts load. Families are exposed as CSS variables and
// mapped to the --font-display / --font-body / --font-mono tokens in theme.ts.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

const onest = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-onest",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
});

export const fontVariables = [anton, onest, dmMono]
  .map((font) => font.variable)
  .join(" ");
