import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";
import { sgd } from "@/lib/money";
import { pieceOf } from "@/lib/routes";
import { ARRIVALS, dims, finishBySlug, FURNITURE_WEEKS, fromPrice, type Piece } from "./catalog";
import styles from "./Catalog.module.css";

/**
 * A piece in a list: its photo, the finishes it comes in, its name with what
 * it starts at beside it, its line, its size and how it arrives. The whole
 * card opens it. `kind` puts its kind in small capitals over the name;
 * `brief` leaves only the name and price, for a featured grid; `stack` sets
 * the price under the name on a square photo, as the ready-made row.
 * `children` follow the card, outside its link, as the quiz's reasons.
 */
export function PieceCard({
  piece,
  kind,
  brief,
  stack,
  children,
}: {
  piece: Piece;
  kind?: boolean;
  brief?: boolean;
  stack?: boolean;
  children?: ReactNode;
}) {
  const sizes = piece.sizes.length;
  const modular = piece.line === "modular";
  return (
    <li>
      <Link className={stack ? `${styles.card} ${styles.stack}` : styles.card} href={pieceOf(piece.slug)}>
        <span className={styles.photo}>
          <Image src={piece.photos[0]!} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" />
        </span>
        {kind && <span className={styles.kind}>{piece.kind}</span>}
        {!brief && (
          <span className={styles.swatches}>
            {piece.finishes.map((f) => (
              <span key={f} className={styles.swatch} data-finish={f} aria-hidden="true" />
            ))}
            <span className="visually-hidden">In {piece.finishes.map((f) => finishBySlug(f)?.name).join(", ")}.</span>
          </span>
        )}
        <span className={styles.nameRow}>
          <span className={styles.name}>{piece.name}</span>
          <span className={styles.from}>
            {(sizes > 1 || modular) && "from "}
            {sgd(fromPrice(piece))}
          </span>
        </span>
        {!brief && (
          <>
            <span className={styles.line}>{piece.tagline}</span>
            <span className={styles.meta}>
              {dims(piece.sizes[0]!)}
              {sizes > 1 && ` · ${sizes} sizes`}
            </span>
            <span className={styles.meta}>
              {modular
                ? `${ARRIVALS.built.name} (built) or ${ARRIVALS.parts.name.toLowerCase()} (in parts)`
                : `Ready-made · ${FURNITURE_WEEKS}`}
            </span>
          </>
        )}
      </Link>
      {children}
    </li>
  );
}
