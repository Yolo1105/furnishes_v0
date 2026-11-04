"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { Finder } from "./Finder";
import type { Answers } from "./match";
import { FINDER, FINDER_HEAD, STAGE } from "./quizList";
import styles from "./Stage.module.css";

const two = (n: number) => String(n).padStart(2, "0");

/**
 * The quiz page's start: the questions on a screen of their own, then the
 * page's opening and the finder, with the answers and the pieces that fit.
 * Arriving with answers in the address goes straight to them.
 */
export function QuizStart({ initial, opening }: { initial: Answers; opening: ReactNode }) {
  const [answers, setAnswers] = useState<Answers | null>(Object.keys(initial).length > 0 ? initial : null);
  if (!answers)
    return (
      <Stage
        onDone={(a) => {
          setAnswers(a);
          window.scrollTo(0, 0);
        }}
      />
    );
  return (
    <>
      {opening}
      <Finder initial={answers} titled={false} done />
    </>
  );
}

/**
 * One question at a time, large, its options in a row of boxes, over the
 * question's word in giant letters. Next moves on (with nothing picked, it
 * skips); after the last, the answers go to the finder.
 */
function Stage({ onDone }: { onDone: (a: Answers) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const question = FINDER[step]!;
  const last = step === FINDER.length - 1;

  // after a move between questions (not on arrival), the new question takes
  // focus, without scrolling the screen under the bar
  useEffect(() => {
    if (moved.current) heading.current?.focus({ preventScroll: true });
    moved.current = true;
  }, [step]);

  const next = () => (last ? onDone(answers) : setStep(step + 1));

  return (
    <section className={styles.stage} aria-labelledby="stage-title">
      <span key={question.id} className={styles.big} aria-hidden="true">
        {question.big}
      </span>

      <div className={styles.top}>
        <p className={styles.count}>
          {STAGE.question} {two(step + 1)} / {two(FINDER.length)}
        </p>
        <h1 id="stage-title" ref={heading} tabIndex={-1} className={styles.title}>
          <span className="visually-hidden">{FINDER_HEAD.title} </span>
          {question.lines.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </h1>
        <ul className={styles.options}>
          {question.options.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                className={styles.option}
                aria-pressed={answers[question.id] === o.id}
                onClick={() =>
                  setAnswers((a) => {
                    const rest = { ...a };
                    if (a[question.id] === o.id) delete rest[question.id];
                    else rest[question.id] = o.id;
                    return rest;
                  })
                }
              >
                {o.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.bar}>
        {step > 0 && (
          <button type="button" className={styles.back} onClick={() => setStep(step - 1)}>
            {STAGE.back}
          </button>
        )}
        <button type="button" className={`button button-fill ${styles.next}`} onClick={next}>
          {last ? STAGE.last : STAGE.next} <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
