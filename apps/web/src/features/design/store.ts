"use client";

import { useSyncExternalStore } from "react";
import { START } from "./designList";
import type { Plan } from "./room";

/**
 * The room being drawn, kept in the browser as the cart is, so it survives
 * a reload; saved rooms move to the account once real accounts exist.
 */
const KEY = "furnishes-room";

let plan: Plan | null = null;
const listeners = new Set<() => void>();

/** The room as kept, read once; anything unreadable starts the room afresh. */
function read(): Plan {
  if (plan === null) {
    try {
      const kept = JSON.parse(localStorage.getItem(KEY) ?? "null") as Plan | null;
      plan = kept?.room && Array.isArray(kept.pieces) ? kept : START;
    } catch {
      plan = START;
    }
  }
  return plan;
}

function write(next: Plan) {
  plan = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // the browser keeps nothing; the room lasts the visit
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The room and the way to change it; the starting room while the page is drawn on the server. */
export function useRoom() {
  return [useSyncExternalStore(subscribe, read, () => START), write] as const;
}
