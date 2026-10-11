import type { CSSProperties } from "react";

/** Inline custom properties for the shared motion classes (--delay, --float-duration). */
export function motionVars(vars: { delay?: number; floatDuration?: number }): CSSProperties {
  return {
    ...(vars.delay !== undefined && { "--delay": `${vars.delay}s` }),
    ...(vars.floatDuration !== undefined && { "--float-duration": `${vars.floatDuration}s` }),
  } as CSSProperties;
}
