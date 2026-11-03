"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ROOMS, type RoomKey } from "./rooms";

/** How long each room holds while the words play through them on their own, ms. */
const AUTO_MS = 2800;

type RoomState = {
  /** The word chosen, by pointer, keyboard or the autoplay; null when none is. */
  chosen: RoomKey | null;
  /** The room shown: the chosen one, or the whole flat at rest. */
  shown: RoomKey;
  /** How many times the room shown has changed, so its words roll in only once it has. */
  turns: number;
  choose: (key: RoomKey | null) => void;
  /** Someone is pointing at the words or the plan: the autoplay waits until they leave. */
  hold: (held: boolean) => void;
};

const RoomContext = createContext<RoomState | null>(null);

const shownOf = (key: RoomKey | null): RoomKey => key ?? "home";

/**
 * The room chosen on the banner, shared with the flat's plan: pointing at a
 * word washes its room on the plan, and pointing at a room on the plan
 * chooses its word. With nobody pointing, the words play through the rooms
 * on their own, unless the visitor asks for less motion.
 */
export function RoomProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ chosen: RoomKey | null; turns: number }>({ chosen: null, turns: 0 });
  const [held, setHeld] = useState(false);
  const step = useRef(0);

  const choose = useCallback(
    (key: RoomKey | null) =>
      setState((s) => ({ chosen: key, turns: shownOf(s.chosen) === shownOf(key) ? s.turns : s.turns + 1 })),
    [],
  );
  const hold = useCallback((h: boolean) => setHeld(h), []);

  useEffect(() => {
    if (held || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      step.current = (step.current + 1) % ROOMS.length;
      choose(ROOMS[step.current]!.key);
    }, AUTO_MS);
    return () => clearInterval(timer);
  }, [held, choose]);

  const value = useMemo(
    () => ({ chosen: state.chosen, shown: shownOf(state.chosen), turns: state.turns, choose, hold }),
    [state, choose, hold],
  );
  return <RoomContext value={value}>{children}</RoomContext>;
}

export function useRoom() {
  const state = useContext(RoomContext);
  if (!state) throw new Error("useRoom needs a RoomProvider above it");
  return state;
}
