import Link from "next/link";
import { pieceBySlug } from "@/features/catalog/catalog";
import { PieceCard } from "@/features/catalog/PieceCard";
import catalog from "@/features/catalog/Catalog.module.css";
import { routes } from "@/lib/routes";
import { START } from "./collectionList";
import styles from "./Collection.module.css";

/** A few pieces from both lines with their prices, and the way to every piece. */
export function StartWith() {
  const pieces = START.flatMap((slug) => pieceBySlug(slug) ?? []);
  return (
    <section className={styles.section} aria-labelledby="start-title">
      <div className={styles.head}>
        <h2 id="start-title" className={styles.heading}>
          <span className={styles.headingLabel}>Our picks</span>
          Start with these <span className={styles.headingRest}>Two from each line</span>
        </h2>
        <Link className={styles.all} href={routes.products}>
          See every piece
        </Link>
      </div>
      <ul className={catalog.grid}>
        {pieces.map((p) => (
          <PieceCard key={p.slug} piece={p} />
        ))}
      </ul>
    </section>
  );
}
