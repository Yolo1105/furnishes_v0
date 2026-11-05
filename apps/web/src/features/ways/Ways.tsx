import Image from "next/image";
import Link from "next/link";
import { tryDemo } from "@/features/account/actions";
import collection from "@/features/collection/Collection.module.css";
import { Icon } from "@/features/collection/Icon";
import { WAYS, WAYS_HEAD } from "./waysList";
import styles from "./Ways.module.css";

/**
 * Three ways to shop, after the owner's reference: one centred title, then a
 * card each for the home visit, samples and Eva: the photo across the card's
 * top, its title and line under it, and its two ways on as quiet framed
 * rows, each a mark then its words.
 */
export function Ways() {
  return (
    <section className={`${collection.section} ${styles.ways}`} aria-labelledby={WAYS_HEAD.id}>
      <h2 id={WAYS_HEAD.id} className={styles.head}>
        {WAYS_HEAD.title}
      </h2>
      <ul className={styles.cards}>
        {WAYS.map((w) => (
          <li key={w.title} className={styles.card}>
            <span className={styles.photo}>
              <Image src={w.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 33vw" />
            </span>
            <div className={styles.body}>
              <h3 className={styles.title}>{w.title}</h3>
              <p className={styles.text}>{w.line}</p>
              <div className={styles.rows}>
                {w.go.map((g) => (
                  <Link key={g.label} className={styles.row} href={g.href}>
                    <Icon name={g.icon} />
                    {g.label}
                  </Link>
                ))}
                {"demo" in w && (
                  <form action={tryDemo}>
                    <button className={styles.row} type="submit">
                      <Icon name={w.demo.icon} />
                      {w.demo.label}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
