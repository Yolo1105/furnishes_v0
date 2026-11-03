"use client";

import { useRef, useState } from "react";
import { PIECES } from "./catalog";
import {
  clearPicked,
  countOf,
  type Filters,
  type GroupKey,
  GROUPS,
  passes,
  pickedLabels,
  SORTS,
  type SortKey,
  sortBy,
  tabOf,
  TABS,
  writeFilters,
} from "./filters";
import { PieceCard } from "./PieceCard";
import styles from "./Catalog.module.css";

const plural = (n: number) => `${n} ${n === 1 ? "piece" : "pieces"}`;

/**
 * Every piece, as a shop: the line and the sort across the top, what is
 * chosen under them, the groups to narrow by on the left (a sheet on
 * phones), and the pieces. Each choice is written to the address, so
 * coming back to the list or sharing it keeps it.
 */
export function Shop({ initial }: { initial: Filters }) {
  const [f, setF] = useState(initial);
  const sheet = useRef<HTMLDialogElement>(null);

  const update = (next: Filters) => {
    setF(next);
    window.history.replaceState(null, "", `${window.location.pathname}${writeFilters(next)}`);
  };

  const toggle = (key: GroupKey, value: string) => {
    const now = f.picked[key];
    const picked = now.includes(value) ? now.filter((v) => v !== value) : [...now, value];
    update({ ...f, picked: { ...f.picked, [key]: picked } });
  };

  const tab = tabOf(f.tab);
  const inTab = PIECES.filter(tab.has);
  const shown = sortBy(
    PIECES.filter((p) => passes(p, f)),
    f.sort,
  );
  const active = pickedLabels(f);

  const panel = GROUPS.map((g) => {
    const on = f.picked[g.key];
    return (
      <details key={g.key} className={styles.facet} open>
        <summary>
          {g.label}
          {on.length > 0 && <span className={styles.facetOn}> · {on.length}</span>}
        </summary>
        <div className={styles.checks}>
          {g.options(inTab).map((o) => {
            const checked = on.includes(o.value);
            const n = countOf(f, g.key, o.value);
            return (
              <label key={o.value} className={styles.check}>
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={n === 0 && !checked}
                  onChange={() => toggle(g.key, o.value)}
                />
                {o.finish && <span className={styles.swatch} data-finish={o.finish} aria-hidden="true" />}
                <span>{o.label}</span>
                <span className={styles.checkCount}>{n}</span>
              </label>
            );
          })}
        </div>
      </details>
    );
  });

  return (
    <>
      <h1 className={styles.title}>
        {tab.title}{" "}
        <span className={styles.titleRest} aria-live="polite">
          {plural(shown.length)}
        </span>
      </h1>

      <div className={styles.top}>
        <div className={styles.group} role="group" aria-label="Line">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={styles.chip}
              aria-pressed={f.tab === t.key}
              onClick={() => update({ ...f, tab: t.key, picked: { ...f.picked, kind: [] } })}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`${styles.chip} ${styles.filtersButton}`}
          onClick={() => sheet.current?.showModal()}
        >
          Filters{active.length > 0 && ` · ${active.length}`}
        </button>
        <label className={styles.sort}>
          <span>Sort</span>
          <select value={f.sort} onChange={(e) => update({ ...f, sort: e.target.value as SortKey })}>
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {active.length > 0 && (
        <div className={styles.active} role="group" aria-label="Chosen filters">
          {active.map((a) => (
            <button
              key={`${a.key}-${a.value}`}
              type="button"
              className={styles.chip}
              aria-label={`Remove ${a.label}`}
              onClick={() => toggle(a.key, a.value)}
            >
              {a.label} <span aria-hidden="true">✕</span>
            </button>
          ))}
          <button type="button" className={styles.clear} onClick={() => update(clearPicked(f))}>
            Clear all
          </button>
        </div>
      )}

      <div className={styles.shop}>
        <aside className={styles.side} aria-label="Filters">
          {panel}
        </aside>

        {shown.length > 0 ? (
          <ul className={styles.grid}>
            {shown.map((p) => (
              <PieceCard key={p.slug} piece={p} />
            ))}
          </ul>
        ) : (
          <p className={styles.none}>Nothing matches all of these. Remove a filter, or clear them all.</p>
        )}
      </div>

      <dialog ref={sheet} className={styles.sheet} aria-label="Filters">
        <div className={styles.sheetHead}>
          <p className={styles.sheetTitle}>Filters</p>
          <button type="button" className={styles.clear} onClick={() => sheet.current?.close()}>
            Close
          </button>
        </div>
        <div className={styles.sheetBody}>{panel}</div>
        <div className={styles.sheetFoot}>
          <button type="button" className={styles.clear} onClick={() => update(clearPicked(f))}>
            Clear all
          </button>
          <button type="button" className={styles.show} onClick={() => sheet.current?.close()}>
            Show {plural(shown.length)}
          </button>
        </div>
      </dialog>
    </>
  );
}
