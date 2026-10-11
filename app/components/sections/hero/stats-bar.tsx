import { stats } from "@/app/lib/site-config";

import { CountUp } from "../../motion/count-up";
import { Reveal } from "../../motion/reveal";
import styles from "./stats-bar.module.css";

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
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
