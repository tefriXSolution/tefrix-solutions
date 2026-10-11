import { processSteps } from "@/app/lib/site-config";

import { Reveal } from "../../motion/reveal";
import { Eyebrow, SectionHeading } from "../../ui/primitives";
import styles from "./process-section.module.css";
import { ProcessTrack } from "./process-track";

export function ProcessSection() {
  return (
    <section id="process" className={styles.process}>
      <Reveal className={styles.header}>
        <Eyebrow>How we work</Eyebrow>
        <SectionHeading>A clear process from first call to launch</SectionHeading>
        <p className={styles.lede}>
          You always know what is happening, what comes next and what you will get.
        </p>
      </Reveal>

      <ProcessTrack>
        <ol className={styles.list}>
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.title}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </ProcessTrack>
    </section>
  );
}
