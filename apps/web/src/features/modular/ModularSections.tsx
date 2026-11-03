import Link from "next/link";
import { PIECES } from "@/features/catalog/catalog";
import { PieceCard } from "@/features/catalog/PieceCard";
import catalog from "@/features/catalog/Catalog.module.css";
import shared from "@/features/collection/Collection.module.css";
import { Section } from "@/features/collection/Sections";
import { lineOf } from "@/lib/routes";
import { FEATURES, WALLS } from "./modularList";
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
