"use client";

import Image from "next/image";
import Link from "next/link";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import { routes } from "@/lib/routes";
import { Arrow } from "@/shell/Arrow";
import { ALL_ROOMS, IDEAS } from "./inspirationList";
import styles from "./Inspiration.module.css";

/** The "all rooms" card's place in the row, after the rooms. */
const ALL = IDEAS.length;

/** The card open on arrival: the second, on the owner's word, so the row opens away from its edge. */
const FIRST_OPEN = 1;

/** How long each card stays open while the row plays on its own, in ms. */
const PLAY = 3500;

/**
 * Whether the pointer itself moved. Opening a card resizes the row, which
 * slides another card under a resting pointer; the browser then reports the
 * pointer as over that card with no movement, which opened it in turn, and
 * the row kept switching on its own. Only a real move opens a card.
 */
const moved = (e: PointerEvent) => e.movementX !== 0 || e.movementY !== 0;

/**
 * Inspiration: one line across the top, then a row of rooms standing on a
 * common floor. One card is open at a time, larger than the rest, with its
 * name and line over it. The row opens each card in turn on its own;
 * moving the pointer over a card or tabbing to one opens it and holds the
 * row. The row fills most of the screen, so a pointer merely resting on it
 * doesn't hold it: play goes on a turn after the pointer last moved, or once
 * focus leaves. With reduced motion asked for, it
 * stays still. The last card leads on to every piece.
 */
export function Inspiration() {
  const [open, setOpen] = useState(FIRST_OPEN);
  const [focused, setFocused] = useState(false);
  const lastMove = useRef(0);

  useEffect(() => {
    if (focused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (performance.now() - lastMove.current >= PLAY) setOpen((n) => (n + 1) % (ALL + 1));
    }, PLAY);
    return () => clearInterval(timer);
  }, [focused]);

  /* a real move over a card opens it and holds play for a turn; the event's
     time is on the same clock as performance.now() */
  const pointAt = (e: PointerEvent, n: number) => {
    if (!moved(e)) return;
    lastMove.current = e.timeStamp;
    setOpen(n);
  };

  return (
    <section className={styles.page} aria-labelledby="inspiration-title">
      <div className={styles.head}>
        <h1 id="inspiration-title" className={styles.title}>
          Real rooms in HDB flats and offices, each furnished to fit…{" "}
          <Link className={styles.more} href={routes.collection}>
            See the collection
          </Link>
        </h1>
      </div>

      <ul className={styles.row} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
        {IDEAS.map((idea, n) => (
          <li key={idea.key} className={styles.item} data-open={open === n || undefined}>
            <p className={styles.caption}>
              <span className={styles.name}>{idea.name}</span>
              <span className={styles.line}>
                {idea.line}
                <Arrow className={styles.arrow} />
              </span>
            </p>
            <button
              type="button"
              className={styles.card}
              aria-label={`${idea.name}: ${idea.line}`}
              aria-pressed={open === n}
              onPointerMove={(e) => pointAt(e, n)}
              onFocus={() => setOpen(n)}
              onClick={() => setOpen(n)}
            >
              <Image src={idea.photo} alt="" fill sizes="(max-width: 1023px) 70vw, 25vw" />
            </button>
          </li>
        ))}

        <li className={styles.item} data-open={open === ALL || undefined}>
          <p className={styles.caption}>
            <span className={styles.name}>{ALL_ROOMS.name}</span>
            <span className={styles.line}>
              {ALL_ROOMS.line}
              <Arrow className={styles.arrow} />
            </span>
          </p>
          <Link
            className={styles.card}
            href={ALL_ROOMS.href}
            aria-label={`${ALL_ROOMS.name}: ${ALL_ROOMS.line}`}
            onPointerMove={(e) => pointAt(e, ALL)}
            onFocus={() => setOpen(ALL)}
          >
            <Image src={IDEAS[0]!.photo} alt="" fill sizes="(max-width: 1023px) 70vw, 25vw" />
          </Link>
        </li>
      </ul>
    </section>
  );
}
