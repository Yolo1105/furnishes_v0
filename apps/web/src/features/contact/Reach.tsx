import Link from "next/link";
import collection from "@/features/collection/Collection.module.css";
import { Icon } from "@/features/collection/Icon";
import { HELP_HEAD, HELP_WAYS, WHERE } from "./contactList";
import styles from "./Contact.module.css";

/**
 * The ways to help, after the owner's reference: the title over three
 * boxes, each its mark, name, line and a button to where that help is.
 */
export function HelpWays() {
  return (
    <section className={collection.section} aria-labelledby="help-ways-title">
      <h2 id="help-ways-title" className={collection.heading}>
        <span className={collection.headingLabel}>{HELP_HEAD.label}</span>
        {HELP_HEAD.title} <span className={collection.headingRest}>{HELP_HEAD.rest}</span>
      </h2>
      <ul className={styles.ways}>
        {HELP_WAYS.map((w) => (
          <li key={w.name} className={styles.way}>
            <Icon name={w.icon} />
            <h3 className={styles.cardName}>{w.name}</h3>
            <p className={styles.cardLine}>{w.line}</p>
            <Link className={styles.wayGo} href={w.go.href}>
              {w.go.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* Singapore's main island, drawn simply in a 400 × 300 frame with open
   water over it for the card, and the larger islands off it; a likeness,
   not a survey */
const ISLAND =
  "M22 190 L30 172 L44 162 L52 148 L70 132 L96 120 L120 110 L140 98 L160 86 L182 84 L200 92 L222 96 L236 110 L250 102 L272 106 L300 116 L326 124 L352 132 L372 138 L388 152 L384 168 L366 174 L340 182 L312 192 L282 206 L256 220 L236 230 L216 226 L196 230 L176 226 L150 218 L126 216 L104 212 L86 218 L70 212 L56 216 L40 208 L28 202 Z";
const ISLES = [
  { cx: 214, cy: 246, rx: 16, ry: 5 },
  { cx: 316, cy: 102, rx: 22, ry: 6 },
  { cx: 374, cy: 116, rx: 12, ry: 7 },
  { cx: 108, cy: 234, rx: 18, ry: 7 },
];
/* three expressways: west to east, and two north to south */
const ROADS = [
  "M50 190 C120 175 220 180 360 158",
  "M200 100 C204 150 206 190 222 222",
  "M120 114 C130 150 120 190 112 210",
];
/* the middle of the island, where the dot sits and the ring is centred */
const MID = { cx: 210, cy: 165 };

/**
 * Where we are, after the owner's map reference: Singapore on the left in
 * the planner's lines, a card on it saying we come to you, and on the right
 * the title and the two places that matter, each with its mark.
 */
export function Where() {
  return (
    <section className={`${collection.section} ${styles.where}`} aria-labelledby={WHERE.id}>
      <div className={styles.map}>
        <svg viewBox="0 0 400 300" role="img" aria-label={WHERE.map}>
          <path className={styles.island} d={ISLAND} />
          {ISLES.map((i) => (
            <ellipse key={i.cx} className={styles.island} {...i} />
          ))}
          {ROADS.map((d) => (
            <path key={d} className={styles.road} d={d} />
          ))}
          {/* the whole island ringed, as the area we visit, round one dot at its middle */}
          <ellipse className={styles.reach} {...MID} rx={188} ry={86} />
          <circle className={styles.halo} {...MID} r={12} />
          <circle className={styles.spot} {...MID} r={5} />
        </svg>
        {/* the card stands over the map's top left on purpose, as the reference's */}
        <div className={styles.mapCard}>
          <p className={styles.cardName}>{WHERE.card.name}</p>
          <p className={styles.mapPlace}>{WHERE.card.place}</p>
          {WHERE.card.lines.map((l) => (
            <p key={l} className={styles.cardLine}>
              {l}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.whereWords}>
        <h2 id={WHERE.id} className={collection.heading}>
          <span className={collection.headingLabel}>{WHERE.label}</span>
          {WHERE.title}
        </h2>
        <p className={styles.whereRest}>{WHERE.rest}</p>
        <ul className={styles.places}>
          {WHERE.places.map((p) => (
            <li key={p.name}>
              <Icon name={p.icon} />
              <div>
                <p className={styles.cardName}>{p.name}</p>
                <p className={styles.cardLine}>{p.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
