"use client";

import { useState } from "react";
import { FINISHES, kindsOf, type LineSlug, type Piece, PIECES } from "./catalog";
import { SORTS, type SortKey, sortBy } from "./filters";
import { PieceCard } from "./PieceCard";
import styles from "./Catalog.module.css";

type Chip = { key: string; label: string; has: (p: Piece) => boolean };

/** The line's kinds, after "All". */
const chipsOf = (line: LineSlug): readonly Chip[] => [
  { key: "all", label: "All", has: (p) => p.line === line },
  ...kindsOf(line).map((k) => ({ key: k, label: k, has: (p: Piece) => p.line === line && p.kind === k })),
];

/**
 * A line's pieces, on its own page, with one bar to narrow them by kind and
 * finish and to sort them by price; every piece, with the full filters, is
 * the shop's list.
 */
export function PieceList({ line }: { line: LineSlug }) {
  const chips = chipsOf(line);
  const [show, setShow] = useState("all");
  const [finish, setFinish] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("ours");

  const has = (chips.find((s) => s.key === show) ?? chips[0]!).has;
  const shown = sortBy(
    PIECES.filter(has).filter((p) => !finish || p.finishes.some((f) => f === finish)),
    sort,
  );

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.group} role="group" aria-label="Show">
          {chips.map((s) => (
            <button
              key={s.key}
              type="button"
              className={styles.chip}
              aria-pressed={show === s.key}
              onClick={() => setShow(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className={styles.group} role="group" aria-label="Finish">
          {FINISHES.map((f) => (
            <button
              key={f.slug}
              type="button"
              className={styles.chip}
              aria-pressed={finish === f.slug}
              onClick={() => setFinish(finish === f.slug ? null : f.slug)}
            >
              <span className={styles.swatch} data-finish={f.slug} aria-hidden="true" />
              {f.name}
            </button>
          ))}
        </div>

        <label className={styles.sort}>
          <span>Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className={styles.count} aria-live="polite">
        {shown.length} {shown.length === 1 ? "piece" : "pieces"}
      </p>

      {shown.length > 0 ? (
        <ul className={styles.grid}>
          {shown.map((p) => (
            <PieceCard key={p.slug} piece={p} />
          ))}
        </ul>
      ) : (
        <p className={styles.none}>Nothing here in that finish yet. Try another, or show all.</p>
      )}
    </>
  );
}
