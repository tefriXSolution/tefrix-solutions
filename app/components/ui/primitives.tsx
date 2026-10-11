import type { ReactNode } from "react";

import { cx } from "@/app/lib/cx";

import styles from "./ui.module.css";

/** Mono section eyebrow, e.g. "SERVICES". Rose on the page, blush on cherry panels. */
export function Eyebrow({
  tone = "rose",
  className,
  children,
}: {
  tone?: "rose" | "blush";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx(styles.eyebrow, className)} data-tone={tone}>
      {children}
    </div>
  );
}

/** Small mono label, e.g. "TECHNOLOGIES WE MASTER". */
export function MonoLabel({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cx(styles.label, className)}>{children}</span>;
}

export type HeadingLevel = "h1" | "h2";

/**
 * Section heading. Renders an h2 on the homepage and an h1 when the section
 * leads a standalone page (/about, /services, /contact).
 */
export function SectionHeading({
  as: Tag = "h2",
  size = "section",
  children,
}: {
  as?: HeadingLevel;
  size?: "section" | "contact";
  children: ReactNode;
}) {
  return (
    <Tag className={styles.heading} data-size={size}>
      {children}
    </Tag>
  );
}

/** The heading level one step below a section heading. */
export function subheadingFor(level: HeadingLevel) {
  return level === "h1" ? "h2" : "h3";
}

/** Props for a button; spread onto an <a>, <Link> or <button>. */
export function buttonProps(variant: "primary" | "ghost", size: "sm" | "md", className?: string) {
  return {
    className: cx(styles.button, className),
    "data-variant": variant,
    "data-size": size,
  };
}

/** Props for a hover-lift card; spread onto any element. */
export function cardProps(surface: "gradient" | "flat" | "none", className?: string) {
  return {
    className: cx(styles.card, className),
    "data-surface": surface,
  };
}
