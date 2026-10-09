import Link from "next/link";

import { navLinks } from "@/app/lib/site-config";

import { ArrowUpRightIcon } from "../ui/icons";
import { pillButton } from "../ui/primitives";
import { TxMark } from "../ui/tx-mark";
import styles from "./navbar.module.css";
import { StickyHeader } from "./sticky-header";

export function Navbar() {
  return (
    <StickyHeader className={styles.header}>
      <nav aria-label="Main" className={styles.nav}>
        <Link href="/#top" aria-label="TefriX Solutions home" className={styles.brand}>
          <TxMark variant="light" width={44} height={37} />
          <span className={styles.wordmark}>
            <span className={styles.name}>
              Tefri<span className={styles.nameAccent}>X</span>
            </span>{" "}
            <span className={styles.tagline}>solutions</span>
          </span>
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

        <Link href="/#contact" {...pillButton("ink", "sm")}>
          Get a free consultation
          <ArrowUpRightIcon size={17} />
        </Link>
      </nav>
    </StickyHeader>
  );
}
