"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { isInViewport, observeOnce, prefersReducedMotion } from "@/app/lib/motion";

/**
 * Wraps a list of process steps and draws its connector line, which fills
 * (scale 0 → 1, along whichever axis the CSS sets) once 30% of the steps are
 * visible. Used for the horizontal desktop line and the vertical phone one.
 */
export function ProcessTrack({
  className,
  lineClassName,
  fillClassName,
  children,
}: {
  className: string;
  lineClassName: string;
  fillClassName: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill || prefersReducedMotion() || isInViewport(track)) return;

    fill.dataset.fill = "empty";
    const stop = observeOnce(
      track,
      () => {
        fill.dataset.fill = "full";
      },
      0.3,
    );
    return () => {
      stop();
      delete fill.dataset.fill;
    };
  }, []);

  return (
    <div ref={trackRef} className={className}>
      <div aria-hidden="true" className={lineClassName}>
        <div ref={fillRef} className={fillClassName} />
      </div>
      {children}
    </div>
  );
}
