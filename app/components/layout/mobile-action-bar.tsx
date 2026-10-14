"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cx } from "@/app/lib/cx";
import { siteConfig } from "@/app/lib/site-config";

import motion from "../motion/motion.module.css";
import { Icon } from "../ui/icons";
import styles from "./mobile-action-bar.module.css";

/**
 * Pinned phone action bar (DESIGN_SPEC §13). Hidden on the first screen: it
 * slides up once the hero buttons ([data-hero-cta]) have scrolled above the
 * viewport, so it can never cover them; pages without a hero use a marker one
 * screen down instead. It hides again while the footer is visible; CSS also
 * hides it while the menu is open and on the phone contact page.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const markerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trigger = document.querySelector("[data-hero-cta]") ?? markerRef.current;
    const footer = document.querySelector("[data-site-footer]");
    if (!trigger) return;

    let triggerPassed = false;
    let footerVisible = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === trigger) {
          triggerPassed = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
        } else {
          footerVisible = entry.isIntersecting;
        }
      }
      setVisible(triggerPassed && !footerVisible);
    });
    observer.observe(trigger);
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <div ref={markerRef} aria-hidden="true" className={styles.marker} />
      <div className={cx(styles.bar, "phone-only")} data-visible={visible || undefined} data-action-bar>
        <Link href="/contact" className={cx(styles.primary, motion.press)}>
          Free consultation
        </Link>
        <a
          href={siteConfig.contact.whatsappHref}
          aria-label="Chat on WhatsApp"
          className={cx(styles.whatsapp, motion.press)}
        >
          <Icon name="chat" size={22} />
        </a>
      </div>
    </>
  );
}
