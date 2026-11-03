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
 * Start from the problem: the rooms as a row of choices, the chosen room's
 * three problems down the left, and the piece that answers the chosen one
 * beside them as a photo card. Choosing a room picks its first problem.
 */
export function Problems() {
  const [roomAt, setRoomAt] = useState(0);
  const [itemAt, setItemAt] = useState(0);
  const room = PROBLEMS[roomAt]!;
  const item = room.items[itemAt] ?? room.items[0];
  const piece = pieceBySlug(item.piece);

  return (
    <section className={styles.problems} aria-labelledby="problems-title">
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
      <div className={styles.problemPick}>
        <ul className={styles.problemList}>
          {room.items.map((p, i) => (
            <li key={p.line}>
              <button type="button" className={styles.problem} aria-pressed={i === itemAt} onClick={() => setItemAt(i)}>
                {p.line}
              </button>
            </li>
          ))}
        </ul>
        {piece && (
          <Link className={styles.answer} href={pieceOf(piece.slug)} aria-live="polite">
            <span className={styles.answerPhoto}>
              <Image src={piece.photos[0]!} alt="" fill sizes="(max-width: 1023px) 100vw, 40vw" />
            </span>
            <span className={styles.answerWords}>
              <span className={styles.answerName}>{piece.name}</span>
              <span className={styles.answerFrom}>from {sgd(fromPrice(piece))}</span>
              <span className={styles.answerLine}>{piece.tagline}</span>
              <span className={styles.shop}>{PROBLEMS_HEAD.call}</span>
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
