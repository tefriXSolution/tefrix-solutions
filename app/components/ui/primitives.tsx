import type { ReactNode } from "react";

import { cx } from "@/app/lib/cx";

import styles from "./ui.module.css";

type LabelTone = "muted" | "muted-dark" | "on-cherry";

/** Section eyebrow in the "(01) — Why TefriX" pattern. */
export function SectionLabel({
  index,
  children,
  tone = "muted",
}: {
  index: string;
  children: ReactNode;
  tone?: LabelTone;
}) {
  return (
    <div className={styles.label} data-tone={tone}>
      ({index}) — {children}
    </div>
  );
}

export type HeadingLevel = "h1" | "h2";

/**
 * Anton display heading. Sections render an h2 on the homepage and an h1 when
 * they lead a standalone page (/about, /services, /contact).
 */
export function DisplayHeading({
  as: Tag = "h2",
  size,
  className,
  children,
}: {
  as?: HeadingLevel;
  /** "section" applies the shared section-heading size; otherwise size via className. */
  size?: "section";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cx(styles.display, size === "section" && styles.sectionHeading, className)}>
      {children}
    </Tag>
  );
}

/** Accent part of a display heading: cherry on light, cherry-tint on black. */
export function Accent({
  children,
  tone = "cherry",
}: {
  children: ReactNode;
  tone?: "cherry" | "tint";
}) {
  return (
    <span className={styles.accent} data-tone={tone}>
      {children}
    </span>
  );
}

/** The heading level one step below a section heading. */
export function subheadingFor(level: HeadingLevel) {
  return level === "h1" ? "h2" : "h3";
}

type ButtonVariant = "ink" | "white" | "outline-light" | "outline-ink";
type ButtonSize = "sm" | "md" | "lg";

/** Props for a pill button; spread onto an <a>, <Link> or <button>. */
export function pillButton(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return {
    className: cx(styles.button, className),
    "data-variant": variant,
    "data-size": size,
  };
}
