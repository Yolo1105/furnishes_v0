import Link from "next/link";
import shared from "@/features/collection/Collection.module.css";
import { Icon } from "@/features/collection/Icon";
import { pieceBySlug } from "@/features/catalog/catalog";
import { pieceOf } from "@/lib/routes";
import { Compare } from "./Compare";
import { BEFORE_AFTER, DIFFERENCE } from "./modularList";
import modular from "./Modular.module.css";
import styles from "./Difference.module.css";

/**
 * What sets the line apart, after the owner's reference: the label, the
 * title and the choices down the left, each in a square mark, the first
 * filled until another is pointed at; on the right the room before and
 * after one piece, dragged across, the piece named under it.
 */
export function Difference() {
  const d = DIFFERENCE;
  const piece = pieceBySlug(BEFORE_AFTER.piece);
  return (
    <section className={shared.section} aria-labelledby={d.id}>
      <div className={styles.difference}>
        <div className={styles.side}>
          <h2 id={d.id} className={`${shared.heading} ${styles.title}`}>
            <span className={shared.headingLabel}>{d.label}</span>
            {d.title}
          </h2>
          <ul className={styles.options}>
            {d.options.map((o) => (
              <li key={o.name} className={styles.option}>
                <span className={styles.box} aria-hidden="true">
                  <Icon name={o.icon} />
                </span>
                {o.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Compare before={BEFORE_AFTER.before} after={BEFORE_AFTER.after} label="Before and after" fit />
          <p className={modular.compareFoot}>
            <span>Before</span>
            {piece && (
              <Link className={shared.qaMail} href={pieceOf(piece.slug)}>
                {piece.name}
              </Link>
            )}
            <span>After</span>
          </p>
        </div>
      </div>
    </section>
  );
}
