import Image from "next/image";
import Link from "next/link";
import { fromPrice, type Piece, pieceBySlug } from "@/features/catalog/catalog";
import { Icon } from "./Icon";
import { sgd } from "@/lib/money";
import { pieceOf, routes } from "@/lib/routes";
import { FIRST_PIECE } from "./collectionList";
import shared from "./Collection.module.css";
import styles from "./FirstPiece.module.css";

/** One piece as a card: its name and price, its photo, its line and an arrow, the whole card one link. */
function Pick({ piece, tall }: { piece: Piece; tall?: boolean }) {
  return (
    <li className={styles.pick} data-tall={tall || undefined}>
      <Link className={styles.card} href={pieceOf(piece.slug)}>
        <span className={styles.name}>{piece.name}</span>
        <span className={styles.price}>From {sgd(fromPrice(piece))}</span>
        <span className={styles.photo}>
          <Image
            src={piece.photos[0]!}
            alt=""
            fill
            sizes={tall ? "(max-width: 1023px) 100vw, 40vw" : "(max-width: 1023px) 100vw, 30vw"}
          />
        </span>
        <span className={styles.line}>{piece.tagline}</span>
        <span className={styles.go}>
          <Icon name="arrow" />
        </span>
      </Link>
    </li>
  );
}

/**
 * One piece to start a room with, after the owner's reference: the title
 * centred, then two small cards stacked beside a tall one, and the way to
 * every piece under them. Its own section, apart from "Start with these".
 */
export function FirstPiece() {
  const small = FIRST_PIECE.small.flatMap((slug) => pieceBySlug(slug) ?? []);
  const tall = pieceBySlug(FIRST_PIECE.tall);
  return (
    <section className={shared.section} aria-labelledby="first-piece-title">
      <h2 id="first-piece-title" className={`${shared.heading} ${styles.title}`}>
        <span className={shared.headingLabel}>{FIRST_PIECE.label}</span>
        {FIRST_PIECE.title}
      </h2>
      <ul className={styles.picks}>
        {small.map((p) => (
          <Pick key={p.slug} piece={p} />
        ))}
        {tall && <Pick piece={tall} tall />}
      </ul>
      <p className={styles.all}>
        <Link className={styles.allLink} href={routes.products}>
          {FIRST_PIECE.all}
        </Link>
      </p>
    </section>
  );
}
