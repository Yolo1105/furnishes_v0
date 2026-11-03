import { PARTNERS, type Partner } from "./partnerList";

/**
 * Every partner is shown for now, on the owner's word, though none is
 * confirmed yet; before going live, show only `confirmed` ones again.
 */
const SHOWN = PARTNERS;
import styles from "./Partners.module.css";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined}>
      {SHOWN.map((p: Partner) => (
        <li key={p.name} className={`${styles.logo} ${styles[p.face]}`}>
          <svg viewBox="0 0 32 32" aria-hidden="true">
            {p.mark.map((m) => (
              <path key={m.d} d={m.d} className={m.kind && styles[m.kind]} />
            ))}
          </svg>
          <span>{p.name}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Partners: a row of names running left to right without end, between the
 * banner and the flat. The row is written twice so the loop never shows a
 * seam; it holds still for anyone who asks for less motion, and while
 * pointed at.
 */
export function Partners() {
  return (
    <section className={styles.partners} aria-label="Partners">
      <div className={styles.track}>
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
