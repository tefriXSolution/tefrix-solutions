import { deployTerminal } from "@/app/lib/site-config";
import { cx } from "@/app/lib/cx";

import motion from "../../motion/motion.module.css";
import { motionVars } from "../../motion/style-vars";
import styles from "./deploy-terminal.module.css";

const FIRST_LINE_DELAY = 1.0;
const LINE_STAGGER = 0.4;

/** Illustration of a deploy pipeline (not a real log), shown as one image to assistive tech. */
export function DeployTerminal() {
  const { title, command, steps, status, ariaLabel } = deployTerminal;
  const lineDelay = (index: number) => motionVars({ delay: FIRST_LINE_DELAY + index * LINE_STAGGER });

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cx(motion.fadeUp, styles.terminal)}
      style={motionVars({ delay: 0.5 })}
    >
      <div className={styles.bar}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.title}>{title}</span>
      </div>
      <div aria-hidden="true" className={styles.body}>
        <div>
          <span className={styles.prompt}>$</span> {command}
        </div>
        {steps.map((step, index) => (
          <div key={step} className={styles.line} style={lineDelay(index)}>
            <span className={styles.check}>✓</span> {step}
          </div>
        ))}
        <div className={cx(styles.line, styles.status)} style={lineDelay(steps.length)}>
          <span className={cx(motion.pulse, styles.liveDot)} />
          <span className={styles.live}>{status}</span>
          <span className={styles.caret} />
        </div>
      </div>
    </div>
  );
}
