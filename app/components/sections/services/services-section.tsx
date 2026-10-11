import { services } from "@/app/lib/site-config";

import { Reveal } from "../../motion/reveal";
import { Icon } from "../../ui/icons";
import {
  Eyebrow,
  SectionHeading,
  cardProps,
  subheadingFor,
  type HeadingLevel,
} from "../../ui/primitives";
import styles from "./services-section.module.css";
import { TechStack } from "./tech-stack";

export function ServicesSection({ headingLevel = "h2" }: { headingLevel?: HeadingLevel }) {
  const CardHeading = subheadingFor(headingLevel);

  return (
    <section id="services" className={styles.services}>
      <Reveal className={styles.header}>
        <div className={styles.headingColumn}>
          <Eyebrow>Services</Eyebrow>
          <SectionHeading as={headingLevel}>Our comprehensive web solutions</SectionHeading>
        </div>
        <p className={styles.lede}>
          We empower your digital journey with cutting-edge web design, robust development, and
          strategic digital marketing — built to elevate your online presence.
        </p>
      </Reveal>

      <ul className={styles.grid}>
        {services.map((service) => (
          <Reveal as="li" key={service.title} className={styles.gridItem}>
            <article {...cardProps("gradient", styles.card)}>
              <span className={styles.icon}>
                <Icon name={service.icon} size={22} />
              </span>
              <CardHeading className={styles.cardTitle}>{service.title}</CardHeading>
              <p className={styles.cardText}>{service.description}</p>
              <ul className={styles.tags}>
                {service.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ul>

      <TechStack />
    </section>
  );
}
