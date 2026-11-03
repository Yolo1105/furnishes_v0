import Link from "next/link";
import { COMPARE } from "./collectionList";
import { Section } from "./Sections";
import styles from "./Collection.module.css";

const ROWS = ["is", "takes", "price"] as const;

/**
 * The three kinds side by side: each its name, then what it is, how long it
 * takes and its price as label and value, and the way in. Parted by space,
 * not rules; each column keeps its labels, so it reads alone on a phone.
 */
export function Compare() {
  return (
    <Section id="compare-title" label={COMPARE.label} title={COMPARE.title} rest={COMPARE.rest}>
      <ul className={styles.compare}>
        {COMPARE.kinds.map((k) => (
          <li key={k.name} className={styles.compareKind}>
            <h3 className={styles.promiseName}>{k.name}</h3>
            <dl className={styles.compareRows}>
              {ROWS.map((r) => (
                <div key={r}>
                  <dt className={styles.compareLabel}>{COMPARE.rows[r]}</dt>
                  <dd className={styles.compareValue}>{k[r]}</dd>
                </div>
              ))}
            </dl>
            <Link className={styles.compareGo} href={k.go.href}>
              {k.go.label}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
