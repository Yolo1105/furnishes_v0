import Image from "next/image";
import Link from "next/link";
import { Head } from "@/features/journal/Journal";
import { Arrow } from "@/shell/Arrow";
import { LOOK_CALL, LOOKS, LOOKS_HEAD } from "./inspirationList";
import styles from "./Inspiration.module.css";

/** Four rooms in a row at the page's foot, under a heading in the journal's shape, each with its name and a way to its pieces. */
export function Looks() {
  return (
    <section className={styles.looks} aria-labelledby="looks-title">
      <Head id="looks-title" {...LOOKS_HEAD} />
      <ul className={styles.lookRow}>
        {LOOKS.map((l) => (
          <li key={l.name}>
            <Link className={styles.look} href={l.href}>
              <span className={styles.lookPhoto}>
                <Image src={l.photo} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" />
              </span>
              <span className={styles.lookName}>{l.name}</span>
              <span className={styles.line}>
                {LOOK_CALL}
                <Arrow className={styles.arrow} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
