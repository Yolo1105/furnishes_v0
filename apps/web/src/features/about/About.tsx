import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { Opening } from "@/features/collection/Opening";
import { Section } from "@/features/collection/Sections";
import collection from "@/features/collection/Collection.module.css";
import { FIGURES, MAKING, MANIFESTO, RECOGNITION, TEAM, WHO } from "./aboutList";
import { Journey } from "./Journey";
import styles from "./About.module.css";

/**
 * About's opening, in the shape Contact shares: the title, two rooms, then
 * the line and the paragraphs. A section of the home page, at #about, where
 * the bar's About link leads.
 */
export function WhoWeAre() {
  return (
    <Opening
      id="about"
      section
      label={WHO.label}
      title={WHO.title}
      sub={WHO.sub}
      photos={WHO.photos}
      rest={WHO.rest}
      lines={WHO.lines}
    />
  );
}

type Token = { word: string; hot?: true } | { photo: StaticImageData };

/** The statement as words to light one by one, the key phrases' words marked, and its photos. */
const TOKENS: Token[] = MANIFESTO.parts.flatMap((p): Token[] =>
  typeof p === "string"
    ? p.split(" ").map((word) => ({ word }))
    : "hot" in p
      ? p.hot.split(" ").map((word) => ({ word, hot: true as const }))
      : [{ photo: p.photo }],
);

/**
 * The statement, its words lighting from pale to their own colour as it
 * scrolls past (CSS only; where the browser can't, or motion is reduced,
 * it stands lit), in the brown with three phrases in the red, and
 * two small photos set in the line. Then four figures.
 */
export function Manifesto() {
  let n = 0;
  const count = TOKENS.filter((t) => "word" in t).length;
  return (
    <section className={styles.manifesto} aria-labelledby="manifesto-title">
      {/* named for readers only: on the page the statement speaks for itself */}
      <h2 id="manifesto-title" className="visually-hidden">
        {MANIFESTO.label}
      </h2>
      <p className={styles.statement} style={{ "--n": count } as CSSProperties} data-type-keep>
        {TOKENS.map((t, i) =>
          "word" in t ? (
            <span key={i} className={styles.word} data-hot={t.hot} style={{ "--i": n++ } as CSSProperties}>
              {t.word}{" "}
            </span>
          ) : (
            <span key={i} className={styles.inline}>
              <Image src={t.photo} alt="" fill sizes="200px" />
            </span>
          ),
        )}
      </p>
      <ul className={styles.figures}>
        {FIGURES.map((f) => (
          <li key={f.line}>
            <p className={styles.value}>{f.value}</p>
            <p className={styles.figureLine}>{f.line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * How it gets to you, from the factory to your room: the split head, then
 * the four steps as a numbered list beside one photo that follows the step
 * pointed at, so it reads apart from Eva's row of cards above it.
 */
export function MakingDays() {
  return (
    <section className={collection.section} aria-labelledby="making-title">
      <div className={styles.making}>
        <div className={collection.splitHead}>
          <h2 id="making-title" className={collection.heading}>
            <span className={collection.headingLabel}>{MAKING.label}</span>
            {MAKING.title.map((line) => (
              <span key={line} className={collection.splitLine}>
                {line}
              </span>
            ))}
          </h2>
          <p className={collection.splitRest}>{MAKING.rest}</p>
        </div>
        <Journey steps={MAKING.steps} />
      </div>
    </section>
  );
}

/**
 * The people behind Furnishes: a portrait (its initial until there is a
 * photo), the name, the role and one line. Every frame is the same size so
 * the names line up; one still to be named is paler.
 */
export function Team() {
  return (
    <Section id="team-title" label={TEAM.label} title={TEAM.title} rest={TEAM.rest}>
      <ul className={styles.team}>
        {TEAM.people.map((p, i) => (
          <li key={`${p.name}-${i}`} data-pending={"initial" in p || undefined}>
            <div className={styles.portrait} aria-hidden="true">
              {p.initial ?? p.name.charAt(0)}
            </div>
            <h3 className={collection.promiseName}>{p.name}</h3>
            <p className={collection.cardLabel}>{p.role}</p>
            <p className={collection.promiseLine}>{p.line}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Awards and press: a year, what it was and what it was for on each row, parted by space alone. */
export function Recognition() {
  return (
    <Section id="recognition-title" label={RECOGNITION.label} title={RECOGNITION.title} rest={RECOGNITION.rest}>
      <ul className={styles.recognition}>
        {RECOGNITION.rows.map((r) => (
          <li key={r.name}>
            <span className={collection.cardLabel}>{r.year}</span>
            <span className={styles.award}>{r.name}</span>
            <span className={styles.project}>{r.project}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
