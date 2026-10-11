import type { SVGProps } from "react";

import { designTokens } from "@/app/theme";

// The TX mark from design-handoff/assets/tefrix-mark-on-dark.svg (redrawn
// from the logo). Replace with the official vector when one exists.
const PIXELS = [
  { x: 33, y: 38, fill: designTokens["--rose"] },
  { x: 34, y: 50, fill: designTokens["--rose"] },
  { x: 27, y: 58, fill: designTokens["--text"] },
  { x: 35, y: 63, fill: designTokens["--rose"] },
];

/** `pixels={false}` drops the four pixel squares, as in the footer. */
export function TefrixMark({
  pixels = true,
  ...props
}: { pixels?: boolean } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" {...props}>
      <path d="M14 27 C14 15 22 8 33 8 L82 8 L69 27 Z" fill={designTokens["--text"]} />
      <path d="M42 27 L55 27 L55 70 L42 84 Z" fill={designTokens["--text"]} />
      <path d="M58 31 L71 31 L105 91 L91 91 Z" fill={designTokens["--crimson"]} />
      <path d="M26 94 Q 86 84 116 4 Q 80 68 26 94 Z" fill={designTokens["--rose"]} />
      {pixels &&
        PIXELS.map((pixel) => (
          <rect key={`${pixel.x}-${pixel.y}`} x={pixel.x} y={pixel.y} width={5} height={5} fill={pixel.fill} />
        ))}
    </svg>
  );
}
