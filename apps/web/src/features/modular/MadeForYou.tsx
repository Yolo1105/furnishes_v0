import shared from "@/features/collection/Collection.module.css";
import { Icon } from "@/features/collection/Icon";
import { MADE_FOR_YOU } from "./modularList";
import styles from "./MadeForYou.module.css";

/**
 * A centred line over four promises in a row, after the owner's
 * reference: each a round mark beside its name and a line.
 */
export function MadeForYou() {
  const m = MADE_FOR_YOU;
  return (
    <section className={shared.section} aria-labelledby={m.id}>
      <h2 id={m.id} className={styles.title}>
        {m.title}
      </h2>
      <ul className={styles.items}>
        {m.items.map((it) => (
          <li key={it.name} className={styles.item}>
            <span className={shared.roundMark} aria-hidden="true">
              <Icon name={it.icon} />
            </span>
            <div className={styles.words}>
              <h3 className={styles.name}>{it.name}</h3>
              <p className={styles.line}>{it.line}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
