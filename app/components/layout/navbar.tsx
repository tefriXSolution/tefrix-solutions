import Link from "next/link";

import { cx } from "@/app/lib/cx";
import { navLinks } from "@/app/lib/site-config";

import { buttonProps } from "../ui/primitives";
import { TefrixMark } from "../ui/tefrix-mark";
import { MobileMenu } from "./mobile-menu";
import styles from "./navbar.module.css";
import { StickyHeader } from "./sticky-header";
import { Wordmark } from "./wordmark";

/** Desktop nav (≥ 768px) and the phone top bar with its menu (< 768px). */
export function Navbar() {
  return (
    <StickyHeader className={styles.header}>
      <nav aria-label="Main" className={cx(styles.nav, "desktop-only")}>
        <Link href="/#top" aria-label="TefriX Solutions home" className={styles.brand}>
          <TefrixMark width={40} height={33} />
          <Wordmark />
        </Link>

        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.link}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/#contact" {...buttonProps("primary", "sm")}>
          Book a free consultation
        </Link>
      </nav>

      <div className={cx(styles.phoneBar, "phone-only")}>
        <Link href="/#top" aria-label="TefriX Solutions home" className={styles.phoneBrand}>
          <TefrixMark pixels={3} width={34} height={28} />
          <Wordmark size={18} withSolutions={false} />
        </Link>
        <MobileMenu />
      </div>
    </StickyHeader>
  );
}
