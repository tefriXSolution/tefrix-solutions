import { Geist, Geist_Mono } from "next/font/google";

// Self-hosted by next/font with metric-matched fallbacks, so text doesn't
// shift when the web fonts load. Families are exposed as CSS variables and
// mapped to the --font-sans / --font-mono tokens in theme.ts.
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const fontVariables = [geist, geistMono].map((font) => font.variable).join(" ");
