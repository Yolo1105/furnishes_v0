"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { fromPrice, pieceBySlug } from "@/features/catalog/catalog";
import { sgd } from "@/lib/money";
import { pieceOf } from "@/lib/routes";
import { Arrow } from "@/shell/Arrow";
import styles from "./Collection.module.css";

/**
 * A piece we sell, by its slug, or one not yet in the list, named here.
 * `zoom` is how far its card's picture closes in on the banner's photo, so a
 * small piece fills the picture as well as a large one: 8 times if not set.
 */
export type Spot = { x: number; y: number; zoom?: number } & (
  { slug: string } | { name: string; price: string; href: string; line: string; size?: string }
);

/** A spot's name, price, line, size and page, from the list when it is there. */
const describe = (s: Spot) => {
  if (!("slug" in s)) return s;
  const piece = pieceBySlug(s.slug);
  if (!piece) return null;
  const from = piece.sizes.length > 1 ? "from " : "";
  const first = piece.sizes[0];
  return {
    name: piece.name,
    price: `${from}${sgd(fromPrice(piece))}`,
    href: pieceOf(piece.slug),
    line: piece.tagline,
    size: first && `${first.w} × ${first.d} × ${first.h} mm`,
  };
};

/**
 * Each circle's pace and offset, spread by its place in the list rather than
 * chance, so the page draws the same on the server and in the browser: 2.6 to
 * 4.2 s a breath, started part way through.
 */
const breath = (n: number) =>
  ({
    "--breathe": `${2.6 + ((n * 0.7) % 1.6)}s`,
    "--breathe-delay": `${-((n * 1.3) % 3)}s`,
  }) as CSSProperties;

/** How long each card shows, in ms, its fades included: short, on the owner's word, still long enough to read it. */
const TURN = 4000;

/** A new card opens every half turn, so two are open at once, each started half a turn after the other. */
const STEP = TURN / 2;

/** How soon the first card opens, in ms: once the banner has settled, not a whole turn later. */
const FIRST = 900;

/**
 * The circle that opens at a step: every other one in the list when that
 * still reaches them all (an odd count), so the two cards open at once
 * belong to pieces apart from each other rather than neighbours.
 */
const at = (step: number, count: number) => (step * (count % 2 ? 2 : 1)) % count;

/**
 * Circles on the pieces in the banner's photo. Each card shows its piece
 * close up, cut from the banner's own photo, so the picture always matches
 * the room. The cards open on their own, two at a time, each starting half
 * a turn after the other, fading in over its piece and out again;
 * pointing at or tabbing to a circle holds its card open, grown to show the
 * piece's line and size, until the pointer leaves. Clicking a circle pins
 * that card open until the circle is clicked again, the page is clicked
 * elsewhere or Escape is pressed; the others wait meanwhile. With reduced motion asked for, they wait to be chosen. The
 * frame they sit in matches the photo as it is cropped, so each circle stays
 * on its piece at any screen size.
 */
export function BannerSpots({ spots, photo, ratio }: { spots: readonly Spot[]; photo: string; ratio: number }) {
  const [step, setStep] = useState<number | null>(null);
  const [held, setHeld] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const frame = useRef<HTMLSpanElement>(null);

  /* a pinned card shows alone, then a held one; otherwise the one opened at this step and the
     one opened at the step before, until the first step has none before it */
  const isOpen = (n: number) =>
    pinned !== null
      ? pinned === n
      : held !== null
        ? held === n
        : step !== null && (at(step, spots.length) === n || (step > 0 && at(step - 1, spots.length) === n));

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const first = setTimeout(() => {
      setStep(0);
      timer = setInterval(() => setStep((n) => (n ?? -1) + 1), STEP);
    }, FIRST);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [spots.length]);

  /* a pinned card closes on a click outside the circles or on Escape */
  useEffect(() => {
    if (pinned === null) return;
    const away = (e: PointerEvent) => {
      if (!frame.current?.contains(e.target as Node)) setPinned(null);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPinned(null);
    };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", key);
    };
  }, [pinned]);

  return (
    <span ref={frame} className={styles.spotFrame} style={{ "--photo-ratio": ratio } as CSSProperties}>
      {spots.map((s, n) => {
        const piece = describe(s);
        if (!piece) return null;
        const on = isOpen(n);
        return (
          <span
            key={piece.name}
            className={styles.spot}
            style={{ left: `${s.x}%`, top: `${s.y}%`, ...breath(n) }}
            data-edge={s.x > 75 || undefined}
            data-open={on || undefined}
            data-pinned={pinned === n || held === n || undefined}
            onPointerEnter={() => setHeld(n)}
            onPointerLeave={() => setHeld(null)}
          >
            <button
              type="button"
              className={styles.spotDot}
              aria-expanded={on}
              aria-label={`${piece.name}, ${piece.price}`}
              onClick={() => setPinned((p) => (p === n ? null : n))}
              onFocus={() => setHeld(n)}
              onBlur={() => setHeld(null)}
            />
            <Link className={styles.spotCard} href={piece.href}>
              <span
                className={styles.spotThumb}
                style={
                  {
                    "--x": s.x,
                    "--y": s.y,
                    "--zoom": s.zoom ?? 8,
                    backgroundImage: `url(${photo})`,
                  } as CSSProperties
                }
              />
              <span className={styles.spotWords}>
                <span className={styles.spotName}>{piece.name}</span>
                <span className={styles.spotPrice}>{piece.price}</span>
                <span className={styles.spotMore}>
                  <span>{piece.line}</span>
                  {piece.size && <span className={styles.spotSize}>{piece.size}</span>}
                  <span className={styles.spotSee}>See the piece</span>
                </span>
              </span>
              <Arrow className={styles.spotArrow} />
            </Link>
          </span>
        );
      })}
    </span>
  );
}
