import { cx } from "@/app/lib/cx";
import { stats } from "@/app/lib/site-config";

import { Accent, DisplayHeading, SectionLabel } from "../ui/primitives";
import texture from "../ui/texture.module.css";
import styles from "./milestones-section.module.css";

export function MilestonesSection() {
  return (
    <section className={styles.milestones}>
      <div className={cx(texture.grainDark, styles.panel)}>
        <div aria-hidden="true" className={cx(texture.layer, styles.grid)} />
        <div aria-hidden="true" className={cx(texture.layer, styles.rulerMinor)} />
        <div aria-hidden="true" className={cx(texture.layer, styles.rulerMajor)} />

        <div className={styles.header}>
          <div className={styles.headingColumn}>
            <SectionLabel index="03" tone="muted-dark">
              Our milestones
            </SectionLabel>
            <DisplayHeading className={styles.heading}>
              Consistent growth. <Accent tone="tint">Real dedication.</Accent>
            </DisplayHeading>
          </div>
          <p className={styles.lede}>
            Our metrics represent more than numbers — they stand for dedication, trust, and
            forward-thinking innovation.
          </p>
        </div>

        <ul className={styles.stats}>
          {stats.map((stat) => (
            <li
              key={stat.label}
              className={cx(styles.stat, stat.highlight && texture.grain)}
              data-highlight={stat.highlight || undefined}
            >
              {stat.highlight && (
                <div aria-hidden="true" className={cx(texture.layer, styles.diagonalLines)} />
              )}
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
