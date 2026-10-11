import Link from "next/link";

import { navLinks } from "@/app/lib/site-config";

import { buttonProps } from "../ui/primitives";
import { TefrixMark } from "../ui/tefrix-mark";
import { Wordmark } from "./wordmark";
import styles from "./navbar.module.css";
import { StickyHeader } from "./sticky-header";

export function Navbar() {
  return (
    <StickyHeader className={styles.header}>
      <nav aria-label="Main" className={styles.nav}>
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
    </StickyHeader>
  );
}
