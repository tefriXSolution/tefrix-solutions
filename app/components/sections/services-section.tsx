import Link from "next/link";

import { cx } from "@/app/lib/cx";
import { services, technologies } from "@/app/lib/site-config";

import { ArrowUpRightIcon } from "../ui/icons";
import {
  Accent,
  DisplayHeading,
  SectionLabel,
  subheadingFor,
  type HeadingLevel,
} from "../ui/primitives";
import texture from "../ui/texture.module.css";
import styles from "./services-section.module.css";

export function ServicesSection({ headingLevel = "h2" }: { headingLevel?: HeadingLevel }) {
  const CardHeading = subheadingFor(headingLevel);

  return (
    <section id="services" className={styles.services}>
      <div aria-hidden="true" className={cx(texture.layer, styles.dots)} />

      <div className={styles.header}>
        <div className={styles.headingColumn}>
          <SectionLabel index="02">Services</SectionLabel>
          <DisplayHeading as={headingLevel} size="section">
            Our comprehensive <Accent>web solutions</Accent>
          </DisplayHeading>
        </div>
        <p className={styles.lede}>
          We empower your digital journey with cutting-edge web design, robust development, and
          strategic digital marketing.
        </p>
      </div>

      <ul className={styles.grid}>
        {services.map((service, index) => (
          <li key={service.title} className={styles.gridItem}>
            <Link
              href="/#contact"
              className={cx(styles.card, service.featured && texture.grainDark)}
              data-featured={service.featured || undefined}
            >
              {service.featured && (
                <span aria-hidden="true" className={cx(texture.layer, styles.featuredGrid)} />
              )}
              <div className={styles.cardTop}>
                <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.cardIcon}>
                  <ArrowUpRightIcon size={20} />
                </span>
              </div>
              <div>
                <CardHeading className={styles.cardTitle}>{service.title}</CardHeading>
                <p className={styles.cardText}>{service.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.stack}>
        <span className={styles.stackLabel}>Technologies we master</span>
        <ul className={styles.pills}>
          {technologies.map((technology) => (
            <li key={technology} className={styles.pill}>
              {technology}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
