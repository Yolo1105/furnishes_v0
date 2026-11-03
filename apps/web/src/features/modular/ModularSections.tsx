import Link from "next/link";
import type { CSSProperties } from "react";
import { PIECES } from "@/features/catalog/catalog";
import { PieceCard } from "@/features/catalog/PieceCard";
import catalog from "@/features/catalog/Catalog.module.css";
import shared from "@/features/collection/Collection.module.css";
import { Section } from "@/features/collection/Sections";
import { lineOf } from "@/lib/routes";
import { FEATURES, FEATURES_LIMIT, LEAD_HEAD, LEADS, SWATCHES, SWATCHES_HEAD, WALLS } from "./modularList";
import { MAILTO } from "@/lib/contact";
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

/** The finishes coming next, as flat samples with their names, each marked as coming. */
export function Swatches() {
  return (
    <Section id="swatches-title" label={SWATCHES_HEAD.label} title={SWATCHES_HEAD.title} rest={SWATCHES_HEAD.rest}>
      <ul className={styles.swatches}>
        {SWATCHES.map((s) => (
          <li key={s.name}>
            <span className={styles.sample} data-fill={s.fill} aria-hidden="true" />
            <span className={styles.swatchName}>{s.name}</span>
            <span className={styles.soon}>{SWATCHES_HEAD.soon}</span>
          </li>
        ))}
      </ul>
      <p className={styles.featuresLimit}>
        <a className={shared.qaMail} href={MAILTO}>
          {SWATCHES_HEAD.line}
        </a>
      </p>
    </Section>
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
