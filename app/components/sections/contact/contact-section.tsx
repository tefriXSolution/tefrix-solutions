import { cx } from "@/app/lib/cx";
import { siteConfig } from "@/app/lib/site-config";

import motion from "../../motion/motion.module.css";
import { Reveal } from "../../motion/reveal";
import { Icon, type IconName } from "../../ui/icons";
import { Eyebrow, SectionHeading, type HeadingLevel } from "../../ui/primitives";
import { ContactForm } from "./contact-form";
import styles from "./contact-section.module.css";

export function ContactSection({ headingLevel = "h2" }: { headingLevel?: HeadingLevel }) {
  const { contact } = siteConfig;
  const details: { icon: IconName; value: string; href?: string }[] = [
    { icon: "phone", value: contact.phone.label, href: contact.phone.href },
    { icon: "mail", value: contact.email.label, href: contact.email.href },
    { icon: "pin", value: contact.location },
  ];

  return (
    <section id="contact" className={styles.contact}>
      <Reveal className={styles.panel}>
        <div aria-hidden="true" className={cx(motion.drift, styles.glow)} />

        <div className={styles.intro}>
          <div>
            <Eyebrow tone="blush">Contact us</Eyebrow>
            <SectionHeading as={headingLevel} size="contact">
              Ready to build with us?
            </SectionHeading>
            <p className={styles.lede}>
              Tell us about your idea, product, or challenge. The first consultation is free.
            </p>
          </div>

          <ul className={styles.details}>
            {details.map((detail) => {
              const content = (
                <>
                  <span className={styles.detailIcon}>
                    <Icon name={detail.icon} size={18} />
                  </span>
                  {detail.value}
                </>
              );
              return (
                <li key={detail.icon}>
                  {detail.href ? (
                    <a href={detail.href} className={styles.detail}>
                      {content}
                    </a>
                  ) : (
                    <span className={styles.detail}>{content}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <ContactForm />
      </Reveal>
    </section>
  );
}
