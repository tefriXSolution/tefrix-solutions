"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

import { cx } from "@/app/lib/cx";
import { navLinks, quickContactLinks } from "@/app/lib/site-config";
import glassOrb from "@/public/assets/glass-orb.webp";

import motion from "../motion/motion.module.css";
import { Icon } from "../ui/icons";
import { buttonProps } from "../ui/primitives";
import { TefrixMark } from "../ui/tefrix-mark";
import styles from "./mobile-menu.module.css";
import { Wordmark } from "./wordmark";

/**
 * Phone menu (DESIGN_SPEC §13, mobile-menu.html): the ☰ button and a
 * full-screen modal <dialog>. showModal() makes the rest of the page inert
 * (focus stays inside) and Esc closes it natively; on top of that the page
 * scroll is locked while it's open (html[data-menu-open] in globals.css, which
 * also hides the action bar) and focus returns to the ☰ button on close.
 */
export function MobileMenu() {
  const dialogId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      delete document.documentElement.dataset.menuOpen;
      setOpen(false);
      triggerRef.current?.focus({ preventScroll: true });
    };
    dialog.addEventListener("close", handleClose);

    // The menu only exists in the phone layout: close it if the window grows.
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleResize = (event: MediaQueryListEvent) => {
      if (event.matches && dialog.open) dialog.close();
    };
    desktop.addEventListener("change", handleResize);

    return () => {
      dialog.removeEventListener("close", handleClose);
      desktop.removeEventListener("change", handleResize);
      delete document.documentElement.dataset.menuOpen;
    };
  }, []);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.documentElement.dataset.menuOpen = "";
    setOpen(true);
    closeRef.current?.focus();
  };

  // Closing first releases the scroll lock, so link navigation can scroll to its section.
  const closeMenu = () => dialogRef.current?.close();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        className={cx(styles.iconButton, motion.press)}
        onClick={openMenu}
      >
        <Icon name="menu" size={20} strokeWidth={2} />
      </button>

      <dialog ref={dialogRef} id={dialogId} aria-label="Menu" className={styles.dialog}>
        <div aria-hidden="true" className={styles.glow} />
        <Image src={glassOrb} alt="" sizes="240px" className={cx(motion.float, styles.orb)} />

        <div className={styles.header}>
          <Link href="/#top" aria-label="TefriX Solutions home" className={styles.brand} onClick={closeMenu}>
            <TefrixMark pixels={0} width={34} height={28} />
            <Wordmark size={18} withSolutions={false} />
          </Link>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            className={cx(styles.iconButton, motion.press)}
            onClick={closeMenu}
          >
            <Icon name="close" size={20} strokeWidth={2} />
          </button>
        </div>

        <nav aria-label="Main" className={styles.nav}>
          <ul className={styles.links}>
            {navLinks.map((link, index) => (
              <li key={link.href} className={styles.item} style={{ "--index": index } as CSSProperties}>
                <Link href={link.phoneHref ?? link.href} className={styles.link} onClick={closeMenu}>
                  <span className={styles.linkText}>
                    <span aria-hidden="true" className={styles.number}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </span>
                  <span aria-hidden="true" className={styles.arrow}>
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          <Link href="/contact" {...buttonProps("primary", "md")} onClick={closeMenu}>
            Book a free consultation
          </Link>
          <ul className={styles.quick}>
            {quickContactLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={cx(styles.quickLink, motion.press)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.tagline}>Empower your cyber world</p>
        </div>
      </dialog>
    </>
  );
}
