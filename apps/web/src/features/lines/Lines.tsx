import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/features/collection/Icon";
import shared from "@/features/collection/Collection.module.css";
import { LINES, LINES_HEAD } from "./linesList";
import styles from "./Lines.module.css";

/**
 * The two things we sell, on the landing: the title on the left, a short
 * note on the right, then the two lines side by side as a choice, after the
 * owner's reference: each a title, a sentence, its way in, and a photo
 * under it.
 */
export function Lines() {
  return (
    <section className={`${shared.section} ${styles.lines}`} aria-labelledby="lines-title">
      <div className={styles.top}>
        <h2 id="lines-title" className={shared.heading}>
          <span className={shared.headingLabel}>{LINES_HEAD.label}</span>
          {LINES_HEAD.title} <span className={shared.headingRest}>{LINES_HEAD.rest}</span>
        </h2>
        <div className={styles.note}>
          <p>{LINES_HEAD.note}</p>
        </div>
      </div>
      <ul className={styles.options}>
        {LINES.map((l) => (
          <li key={l.href} className={styles.option}>
            <h3 className={styles.optionTitle}>{l.title}</h3>
            <p className={styles.text}>{l.text}</p>
            <Link className={styles.go} href={l.href}>
              {l.go}
              <Icon name="arrow" />
            </Link>
            <span className={styles.photo}>
              <Image src={l.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 46vw" />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
