import Image from "next/image";
import Link from "next/link";
import { LINES, LINES_PAIR } from "./linesList";
import styles from "./Lines.module.css";

/** The arrow after a way in, drawn to the words' weight. */
function Onward() {
  return (
    <svg className={styles.onward} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 8h12M9 3l5 5-5 5" />
    </svg>
  );
}

/**
 * The two lines on the landing, after the owner's reference: an overview of
 * what we do beside a room, then two columns, ready-made on the left and
 * modular on the right, each its plain name, a sentence on how it differs
 * and the way in over a wide photo.
 */
export function LinesPair() {
  return (
    <section className={styles.section} aria-labelledby="pair-title">
      <div className={styles.overview}>
        <div className={styles.overviewWords}>
          <p className="type-label">{LINES_PAIR.label}</p>
          <h2 id="pair-title" className={`type-section-title ${styles.title}`}>
            {LINES_PAIR.title}
          </h2>
          {LINES_PAIR.lines.map((line) => (
            <p key={line} className={`type-body ${styles.line}`}>
              {line}
            </p>
          ))}
          <Link className={styles.more} href={LINES_PAIR.go.href}>
            {LINES_PAIR.go.label}
            <Onward />
          </Link>
        </div>
        <span className={styles.photo}>
          <Image src={LINES_PAIR.photo} alt="" fill sizes="(width < 1024px) 100vw, 60vw" />
        </span>
      </div>
      <ul className={styles.pair}>
        {LINES.map((l) => (
          <li key={l.href} className={styles.pairItem}>
            <h3 className="type-card-title">{l.name}</h3>
            <p className={`type-card-line ${styles.pairText}`}>{l.text}</p>
            <Link className={styles.more} href={l.href}>
              {l.go}
              <Onward />
            </Link>
            <span className={styles.photo}>
              <Image src={l.photo} alt="" fill sizes="(width < 640px) 100vw, 48vw" />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
