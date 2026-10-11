import { technologies } from "@/app/lib/site-config";

import { Reveal } from "../../motion/reveal";
import { MonoLabel } from "../../ui/primitives";
import styles from "./tech-stack.module.css";

/** "Technologies we master" row of mono chips. */
export function TechStack() {
  return (
    <Reveal className={styles.stack}>
      <MonoLabel>Technologies we master</MonoLabel>
      <ul className={styles.chips}>
        {technologies.map((technology) => (
          <li key={technology} className={styles.chip}>
            {technology}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
