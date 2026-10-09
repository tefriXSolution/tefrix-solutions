import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "@/app/lib/cx";
import { navLinks, siteConfig, socialLinks } from "@/app/lib/site-config";

import texture from "../ui/texture.module.css";
import { TxMark } from "../ui/tx-mark";
import styles from "./footer.module.css";

export function Footer() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className={cx(texture.grainDark, styles.footer)}>
      <div aria-hidden="true" className={cx(texture.layer, styles.grid)} />

      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.about}>
            <div className={styles.brand}>
              <TxMark variant="dark" width={44} height={37} />
              <span className={styles.name}>
                Tefri<span className={styles.nameAccent}>X</span>
              </span>{" "}
              <span className={styles.tagline}>solutions</span>
            </div>
            <p className={styles.blurb}>
              Innovative solutions for a digital world. We help businesses thrive through
              technology.
            </p>
          </div>

          <div className={styles.columns}>
            <FooterColumn title="Quick links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Contact us">
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

            <FooterColumn title="Follow us">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div aria-hidden="true" className={styles.wordmark}>
          <div className={styles.wordmarkText}>TefriX</div>
          <div className={styles.scanlines} />
        </div>

        <div className={styles.bottom}>
          <span>© {year} TefriX Solutions. All rights reserved.</span>
          <span>— Empower your cyber world —</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.column}>
      <p className={styles.columnTitle}>{title}</p>
      <ul className={styles.list}>{children}</ul>
    </div>
  );
}
