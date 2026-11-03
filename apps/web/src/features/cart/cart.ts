"use client";

import { useSyncExternalStore } from "react";
import type { Arrival } from "@/features/catalog/catalog";

/**
 * One line in the cart: a piece, its size (by place in its sizes), finish,
 * how a modular piece arrives (null for ready-made furniture), and how many.
 */
export type Line = { piece: string; size: number; finish: string; arrival: Arrival | null; qty: number };
type Choice = Omit<Line, "qty">;

/** Where the cart is kept in the browser, so it survives a reload and reaches every page. */
const KEY = "furnishes-cart";

/** The most of one line a cart takes; past it, ask us. */
export const MAX_QTY = 9;

const NONE: readonly Line[] = [];
let lines: readonly Line[] | null = null;
const listeners = new Set<() => void>();

/** The cart as kept, read once; where the browser keeps nothing, it starts empty. */
function read(): readonly Line[] {
  if (lines === null) {
    try {
      lines = JSON.parse(localStorage.getItem(KEY) ?? "[]") as Line[];
    } catch {
      lines = NONE;
    }
  }
  return lines;
}

/** Changes the cart and keeps it; in a private window it lasts the visit. */
function write(next: readonly Line[]) {
  lines = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // the browser keeps nothing; the cart lives in memory
  }
  listeners.forEach((l) => l());
}

/** Listens for changes here and in the shop's other tabs. */
function subscribe(listener: () => void) {
  const fromOtherTab = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    lines = null;
    listener();
  };
  listeners.add(listener);
  addEventListener("storage", fromOtherTab);
  return () => {
    listeners.delete(listener);
    removeEventListener("storage", fromOtherTab);
  };
}

const same = (a: Choice, b: Choice) =>
  a.piece === b.piece && a.size === b.size && a.finish === b.finish && a.arrival === b.arrival;

/** Adds one of a choice, or one more if it's already in. */
function add(choice: Choice) {
  const ls = read();
  write(
    ls.some((l) => same(l, choice))
      ? ls.map((l) => (same(l, choice) ? { ...l, qty: Math.min(l.qty + 1, MAX_QTY) } : l))
      : [...ls, { ...choice, qty: 1 }],
  );
}

const setQty = (n: number, qty: number) => write(read().map((l, i) => (i === n ? { ...l, qty } : l)));
const remove = (n: number) => write(read().filter((_, i) => i !== n));

/** The cart's lines and the ways to change them; empty while the page is drawn on the server. */
export function useCart() {
  const current = useSyncExternalStore(subscribe, read, () => NONE);
  return { lines: current, add, setQty, remove };
}
