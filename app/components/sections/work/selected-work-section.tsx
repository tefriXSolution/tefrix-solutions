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
import { WorkCarousel } from "./work-carousel";

// Tile backgrounds and floating glass cycle through the design's three variants.
const TILE_VARIANTS: { glass: StaticImageData; floatDuration: number }[] = [
  { glass: glassRing, floatDuration: 11 },
  { glass: glassPill, floatDuration: 9 },
  { glass: glassTwist, floatDuration: 12 },
];

/** Case studies: a grid on desktop, a swipe row on phones. Hidden until `caseStudies` has entries. */
export function SelectedWorkSection() {
  if (caseStudies.length === 0) return null;

  return (
    <section id="work" className={styles.work}>
      <Reveal className={styles.header}>
        <div className={styles.headingColumn}>
          <Eyebrow>Selected work</Eyebrow>
          <SectionHeading>
            <span className="desktop-only">Products we have designed and built</span>
            <span className="phone-only">Recent projects</span>
          </SectionHeading>
        </div>
        <Link href="/#contact" {...buttonProps("ghost", "sm", cx(styles.discuss, "desktop-only"))}>
          Discuss your project
          <Icon name="arrowRight" size={16} strokeWidth={2} />
        </Link>
        <span aria-hidden="true" className={cx(styles.swipeHint, "phone-only")}>
          Swipe <span className={styles.swipeArrow}>→</span>
        </span>
      </Reveal>

      <ul className={cx(styles.grid, "desktop-only")}>
        {caseStudies.map((study, index) => (
          <Reveal as="li" key={`${study.name}-${index}`} className={styles.gridItem}>
            <CaseStudyCard study={study} variant={index % TILE_VARIANTS.length} />
          </Reveal>
        ))}
      </ul>

      <div className="phone-only">
        <WorkCarousel count={caseStudies.length}>
          {caseStudies.map((study, index) => (
            <li key={`${study.name}-${index}`} className={styles.swipeItem}>
              <PhoneCaseStudyCard study={study} variant={index % TILE_VARIANTS.length} />
            </li>
          ))}
        </WorkCarousel>
      </div>
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
                sizes="(max-width: 1100px) 45vw, 340px"
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

/** Phone card: 286px wide, shorter tile, name and "Industry · category". */
function PhoneCaseStudyCard({ study, variant }: { study: CaseStudy; variant: number }) {
  const { glass, floatDuration } = TILE_VARIANTS[variant];

  return (
    <Link href={study.href ?? "/#contact"} className={cx(styles.phoneCard, motion.press)}>
      <div className={styles.phoneTile} data-variant={variant}>
        <div className={styles.phoneFrame}>
          {study.screenshot ? (
            <Image
              src={study.screenshot}
              alt={`${study.name} screenshot`}
              fill
              sizes="230px"
              className={styles.screenshot}
            />
          ) : (
            "[Screenshot]"
          )}
        </div>
        <Image
          src={glass}
          alt=""
          sizes="130px"
          className={cx(motion.float, styles.phoneGlass)}
          style={motionVars({ floatDuration })}
        />
      </div>
      <div className={styles.phoneBody}>
        <h3 className={styles.phoneName}>{study.name}</h3>
        <p className={styles.phoneMeta}>
          {study.industry} · {study.shortCategory ?? study.category}
        </p>
      </div>
    </Link>
  );
}
