"use client";

import { useSyncExternalStore } from "react";
import { PIECES, type Finish, type Piece } from "@/features/catalog/catalog";
import { routes } from "@/lib/routes";
import { asks, LOOKS_FOR, WELCOME, type Who } from "./welcomeList";

/** The welcome's answers as kept: each question's values, by its id. */
export type Profile = Record<string, readonly string[]>;

/** The answers, read once a visit; none if never answered or unreadable. */
let kept: Profile | null | undefined;

function read(): Profile | null {
  if (kept === undefined) {
    try {
      const raw = JSON.parse(localStorage.getItem(WELCOME.key) ?? "null") as unknown;
      kept = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Profile) : null;
    } catch {
      kept = null;
    }
  }
  return kept;
}

// the answers change only on the welcome, which leaves the page, so nothing here listens
const subscribe = () => () => {};

/** The welcome's answers, or null on the server and before any are given. */
export function useProfile() {
  return useSyncExternalStore(subscribe, read, () => null);
}

export const whoOf = (p: Profile): Who => (p.who?.[0] === "company" ? "company" : "home");

/** The finish leaned to, if one was picked rather than "not sure". */
export function finishOf(p: Profile): Finish["slug"] | undefined {
  const f = p.finish?.[0];
  return f === "birch" || f === "walnut" || f === "red" ? f : undefined;
}

/** The answers as one short line, the picked names joined, as the welcome's summary has them. */
export function told(p: Profile) {
  return asks(whoOf(p))
    .filter((a) => a.id !== "when")
    .flatMap((a) => (p[a.id] ?? []).map((v) => a.options.find((o) => o.value === v)?.name ?? v))
    .filter((name) => name !== "Not sure yet" && name !== "Ideas first")
    .join(", ");
}

/**
 * Our pieces in the order the answers suit them: one an office needs or a
 * home's rooms hold first, then one that matches what they're looking for,
 * then one in the finish leaned to; ties keep the catalogue's order.
 */
export function suited(p: Profile): Piece[] {
  const office = whoOf(p) === "company";
  const finish = finishOf(p);
  const looks = (p.looking ?? []).flatMap((v) => LOOKS_FOR[v] ?? []);
  const score = (piece: Piece) =>
    (office === piece.rooms.includes("Office") ? 4 : 0) +
    (looks.some(
      (l) => (l.wall && piece.wall) || l.kinds?.includes(piece.kind) || l.rooms?.some((r) => piece.rooms.includes(r)),
    )
      ? 2
      : 0) +
    (finish && piece.finishes.includes(finish) ? 1 : 0);
  return PIECES.map((piece, n) => ({ piece, n, s: score(piece) }))
    .sort((a, b) => b.s - a.s || a.n - b.n)
    .map((x) => x.piece);
}

/** The welcome again, coming back to `back` once done. */
export const answerAgain = (back: string) => `${routes.welcome}?${new URLSearchParams({ next: back })}`;
