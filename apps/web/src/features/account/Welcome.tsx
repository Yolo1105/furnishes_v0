"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import contact from "@/features/contact/Contact.module.css";
import { routes } from "@/lib/routes";
import { finishWelcome } from "./actions";
import { asks, WELCOME, type Who } from "./welcomeList";
import styles from "./Account.module.css";

type Answers = Record<string, string[]>;

/**
 * The welcome, once after a first log-in, laid out as the log-in page: the
 * room on the left, and on the right one question a screen in the
 * enquiry's boxes, with how far along it is over it and Back and Continue
 * under it. A one-answer question starts on its first answer, so Continue
 * always works; skipping is offered on every screen. The answers stay in
 * this browser until accounts keep them.
 */
export function Welcome({ next }: { next: string }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [at, setAt] = useState(0);
  const who = (answers.who?.[0] ?? "home") as Who;
  const list = asks(who);
  const done = at === list.length;
  const ask = list[at];
  const picked = ask && (answers[ask.id] ?? (ask.many ? [] : [ask.options[0]?.value ?? ""]));

  const pick = (value: string) => {
    if (!ask) return;
    const now = picked ?? [];
    const then = ask.many ? (now.includes(value) ? now.filter((v) => v !== value) : [...now, value]) : [value];
    setAnswers({ ...answers, [ask.id]: then });
  };

  // a one-answer question left on its first answer still counts as answered
  const go = () => {
    if (ask && picked) setAnswers({ ...answers, [ask.id]: picked });
    setAt(at + 1);
  };

  const keep = () => {
    try {
      localStorage.setItem(WELCOME.key, JSON.stringify(answers));
    } catch {
      // a private window may refuse storage; the welcome still ends
    }
  };

  return (
    <div className={styles.split}>
      <div className={styles.room}>
        <Image src={WELCOME.photo} alt="" fill priority sizes="(max-width: 1023px) 100vw, 58vw" />
        <Link className={styles.wordmark} href={routes.home}>
          furnishes.
        </Link>
        <div className={styles.over}>
          <p className={styles.overTitle}>{WELCOME.over}</p>
          <p className={styles.overLine}>{WELCOME.overLine}</p>
        </div>
      </div>
      <main id="main" className={styles.panel}>
        <form action={finishWelcome} onSubmit={keep} className={styles.backForm}>
          <input type="hidden" name="next" value={next} />
          {!done && (
            <button className={`${styles.back} ${styles.logOut}`} type="submit">
              {WELCOME.skip}
            </button>
          )}
        </form>

        {ask ? (
          <div className={styles.ask}>
            <div className={styles.head}>
              <p className={styles.stepOf}>{WELCOME.step(at + 1, list.length)}</p>
              {/* one segment a question, red once reached */}
              <ol className={styles.progress} aria-hidden="true">
                {list.map((a, n) => (
                  <li key={a.id} data-on={n <= at || undefined} />
                ))}
              </ol>
              <h1 className={styles.title}>{ask.title}</h1>
              <p className={styles.line}>{ask.line}</p>
            </div>
            <fieldset className={contact.group}>
              <legend className="visually-hidden">{ask.title}</legend>
              <div className={contact.options}>
                {ask.options.map((o) => (
                  <label key={o.value} className={contact.option}>
                    <input
                      className="visually-hidden"
                      type={ask.many ? "checkbox" : "radio"}
                      name={ask.id}
                      value={o.value}
                      checked={picked?.includes(o.value) ?? false}
                      onChange={() => pick(o.value)}
                    />
                    <span className={contact.optionName}>{o.name}</span>
                    {o.line && <span className={contact.optionLine}>{o.line}</span>}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className={styles.askFoot}>
              {at > 0 ? (
                <button className={`${styles.link} ${styles.logOut}`} type="button" onClick={() => setAt(at - 1)}>
                  {WELCOME.back}
                </button>
              ) : (
                <span />
              )}
              <button className={styles.askGo} type="button" onClick={go}>
                {WELCOME.next}
              </button>
            </div>
          </div>
        ) : (
          <form action={finishWelcome} onSubmit={keep} className={styles.ask}>
            <div className={styles.head}>
              <h1 className={styles.title}>{WELCOME.done.title}</h1>
              <p className={styles.line}>{WELCOME.done.line}</p>
            </div>
            {/* what was heard, question by question, so a wrong answer can be gone back to */}
            <dl className={styles.heard}>
              {list.map((a) => (
                <div key={a.id}>
                  <dt>{a.title}</dt>
                  <dd>
                    {(answers[a.id] ?? []).map((v) => a.options.find((o) => o.value === v)?.name ?? v).join(", ") ||
                      WELCOME.done.none}
                  </dd>
                </div>
              ))}
            </dl>
            <button className={styles.askGo} type="submit" name="next" value={WELCOME.done.go.next}>
              {WELCOME.done.go.label}
            </button>
            <button className={`${styles.link} ${styles.logOut}`} type="submit" name="next" value={next}>
              {WELCOME.done.on}
            </button>
            <button className={`${styles.link} ${styles.logOut}`} type="button" onClick={() => setAt(at - 1)}>
              {WELCOME.back}
            </button>
          </form>
        )}
        <span />
      </main>
    </div>
  );
}
