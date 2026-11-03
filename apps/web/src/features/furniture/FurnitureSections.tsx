import Image from "next/image";
import Link from "next/link";
import { pieceBySlug, type Piece } from "@/features/catalog/catalog";
import { PieceCard } from "@/features/catalog/PieceCard";
import catalog from "@/features/catalog/Catalog.module.css";
import shared from "@/features/collection/Collection.module.css";
import { Section } from "@/features/collection/Sections";
import { UnevenTiles } from "@/features/collection/UnevenTiles";
import { BESTSELLERS, FEATURED, FURNITURE_KINDS, MADE_BY, OWN_SIZE, SPOTLIGHT } from "./furnitureList";
import styles from "./Furniture.module.css";

const piecesOf = (slugs: readonly string[]) => slugs.map(pieceBySlug).filter((p): p is Piece => !!p);

/** The kinds as uneven tiles; each opens the list on that kind. */
export function Kinds() {
  return (
    <UnevenTiles
      id="kinds-title"
      label="Furniture"
      title="Shop by kind"
      rest="Sofas to storage"
      tiles={FURNITURE_KINDS}
    />
  );
}

/** Four pieces in a row, each with its kind over its name. */
export function Bestsellers() {
  return (
    <Section
      id="bestsellers-title"
      label="Popular"
      title={BESTSELLERS.title}
      rest={BESTSELLERS.rest}
      aside={BESTSELLERS.aside}
    >
      <ul className={catalog.grid}>
        {piecesOf(BESTSELLERS.slugs).map((p) => (
          <PieceCard key={p.slug} piece={p} kind />
        ))}
      </ul>
    </Section>
  );
}

/** The dark half with the offer, the photo half beside it. */
export function OwnSize() {
  return (
    <section className={styles.section} aria-labelledby="own-size-title">
      <div className={styles.split}>
        <div className={styles.dark}>
          <h2 id="own-size-title" className={styles.splitTitle}>
            <span className={`${shared.headingLabel} ${styles.splitLabel}`}>Modular</span>
            {OWN_SIZE.title} <span className={`${shared.headingRest} ${styles.splitRest}`}>{OWN_SIZE.rest}</span>
          </h2>
          <p className={styles.splitLine}>{OWN_SIZE.line}</p>
          <Link className={styles.light} href={OWN_SIZE.go.href}>
            {OWN_SIZE.go.label}
          </Link>
        </div>
        <div className={styles.splitPhoto}>
          <Image src={OWN_SIZE.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 50vw" />
        </div>
      </div>
    </section>
  );
}

/** One piece large and four beside it, with their names and prices only. */
export function Featured() {
  return (
    <Section id="featured-title" label="Our picks" title={FEATURED.title} rest={FEATURED.rest} aside={FEATURED.aside}>
      <ul className={catalog.featured}>
        {piecesOf(FEATURED.slugs).map((p) => (
          <PieceCard key={p.slug} piece={p} kind brief />
        ))}
      </ul>
    </Section>
  );
}

/** Who makes it: a wide photo, then the words on a tile beside it. */
export function MadeBy() {
  return (
    <section className={styles.section} aria-labelledby="made-by-title">
      <div className={styles.story}>
        <div className={styles.storyPhoto}>
          <Image src={MADE_BY.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 60vw" />
        </div>
        <div className={styles.storyWords}>
          <h2 id="made-by-title" className={styles.splitTitle}>
            <span className={`${shared.headingLabel} ${styles.splitLabel}`}>Our factory</span>
            {MADE_BY.title} <span className={`${shared.headingRest} ${styles.splitRest}`}>{MADE_BY.rest}</span>
          </h2>
          <p className={styles.splitLine}>{MADE_BY.line}</p>
          <Link className={styles.solid} href={MADE_BY.go.href}>
            {MADE_BY.go.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

/** One piece over a full-width photo, its label, headline, line and button centred on it. */
export function Spotlight() {
  return (
    <section className={styles.spotlight} aria-labelledby="spotlight-title">
      <span className={styles.spotlightPhoto}>
        <Image src={SPOTLIGHT.photo} alt="" fill sizes="100vw" />
      </span>
      <div className={styles.spotlightWords}>
        <p className={styles.spotlightLabel}>{SPOTLIGHT.label}</p>
        <h2 id="spotlight-title" className={styles.spotlightTitle}>
          {SPOTLIGHT.title}
        </h2>
        <p className={styles.spotlightLine}>{SPOTLIGHT.line}</p>
        <Link className={styles.light} href={SPOTLIGHT.go.href}>
          {SPOTLIGHT.go.label}
        </Link>
      </div>
    </section>
  );
}
