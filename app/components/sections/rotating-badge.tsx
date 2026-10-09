import { cx } from "@/app/lib/cx";

import { TxMarkShapes } from "../ui/tx-mark";
import styles from "./rotating-badge.module.css";

const RING_PATH_ID = "tx-badge-ring";

/**
 * Decorative badge: "EMPOWER YOUR CYBER WORLD • TEFRIX •" on a circle that
 * rotates every 22s (stopped under prefers-reduced-motion), around a white
 * disc with the TX mark.
 */
export function RotatingBadge({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cx(styles.badge, className)}>
      <svg className={cx(styles.layer, styles.spin)} viewBox="0 0 132 132" width="132" height="132">
        <defs>
          <path id={RING_PATH_ID} d="M66 66 m-52 0 a52 52 0 1 1 104 0 a52 52 0 1 1 -104 0" />
        </defs>
        <text className={styles.ringText}>
          <textPath href={`#${RING_PATH_ID}`} textLength="322" lengthAdjust="spacing">
            EMPOWER YOUR CYBER WORLD • TEFRIX •{" "}
          </textPath>
        </text>
      </svg>
      <svg className={styles.layer} viewBox="0 0 132 132" width="132" height="132">
        <circle className={styles.ring} cx="66" cy="66" r="40" />
        <circle className={styles.disc} cx="66" cy="66" r="32" />
        <g transform="translate(46 50) scale(0.34)">
          <TxMarkShapes variant="badge" />
        </g>
      </svg>
    </div>
  );
}
