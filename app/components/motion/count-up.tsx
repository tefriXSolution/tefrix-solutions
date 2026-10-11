"use client";

import { useEffect, useRef } from "react";

import { isInViewport, observeOnce, prefersReducedMotion } from "@/app/lib/motion";

/**
 * Counts from 0 to `value` (~1.2s, ease-out) the first time it scrolls into
 * view. The real number is always in the markup for screen readers and
 * no-JS visitors; under reduced motion it never animates.
 */
export function CountUp({ value, duration = 1200 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const text = ref.current?.firstChild;
    if (!ref.current || !text || prefersReducedMotion() || isInViewport(ref.current)) return;

    let frame = 0;
    text.nodeValue = "0";
    const stop = observeOnce(ref.current, () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        text.nodeValue = String(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });

    return () => {
      stop();
      cancelAnimationFrame(frame);
      text.nodeValue = String(value);
    };
  }, [value, duration]);

  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
    </>
  );
}
