"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { routes } from "@/lib/routes";
import { FloorPlan } from "@/features/plan/FloorPlan";
import { useRoom } from "@/features/rooms/RoomContext";
import { roomOf, type RoomKey } from "@/features/rooms/rooms";
import { BOOKCASE, BOOKCASE_LABEL_Y, BOOKCASE_SIZE, ORDER, ORDER_DONE, TOUR } from "./tour";
import styles from "./FlatTour.module.css";

/** The rooms on the plan that have a word on the banner. */
const LINKED: readonly RoomKey[] = ["living", "study", "kitchen", "hallway"];

/** How much of a screen's scroll each step holds for; the CSS's --hold. */
const HOLD = 0.8;

/** Over the last quarter of each step, the scale glides to the next mark. */
const GLIDE = 0.25;

/** The scale's ticks, every fifth of a step, and its marks, one a step, from three before the door to three past the end. */
const RULER_FROM = -3;
const RULER_TO = TOUR.length + 2;
const TICKS = Array.from({ length: (RULER_TO - RULER_FROM) * 5 + 1 }, (_, n) => RULER_FROM + n / 5);
const MARKS = Array.from({ length: RULER_TO - RULER_FROM + 1 }, (_, n) => RULER_FROM + n);

/** The vertical lines between the bookcase's bays. */
const BAY_LINES = Array.from({ length: BOOKCASE.bays - 1 }, (_, n) => {
  const x = BOOKCASE.x + ((n + 1) * BOOKCASE.w) / BOOKCASE.bays;
  return `M${x} ${BOOKCASE.y}v${BOOKCASE.d}`;
}).join("");

/**
 * The flat, toured: the section holds the screen while it is scrolled
 * through, a step at a time, the ruler and the step's words on the left and
 * the plan acting the step out on the right. 01 the plan, a room at a time;
 * 02 every room fills in as its walls rise; 03 it leans in to the living
 * room's long wall; 04 to 06 the bookcase is drawn on its wall, takes its
 * finishes, moves along it; 07 and 08 the whole flat again, the bookcase
 * measured, its finishes; 09 to 11 the order's card, ordered, on its way,
 * home. On a phone it is not toured: its first step, then the plan.
 */
export function FlatTour() {
  const { shown, choose, hold } = useRoom();
  const flat = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const numeral = useRef<HTMLParagraphElement>(null);
  const [at, setAt] = useState(0);
  const [intro, setIntro] = useState<"wait" | "play" | undefined>(undefined);

  // the step in view, from how far the section has been scrolled through
  useEffect(() => {
    const el = flat.current;
    const st = stage.current;
    if (!el || !st) return;
    const walk = () => {
      const toured = getComputedStyle(st).position === "sticky";
      const walked = toured ? Math.max(0, -el.getBoundingClientRect().top / (innerHeight * HOLD)) : 0;
      const i = Math.min(TOUR.length - 1, Math.floor(walked));
      const into = walked - i;
      const glide = i < TOUR.length - 1 ? Math.max(0, (into - (1 - GLIDE)) / GLIDE) : 0;
      el.style.setProperty("--along", (i + glide).toFixed(3));
      setAt(i);
    };
    // the scale's mark sits level with the middle of the big number (read
    // afresh each time: the number is drawn anew with every step)
    const pointAt = () => {
      const num = numeral.current;
      if (!num) return;
      let top = num.offsetHeight / 2;
      for (let n: HTMLElement | null = num; n && n !== st; n = n.offsetParent as HTMLElement | null) top += n.offsetTop;
      el.style.setProperty("--point-y", `${top}px`);
    };
    const fit = () => {
      pointAt();
      walk();
    };
    fit();
    void document.fonts.ready.then(fit);
    addEventListener("scroll", walk, { passive: true });
    addEventListener("resize", fit);
    return () => {
      removeEventListener("scroll", walk);
      removeEventListener("resize", fit);
    };
  }, []);

  // the plan sits below the banner, so it draws itself the first time it
  // scrolls into view, held out of sight till then
  useLayoutEffect(() => {
    const plan = stage.current?.querySelector("svg");
    if (!plan || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setIntro("wait");
    let done = 0;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        seen.disconnect();
        setIntro("play");
        done = window.setTimeout(() => setIntro(undefined), 3000);
      },
      { threshold: 0.3 },
    );
    seen.observe(plan);
    return () => {
      seen.disconnect();
      clearTimeout(done);
    };
  }, []);

  const step = TOUR[at]!;
  const note = roomOf(shown).note;
  const done = ORDER_DONE[at] ?? 0;

  return (
    <section
      ref={flat}
      className={styles.flat}
      aria-labelledby="flat-title"
      data-step={at}
      style={{ "--steps": TOUR.length } as CSSProperties}
    >
      <div ref={stage} className={styles.stage}>
        <div className={styles.ruler} aria-hidden="true">
          {TICKS.map((t) => (
            <span key={t} className={styles.tick} style={{ "--t": t } as CSSProperties} />
          ))}
          {MARKS.map((t) => {
            const room = t >= -1 && t < TOUR.length;
            return (
              <span
                key={t}
                className={styles.mark}
                data-room={room || undefined}
                data-on={t === at || undefined}
                style={{ "--t": t } as CSSProperties}
              >
                {room && <span className={styles.number}>{String(t + 1).padStart(2, "0")}</span>}
              </span>
            );
          })}
        </div>

        <div className={styles.text}>
          <p className={styles.label}>The flat</p>
          <h2 key={`head-${at}`} id="flat-title" className={styles.head}>
            <span className={styles.lead}>{step.lead}</span>
            {step.soft.length > 0 && (
              <span className={styles.soft}>
                {step.soft.map((l, n) => (
                  <span key={l}>
                    {n > 0 && <br />}
                    {l}
                  </span>
                ))}
              </span>
            )}
          </h2>
          <div key={`step-${at}`} className={styles.step} aria-live="polite">
            <p ref={numeral} className={styles.numeral} aria-hidden="true">
              {String(at + 1).padStart(2, "0")}
            </p>
            <div>
              <h3 className={styles.name}>{step.name ?? note.name}</h3>
              <p className={styles.line}>{step.line ?? note.line}</p>
            </div>
          </div>
          <Link className={styles.primary} href={routes.designYourRoom}>
            Design your room
          </Link>
        </div>

        <div className={styles.slot} onPointerEnter={() => hold(true)} onPointerLeave={() => hold(false)}>
          <div className={styles.move}>
            <FloorPlan
              grid
              gridShown={at === 0}
              washed={at === 1}
              linked={LINKED}
              active={shown}
              onRoom={choose}
              intro={intro}
            >
              <g className={styles.piece}>
                <rect x={BOOKCASE.x} y={BOOKCASE.y} width={BOOKCASE.w} height={BOOKCASE.d} />
                <path d={BAY_LINES} />
              </g>
              <text className={styles.size} x={BOOKCASE.x + BOOKCASE.w / 2} y={BOOKCASE_LABEL_Y}>
                {BOOKCASE_SIZE}
              </text>
            </FloorPlan>
          </div>
          <div className={styles.order} aria-hidden="true">
            <p className={styles.orderLabel}>How an order moves</p>
            <p className={styles.orderName}>{ORDER.name}</p>
            <p>{ORDER.finish}</p>
            <ol>
              {ORDER.stages.map((s, n) => (
                <li key={s} data-done={n < done || undefined}>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
