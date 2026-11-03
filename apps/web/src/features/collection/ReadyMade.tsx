"use client";

import { useRef, useState } from "react";
import { kindsOf, PIECES } from "@/features/catalog/catalog";
import { PieceCard } from "@/features/catalog/PieceCard";
import { READY } from "./collectionList";
import { Section } from "./Sections";
import styles from "./Collection.module.css";

const ALL = "All";
const TABS = [ALL, ...kindsOf("furniture")];
const FURNITURE = PIECES.filter((p) => p.line === "furniture");

/**
 * The ready-made pieces, as the owner's "Design Edit" reference: the kinds as
 * tabs, then the pieces of the one chosen in a row that runs off the page's
 * right edge and scrolls sideways by hand.
 */
export function ReadyMade() {
  const [tab, setTab] = useState(ALL);
  const row = useRef<HTMLUListElement>(null);
  const shown = tab === ALL ? FURNITURE : FURNITURE.filter((p) => p.kind === tab);

  const choose = (t: string) => {
    setTab(t);
    row.current?.scrollTo({ left: 0 });
  };

  return (
    <Section id="ready-title" label="Furniture" title={READY.title} rest={READY.line}>
      <div className={styles.tabs} role="group" aria-label="Kind">
        {TABS.map((t) => (
          <button key={t} type="button" className={styles.tab} aria-pressed={tab === t} onClick={() => choose(t)}>
            {t}
          </button>
        ))}
      </div>
      <ul ref={row} className={`${styles.row} ${styles.editRow}`}>
        {shown.map((p) => (
          <PieceCard key={p.slug} piece={p} kind brief stack />
        ))}
      </ul>
    </Section>
  );
}
