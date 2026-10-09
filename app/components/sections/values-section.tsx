import { cx } from "@/app/lib/cx";
import { uniqueTraits, values } from "@/app/lib/site-config";

import { Accent, DisplayHeading, SectionLabel } from "../ui/primitives";
import texture from "../ui/texture.module.css";
import styles from "./values-section.module.css";

export function ValuesSection() {
  return (
    <section className={styles.values}>
      <div className={styles.layout}>
        <div className={styles.headingColumn}>
          <SectionLabel index="05">Our values</SectionLabel>
          <DisplayHeading className={styles.heading}>
            What guides <Accent>us</Accent>
          </DisplayHeading>
        </div>
        <ul className={styles.list}>
          {values.map((value) => (
            <li key={value.title} className={styles.item}>
              <h3 className={styles.itemTitle}>{value.title}</h3>
              <p className={styles.itemText}>{value.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <ul className={styles.unique}>
        {uniqueTraits.map((trait, index) => (
          <li key={trait.title} className={styles.uniqueCard}>
            <div aria-hidden="true" className={cx(texture.layer, styles.halftone)} />
            <div className={styles.uniqueLabel}>
              What makes us unique · {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className={styles.uniqueTitle}>{trait.title}</h3>
            <p className={styles.itemText}>{trait.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
