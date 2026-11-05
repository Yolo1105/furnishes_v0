"use client";

import { type ReactNode, useState } from "react";
import styles from "./TypeTrial.module.css";

/**
 * Sora, after the owner's type-scale demo, across the site's pages: each
 * page's sections, the bar and the footer sit inside and carry data-type-trial, under which globals.css swaps the font tokens. `page`
 * names the page, for the few tokens only one of them sets. With `compare`,
 * a Before/After button shows the page in the site's own faces too, while
 * the owner decides. Remove this wrapper and the trial block in globals.css
 * to go back to the site's own faces.
 */
export function TypeTrial({
  page,
  compare = false,
  children,
}: {
  page: string;
  compare?: boolean;
  children: ReactNode;
}) {
  const [on, setOn] = useState(true);
  return (
    <div className={styles.scope} data-type-trial={on ? page : undefined}>
      {children}
      {compare && (
        <button type="button" className={styles.toggle} aria-pressed={on} onClick={() => setOn(!on)}>
          {on ? "After: Sora · show before" : "Before: current · show after"}
        </button>
      )}
    </div>
  );
}
