import Link from "next/link";

import { cx } from "@/app/lib/cx";
import { heroProofPoints } from "@/app/lib/site-config";

import motion from "../../motion/motion.module.css";
import { motionVars } from "../../motion/style-vars";
import { Icon } from "../../ui/icons";
import { buttonProps } from "../../ui/primitives";
import { ClientLogos } from "./client-logos";
import { DeployTerminal } from "./deploy-terminal";
import styles from "./hero-section.module.css";
import { HeroVisual } from "./hero-visual";
import { StatsBar } from "./stats-bar";

/**
 * Hero plus the stats bar and client logos, which share its glow and grid.
 * On phones the copy column dissolves (display: contents) so the glass can
 * sit between the paragraph and the buttons, with the §13 copy and stagger.
 */
export function HeroSection() {
  return (
    <section id="top" className={styles.hero}>
      <div aria-hidden="true" className={cx(motion.drift, styles.glow)} />
      <div aria-hidden="true" className={styles.grid} />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={cx(motion.fadeUp, styles.badge)}>
            <span className={cx(motion.pulse, styles.dot)} />
            <span className="desktop-only">Software engineering studio · Colombo, Sri Lanka</span>
            <span className="phone-only">Software studio · Colombo</span>
          </div>
          <h1 className={cx(motion.fadeUp, styles.title)} style={motionVars({ delay: 0.08 })}>
            Empowering your vision with <span className={styles.highlight}>scalable &amp; secure</span>{" "}
            software
            {/* Zero-size marker on the last line's baseline; HeroVisual aligns the deploy window to it. */}
            <span aria-hidden="true" data-hero-title-end className={styles.titleEnd} />
          </h1>
          <p className={cx(motion.fadeUp, styles.lede)} style={motionVars({ delay: 0.18, phoneDelay: 0.16 })}>
            <span className="desktop-only">
              We are TefriX Solutions — your trusted partner for modern, enterprise-grade digital
              products. From custom web development and UI/UX design to e-commerce and digital
              marketing, we take you from idea to launch and beyond.
            </span>
            <span className="phone-only">Web, design, e-commerce and marketing — from idea to launch.</span>
          </p>
          {/* data-hero-cta: the phone action bar appears once these buttons scroll away. */}
          <div
            data-hero-cta
            className={cx(motion.fadeUp, styles.actions)}
            style={motionVars({ delay: 0.28, phoneDelay: 0.32 })}
          >
            <Link href="/#contact" {...buttonProps("primary", "md", "desktop-only")}>
              Book a free consultation
              <Icon name="arrowRight" size={18} strokeWidth={2} />
            </Link>
            <Link href="/contact" {...buttonProps("primary", "md", "phone-only")}>
              Book a free consultation
              <Icon name="arrowRight" size={18} strokeWidth={2} />
            </Link>
            <Link href="/#services" {...buttonProps("ghost", "md")}>
              Explore services
            </Link>
          </div>
          <ul
            className={cx(motion.fadeUp, styles.proof, "desktop-only")}
            style={motionVars({ delay: 0.38 })}
          >
            {heroProofPoints.map((point) => (
              <li key={point} className={styles.proofItem}>
                <Icon name="check" size={16} strokeWidth={2} className={styles.check} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual>
          <DeployTerminal />
        </HeroVisual>
      </div>

      <StatsBar />
      <ClientLogos />
    </section>
  );
}
