import Link from "next/link";
import type { ReactNode } from "react";

import {
  footerCompanyLinks,
  footerServiceLinks,
  siteConfig,
  socialLinks,
} from "@/app/lib/site-config";

import { Icon } from "../ui/icons";
import { MonoLabel } from "../ui/primitives";
import { TefrixMark } from "../ui/tefrix-mark";
import styles from "./footer.module.css";
import { Wordmark } from "./wordmark";

export function Footer() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.about}>
            <div className={styles.brand}>
              <TefrixMark pixels={false} width={40} height={33} />
              <Wordmark />
            </div>
            <p className={styles.blurb}>
              Innovative solutions for a digital world. We help businesses thrive through
              technology.
            </p>
            <div className={styles.socials}>
              {socialLinks.map((link) => (
                <a key={link.href} href={link.href} aria-label={link.label} className={styles.social}>
                  <Icon name={link.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.columns}>
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
              <li>
                <a href={contact.phone.href} className={styles.link}>
                  {contact.phone.label}
                </a>
              </li>
              <li>
                <a href={contact.email.href} className={styles.link}>
                  {contact.email.label}
                </a>
              </li>
              <li className={styles.text}>{contact.location}</li>
              <li>
                <a href={contact.website.href} className={styles.link}>
                  {contact.website.label}
                </a>
              </li>
            </FooterColumn>
          </div>
        </div>

        <div aria-hidden="true" className={styles.wordmark}>
          <div className={styles.wordmarkText}>TefriX</div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} TefriX Solutions. All rights reserved.</span>
          <span>Empower your cyber world</span>
        </div>
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
