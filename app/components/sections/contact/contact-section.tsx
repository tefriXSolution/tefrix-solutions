import Image from "next/image";
import Link from "next/link";

import { cx } from "@/app/lib/cx";
import { quickContactLinks, siteConfig } from "@/app/lib/site-config";
import glassTwist from "@/public/assets/glass-twist.webp";

import motion from "../../motion/motion.module.css";
import { Reveal } from "../../motion/reveal";
import { motionVars } from "../../motion/style-vars";
import { Icon, type IconName } from "../../ui/icons";
import { Eyebrow, SectionHeading, buttonProps, type HeadingLevel } from "../../ui/primitives";
import { ContactForm } from "./contact-form";
import styles from "./contact-section.module.css";

/**
 * Contact: the panel with details and form (desktop), or a compact card that
 * links to the phone contact page plus WhatsApp / Call / Email (phones). The
 * /contact page turns the card off (`phoneCard={false}`), because on phones
 * it shows the standalone contact page instead.
 */
export function ContactSection({
  headingLevel = "h2",
  phoneCard = true,
}: {
  headingLevel?: HeadingLevel;
  phoneCard?: boolean;
}) {
  const { contact } = siteConfig;
  const details: { icon: IconName; value: string; href?: string }[] = [
    { icon: "phone", value: contact.phone.label, href: contact.phone.href },
    { icon: "mail", value: contact.email.label, href: contact.email.href },
    { icon: "pin", value: contact.location },
  ];

  return (
    <section id="contact" className={cx(styles.contact, !phoneCard && "desktop-only")}>
      <Reveal className={cx(styles.panel, "desktop-only")}>
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

      {phoneCard && (
        <Reveal className={cx(styles.card, "phone-only")}>
          <div aria-hidden="true" className={cx(motion.drift, styles.cardGlow)} />
          <Image
            src={glassTwist}
            alt=""
            sizes="120px"
            className={cx(motion.float, styles.cardGlass)}
            style={motionVars({ floatDuration: 12 })}
          />
          <h2 className={styles.cardTitle}>Ready to build with us?</h2>
          <p className={styles.cardLede}>The first consultation is free.</p>
          <Link href="/contact" {...buttonProps("primary", "md", styles.cardButton)}>
            Send us a message
            <Icon name="arrowRight" size={18} strokeWidth={2} />
          </Link>
          <ul className={styles.quick}>
            {quickContactLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={cx(styles.quickLink, motion.press)}>
                  <Icon name={link.icon} size={20} className={styles.quickIcon} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  );
}
