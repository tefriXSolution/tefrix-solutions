"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sticky <header> that publishes its height as --nav-height on <html>, which
 * globals.css uses as scroll-padding-top so in-page anchors land below the
 * nav. The desktop nav wraps on narrower windows and the phone top bar is a
 * different height, so it isn't constant.
 */
export function StickyHeader({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const root = document.documentElement;
    const observer = new ResizeObserver(([entry]) => {
      root.style.setProperty("--nav-height", `${Math.ceil(entry.borderBoxSize[0].blockSize)}px`);
    });
    observer.observe(header);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--nav-height");
    };
  }, []);

  return (
    <header ref={ref} className={className} data-site-header>
      {children}
    </header>
  );
}
