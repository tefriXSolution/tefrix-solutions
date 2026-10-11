"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cx } from "@/app/lib/cx";
import { isInViewport, observeOnce, prefersReducedMotion } from "@/app/lib/motion";

import styles from "./motion.module.css";

/**
 * Fades its content up 36px the first time ~15% of it scrolls into view.
 * Content that is already on screen when the page hydrates, and everything
 * under reduced motion, is left as is, so nothing flashes or hides.
 */
export function Reveal({
  as = "div",
  className,
  children,
}: {
  as?: "div" | "li";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion() || isInViewport(element)) return;

    element.dataset.reveal = "hidden";
    const stop = observeOnce(element, () => {
      element.dataset.reveal = "shown";
    });
    return () => {
      stop();
      delete element.dataset.reveal;
    };
  }, []);

  const Tag = as as "div";
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={cx(styles.reveal, className)}>
      {children}
    </Tag>
  );
}
