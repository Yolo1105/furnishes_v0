import Link from "next/link";
import { QUICK } from "./collectionList";
import styles from "./Collection.module.css";

/** A band of quick links into the list, under a short centred title. */
export function QuickLinks() {
  return (
    <section className={styles.quick} aria-labelledby="quick-title">
      <h2 id="quick-title" className={`${styles.heading} ${styles.quickTitle}`}>
        <span className={styles.headingLabel}>Find your fit</span>
        {QUICK.title} <span className={styles.headingRest}>{QUICK.rest}</span>
      </h2>
      <ul className={styles.quickLinks}>
        {QUICK.links.map((l) => (
          <li key={l.label}>
            <Link className={styles.quickLink} href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
