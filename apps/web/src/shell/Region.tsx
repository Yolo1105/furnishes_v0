"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { HOME, LANGUAGES, REGIONS } from "@/lib/regions";
import styles from "./Region.module.css";

/** Where the choice is kept in the browser, so it holds between visits. */
const KEY = "furnishes-region";

/* the chosen region's code, read from the browser and shared by every
   reader; the server and the first paint assume home */
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  addEventListener("storage", fn);
  return () => {
    listeners.delete(fn);
    removeEventListener("storage", fn);
  };
};
const read = () => {
  try {
    return localStorage.getItem(KEY) ?? HOME.code;
  } catch {
    return HOME.code;
  }
};
const save = (code: string) => {
  try {
    localStorage.setItem(KEY, code);
  } catch {
    // a browser that keeps nothing still shows the choice for this visit
  }
  listeners.forEach((fn) => fn());
};

type Tab = "region" | "language";

/** The language in use; English until another is written. */
const LANGUAGE = LANGUAGES.find((l) => l.ready) ?? LANGUAGES[0]!;

/**
 * The bar's region and language: the currency and language in use, opening
 * a sheet from the right with two tabs, laid out after the owner's
 * reference: every place we deliver, searchable, and the languages. Words
 * only, no flags, on the owner's word. Orders are billed in Singapore
 * dollars whatever the place, and the sheet says so; languages not
 * written yet show as coming. `className` places the button: the bar shows
 * one, and on a phone the menu another.
 */
export function Region({ className }: { className?: string | undefined }) {
  const id = useId();
  const code = useSyncExternalStore(subscribe, read, () => HOME.code);
  const region = REGIONS.find((r) => r.code === code) ?? HOME;
  const sheet = useRef<HTMLDialogElement>(null);
  const [tab, setTab] = useState<Tab>("region");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown = q
    ? REGIONS.filter((r) => r.name.toLowerCase().includes(q) || r.currency.toLowerCase().includes(q))
    : REGIONS;

  const close = () => sheet.current?.close();

  const tabButton = (t: Tab, label: string) => (
    <button
      type="button"
      role="tab"
      id={`${id}-${t}-tab`}
      className={styles.tab}
      aria-selected={tab === t}
      aria-controls={`${id}-${t}`}
      onClick={() => setTab(t)}
    >
      {label}
    </button>
  );

  return (
    <>
      <button
        type="button"
        className={className ? `${styles.open} ${className}` : styles.open}
        aria-label={`Shipping to ${region.name}, in ${region.currency}, in ${LANGUAGE.name}. Change`}
        onClick={() => sheet.current?.showModal()}
      >
        {region.currency}
        <span className={styles.dot} aria-hidden="true">
          ·
        </span>
        {LANGUAGE.code}
        <svg className={styles.chevron} viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2 4.5 6 8.5l4-4" />
        </svg>
      </button>

      {/* a click on the dim backdrop lands on the dialog itself, and closes it */}
      <dialog
        ref={sheet}
        className={styles.sheet}
        aria-labelledby={`${id}-title`}
        onClick={(e) => e.target === e.currentTarget && close()}
        onClose={() => {
          setQuery("");
          setTab("region");
        }}
      >
        <div className={styles.inner}>
          <div className={styles.head}>
            <h2 id={`${id}-title`} className={styles.title}>
              Region and language
            </h2>
            <button type="button" className={styles.close} aria-label="Close" onClick={close}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 3l10 10M13 3 3 13" />
              </svg>
            </button>
          </div>

          <div className={styles.tabs} role="tablist">
            {tabButton("region", "Country or region")}
            {tabButton("language", "Language")}
          </div>

          {tab === "region" ? (
            <div id={`${id}-region`} role="tabpanel" aria-labelledby={`${id}-region-tab`} className={styles.panel}>
              <div className={styles.now}>
                <p className={styles.nowName}>
                  {region.name}
                  <span className={styles.nowCurrency}>
                    {region.currency} {region.symbol}
                  </span>
                </p>
                <p className={styles.nowLine}>
                  You are shipping to {region.name}, and your order will be billed in Singapore dollars (S$).
                </p>
              </div>

              <label className={styles.search}>
                <span className="visually-hidden">Search for a country or region</span>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <circle cx="7" cy="7" r="4.5" />
                  <path d="m10.5 10.5 3 3" />
                </svg>
                <input
                  type="search"
                  placeholder="Search location…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>

              <ul className={styles.list}>
                {shown.map((r) => (
                  <li key={r.code}>
                    <button
                      type="button"
                      className={styles.row}
                      aria-pressed={r.code === region.code}
                      onClick={() => {
                        save(r.code);
                        close();
                      }}
                    >
                      <span className={styles.rowName}>{r.name}</span>
                      <span>
                        {r.currency} {r.symbol}
                      </span>
                    </button>
                  </li>
                ))}
                {shown.length === 0 && <li className={styles.none}>No place by that name yet.</li>}
              </ul>
            </div>
          ) : (
            <div
              id={`${id}-language`}
              role="tabpanel"
              aria-labelledby={`${id}-language-tab`}
              className={`${styles.panel} ${styles.panelPlain}`}
            >
              <p className={styles.nowLine}>The site is in English for now. The others are coming.</p>
              <ul className={styles.list}>
                {LANGUAGES.map((l) => (
                  <li key={l.code}>
                    <button
                      type="button"
                      className={styles.row}
                      aria-pressed={l.code === LANGUAGE.code}
                      disabled={!l.ready}
                      onClick={close}
                    >
                      <span className={styles.rowName} lang={l.code.toLowerCase()}>
                        {l.name}
                      </span>
                      <span>{l.ready ? l.code : "Coming"}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
