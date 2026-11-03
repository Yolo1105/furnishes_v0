"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import collection from "@/features/collection/Collection.module.css";
import { EMAIL, MAILTO } from "@/lib/contact";
import { routes } from "@/lib/routes";
import { HELP, HELP_GROUPS } from "./helpList";
import styles from "./Help.module.css";

/**
 * The help centre, after the owner's reference: a room on the left and on
 * the right the title, a search over every question and answer, and the
 * ways on; then the questions by topic, two topics across, each opening
 * under its plus. Searching narrows the topics to what matches.
 */
export function HelpCentre() {
  const [find, setFind] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const id = useId();

  const words = find.trim().toLowerCase();
  const groups = HELP_GROUPS.map((g) => ({
    ...g,
    questions: g.questions.filter((x) => !words || `${x.q} ${x.a}`.toLowerCase().includes(words)),
  })).filter((g) => g.questions.length > 0);

  return (
    <>
      <section className={styles.top} aria-labelledby="help-title">
        <div className={styles.photo}>
          <Image src={HELP.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 46vw" priority />
        </div>
        <div className={styles.words}>
          <h1 id="help-title" className={collection.openingTitle}>
            <span className={collection.headingLabel}>{HELP.label}</span>
            {HELP.title}
          </h1>
          <p className={collection.openingRest}>{HELP.rest}</p>
          <label className={styles.search}>
            <span className="visually-hidden">{HELP.search}</span>
            <input
              type="search"
              value={find}
              placeholder={HELP.searchHint}
              aria-controls={`${id}-topics`}
              onChange={(e) => setFind(e.target.value)}
            />
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5 21 21" />
            </svg>
          </label>
          {HELP.lines.map((l) => (
            <p key={l} className={styles.line}>
              {l}
            </p>
          ))}
          <Link className={collection.outline} href={routes.buyingGuide}>
            {HELP.guide}
          </Link>
        </div>
      </section>

      <section id={`${id}-topics`} className={styles.topics} aria-label={HELP.label} aria-live="polite">
        {groups.length === 0 && (
          <p className={styles.line}>
            {HELP.none}{" "}
            <a className={collection.qaMail} href={MAILTO}>
              {EMAIL}
            </a>
            .
          </p>
        )}
        {groups.map((g) => (
          <div key={g.label} className={styles.topic}>
            <h2 className={styles.topicTitle}>{g.title}</h2>
            <ul className={styles.list}>
              {g.questions.map((x, n) => {
                const on = open === x.q;
                const answer = `${id}-${g.label}-${n}`;
                return (
                  <li key={x.q} data-open={on || undefined}>
                    <button
                      type="button"
                      className={styles.question}
                      aria-expanded={on}
                      aria-controls={answer}
                      onClick={() => setOpen(on ? null : x.q)}
                    >
                      <span>{x.q}</span>
                      <span className={styles.mark} aria-hidden="true">
                        +
                      </span>
                    </button>
                    <div id={answer} className={styles.answer}>
                      <div>
                        <p>{x.a}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
