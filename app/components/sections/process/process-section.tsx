import { cx } from "@/app/lib/cx";
import { processSteps } from "@/app/lib/site-config";

import { Reveal } from "../../motion/reveal";
import { Eyebrow, SectionHeading } from "../../ui/primitives";
import styles from "./process-section.module.css";
import { ProcessTrack } from "./process-track";

const stepNumber = (index: number) => String(index + 1).padStart(2, "0");

/** Horizontal steps on a filling line (desktop); a vertical timeline (phones). */
export function ProcessSection() {
  return (
    <section id="process" className={styles.process}>
      <Reveal className={styles.header}>
        <Eyebrow>How we work</Eyebrow>
        <SectionHeading>
          <span className="desktop-only">A clear process from first call to launch</span>
          <span className="phone-only">Idea to launch in 4 steps</span>
        </SectionHeading>
        <p className={cx(styles.lede, "desktop-only")}>
          You always know what is happening, what comes next and what you will get.
        </p>
      </Reveal>

      <ProcessTrack
        className={cx(styles.steps, "desktop-only")}
        lineClassName={styles.line}
        fillClassName={styles.lineFill}
      >
        <ol className={styles.list}>
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.title}>
              <span className={styles.number}>{stepNumber(index)}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </ProcessTrack>

      <ProcessTrack
        className={cx(styles.timeline, "phone-only")}
        lineClassName={styles.timelineLine}
        fillClassName={styles.timelineFill}
      >
        <ol className={styles.timelineList}>
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.title} className={styles.timelineItem}>
              <span className={styles.timelineDot}>{stepNumber(index)}</span>
              <div>
                <h3 className={styles.timelineTitle}>{step.title}</h3>
                <p className={styles.timelineText}>{step.short}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </ProcessTrack>
    </section>
  );
}
