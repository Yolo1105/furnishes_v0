"use client";

import { useId, useState } from "react";
import { EMAIL, MAILTO } from "@/lib/contact";
import { Icon, type IconName } from "./Icon";
import styles from "./Collection.module.css";

type Question = { q: string; a: string; icon?: IconName };

/**
 * Questions before ordering, as the owner's other site: the title and a way
 * to ask something else on the left, the questions on the right, one open at
 * a time, the first open on arrival, its answer sliding open under it.
 * A question may carry a small mark in place of its number. Other
 * numbered lists that open, such as the story, set their own title and leave
 * out the way to ask.
 */
export function Questions({
  questions,
  label = "FAQ",
  title = "Questions",
  rest = "Asked before ordering",
  ask = true,
}: {
  questions: readonly Question[];
  label?: string;
  title?: string;
  rest?: string;
  ask?: boolean;
}) {
  // the first question opens on arrival, on the owner's word, so the list shows how it works
  const [open, setOpen] = useState<string | null>(questions[0]?.q ?? null);
  const id = useId();

  return (
    <section className={`${styles.section} ${styles.qa}`} aria-labelledby={`${id}-title`}>
      <div className={styles.qaSide}>
        <h2 id={`${id}-title`} className={styles.heading}>
          <span className={styles.headingLabel}>{label}</span>
          {title} <span className={styles.headingRest}>{rest}</span>
        </h2>
        {ask && (
          <p className={styles.qaAsk}>
            Something else? Email us at{" "}
            <a className={styles.qaMail} href={MAILTO}>
              {EMAIL}
            </a>
            .
          </p>
        )}
      </div>
      <ul className={styles.qaList}>
        {questions.map((x, n) => {
          const on = open === x.q;
          const answer = `${id}-answer-${n}`;
          return (
            <li key={x.q} className={styles.qaItem} data-open={on || undefined}>
              <button
                type="button"
                className={styles.qaQuestion}
                aria-expanded={on}
                aria-controls={answer}
                onClick={() => setOpen(on ? null : x.q)}
              >
                {x.icon ? (
                  <Icon name={x.icon} />
                ) : (
                  <span className={styles.qaNumber}>{String(n + 1).padStart(2, "0")}</span>
                )}
                <span className={styles.qaText}>{x.q}</span>
                <span className={styles.qaMark} aria-hidden="true">
                  +
                </span>
              </button>
              <div id={answer} className={styles.qaAnswer}>
                <div>
                  <p>{x.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
