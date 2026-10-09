import { cx } from "@/app/lib/cx";
import { pillars } from "@/app/lib/site-config";

import { PillarIconGlyph } from "../ui/icons";
import { DisplayHeading, SectionLabel } from "../ui/primitives";
import texture from "../ui/texture.module.css";
import styles from "./why-tefrix-section.module.css";

/**
 * White panel that sits directly under the hero. The black "Why TefriX?"
 * circle straddles the seam, so render it right after <HeroSection />.
 */
export function WhyTefrixSection() {
  return (
    <section id="about" className={styles.why}>
      <div aria-hidden="true" className={cx(texture.layer, styles.textures)}>
        <div className={styles.rings} />
        <div className={styles.dots} />
      </div>

      <div className={styles.circle}>
        <div className={styles.circleText}>
          Why
          <br />
          TefriX?
        </div>
      </div>

      <div className={styles.intro}>
        <SectionLabel index="01">Why TefriX</SectionLabel>
        <DisplayHeading size="section" className={styles.heading}>
          Building future-ready solutions
        </DisplayHeading>
        <p className={styles.lede}>
          At TefriX, we craft reliable, secure, and scalable software using cutting-edge
          technologies and battle-tested methodologies to power your digital transformation.
        </p>
      </div>

      <ul className={styles.grid}>
        {pillars.map((pillar, index) => (
          <li key={pillar.title} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span>
              <PillarIconGlyph icon={pillar.icon} />
            </div>
            <h3 className={styles.cardTitle}>{pillar.title}</h3>
            <p className={styles.cardText}>{pillar.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
