import { cx } from "@/app/lib/cx";
import { aboutHighlights, visionAndMission } from "@/app/lib/site-config";

import {
  Accent,
  DisplayHeading,
  SectionLabel,
  subheadingFor,
  type HeadingLevel,
} from "../ui/primitives";
import texture from "../ui/texture.module.css";
import styles from "./about-section.module.css";

export function AboutSection({ headingLevel = "h2" }: { headingLevel?: HeadingLevel }) {
  const CardHeading = subheadingFor(headingLevel);

  return (
    <section className={styles.about}>
      <div className={styles.intro}>
        <div className={styles.headingColumn}>
          <SectionLabel index="04">Who we are</SectionLabel>
          <DisplayHeading as={headingLevel} size="section">
            Passion meets <Accent>technology</Accent>
          </DisplayHeading>
        </div>
        <div className={styles.textColumn}>
          <p className={styles.lede}>
            We are a team of passionate individuals dedicated to making a difference in the world
            through our innovative solutions and community-driven initiatives.
          </p>
          <ul className={styles.chips}>
            {aboutHighlights.map((highlight) => (
              <li key={highlight} className={styles.chip}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <figure className={cx(texture.grain, styles.quote)}>
        <div aria-hidden="true" className={cx(texture.layer, styles.quoteLines)} />
        <span aria-hidden="true" className={cx(texture.layer, styles.quoteMark)}>
          ”
        </span>
        <blockquote className={styles.quoteText}>
          “Great software is not built by code alone, but by the passion, collaboration, and
          brilliance of the best team working together.”
        </blockquote>
        <figcaption className={styles.quoteCaption}>Our commitment</figcaption>
      </figure>

      <div className={styles.cards}>
        {visionAndMission.map((item) => (
          <div key={item.title} className={styles.card}>
            <Crosshair className={styles.crosshairTop} />
            <Crosshair className={styles.crosshairBottom} />
            <CardHeading className={styles.cardTitle}>{item.title}</CardHeading>
            <p className={styles.cardText}>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Decorative "+" registration mark on the vision and mission cards. */
function Crosshair({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" className={className}>
      <path d="M8 0v16M0 8h16" />
    </svg>
  );
}
