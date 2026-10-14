"use client";

import { prefersReducedMotion } from "@/app/lib/motion";

import { Icon } from "../ui/icons";
import styles from "./footer.module.css";

/** Footer "Back to top" button: scrolls to the top (smoothly unless reduced motion is on). */
export function BackToTop() {
  return (
    <button
      type="button"
      className={styles.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
    >
      Back to top
      <Icon name="arrowUp" size={16} strokeWidth={2} />
    </button>
  );
}
