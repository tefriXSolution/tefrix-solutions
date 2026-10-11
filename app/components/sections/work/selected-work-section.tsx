import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { cx } from "@/app/lib/cx";
import { caseStudies, type CaseStudy } from "@/app/lib/site-config";
import glassPill from "@/public/assets/glass-pill.webp";
import glassRing from "@/public/assets/glass-ring.webp";
import glassTwist from "@/public/assets/glass-twist.webp";

import motion from "../../motion/motion.module.css";
import { Reveal } from "../../motion/reveal";
import { motionVars } from "../../motion/style-vars";
import { Icon } from "../../ui/icons";
import { Eyebrow, SectionHeading, buttonProps, cardProps } from "../../ui/primitives";
import styles from "./selected-work-section.module.css";

// Tile backgrounds and floating glass cycle through the design's three variants.
const TILE_VARIANTS: { glass: StaticImageData; floatDuration: number }[] = [
  { glass: glassRing, floatDuration: 11 },
  { glass: glassPill, floatDuration: 9 },
  { glass: glassTwist, floatDuration: 12 },
];

/** Case studies. Hidden until `caseStudies` has entries. */
export function SelectedWorkSection() {
  if (caseStudies.length === 0) return null;

  return (
    <section id="work" className={styles.work}>
      <Reveal className={styles.header}>
        <div className={styles.headingColumn}>
          <Eyebrow>Selected work</Eyebrow>
          <SectionHeading>Products we have designed and built</SectionHeading>
        </div>
        <Link href="/#contact" {...buttonProps("ghost", "sm", styles.discuss)}>
          Discuss your project
          <Icon name="arrowRight" size={16} strokeWidth={2} />
        </Link>
      </Reveal>

      <ul className={styles.grid}>
        {caseStudies.map((study, index) => (
          <Reveal as="li" key={`${study.name}-${index}`} className={styles.gridItem}>
            <CaseStudyCard study={study} variant={index % TILE_VARIANTS.length} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function CaseStudyCard({ study, variant }: { study: CaseStudy; variant: number }) {
  const { glass, floatDuration } = TILE_VARIANTS[variant];

  return (
    <Link href={study.href ?? "/#contact"} {...cardProps("none", styles.card)}>
      <div className={styles.tile} data-variant={variant}>
        <div className={styles.frame}>
          <div className={styles.frameBar}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.frameBody} data-shot={study.screenshot ? true : undefined}>
            {study.screenshot ? (
              <Image
                src={study.screenshot}
                alt={`${study.name} screenshot`}
                fill
                sizes="(max-width: 760px) 84vw, 340px"
                className={styles.screenshot}
              />
            ) : (
              "[Project screenshot]"
            )}
          </div>
        </div>
        <Image
          src={glass}
          alt=""
          sizes="160px"
          className={cx(motion.float, styles.glass)}
          style={motionVars({ floatDuration })}
        />
      </div>
      <div className={styles.body}>
        <ul className={styles.tags}>
          <li className={styles.tag}>{study.industry}</li>
          <li className={styles.tag}>{study.category}</li>
        </ul>
        <h3 className={styles.name}>{study.name}</h3>
        <p className={styles.result}>{study.result}</p>
        <span className={styles.cta}>
          View case study{" "}
          <span aria-hidden="true" className={styles.arrow}>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
