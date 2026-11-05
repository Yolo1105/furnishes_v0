"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { fromPrice, PIECES } from "@/features/catalog/catalog";
import { shopHref } from "@/features/catalog/filters";
import { sgd } from "@/lib/money";
import { pieceOf } from "@/lib/routes";
import styles from "./Search.module.css";

/** How many rows the list under the field shows, so it never runs long. */
const MOST = 6;

/**
 * The bar's search: a magnifier only, on the owner's word, that opens a
 * field growing leftwards along the bar. Nothing drops under it on opening,
 * on the owner's word; once something is typed, a short list under it
 * shows the pieces whose name, kind or line match, each leading to its
 * page, and Enter opens the first. It closes on Escape,
 * on a click elsewhere, or on choosing a row. In the phone's menu (`inMenu`)
 * the field stands open on its row and the list sits under it in the menu.
 */
export function Search({ className, inMenu }: { className?: string | undefined; inMenu?: boolean }) {
  const id = useId();
  const box = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const shown = inMenu || open;

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  // a click outside the field or its list, or Escape, folds it away; once
  // open and shown, the field takes focus, so typing starts the search
  useEffect(() => {
    if (!open) return;
    field.current?.focus();
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const q = query.trim().toLowerCase();
  const found = q
    ? PIECES.filter((p) => [p.name, p.kind, p.tagline].some((s) => s.toLowerCase().includes(q))).slice(0, MOST)
    : [];

  const rows = found.length
    ? found.map((p) => (
        <li key={p.slug}>
          <Link className={styles.row} href={pieceOf(p.slug)} onClick={close}>
            <span className={styles.rowName}>
              {p.name}
              <span className={styles.kind}>{p.kind}</span>
            </span>
            <span className={styles.rowSide}>from {sgd(fromPrice(p))}</span>
          </Link>
        </li>
      ))
    : [
        <li key="none">
          <Link className={styles.row} href={shopHref({})} onClick={close}>
            <span className={styles.rowName}>Nothing by that name yet. See every piece</span>
          </Link>
        </li>,
      ];

  // Sora, as on the pages under the bar, on the owner's word
  return (
    <div
      ref={box}
      className={[styles.search, inMenu && styles.inMenu, className].filter(Boolean).join(" ")}
      data-open={shown || undefined}
      data-searching={open || undefined}
      data-type-trial="search"
    >
      <label className={styles.field}>
        <span className="visually-hidden">What are you looking for?</span>
        <input
          ref={field}
          id={`${id}-field`}
          type="search"
          placeholder="What are you looking for?"
          value={query}
          tabIndex={shown ? 0 : -1}
          aria-controls={`${id}-list`}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            // Enter opens the first piece found, as the top of the list
            if (e.key !== "Enter" || !found[0]) return;
            close();
            router.push(pieceOf(found[0].slug));
          }}
        />
      </label>
      {!inMenu && (
        <button
          type="button"
          className={styles.open}
          aria-label={open ? "Close search" : "Search"}
          aria-expanded={open}
          onClick={() => {
            if (open) return close();
            setOpen(true);
          }}
        >
          <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" />
          </svg>
        </button>
      )}
      {shown && q && (
        <ul id={`${id}-list`} className={styles.drop} aria-live="polite">
          {rows}
        </ul>
      )}
    </div>
  );
}
