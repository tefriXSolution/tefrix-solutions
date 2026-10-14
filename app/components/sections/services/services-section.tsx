import Link from "next/link";

import { cx } from "@/app/lib/cx";
import { services } from "@/app/lib/site-config";

import motion from "../../motion/motion.module.css";
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

const phoneTiles = [...services].sort((a, b) => a.phone.order - b.phone.order);

export function ServicesSection({ headingLevel = "h2" }: { headingLevel?: HeadingLevel }) {
  const CardHeading = subheadingFor(headingLevel);

  return (
    <section id="services" className={styles.services}>
      <Reveal className={styles.header}>
        <div className={styles.headingColumn}>
          <Eyebrow>Services</Eyebrow>
          <SectionHeading as={headingLevel}>
            <span className="desktop-only">Our comprehensive web solutions</span>
            <span className="phone-only">What we build</span>
          </SectionHeading>
        </div>
        <p className={cx(styles.lede, "desktop-only")}>
          We empower your digital journey with cutting-edge web design, robust development, and
          strategic digital marketing — built to elevate your online presence.
        </p>
      </Reveal>

      {/* Desktop: full cards. */}
      <ul className={cx(styles.grid, "desktop-only")}>
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

      {/* Phone: 2-column tiles, icon + short name, the whole tile tappable. */}
      <ul className={cx(styles.tiles, "phone-only")}>
        {phoneTiles.map((service) => (
          <Reveal as="li" key={service.title} className={styles.gridItem}>
            <Link href="/#contact" className={cx(styles.tile, motion.press)}>
              <span className={styles.tileIcon}>
                <Icon name={service.icon} size={20} />
              </span>
              <span className={styles.tileName}>{service.phone.label}</span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <TechStack />
    </section>
  );
}
