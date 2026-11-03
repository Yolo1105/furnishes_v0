"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties, type PointerEvent } from "react";
import { EMAIL, HOURS, MAILTO, PLACE } from "@/lib/contact";
import { routes } from "@/lib/routes";
import { useRoom } from "@/features/rooms/RoomContext";
import { ROOMS, type Room } from "@/features/rooms/rooms";
import { COLLAGE } from "./collage";
import styles from "./Banner.module.css";

/**
 * The banner: five big words down the left, the chosen room's line and photo
 * on the right, and how to reach us along the foot, over a sheet of small
 * photos that slides with the mouse.
 *
 * Each word is printed on a drum, the room on its front and a second word
 * underneath. Pointing at a word (or tabbing to it, or tapping it) rolls its
 * drum up to the word underneath and rolls in that room's line.
 */
export function Banner() {
  const { chosen, shown, turns, choose, hold } = useRoom();
  const banner = useRef<HTMLElement>(null);

  // the mouse's place on the banner, from -1 to 1 each way, for the sheet's slide
  const drift = (e: PointerEvent<HTMLElement>) => {
    const el = banner.current;
    if (!el || e.pointerType !== "mouse") return;
    const box = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - box.left) / box.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - box.top) / box.height) * 2 - 1).toFixed(3));
  };
  const settle = () => {
    banner.current?.style.removeProperty("--mx");
    banner.current?.style.removeProperty("--my");
  };

  const word = (r: Room) => (
    <button
      type="button"
      className={styles.word}
      data-on={chosen === r.key || undefined}
      aria-pressed={chosen === r.key}
      onPointerEnter={() => choose(r.key)}
      onFocus={() => choose(r.key)}
      onBlur={() => choose(null)}
      onClick={() => choose(r.key)}
    >
      <span className={styles.drum}>
        <span className={styles.front}>{r.word}</span>
        <span className={styles.under} aria-hidden="true">
          {r.under}
        </span>
      </span>
    </button>
  );

  return (
    <section
      ref={banner}
      className={styles.banner}
      aria-labelledby="banner-title"
      onPointerMove={drift}
      onPointerLeave={settle}
    >
      <div className={styles.photos} aria-hidden="true">
        <div className={styles.sheet}>
          {COLLAGE.map((p) => (
            <span
              key={p.spot}
              className={`${styles.photo} ${styles[p.spot]}`}
              style={{ "--ratio": p.src.width / p.src.height } as CSSProperties}
            >
              <span className={styles.whole}>
                <Image src={p.src} alt="" fill sizes={p.sizes} placeholder="blur" />
              </span>
            </span>
          ))}
        </div>
      </div>

      <ul
        className={styles.words}
        onPointerEnter={() => hold(true)}
        onPointerLeave={() => {
          hold(false);
          choose(null);
        }}
        onFocus={() => hold(true)}
        onBlur={() => hold(false)}
      >
        {ROOMS.map((r, i) => (
          <li key={r.key}>
            {i === 0 ? (
              <h1 id="banner-title" className={styles.title}>
                {word(r)}
              </h1>
            ) : (
              word(r)
            )}
          </li>
        ))}
      </ul>

      <div className={styles.about}>
        {/* every room's line is laid in the same place, so the line keeps the
            height of the longest and the photo under it never moves */}
        <p className={styles.line} aria-live="polite">
          {ROOMS.map((r) => (
            <span
              key={r.key === shown ? `${r.key}-${turns}` : r.key}
              className={styles.lineText}
              data-shown={r.key === shown || undefined}
              data-rolling={(r.key === shown && turns > 0) || undefined}
              aria-hidden={r.key !== shown}
            >
              {r.line}
            </span>
          ))}
        </p>
        <div className={styles.shot}>
          {ROOMS.map((r) => (
            <Image
              key={r.key}
              src={r.photo}
              alt=""
              fill
              sizes="(max-width: 1023px) 100vw, 36vw"
              placeholder="blur"
              // all five load up front, so a chosen room's photo is already there
              {...(r.key === "home" ? { priority: true } : { loading: "eager" as const })}
              data-shown={r.key === shown || undefined}
            />
          ))}
        </div>
      </div>

      <div className={styles.foot}>
        <p>
          {PLACE[0]}
          <br />
          {PLACE[1]}
        </p>
        <p>
          Enquiries
          <br />
          <a href={MAILTO}>{EMAIL}</a>
        </p>
        <p>
          {HOURS[0]}
          <br />
          {HOURS[1]}
        </p>
        <Link className={styles.more} href={routes.collection}>
          See the collection
        </Link>
      </div>
    </section>
  );
}
