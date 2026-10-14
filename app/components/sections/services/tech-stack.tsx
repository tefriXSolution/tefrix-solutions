import { technologies } from "@/app/lib/site-config";

import { Reveal } from "../../motion/reveal";
import { MonoLabel } from "../../ui/primitives";
import styles from "./tech-stack.module.css";

/**
 * "Technologies we master" chips: a wrapped row on desktop, one swipeable
 * row on phones ("Our stack"). The row is focusable so it can be scrolled
 * from the keyboard when it overflows.
 */
export function TechStack() {
  return (
    <Reveal className={styles.stack}>
      <MonoLabel className={styles.label}>
        <span className="desktop-only">Technologies we master</span>
        <span className="phone-only">Our stack</span>
      </MonoLabel>
      <ul className={styles.chips} tabIndex={0} aria-label="Technologies we master">
        {technologies.map((technology) => (
          <li key={technology.name} className={styles.chip}>
            {technology.short ? (
              <>
                <span className="desktop-only">{technology.name}</span>
                <span className="phone-only">{technology.short}</span>
              </>
            ) : (
              technology.name
            )}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
