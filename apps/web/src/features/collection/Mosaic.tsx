import Image from "next/image";
import Link from "next/link";
import { MOSAIC } from "./collectionList";
import styles from "./Collection.module.css";

/** One large photo and two stacked beside it, each with its title and way in set on it. */
export function Mosaic() {
  const { main, side } = MOSAIC;
  return (
    <section className={styles.mosaicSection} aria-labelledby="mosaic-title">
      <div className={styles.mosaic}>
        <Link className={`${styles.mosaicTile} ${styles.mosaicMain}`} href={main.href}>
          <Image src={main.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 66vw" />
          <span className={styles.mosaicWords}>
            <h2 id="mosaic-title" className={styles.mosaicTitle}>
              {main.title}
            </h2>
            <span className={styles.mosaicGo}>{main.go}</span>
          </span>
        </Link>
        {side.map((t) => (
          <Link key={t.title} className={styles.mosaicTile} href={t.href}>
            <Image src={t.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 33vw" />
            <span className={styles.mosaicWords}>
              <h3 className={styles.mosaicName}>{t.title}</h3>
              <span className={styles.mosaicGo}>{t.go}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
