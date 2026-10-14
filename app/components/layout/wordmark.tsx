import styles from "./wordmark.module.css";

/**
 * "TefriX Solutions" set in Geist, with the rose X. Sizes: 40px (desktop
 * footer), 20px (desktop nav), 18px (phone top bar, "TefriX" only), 16px
 * (phone footer).
 */
export function Wordmark({
  size = 20,
  withSolutions = true,
}: {
  size?: 16 | 18 | 20 | 40;
  withSolutions?: boolean;
}) {
  return (
    <span className={styles.wordmark} data-size={size}>
      Tefri<span className={styles.x}>X</span>
      {withSolutions && (
        <>
          {" "}
          <span className={styles.solutions}>Solutions</span>
        </>
      )}
    </span>
  );
}
