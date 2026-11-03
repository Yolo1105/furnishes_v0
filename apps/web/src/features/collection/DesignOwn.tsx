import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { DESIGN } from "./collectionList";
import styles from "./Collection.module.css";

/** Design your own: a large photo on the left, the title and the way into the 3D visualizer on the right. */
export function DesignOwn() {
  return (
    <section className={`${styles.section} ${styles.design}`} aria-labelledby="design-title">
      <span className={styles.designPhoto}>
        <Image src={DESIGN.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 66vw" />
      </span>
      <div className={styles.designWords}>
        <h2 id="design-title" className={styles.designTitle}>
          <span className={styles.headingLabel}>3D visualizer</span>
          {DESIGN.title} <span className={styles.headingRest}>{DESIGN.rest}</span>
        </h2>
        <p className={styles.designLine}>{DESIGN.line}</p>
        <Link className={styles.outline} href={routes.logIn}>
          {DESIGN.go}
        </Link>
      </div>
    </section>
  );
}
