import { cx } from "@/app/lib/cx";
import { siteConfig } from "@/app/lib/site-config";

import {
  DisplayHeading,
  SectionLabel,
  subheadingFor,
  type HeadingLevel,
} from "../ui/primitives";
import texture from "../ui/texture.module.css";
import { ContactForm } from "./contact-form";
import styles from "./contact-section.module.css";

type Pixel = { tone: "ink" | "white"; opacity?: number } | null;

// Decorative 5×4 pixel-square cluster in the card's top-right corner.
const PIXEL_CLUSTER: Pixel[] = [
  null, null, { tone: "ink" }, null, { tone: "white" },
  null, { tone: "white", opacity: 0.7 }, null, { tone: "ink", opacity: 0.6 }, null,
  { tone: "ink", opacity: 0.5 }, null, { tone: "white" }, null, null,
  null, null, null, null, { tone: "white", opacity: 0.5 },
];

export function ContactSection({ headingLevel = "h2" }: { headingLevel?: HeadingLevel }) {
  const { contact } = siteConfig;
  const details = [
    { value: contact.phone.label, href: contact.phone.href, tag: "Phone" },
    { value: contact.email.label, href: contact.email.href, tag: "Email" },
    { value: contact.location, tag: "Location" },
  ];

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.layout}>
        <div className={cx(texture.grain, styles.card)}>
          <div aria-hidden="true" className={cx(texture.layer, styles.grid)} />
          <div aria-hidden="true" className={cx(texture.layer, texture.hideSm, styles.pixels)}>
            {PIXEL_CLUSTER.map((pixel, index) => (
              <span
                key={index}
                data-tone={pixel?.tone}
                style={pixel?.opacity ? { opacity: pixel.opacity } : undefined}
              />
            ))}
          </div>

          <div>
            <SectionLabel index="06" tone="on-cherry">
              Contact us
            </SectionLabel>
            <DisplayHeading as={headingLevel} className={styles.heading}>
              Ready to build with us?
            </DisplayHeading>
            <p className={styles.lede}>
              We&apos;d love to hear about your idea, product, or challenge. Let&apos;s build
              something powerful together.
            </p>
          </div>

          <div className={styles.details}>
            {details.map((detail) =>
              detail.href ? (
                <a key={detail.tag} href={detail.href} className={styles.detail}>
                  {detail.value}
                  <span className={styles.detailTag}>{detail.tag}</span>
                </a>
              ) : (
                <span key={detail.tag} className={styles.detail}>
                  {detail.value}
                  <span className={styles.detailTag}>{detail.tag}</span>
                </span>
              ),
            )}
          </div>
        </div>

        <ContactForm titleAs={subheadingFor(headingLevel)} />
      </div>
    </section>
  );
}
