import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/features/collection/Icon";
import shared from "@/features/collection/Collection.module.css";
import { LINES, LINES_HEAD } from "./linesList";
import styles from "./Lines.module.css";

/**
 * The two things we sell, on the landing: the title on the left, a short
 * note and the way into the collection on the right past a thin rule, then
 * a panel for each line across the page, after the owner's journal
 * reference: a row of small words across its head, the photo its full
 * width with no border, the title under it, and its way in at its foot.
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
      <ul className={styles.panels}>
        {LINES.map((l) => (
          <li key={l.name} className={styles.panel} data-tone={l.tone}>
            <p className={styles.head}>
              {l.top.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </p>
            <span className={styles.frame}>
              <span className={styles.print}>
                <Image src={l.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 50vw" />
              </span>
            </span>
            <h3 className={styles.panelTitle}>{l.title}</h3>
            <p className={styles.foot}>
              <Link className={styles.go} href={l.href}>
                {l.go}
                <Icon name="arrow" />
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
