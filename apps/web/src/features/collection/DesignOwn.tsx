import Image from "next/image";
import Link from "next/link";
import { DESIGN } from "./collectionList";
import styles from "./Collection.module.css";

/** Design your own as the visit's band turned round: the room on the left, the title and the way into the room planner on a panel beside it. */
export function DesignOwn() {
  return (
    <section className={styles.section} aria-labelledby="design-title">
      <div className={`${styles.visit} ${styles.visitFlip}`}>
        <div className={styles.visitPhoto}>
          <Image src={DESIGN.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 60vw" />
        </div>
        <div className={styles.visitSide}>
          <h2 id="design-title" className={styles.heading}>
            <span className={styles.headingLabel}>Room planner</span>
            {DESIGN.title} <span className={styles.headingRest}>{DESIGN.rest}</span>
          </h2>
          <p className={styles.designLine}>{DESIGN.line}</p>
          <Link className={styles.outline} href={DESIGN.href}>
            {DESIGN.go}
          </Link>
        </div>
      </div>
    </section>
  );
}
