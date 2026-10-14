import { cx } from "@/app/lib/cx";
import { values, visionAndMission } from "@/app/lib/site-config";

import motion from "../../motion/motion.module.css";
import { Reveal } from "../../motion/reveal";
import { Eyebrow, cardProps } from "../../ui/primitives";
import styles from "./about-section.module.css";

/**
 * "Who we are" quote, vision and mission, and the values strip. Follows
 * <WhyTefrixSection />. The phone homepage drops it (DESIGN_SPEC §13); /about
 * keeps it on phones with `showOnPhone`.
 */
export function AboutSection({ showOnPhone = false }: { showOnPhone?: boolean }) {
  return (
    <section aria-label="Who we are" className={cx(styles.about, !showOnPhone && "desktop-only")}>
      <div className={styles.grid}>
        <Reveal className={styles.quoteItem}>
          <figure className={styles.quote}>
            <div aria-hidden="true" className={cx(motion.drift, styles.quoteGlow)} />
            <Eyebrow tone="blush">Who we are</Eyebrow>
            <blockquote className={styles.quoteText}>
              “Great software is not built by code alone, but by the passion, collaboration, and
              brilliance of the best team working together.”
            </blockquote>
            <figcaption className={styles.quoteCaption}>
              We are a team of passionate individuals dedicated to making a difference through
              innovative solutions and community-driven initiatives.
            </figcaption>
          </figure>
        </Reveal>

        {visionAndMission.map((item) => (
          <Reveal key={item.title} className={styles.gridItem}>
            <div {...cardProps("flat", styles.card)}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className={styles.values}>
        <ul className={styles.valuesList}>
          {values.map((value, index) => (
            <li key={value.title} className={styles.value}>
              <div className={styles.valueLabel}>Value {String(index + 1).padStart(2, "0")}</div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueText}>{value.description}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
