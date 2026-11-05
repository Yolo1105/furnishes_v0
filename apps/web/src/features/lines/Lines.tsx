import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/features/collection/Icon";
import shared from "@/features/collection/Collection.module.css";
import { LINES, LINES_HEAD, LINES_PAIR } from "./linesList";
import styles from "./Lines.module.css";

/**
 * The two things we sell, on the landing, after the owner's reference: three
 * columns, the first the section's title and one line set on a photo, then
 * a card for each line, its photo, its title as the way in, and a sentence.
 */
export function Lines() {
  return (
    <section className={shared.section} aria-labelledby="lines-title">
      <div className={styles.grid}>
        <div className={styles.intro}>
          <Image src={LINES_HEAD.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 32vw" />
          <div className={styles.introWords}>
            <h2 id="lines-title" className={styles.introTitle}>
              {LINES_HEAD.title}
            </h2>
            <p className={styles.introRest}>{LINES_HEAD.rest}</p>
          </div>
        </div>
        <ul className={styles.options}>
          {LINES.map((l) => (
            <li key={l.href}>
              <Link className={styles.card} href={l.href}>
                <span className={styles.photo}>
                  <Image src={l.photo} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 32vw" />
                </span>
                <h3 className={styles.cardTitle}>
                  {l.title}
                  <Icon name="arrow" />
                </h3>
                <p className={styles.text}>{l.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * The two lines on the landing, after the owner's reference: two columns,
 * ready-made on the left and modular on the right, under an overview of
 * what we do beside a room, each its plain name, a sentence on how it
 * differs and the way in over a wide photo.
 */
export function LinesPair() {
  return (
    <section className={shared.section} aria-labelledby="pair-title">
      <div className={styles.overview}>
        <div className={styles.overviewWords}>
          <h2 id="pair-title" className={shared.heading}>
            <span className={shared.headingLabel}>{LINES_PAIR.label}</span>
            {LINES_PAIR.title}
          </h2>
          {LINES_PAIR.lines.map((line) => (
            <p key={line} className={styles.overviewLine}>
              {line}
            </p>
          ))}
          <Link className={styles.more} href={LINES_PAIR.go.href}>
            {LINES_PAIR.go.label}
            <Icon name="onward" />
          </Link>
        </div>
        <span className={styles.overviewPhoto}>
          <Image src={LINES_PAIR.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 60vw" />
        </span>
      </div>
      <ul className={styles.pair}>
        {LINES.map((l) => (
          <li key={l.href} className={styles.pairItem}>
            <h3 className={styles.pairTitle}>{l.name}</h3>
            <p className={styles.pairText}>{l.pairText}</p>
            <Link className={styles.more} href={l.href}>
              {l.go}
              <Icon name="onward" />
            </Link>
            <span className={styles.pairPhoto}>
              <Image src={l.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 48vw" />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
