"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { isInViewport, observeOnce, prefersReducedMotion } from "@/app/lib/motion";

import styles from "./process-section.module.css";

/**
 * Wraps the process steps and draws the connector line, which fills left to
 * right (scaleX 0 → 1) once 30% of the steps are visible.
 */
export function ProcessTrack({ children }: { children: ReactNode }) {
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
    <div ref={trackRef} className={styles.steps}>
      <div aria-hidden="true" className={styles.line}>
        <div ref={fillRef} className={styles.lineFill} />
      </div>
      {children}
    </div>
  );
}
