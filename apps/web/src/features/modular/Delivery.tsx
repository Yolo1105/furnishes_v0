import shared from "@/features/collection/Collection.module.css";
import { Icon } from "@/features/collection/Icon";
import { DELIVERY } from "./modularList";
import styles from "./Delivery.module.css";

/**
 * Shipping and delivery, after the owner's two references: the title
 * centred, the order process in six numbered steps each under a round
 * mark, the two ways a piece arrives as cards, the steps for a smooth
 * delivery before, during and after, then the details in two columns.
 */
export function Delivery() {
  const d = DELIVERY;
  return (
    <section className={`${shared.section} ${styles.delivery}`} aria-labelledby={d.id}>
      <h2 id={d.id} className={`${shared.heading} ${styles.title}`}>
        <span className={shared.headingLabel}>{d.label}</span>
        {d.title}
      </h2>

      <div className={styles.block}>
        <h3 className={styles.blockTitle}>{d.processTitle}</h3>
        <ol className={styles.process}>
          {d.process.map((s, i) => (
            <li key={s.name} className={styles.step}>
              <span className={shared.roundMark} aria-hidden="true">
                <Icon name={s.icon} />
              </span>
              <h4 className={styles.stepName}>
                <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
                {s.name}
              </h4>
              <p className={styles.text}>{s.line}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.block}>
        <h3 className={styles.blockTitle}>{d.waysTitle}</h3>
        <ul className={styles.ways}>
          {d.ways.map((w) => (
            <li key={w.name} className={styles.way}>
              <span className={shared.roundMark} aria-hidden="true">
                <Icon name={w.icon} />
              </span>
              <h4 className={styles.wayName}>{w.name}</h4>
              <p className={styles.weeks}>{w.weeks} from order to door</p>
              <ul className={styles.points}>
                {w.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <h3 className={styles.blockTitle}>{d.stagesTitle}</h3>
        <div className={styles.stages}>
          {d.stages.map((st) => (
            <div key={st.when} className={styles.stage}>
              <p className={styles.when}>{st.when}</p>
              {st.items.map((it) => (
                <div key={it.name} className={styles.item}>
                  <h4 className={styles.itemName}>{it.name}</h4>
                  <p className={styles.text}>{it.line}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <dl className={styles.topics}>
        {d.topics.map((t) => (
          <div key={t.name}>
            <dt className={styles.itemName}>{t.name}</dt>
            <dd className={styles.text}>{t.line}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
