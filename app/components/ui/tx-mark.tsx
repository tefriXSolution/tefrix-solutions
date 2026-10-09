import type { SVGProps } from "react";

import { designTokens } from "@/app/theme";

// TX logo mark, redrawn as an inline SVG from the new logo (DESIGN_SPEC §8).
// Swap these shapes for the official vector when it's available.
const T_BAR = "M14 27 C14 15 22 8 33 8 L82 8 L69 27 Z";
const T_STEM = "M42 27 L55 27 L55 70 L42 84 Z";
const X_LEG = "M58 31 L71 31 L105 91 L91 91 Z";
const X_SWOOSH = "M26 94 Q 86 84 116 4 Q 80 68 26 94 Z";

type Pixel = { x: number; y: number; tone: "base" | "brand"; opacity?: number };

const PIXELS: Pixel[] = [
  { x: 33, y: 38, tone: "brand" },
  { x: 25, y: 45, tone: "base", opacity: 0.5 },
  { x: 34, y: 50, tone: "brand" },
  { x: 18, y: 53, tone: "brand", opacity: 0.55 },
  { x: 27, y: 58, tone: "base" },
  { x: 35, y: 63, tone: "brand" },
  { x: 20, y: 66, tone: "brand", opacity: 0.4 },
  { x: 29, y: 72, tone: "base", opacity: 0.6 },
];

type VariantConfig = {
  base?: string;
  brand?: string;
  legOpacity?: number;
  pixels: Pixel[];
  pixelOpacity: boolean;
};

const VARIANTS = {
  /** Ink T, cherry X: for light backgrounds. */
  light: {
    base: designTokens["--ink"],
    brand: designTokens["--cherry"],
    legOpacity: 0.45,
    pixels: PIXELS,
    pixelOpacity: true,
  },
  /** Chill-white T, cherry-tint X: for black backgrounds. The design drops the two faint cherry pixels here. */
  dark: {
    base: designTokens["--chill-white"],
    brand: designTokens["--cherry-tint"],
    legOpacity: 0.5,
    pixels: PIXELS.filter((pixel) => !(pixel.tone === "brand" && pixel.opacity)),
    pixelOpacity: true,
  },
  /** Shapes only, no pixels: the small mark in the hero badge. */
  badge: {
    base: designTokens["--ink"],
    brand: designTokens["--cherry"],
    legOpacity: 0.5,
    pixels: [],
    pixelOpacity: false,
  },
  /** No fills: the parent <svg> supplies the stroke (hero outline). */
  outline: { pixels: PIXELS, pixelOpacity: false },
} satisfies Record<string, VariantConfig>;

export type TxMarkVariant = keyof typeof VARIANTS;

/** The mark's shapes, for embedding inside another SVG (viewBox 0 0 120 100). */
export function TxMarkShapes({ variant }: { variant: TxMarkVariant }) {
  const config: VariantConfig = VARIANTS[variant];
  const fill = (tone: Pixel["tone"]) => (tone === "base" ? config.base : config.brand);

  return (
    <>
      <path d={T_BAR} fill={config.base} />
      <path d={T_STEM} fill={config.base} />
      <path d={X_LEG} fill={config.brand} opacity={config.legOpacity} />
      <path d={X_SWOOSH} fill={config.brand} />
      {config.pixels.map((pixel) => (
        <rect
          key={`${pixel.x}-${pixel.y}`}
          x={pixel.x}
          y={pixel.y}
          width={5}
          height={5}
          fill={fill(pixel.tone)}
          opacity={config.pixelOpacity ? pixel.opacity : undefined}
        />
      ))}
    </>
  );
}

export function TxMark({
  variant,
  ...props
}: { variant: TxMarkVariant } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" {...props}>
      <TxMarkShapes variant={variant} />
    </svg>
  );
}
