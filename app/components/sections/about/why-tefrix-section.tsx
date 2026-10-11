import Image from "next/image";

import { cx } from "@/app/lib/cx";
import { pillars } from "@/app/lib/site-config";
import glassHero from "@/public/assets/glass-hero.webp";
import glassOrb from "@/public/assets/glass-orb.webp";

import motion from "../../motion/motion.module.css";
import { Reveal } from "../../motion/reveal";
import { motionVars } from "../../motion/style-vars";
import { Icon } from "../../ui/icons";
import {
  Eyebrow,
  SectionHeading,
  cardProps,
  subheadingFor,
  type HeadingLevel,
} from "../../ui/primitives";
import styles from "./why-tefrix-section.module.css";

export function WhyTefrixSection({ headingLevel = "h2" }: { headingLevel?: HeadingLevel }) {
  const CardHeading = subheadingFor(headingLevel);

  return (
    <section id="about" className={styles.why}>
      <div className={styles.layout}>
        <Reveal className={styles.intro}>
          <Eyebrow>Why TefriX</Eyebrow>
          <SectionHeading as={headingLevel}>Building future-ready solutions</SectionHeading>
          <p className={styles.lede}>
            At TefriX, we craft reliable, secure, and scalable software using cutting-edge
            technologies and battle-tested methodologies to power your digital transformation.
          </p>
          <div aria-hidden="true" className={styles.orb}>
            <Image
              src={glassOrb}
              alt=""
              sizes="300px"
              className={cx(motion.float, styles.orbGlass)}
              style={motionVars({ floatDuration: 11 })}
            />
            <Image src={glassHero} alt="" sizes="170px" className={styles.orbInner} />
          </div>
        </Reveal>

        <ul className={styles.grid}>
          {pillars.map((pillar) => (
            <Reveal as="li" key={pillar.title} className={styles.gridItem}>
              <div {...cardProps("flat", styles.card)}>
                <span className={styles.icon}>
                  <Icon name={pillar.icon} size={20} />
                </span>
                <CardHeading className={styles.cardTitle}>{pillar.title}</CardHeading>
                <p className={styles.cardText}>{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
