"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { fromPrice, pieceBySlug } from "@/features/catalog/catalog";
import { sgd } from "@/lib/money";
import { pieceOf } from "@/lib/routes";
import { PROBLEMS, PROBLEMS_HEAD } from "./quizList";
import styles from "./Quiz.module.css";

/**
 * Start from the problem, in two halves: on the left the title, the rooms
 * as a row of choices and the chosen room's three problems, numbered; on
 * the right the room's photo with the piece that answers the chosen problem
 * set on it, as the room cards below. Choosing a room picks its first problem.
 */
export function Problems() {
  const [roomAt, setRoomAt] = useState(0);
  const [itemAt, setItemAt] = useState(0);
  const room = PROBLEMS[roomAt]!;
  const item = room.items[itemAt] ?? room.items[0];
  const piece = pieceBySlug(item.piece);

  return (
    <section className={styles.problems} aria-labelledby="problems-title">
      <div className={styles.problemSide}>
        <p className={styles.label}>{PROBLEMS_HEAD.label}</p>
        <h2 id="problems-title" className={styles.roomsTitle}>
          {PROBLEMS_HEAD.title}
        </h2>
        <p className={styles.problemsLine}>{PROBLEMS_HEAD.line}</p>
        <ul className={styles.problemRooms}>
          {PROBLEMS.map((r, i) => (
            <li key={r.room}>
              <button
                type="button"
                className={styles.problemRoom}
                aria-pressed={i === roomAt}
                onClick={() => {
                  setRoomAt(i);
                  setItemAt(0);
                }}
              >
                {r.room}
              </button>
            </li>
          ))}
        </ul>
        <ol className={styles.problemList}>
          {room.items.map((p, i) => (
            <li key={p.line}>
              <button type="button" className={styles.problem} aria-pressed={i === itemAt} onClick={() => setItemAt(i)}>
                <span className={styles.problemNumber}>{String(i + 1).padStart(2, "0")}</span>
                {p.line}
              </button>
            </li>
          ))}
        </ol>
      </div>
      {piece && (
        <Link className={`${styles.card} ${styles.answer}`} href={pieceOf(piece.slug)} aria-live="polite">
          <Image src={room.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 55vw" />
          <span className={styles.cardWords}>
            <span className={styles.cardName}>{piece.name}</span>
            <span className={styles.cardLine}>
              {piece.tagline} · from {sgd(fromPrice(piece))}
            </span>
            <span className={styles.shop}>{PROBLEMS_HEAD.call}</span>
          </span>
        </Link>
      )}
    </section>
  );
}
