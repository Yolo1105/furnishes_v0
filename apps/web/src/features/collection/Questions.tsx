"use client";

import { useState } from "react";
import { EMAIL, MAILTO } from "@/lib/contact";
import styles from "./Collection.module.css";

type Question = { q: string; a: string };

/**
 * Questions before ordering, as the owner's other site: the title and a way
 * to ask something else on the left, the questions on the right, one open at
 * a time, the first open on arrival, its answer sliding open under it.
 */
export function Questions({ questions }: { questions: readonly Question[] }) {
  // the first question opens on arrival, on the owner's word, so the list shows how it works
  const [open, setOpen] = useState<string | null>(questions[0]?.q ?? null);

  return (
    <section className={`${styles.section} ${styles.qa}`} aria-labelledby="questions-title">
      <div className={styles.qaSide}>
        <h2 id="questions-title" className={styles.heading}>
          <span className={styles.headingLabel}>FAQ</span>
          Questions <span className={styles.headingRest}>Asked before ordering</span>
        </h2>
        <p className={styles.qaAsk}>
          Something else? Email us at{" "}
          <a className={styles.qaMail} href={MAILTO}>
            {EMAIL}
          </a>
          .
        </p>
      </div>
      <ul className={styles.qaList}>
        {questions.map((x, n) => {
          const on = open === x.q;
          const id = `answer-${n}`;
          return (
            <li key={x.q} className={styles.qaItem} data-open={on || undefined}>
              <button
                type="button"
                className={styles.qaQuestion}
                aria-expanded={on}
                aria-controls={id}
                onClick={() => setOpen(on ? null : x.q)}
              >
                {x.q}
                <span className={styles.qaMark} aria-hidden="true">
                  +
                </span>
              </button>
              <div id={id} className={styles.qaAnswer}>
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
