import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dims, lineBySlug, PIECES, pieceBySlug, SHARED, sizeName } from "@/features/catalog/catalog";
import { PieceCard } from "@/features/catalog/PieceCard";
import { PROMISES } from "@/features/collection/collectionList";
import { PromiseRow } from "@/features/collection/Promises";
import { FURNITURE_PROMISES } from "@/features/furniture/furnitureList";
import catalog from "@/features/catalog/Catalog.module.css";
import styles from "@/features/piece/Piece.module.css";
import { changesOf } from "@/features/piece/changes";
import { PieceView } from "@/features/piece/PieceView";
import { sgd } from "@/lib/money";
import { lineOf, routes } from "@/lib/routes";
import { SiteHeader } from "@/shell/SiteHeader";
import { Trail } from "@/shell/Trail";

type Props = { params: Promise<{ slug: string }> };

/** One page per piece, built ahead. */
export const generateStaticParams = () => PIECES.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = pieceBySlug((await params).slug);
  return p ? { title: p.name, description: `${p.name}: ${p.tagline}.` } : {};
}

/**
 * A piece: the way back, its photos and choices, what a modular one lets
 * you change and what it costs, what every order of its
 * line comes with, then every size, what it's made of, how it reaches you
 * and how to return it, then others in its line.
 */
export default async function PiecePage({ params }: Props) {
  const piece = pieceBySlug((await params).slug);
  const line = piece && lineBySlug(piece.line);
  if (!piece || !line) notFound();
  const others = PIECES.filter((p) => p.line === piece.line && p.slug !== piece.slug).slice(0, 4);
  const modular = piece.line === "modular";

  return (
    <>
      <SiteHeader />
      <main id="main" className={catalog.page}>
        <Trail
          steps={[
            { href: routes.collection, label: "Collection" },
            { href: lineOf(line.slug), label: line.name },
          ]}
          here={piece.name}
        />

        <PieceView piece={piece} />

        {modular && (
          <section className={styles.details} aria-labelledby="changes">
            <h2 id="changes" className={styles.heading}>
              What you can change
            </h2>
            <ul className={styles.changes}>
              {changesOf(piece).map((c) => (
                <li key={c.name}>
                  <span className={styles.changeName}>{c.name}</span>
                  <span>{c.line}</span>
                  <span className={styles.changeCost}>{c.cost}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.promised} aria-labelledby="promised">
          <h2 id="promised" className={styles.heading}>
            With every order
          </h2>
          <PromiseRow promises={modular ? PROMISES : FURNITURE_PROMISES} />
        </section>

        <section className={styles.details} aria-labelledby="details">
          <h2 id="details" className={styles.heading}>
            Details
          </h2>
          <dl className={styles.facts}>
            <dt>Sizes</dt>
            <dd>
              <ul className={styles.sizes}>
                {piece.sizes.map((s) => (
                  <li key={sizeName(s)}>
                    <span>{sizeName(s)}</span>
                    <span>{dims(s)}</span>
                    <span>
                      {sgd(s.price)}
                      {s.built && ` · built ${sgd(s.built)}`}
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
            <dt>Rooms</dt>
            <dd>{piece.rooms.join(", ")}</dd>
            <dt>Materials</dt>
            <dd>{SHARED.materials}</dd>
            <dt>Care</dt>
            <dd>{SHARED.care}</dd>
            <dt>Delivery</dt>
            <dd>{SHARED.delivery}</dd>
            <dt>Returns</dt>
            <dd>{SHARED.returns}</dd>
          </dl>
        </section>

        {others.length > 0 && (
          <section className={styles.others} aria-labelledby="others">
            <h2 id="others" className={styles.heading}>
              More {line.name.toLowerCase()}
            </h2>
            <ul className={catalog.grid}>
              {others.map((p) => (
                <PieceCard key={p.slug} piece={p} />
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
