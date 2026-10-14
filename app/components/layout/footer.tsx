import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "@/app/lib/cx";
import {
  footerCompanyLinks,
  footerServiceLinks,
  phoneFooterLinks,
  siteConfig,
  socialLinks,
} from "@/app/lib/site-config";
import footerWordmark from "@/public/assets/footer-wordmark.webp";

import { Reveal } from "../motion/reveal";
import { Icon, type IconName } from "../ui/icons";
import { MonoLabel, buttonProps } from "../ui/primitives";
import { TefrixMark } from "../ui/tefrix-mark";
import { BackToTop } from "./back-to-top";
import styles from "./footer.module.css";
import { Wordmark } from "./wordmark";

/**
 * Desktop footer (≥ 768px): the rendered 3D "TefriX" stands on a reflective
 * floor (public/assets/footer-wordmark.webp, made by
 * design-assets/footer-wordmark), with the content on the floor below it.
 * Phones keep the compact footer from mobile-home.html.
 */
export function Footer() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();
  const contactItems: { icon: IconName; label: string; href?: string }[] = [
    { icon: "phone", label: contact.phone.label, href: contact.phone.href },
    { icon: "mail", label: contact.email.label, href: contact.email.href },
    { icon: "pin", label: contact.location },
    { icon: "globe", label: contact.website.label, href: contact.website.href },
  ];

  return (
    <footer data-site-footer>
      <div className={cx(styles.desktop, "desktop-only")}>
        <Reveal className={styles.stage}>
          <div aria-hidden="true">
            <Image
              src={footerWordmark}
              alt=""
              sizes="(max-width: 1600px) 100vw, 1600px"
              className={styles.stageImage}
            />
            {/* A slow light sweep, masked by the image so it only catches the lettering. */}
            <div className={styles.sheen}>
              <span className={styles.sheenBar} />
            </div>
          </div>
        </Reveal>
        <div aria-hidden="true" className={styles.scrim} />

        <div className={styles.inner}>
          <Reveal className={styles.grid}>
            <div className={styles.brandColumn}>
              <Link href="/#top" aria-label="TefriX Solutions home" className={styles.brand}>
                <TefrixMark pixels={0} width={44} height={37} />
                <Wordmark size={20} />
              </Link>
              <p className={styles.blurb}>
                Innovative solutions for a digital world. We help businesses thrive through
                technology.
              </p>
              <div className={styles.actions}>
                <Link href="/#contact" {...buttonProps("primary", "sm")}>
                  Book a free consultation
                  <Icon name="arrowRight" size={16} strokeWidth={2} />
                </Link>
                {socialLinks.map((link) => (
                  <a key={link.href} href={link.href} aria-label={link.label} className={styles.social}>
                    <Icon name={link.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            <FooterColumn title="Services">
              {footerServiceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Company">
              {footerCompanyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Contact">
              {contactItems.map((item) => {
                const content = (
                  <>
                    <span className={styles.contactIcon}>
                      <Icon name={item.icon} size={16} />
                    </span>
                    <span className={styles.contactLabel}>{item.label}</span>
                  </>
                );
                return (
                  <li key={item.icon}>
                    {item.href ? (
                      <a href={item.href} className={cx(styles.contactItem, styles.contactLink)}>
                        {content}
                      </a>
                    ) : (
                      <span className={styles.contactItem}>{content}</span>
                    )}
                  </li>
                );
              })}
            </FooterColumn>
          </Reveal>

          <div className={styles.bottom}>
            <span>© {year} TefriX Solutions. All rights reserved.</span>
            <span className={styles.tagline}>Empower your cyber world</span>
            <BackToTop />
          </div>
        </div>
      </div>

      <div className={cx(styles.phone, "phone-only")}>
        <div className={styles.phoneTop}>
          <span className={styles.phoneBrand}>
            <TefrixMark pixels={0} width={30} height={25} />
            <Wordmark size={16} />
          </span>
          <div className={styles.phoneSocials}>
            {socialLinks.map((link) => (
              <a key={link.href} href={link.href} aria-label={link.label} className={styles.phoneSocial}>
                <Icon name={link.icon} size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.phoneLinks}>
          <ul className={styles.phoneList}>
            {phoneFooterLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.phoneLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className={styles.phoneList}>
            <li>
              <a href={contact.phone.href} className={styles.phoneLink}>
                {contact.phone.label}
              </a>
            </li>
            <li>
              <a href={contact.email.href} className={styles.phoneLink}>
                Email us
              </a>
            </li>
            <li className={styles.phoneText}>{contact.location}</li>
          </ul>
        </div>

        <div aria-hidden="true" className={styles.phoneWordmark}>
          TefriX
        </div>
        <p className={styles.phoneCopyright}>© {year} TefriX Solutions</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.column}>
      <MonoLabel className={styles.columnTitle}>{title}</MonoLabel>
      <ul className={styles.list}>{children}</ul>
    </div>
  );
}
