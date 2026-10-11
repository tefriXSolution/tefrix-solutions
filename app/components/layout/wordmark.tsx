import styles from "./wordmark.module.css";

/** "TefriX Solutions" set in Geist, with the rose X. */
export function Wordmark() {
  return (
    <span className={styles.wordmark}>
      Tefri<span className={styles.x}>X</span> <span className={styles.solutions}>Solutions</span>
    </span>
  );
}
