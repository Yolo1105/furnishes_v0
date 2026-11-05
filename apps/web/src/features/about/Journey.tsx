"use client";

import Image from "next/image";
import { useState } from "react";
import type { Tile } from "./aboutList";
import styles from "./About.module.css";

type Step = Tile & { name: string; line: string };

/**
 * The steps from the factory to your room as a short numbered list beside
 * one photo, the photo the step pointed at, tapped or focused; the first
 * shows on arrival.
 */
export function Journey({ steps }: { steps: readonly Step[] }) {
  const [on, setOn] = useState(0);
  return (
    <div className={styles.journey}>
      <ol className={styles.days}>
        {steps.map((s, i) => (
          <li key={s.name}>
            <button
              type="button"
              className={styles.day}
              aria-pressed={on === i}
              onClick={() => setOn(i)}
              onMouseEnter={() => setOn(i)}
              onFocus={() => setOn(i)}
            >
              <span className={styles.dayNumber}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.dayWords}>
                <span className={styles.dayName}>{s.name}</span>
                <span className={styles.dayLine}>{s.line}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      {/* every photo stacked in one frame, the chosen one shown, so the switch fades rather than jumps */}
      <div className={styles.journeyPhoto}>
        {steps.map(
          (s, i) =>
            s.photo && (
              <Image
                key={s.name}
                src={s.photo}
                alt={s.caption}
                fill
                sizes="(max-width: 1023px) 100vw, 55vw"
                data-on={on === i || undefined}
              />
            ),
        )}
      </div>
    </div>
  );
}
