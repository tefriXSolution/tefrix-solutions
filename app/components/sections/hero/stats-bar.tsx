import { stats } from "@/app/lib/site-config";

import { CountUp } from "../../motion/count-up";
import { Reveal } from "../../motion/reveal";
import styles from "./stats-bar.module.css";

/** Four stats in a row on desktop, a 2×2 card with shorter labels on phones. */
export function StatsBar() {
  return (
    <div className={styles.wrap}>
      <Reveal className={styles.bar}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <div className={styles.value} data-highlight={stat.highlight || undefined}>
              <CountUp value={stat.value} />
              {stat.suffix}
            </div>
            <div className={styles.label}>
              <span className="desktop-only">{stat.label}</span>
              <span className="phone-only">{stat.shortLabel}</span>
            </div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
