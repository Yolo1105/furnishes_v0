import collection from "@/features/collection/Collection.module.css";
import { type LegalPage, UPDATED } from "./legalList";
import styles from "./Legal.module.css";

/** A legal page: its title and what it covers, then each part as a name and its paragraphs, in one readable column. */
export function Legal({ page }: { page: LegalPage }) {
  return (
    <article className={styles.legal} aria-labelledby="legal-title">
      <h1 id="legal-title" className={collection.heading}>
        <span className={collection.headingLabel}>{UPDATED}</span>
        {page.title} <span className={collection.headingRest}>{page.lead}</span>
      </h1>
      {page.sections.map((s) => (
        <section key={s.name} className={styles.part}>
          <h2 className={styles.name}>{s.name}</h2>
          {s.lines.map((l) => (
            <p key={l} className={styles.line}>
              {l}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
