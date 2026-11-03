import Image from "next/image";
import Link from "next/link";
import { COMPARE } from "./collectionList";
import { Section } from "./Sections";
import styles from "./Collection.module.css";

/**
 * The three kinds side by side: each its photo, its name, what it is, its
 * price and time, and the way in. Only the photo and the button are links,
 * so only they answer the pointer; the photo's link is left out of the tab
 * order and from screen readers, as it goes where the button goes.
 */
export function Compare() {
  return (
    <Section id="compare-title" label={COMPARE.label} title={COMPARE.title} rest={COMPARE.rest}>
      <ul className={styles.compare}>
        {COMPARE.kinds.map((k) => (
          <li key={k.name} className={styles.compareKind}>
            <Link className={styles.comparePhoto} href={k.go.href} tabIndex={-1} aria-hidden="true">
              <Image src={k.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 33vw" />
            </Link>
            <h3 className={`${styles.promiseName} ${styles.compareName}`}>{k.name}</h3>
            <p className={styles.compareLine}>{k.line}</p>
            <p className={styles.compareFacts}>{k.facts}</p>
            <Link className={styles.compareGo} href={k.go.href}>
              {k.go.label}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
