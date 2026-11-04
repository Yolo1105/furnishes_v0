import Image from "next/image";
import Link from "next/link";
import { PIECES } from "@/features/catalog/catalog";
import { shopHref, slug } from "@/features/catalog/filters";
import { CATALOGUE } from "./collectionList";
import styles from "./Catalogue.module.css";

/**
 * The catalogue at a glance, after the owner's reference: the word large,
 * then tiles of uneven sizes, each a kind's name and how many pieces it
 * has over a toned photo; each opens the list on its kinds.
 */
export function Catalogue() {
  return (
    <section className={styles.catalogue} aria-labelledby="catalogue-title">
      <h2 id="catalogue-title" className={styles.title}>
        {CATALOGUE.title}
      </h2>
      <ul className={styles.grid}>
        {CATALOGUE.tiles.map((t) => {
          const kinds: readonly string[] = t.kinds;
          const count = PIECES.filter((p) => kinds.includes(p.kind)).length;
          return (
            <li key={t.name} className={styles.tile} data-spot={t.spot}>
              <Link className={styles.link} href={shopHref({ kind: t.kinds.map(slug) })}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.count}>
                  {count}
                  <span className="visually-hidden"> pieces</span>
                </span>
                <span className={styles.photo}>
                  <Image src={t.photo} alt="" fill sizes="(max-width: 1023px) 50vw, 25vw" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
