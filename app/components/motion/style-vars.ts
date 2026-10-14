import type { CSSProperties } from "react";

/**
 * Inline custom properties for the shared motion classes: --delay (and
 * --delay-phone for the phone layout's own stagger) and --float-duration.
 */
export function motionVars(vars: {
  delay?: number;
  phoneDelay?: number;
  floatDuration?: number;
}): CSSProperties {
  return {
    ...(vars.delay !== undefined && { "--delay": `${vars.delay}s` }),
    ...(vars.phoneDelay !== undefined && { "--delay-phone": `${vars.phoneDelay}s` }),
    ...(vars.floatDuration !== undefined && { "--float-duration": `${vars.floatDuration}s` }),
  } as CSSProperties;
}
