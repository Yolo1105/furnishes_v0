import Image from "next/image";
import Link from "next/link";
import { PIECES } from "@/features/catalog/catalog";
import { PieceCard } from "@/features/catalog/PieceCard";
import { lineOf } from "@/lib/routes";
import { TILES } from "./collectionList";
import styles from "./Collection.module.css";

/**
 * What we sell, one line at a time, each under its own heading: a photo the
 * width of the page with the line's name and way in on it, then a row of its
 * pieces that scrolls sideways.
 */
export function Tiles() {
  return (
    <section className={styles.section} aria-labelledby="tiles-title">
      <div className={styles.lines}>
        {TILES.map((t, n) => (
          <div key={t.key} className={styles.lineBlock}>
            <div className={styles.head}>
              <h2 id={n === 0 ? "tiles-title" : `tiles-${t.key}-title`} className={styles.heading}>
                <span className={styles.headingLabel}>{t.head.label}</span>
                {t.head.title} <span className={styles.headingRest}>{t.head.rest}</span>
              </h2>
            </div>
            <div className={styles.lineBand}>
              <span className={styles.lineBandPhoto}>
                <Image src={t.photo} alt="" fill sizes="100vw" />
              </span>
              <div className={styles.lineBandWords}>
                <p className={styles.lineBandLabel}>{t.label}</p>
                <h3 className={styles.lineBandName}>{t.title}</h3>
                <p className={styles.lineBandIntro}>{t.intro}</p>
                <Link className={styles.photoGo} href={lineOf(t.show)}>
                  {t.go}
                </Link>
              </div>
            </div>
            <ul className={styles.row} aria-label={`${t.label} pieces`}>
              {PIECES.filter((p) => p.line === t.show).map((p) => (
                <PieceCard key={p.slug} piece={p} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
