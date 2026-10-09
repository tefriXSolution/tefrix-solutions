import Link from "next/link";

import { cx } from "@/app/lib/cx";

import { ArrowRightLongIcon } from "../ui/icons";
import { pillButton } from "../ui/primitives";
import texture from "../ui/texture.module.css";
import { TxMarkShapes } from "../ui/tx-mark";
import styles from "./hero-section.module.css";
import { RotatingBadge } from "./rotating-badge";

export function HeroSection() {
  return (
    <section className={cx(texture.grain, styles.hero)}>
      <div aria-hidden="true" className={cx(texture.layer, styles.grid)} />
      <svg aria-hidden="true" viewBox="0 0 120 100" className={cx(texture.layer, styles.outlineMark)}>
        <TxMarkShapes variant="outline" />
      </svg>
      <RotatingBadge className={texture.hideSm} />
      <div aria-hidden="true" className={cx(texture.layer, texture.hideSm, styles.coordinates)}>
        6.9271° N
        <br />
        79.8612° E
      </div>

      <div className={styles.topRow}>
        <span className={styles.kicker}>Leading digital innovation</span>
        <span aria-hidden="true" className={styles.serial}>
          <span className={styles.serialSmall}>
            Te
            <br />
            Fx
          </span>
          <span className={styles.serialNumber}>01</span>
        </span>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Empowering your vision with scalable &amp; secure software</h1>
        <p className={styles.lede}>
          We are TefriX Solutions — your trusted partner for modern, enterprise-grade digital
          products.
        </p>
        <div className={styles.actions}>
          <Link href="/#services" {...pillButton("white", "md")}>
            Explore services
            <ArrowRightLongIcon />
          </Link>
          <Link href="/#contact" {...pillButton("outline-light", "md")}>
            Free consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
