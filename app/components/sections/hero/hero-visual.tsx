"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import { cx } from "@/app/lib/cx";
import { REDUCED_MOTION_QUERY, prefersReducedMotion } from "@/app/lib/motion";
import glassHero from "@/public/assets/glass-hero.webp";
import glassPill from "@/public/assets/glass-pill.webp";

import motion from "../../motion/motion.module.css";
import { motionVars } from "../../motion/style-vars";
import styles from "./hero-visual.module.css";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

let alphaVideoSupport: boolean | undefined;

/**
 * The loop is VP9 with a real alpha channel: transparent in Chrome, Edge and
 * Firefox. Safari, and every iOS browser (all WebKit), draws it as a black
 * box, so they keep the still image instead.
 */
function supportsAlphaVideo() {
  if (alphaVideoSupport === undefined) {
    const ua = navigator.userAgent;
    const isAppleWebKit =
      /iPad|iPhone|iPod/.test(ua) ||
      (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) ||
      (/Safari\//.test(ua) && !/(Chrome|Chromium|Edg|Firefox|OPR)\//.test(ua));
    alphaVideoSupport =
      !isAppleWebKit && document.createElement("video").canPlayType('video/webm; codecs="vp9"') !== "";
  }
  return alphaVideoSupport;
}

const canShowVideo = () => supportsAlphaVideo() && !prefersReducedMotion();

/**
 * Hero glass. The server renders the still image (so first paint never waits
 * on the 2 MB video, and Safari never shows a black box); on capable
 * browsers the transparent loop is mounted once the visual nears the
 * viewport, plays only while on screen, and fades in over the still once it
 * is actually playing.
 */
export function HeroVisual({ children }: { children: ReactNode }) {
  const canPlayVideo = useSyncExternalStore(subscribeToMotionPreference, canShowVideo, () => false);
  const [onScreen, setOnScreen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Don't fetch the 2 MB loop until the visual is on screen (on phones it
  // starts below the fold); the still covers it until then.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !canPlayVideo) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setOnScreen(true);
      observer.disconnect();
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [canPlayVideo]);

  const showVideo = canPlayVideo && onScreen;

  // Publish the distance from the headline's last baseline ("…software") to
  // the bottom of this visual as --terminal-bottom, which the deploy window
  // uses in the side-by-side layout so its bottom edge sits level with the end
  // of the headline. The headline's offsetTop ignores its fade-up transform,
  // and the marker is measured relative to the headline, so the value is
  // stable during the load animation.
  useEffect(() => {
    const container = containerRef.current;
    const heading = container?.closest("section")?.querySelector("h1");
    const titleEnd = heading?.querySelector<HTMLElement>("[data-hero-title-end]");
    if (!container || !heading?.parentElement || !titleEnd) return;
    const align = () => {
      const baseline =
        heading.offsetTop + titleEnd.getBoundingClientRect().top - heading.getBoundingClientRect().top;
      const visualBottom = container.offsetTop + container.offsetHeight;
      container.style.setProperty("--terminal-bottom", `${visualBottom - baseline}px`);
    };
    const observer = new ResizeObserver(align);
    observer.observe(container);
    observer.observe(heading.parentElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React doesn't reliably render the muted attribute, which blocks autoplay.
    video.muted = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [showVideo]);

  const videoVisible = showVideo && playing;

  return (
    <div ref={containerRef} className={styles.visual}>
      <div aria-hidden="true" className={styles.glow} />
      <Image
        src={glassHero}
        alt=""
        // Eager but not preloaded: on desktop it is on screen (and the LCP image),
        // so Chrome raises its priority; on phones it is below the fold and
        // shouldn't compete with the headline's fonts.
        loading="eager"
        sizes="(max-width: 760px) 78vw, 470px"
        className={styles.still}
        data-hidden={videoVisible || undefined}
      />
      {showVideo && (
        <video
          ref={videoRef}
          className={styles.video}
          data-visible={videoVisible || undefined}
          aria-hidden="true"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster="/assets/hero-poster.webp"
          onPlaying={() => setPlaying(true)}
        >
          <source src="/assets/hero-loop.webm" type="video/webm" />
        </video>
      )}
      <Image
        src={glassPill}
        alt=""
        sizes="102px"
        className={cx(motion.float, styles.pill)}
        style={motionVars({ floatDuration: 9 })}
      />
      {children}
    </div>
  );
}
