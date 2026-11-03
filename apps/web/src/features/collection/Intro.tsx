import { INTRO } from "./collectionList";
import styles from "./Collection.module.css";

/** The statement under the banner, titled as every section is: where the furniture comes from, and who it's for. */
export function Intro() {
  return (
    <section className={styles.intro} aria-labelledby="intro-title">
      <h2 id="intro-title" className={`${styles.heading} ${styles.introTitle}`}>
        <span className={styles.headingLabel}>{INTRO.label}</span>
        {INTRO.lead} <span className={styles.headingRest}>{INTRO.rest}</span>
      </h2>
    </section>
  );
}
