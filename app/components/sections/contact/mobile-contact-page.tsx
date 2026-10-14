import Image from "next/image";
import Link from "next/link";

import { cx } from "@/app/lib/cx";
import { quickContactLinks } from "@/app/lib/site-config";
import glassRing from "@/public/assets/glass-ring.webp";

import motion from "../../motion/motion.module.css";
import { Icon } from "../../ui/icons";
import { ContactForm } from "./contact-form";
import styles from "./mobile-contact-page.module.css";

/**
 * The phone contact page (DESIGN_SPEC §13, mobile-contact.html): /contact
 * below 768px. `data-standalone-phone` tells the layout to hide the site top
 * bar, footer and action bar while it is shown.
 */
export function MobileContactPage() {
  return (
    <div className={cx(styles.page, "phone-only")} data-standalone-phone>
      <div aria-hidden="true" className={styles.glow} />
      <Image src={glassRing} alt="" sizes="130px" className={cx(motion.float, styles.ring)} />

      <header className={styles.header}>
        <Link href="/" aria-label="Back to home" className={cx(styles.back, motion.press)}>
          <Icon name="arrowLeft" size={20} strokeWidth={2} />
        </Link>
        <span className={styles.eyebrow}>Contact</span>
      </header>

      <div className={styles.intro}>
        <h1 className={styles.title}>Tell us about your project</h1>
        <p className={styles.lede}>Free consultation. Quick reply.</p>
        <ul className={styles.chips}>
          {quickContactLinks.map((link) => (
            <li key={link.label} className={styles.chipItem}>
              <a href={link.href} className={cx(styles.chip, motion.press)}>
                <Icon name={link.icon} size={16} className={styles.chipIcon} />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <ContactForm variant="page" />
    </div>
  );
}
