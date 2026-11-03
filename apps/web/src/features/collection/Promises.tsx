import Image from "next/image";
import Link from "next/link";
import { ORDER_BAND, PROMISES } from "./collectionList";
import { PromiseIcon, type PromiseIconName } from "./PromiseIcon";
import styles from "./Collection.module.css";

type Item = { icon: PromiseIconName; name: string; line: string };

/** The row alone, for a page that sets its own title, as a piece's page. */
export function PromiseRow({ promises }: { promises: readonly Item[] }) {
  return (
    <ol className={styles.promises}>
      {promises.map((p, n) => (
        <li key={p.name} className={styles.promise}>
          <PromiseIcon name={p.icon} className={styles.promiseIcon} />
          <span className={styles.promiseNumber} aria-hidden="true">
            {String(n + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.promiseName}>{p.name}</h3>
          <p className={styles.promiseLine}>{p.line}</p>
        </li>
      ))}
    </ol>
  );
}

/**
 * What every order comes with: a wide photo, and beside it a dark panel with
 * the title, a short line, each promise with its drawing and the way in. A
 * line's page passes its own promises.
 */
export function Promises({ promises = PROMISES }: { promises?: readonly Item[] }) {
  return (
    <section className={styles.section} aria-labelledby="promises-title">
      <div className={styles.order}>
        <div className={styles.orderPhoto}>
          <Image src={ORDER_BAND.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 66vw" />
        </div>
        <div className={styles.orderPanel}>
          <h2 id="promises-title" className={styles.orderTitle}>
            <span className={styles.headingLabel}>Delivery</span>
            {ORDER_BAND.title}
          </h2>
          <p className={styles.orderLine}>{ORDER_BAND.line}</p>
          <ul className={styles.orderList}>
            {promises.map((p) => (
              <li key={p.name} className={styles.orderItem}>
                <PromiseIcon name={p.icon} className={styles.orderIcon} />
                {p.name}
              </li>
            ))}
          </ul>
          <Link className={styles.orderGo} href={ORDER_BAND.go.href}>
            {ORDER_BAND.go.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
