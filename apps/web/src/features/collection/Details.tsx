import Image from "next/image";
import Link from "next/link";
import { DETAILS } from "./collectionList";
import { Section } from "./Sections";
import styles from "./Collection.module.css";

/** Three close photos, each over a panel in one of our finishes' colours, with its name, line and way in. */
export function Details() {
  return (
    <Section id="details-title" label="Craft" title={DETAILS.title} rest={DETAILS.rest}>
      <ul className={styles.details}>
        {DETAILS.cards.map((c) => (
          <li key={c.name}>
            <Link className={styles.detail} href={c.href} data-tone={c.tone}>
              <span className={styles.detailPhoto}>
                <Image src={c.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 33vw" />
              </span>
              <span className={styles.detailWords}>
                <span className={styles.detailName}>{c.name}</span>
                <span className={styles.detailLine}>{c.line}</span>
                <span className={styles.detailGo}>Explore</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
