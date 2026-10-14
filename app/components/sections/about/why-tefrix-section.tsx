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

/**
 * Why TefriX. Phones get the shorter heading and line, a small orb beside
 * them, name-only pillar tiles and (unless `phoneQuote` is off, as on /about
 * where the full quote follows) the short quote card.
 */
export function WhyTefrixSection({
  headingLevel = "h2",
  phoneQuote = true,
}: {
  headingLevel?: HeadingLevel;
  phoneQuote?: boolean;
}) {
  const CardHeading = subheadingFor(headingLevel);

  return (
    <section id="about" className={styles.why}>
      <div className={styles.layout}>
        <Reveal className={styles.intro}>
          <div className={styles.introText}>
            <Eyebrow>Why TefriX</Eyebrow>
            <SectionHeading as={headingLevel}>
              <span className="desktop-only">Building future-ready solutions</span>
              <span className="phone-only">Built to last</span>
            </SectionHeading>
            <p className={styles.lede}>
              <span className="desktop-only">
                At TefriX, we craft reliable, secure, and scalable software using cutting-edge
                technologies and battle-tested methodologies to power your digital transformation.
              </span>
              <span className="phone-only">Reliable, secure, scalable.</span>
            </p>
          </div>
          <div aria-hidden="true" className={styles.orb}>
            <Image
              src={glassOrb}
              alt=""
              sizes="(max-width: 767px) 120px, 300px"
              className={cx(motion.float, styles.orbGlass)}
              style={motionVars({ floatDuration: 11 })}
            />
            <Image src={glassHero} alt="" sizes="(max-width: 767px) 64px, 170px" className={styles.orbInner} />
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

      {phoneQuote && (
        <Reveal className="phone-only">
          <figure className={styles.phoneQuote}>
            <blockquote className={styles.phoneQuoteText}>
              “Great software is built by the best team working together.”
            </blockquote>
            <figcaption className={styles.phoneQuoteCaption}>Our commitment</figcaption>
          </figure>
        </Reveal>
      )}
    </section>
  );
}
