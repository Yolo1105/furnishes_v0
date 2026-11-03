import { useSyncExternalStore } from "react";
import type { Lead } from "@/features/catalog/catalog";

const DAY = new Intl.DateTimeFormat("en-SG", { day: "numeric", month: "short" });
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** The dates an order placed on `today` would arrive between, as "28 Dec – 11 Jan". */
export const arrivesBetween = (today: Date, [from, to]: Lead) =>
  `${DAY.format(today.getTime() + from * WEEK_MS)} – ${DAY.format(today.getTime() + to * WEEK_MS)}`;

// Today never changes while the page is open, so there is nothing to subscribe to.
const noChange = () => () => {};
const todayKey = () => new Date().toDateString();

/**
 * Today's date in the visitor's browser, or null while the page is built
 * ahead of time and while it first loads, so a built page never shows a stale date.
 */
export function useToday() {
  const key = useSyncExternalStore(noChange, todayKey, () => null);
  return key ? new Date(key) : null;
}
