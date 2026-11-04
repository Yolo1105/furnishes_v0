import type { ReactNode } from "react";
import styles from "./TypeTrial.module.css";

/**
 * Sora, after the owner's type-scale demo, across the home page: the
 * page's sections sit inside and carry data-type-trial, under which
 * globals.css swaps the font tokens. The owner settled on it, so the
 * Before/After switch is gone; remove this wrapper and the trial block in
 * globals.css to go back to the site's own faces.
 */
export function TypeTrial({ children }: { children: ReactNode }) {
  return (
    <div className={styles.scope} data-type-trial>
      {children}
    </div>
  );
}
