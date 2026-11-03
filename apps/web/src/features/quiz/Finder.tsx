"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PieceCard } from "@/features/catalog/PieceCard";
import catalog from "@/features/catalog/Catalog.module.css";
import { type Answers, match } from "./match";
import { FINDER, FINDER_HEAD } from "./quizList";
import styles from "./Quiz.module.css";

const DONE = FINDER.length;

/**
 * Four short questions, one at a time on the left, picked as the problems
 * above are; picking moves on, and any can be skipped. On the right, the
 * pieces that fit what is answered so far, each with why. After the last,
 * the answers stand as a list, each opening its question again. The answers
 * ride in the address, so a result can be shared or come back to.
 */
export function Finder({ initial }: { initial: Answers }) {
  const [answers, setAnswers] = useState<Answers>(initial);
  const [step, setStep] = useState(Object.keys(initial).length > 0 ? DONE : 0);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const picks = match(answers);

  // after a move between questions (not on arrival), the new heading takes focus
  useEffect(() => {
    if (moved.current) heading.current?.focus();
    moved.current = true;
  }, [step]);

  // the answers in the address, replacing the entry so Back leaves the page
  useEffect(() => {
    const q = new URLSearchParams(answers as Record<string, string>).toString();
    window.history.replaceState(null, "", q ? `?${q}` : window.location.pathname);
  }, [answers]);

  const question = FINDER[step];
  const pick = (id: string) => {
    if (!question) return;
    setAnswers((a) => ({ ...a, [question.id]: id }));
    setStep(step + 1);
  };

  return (
    <section className={styles.problems} aria-labelledby="finder-title">
      <div className={styles.problemSide}>
        <p className={styles.label}>{FINDER_HEAD.label}</p>
        <h2 id="finder-title" className={styles.roomsTitle}>
          {FINDER_HEAD.title}
        </h2>
        <p className={styles.problemsLine}>{FINDER_HEAD.line}</p>

        {question ? (
          <>
            <p className={styles.finderStep}>
              {step + 1} {FINDER_HEAD.of} {DONE}
            </p>
            <h3 ref={heading} tabIndex={-1} className={styles.finderQuestion}>
              {question.title}
            </h3>
            <ol className={styles.problemList}>
              {question.options.map((o, i) => (
                <li key={o.id}>
                  <button
                    type="button"
                    className={styles.problem}
                    aria-pressed={answers[question.id] === o.id}
                    onClick={() => pick(o.id)}
                  >
                    <span className={styles.problemNumber}>{String(i + 1).padStart(2, "0")}</span>
                    {o.name}
                  </button>
                </li>
              ))}
            </ol>
            <div className={styles.finderBar}>
              {step > 0 && (
                <button type="button" className={styles.finderLink} onClick={() => setStep(step - 1)}>
                  {FINDER_HEAD.back}
                </button>
              )}
              <button
                type="button"
                className={styles.finderLink}
                onClick={() => {
                  setAnswers((a) => {
                    const rest = { ...a };
                    delete rest[question.id];
                    return rest;
                  });
                  setStep(step + 1);
                }}
              >
                {FINDER_HEAD.skip}
              </button>
            </div>
          </>
        ) : (
          <>
            <ol className={`${styles.problemList} ${styles.finderSummary}`}>
              {FINDER.map((q, i) => (
                <li key={q.id}>
                  <button type="button" className={styles.problem} onClick={() => setStep(i)}>
                    <span className={styles.problemNumber}>{q.short}</span>
                    {q.options.find((o) => o.id === answers[q.id])?.name ?? FINDER_HEAD.skipped}
                  </button>
                </li>
              ))}
            </ol>
            <div className={styles.finderBar}>
              <button
                type="button"
                className={styles.finderLink}
                onClick={() => {
                  setAnswers({});
                  setStep(0);
                }}
              >
                {FINDER_HEAD.again}
              </button>
            </div>
          </>
        )}
      </div>

      <div className={styles.finderPicks} aria-live="polite">
        <h3 className={styles.finderFound}>{FINDER_HEAD.found[picks.length]}</h3>
        {picks.length > 0 ? (
          <ul className={`${catalog.grid} ${styles.finderGrid}`}>
            {picks.map(({ piece, reasons }) => (
              <PieceCard key={piece.slug} piece={piece} brief>
                {reasons.length > 0 && (
                  <ul className={styles.finderReasons}>
                    {reasons.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}
              </PieceCard>
            ))}
          </ul>
        ) : (
          <p className={styles.finderNone}>
            {FINDER_HEAD.none}{" "}
            <Link className="underline-on-hover" href={FINDER_HEAD.visit.href}>
              {FINDER_HEAD.visit.label}
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
