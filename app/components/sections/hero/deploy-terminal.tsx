import { cx } from "@/app/lib/cx";
import { deployTerminal } from "@/app/lib/site-config";

import motion from "../../motion/motion.module.css";
import { motionVars } from "../../motion/style-vars";
import styles from "./deploy-terminal.module.css";

const FIRST_LINE_DELAY = 1.0;
const LINE_STAGGER = 0.4;

/**
 * Illustration of a deploy pipeline (not a real log), shown as one image to
 * assistive tech: the full terminal on desktop, a compact three-line card on
 * phones.
 */
export function DeployTerminal() {
  const { title, command, steps, status, ariaLabel, phone } = deployTerminal;
  const lineDelay = (index: number) => motionVars({ delay: FIRST_LINE_DELAY + index * LINE_STAGGER });

  return (
    <>
      <div
        role="img"
        aria-label={ariaLabel}
        className={cx(motion.fadeUp, styles.terminal, "desktop-only")}
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

      <div role="img" aria-label={phone.ariaLabel} className={cx(styles.compact, "phone-only")}>
        <div>
          <span className={styles.prompt}>$</span> {phone.command}
        </div>
        <div>
          {phone.checks.map((check, index) => (
            <span key={check}>
              {index > 0 && " "}
              <span className={styles.check}>✓</span> {check}
            </span>
          ))}
        </div>
        <div className={styles.compactStatus}>
          <span className={cx(motion.pulse, styles.compactDot)} />
          <span className={styles.live}>{status}</span>
        </div>
      </div>
    </>
  );
}
