"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import styles from "./selected-work-section.module.css";

/**
 * Phone case-study row: horizontally swiping cards (scroll-snap, the next card
 * peeks in) with page dots that follow the card closest to the start edge.
 */
export function WorkCarousel({ count, children }: { count: number; children: ReactNode }) {
  const rowRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = [...row.children] as HTMLElement[];
      const start = row.scrollLeft + cards[0].offsetLeft;
      const distances = cards.map((card) => Math.abs(card.offsetLeft - start));
      setActive(distances.indexOf(Math.min(...distances)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      row.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <ul ref={rowRef} className={styles.swipe}>
        {children}
      </ul>
      <div aria-hidden="true" className={styles.dots}>
        {Array.from({ length: count }, (_, index) => (
          <span key={index} className={styles.pageDot} data-active={index === active || undefined} />
        ))}
      </div>
    </>
  );
}
