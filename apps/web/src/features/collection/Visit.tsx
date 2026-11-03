import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { VISIT } from "./collectionList";
import styles from "./Collection.module.css";

/** The in-room visit as a band: the offer, what the visit is and how to book it in one column, a room beside it. */
export function Visit() {
  return (
    <section className={styles.section} aria-labelledby="visit-title">
      <div className={styles.visit}>
        <div className={styles.visitSide}>
          <h2 id="visit-title" className={styles.heading}>
            <span className={styles.headingLabel}>{VISIT.label}</span>
            {VISIT.title} <span className={styles.headingRest}>{VISIT.rest}</span>
          </h2>
          <p className={styles.designLine}>{VISIT.line}</p>
          <Link className={styles.book} href={routes.contact}>
            {VISIT.go}
          </Link>
        </div>
        <div className={styles.visitPhoto}>
          <Image src={VISIT.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 60vw" />
        </div>
      </div>
    </section>
  );
}
