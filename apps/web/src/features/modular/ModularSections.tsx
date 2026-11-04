import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { fromPrice, pieceBySlug, PIECES } from "@/features/catalog/catalog";
import { PieceCard } from "@/features/catalog/PieceCard";
import catalog from "@/features/catalog/Catalog.module.css";
import shared from "@/features/collection/Collection.module.css";
import { Section } from "@/features/collection/Sections";
import { lineOf, pieceOf } from "@/lib/routes";
import { sgd } from "@/lib/money";
import {
  FEATURES,
  FEATURES_LIMIT,
  LEAD_HEAD,
  LEADS,
  SETS,
  SETS_HEAD,
  COLLAGE,
  SWATCHES,
  SWATCHES_HEAD,
  WALLS,
} from "./modularList";
import { mailAbout, MAILTO } from "@/lib/contact";
import styles from "./Modular.module.css";

/** What makes a piece modular, three short panels on the cream. */
export function Features() {
  return (
    <Section id="features-title" label="Modular" title="Why modular" rest="Made to the room you have">
      <ul className={styles.features}>
        {FEATURES.map((f) => (
          <li key={f.name}>
            <h3 className={styles.featureName}>{f.name}</h3>
            <p className={shared.cardLine}>{f.line}</p>
          </li>
        ))}
      </ul>
      <p className={styles.featuresLimit}>{FEATURES_LIMIT}</p>
    </Section>
  );
}

/** The week scale runs to the longest lead time, so every line is measured on the same ruler. */
const SPAN = Math.max(...LEADS.map((l) => l.lead[1]));

/**
 * How long each way takes, drawn as measuring lines: a thin line from the
 * order to the scale's end, and over it a thicker one across the weeks the
 * piece may arrive in. The weeks are said in words too.
 */
export function LeadTimes() {
  return (
    <Section id="lead-title" {...LEAD_HEAD}>
      <ul className={styles.leads}>
        {LEADS.map((l) => (
          <li key={l.name} className={styles.lead}>
            <span className={styles.leadName}>{l.name}</span>
            <span
              className={styles.leadLine}
              style={
                { "--from": `${(l.lead[0] / SPAN) * 100}%`, "--to": `${(l.lead[1] / SPAN) * 100}%` } as CSSProperties
              }
              aria-hidden="true"
            />
            <span className={styles.leadWeeks}>{l.weeks}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/**
 * The finishes: close-ups laid over each other on the left; on the right the
 * title, why it matters, every finish as a labelled sample (today's and the
 * ones coming), and how to see them.
 */
export function Swatches() {
  return (
    <section className={`${shared.section} ${styles.finishes}`} aria-labelledby="swatches-title">
      <div className={styles.collage} aria-hidden="true">
        {COLLAGE.map((c) => (
          <div key={c.spot} className={styles.tile} data-spot={c.spot}>
            <Image
              src={c.photo}
              alt=""
              fill
              sizes="(max-width: 1023px) 70vw, 36vw"
              style={{ objectPosition: c.focus }}
            />
          </div>
        ))}
      </div>
      <div className={styles.finishWords}>
        <h2 id="swatches-title" className={styles.finishTitle}>
          <span className={shared.headingLabel}>{SWATCHES_HEAD.label}</span>
          {SWATCHES_HEAD.title}
        </h2>
        {SWATCHES_HEAD.lines.map((l) => (
          <p key={l} className={styles.finishLine}>
            {l}
          </p>
        ))}
        <ul className={styles.swatches}>
          {SWATCHES.map((s) => (
            <li key={s.name}>
              <span className={styles.sample} data-fill={s.fill} aria-hidden="true" />
              <span className={styles.swatchName}>{s.name}</span>
              <span className={styles.soon} data-now={s.now || undefined}>
                {s.now ? SWATCHES_HEAD.now : SWATCHES_HEAD.soon}
              </span>
            </li>
          ))}
        </ul>
        <p className={styles.finishNote}>
          <a className={shared.qaMail} href={MAILTO}>
            {SWATCHES_HEAD.line}
          </a>
        </p>
      </div>
    </section>
  );
}

/** Separator walls: what they are, what they can't do, and the walls themselves. */
export function Walls() {
  const walls = PIECES.filter((p) => p.wall);
  return (
    <section className={shared.section} aria-labelledby="walls-title">
      <div className={styles.walls}>
        <h2 id="walls-title" className={shared.heading}>
          <span className={shared.headingLabel}>Room dividers</span>
          {WALLS.title} <span className={shared.headingRest}>{WALLS.rest}</span>
        </h2>
        <div className={styles.wallsSide}>
          <p className={shared.cardLine}>{WALLS.line}</p>
          <ul className={styles.limits}>
            {WALLS.limits.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <Link className={shared.explore} href={lineOf("walls")}>
            See the walls with every piece
          </Link>
        </div>
      </div>
      <ul className={catalog.grid}>
        {walls.map((p) => (
          <PieceCard key={p.slug} piece={p} />
        ))}
      </ul>
    </section>
  );
}

/**
 * Sets: each a room's photo joined to a light orange panel, the two
 * swapping sides from one set to the next. A circle on the photo marks each
 * piece, naming it when pointed at or tabbed to, and leads to its page; the
 * panel says what the set is, what it costs together, what it contains,
 * and how to ask about it.
 */
export function Sets() {
  return (
    <Section id="sets-title" {...SETS_HEAD}>
      <ul className={styles.sets}>
        {SETS.map((set) => {
          const pieces = set.pieces.flatMap((s) => {
            const piece = pieceBySlug(s.slug);
            return piece ? [{ ...s, piece, price: fromPrice(piece) }] : [];
          });
          return (
            <li key={set.name} className={styles.set}>
              <div className={styles.setPhoto}>
                <Image src={set.photo} alt={set.alt} fill sizes="(max-width: 1023px) 100vw, 58vw" />
                <span
                  className={shared.spotFrame}
                  style={{ "--photo-ratio": set.photo.width / set.photo.height } as CSSProperties}
                >
                  {pieces.map((p) => (
                    <Link
                      key={p.slug}
                      className={styles.setSpot}
                      href={pieceOf(p.slug)}
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                      data-edge={p.x > 75 || undefined}
                      aria-label={`${p.piece.name}, ${sgd(p.price)}`}
                    >
                      <span className={shared.spotDot} aria-hidden="true" />
                      <span className={styles.setSpotName} aria-hidden="true">
                        {p.piece.name}
                      </span>
                    </Link>
                  ))}
                </span>
              </div>
              <div className={styles.setSide}>
                <h3 className={shared.promiseName}>{set.name}</h3>
                <p className={shared.promiseLine}>{set.line}</p>
                <p className={styles.setPrice}>{sgd(pieces.reduce((sum, p) => sum + p.price, 0))} together, in parts</p>
                <div className={styles.setContains}>
                  <p className={shared.cardLabel}>Contains</p>
                  <ul className={styles.setPieces}>
                    {pieces.map((p) => (
                      <li key={p.slug}>
                        <span>{p.piece.name}</span>
                        <span>{sgd(p.price)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a className={shared.outline} href={mailAbout(`About the ${set.name.toLowerCase()}`)}>
                  Ask about this set
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
