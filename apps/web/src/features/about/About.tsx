import Image from "next/image";
import type { CSSProperties } from "react";
import { Opening } from "@/features/collection/Opening";
import { Index, Section, Steps } from "@/features/collection/Sections";
import collection from "@/features/collection/Collection.module.css";
import { FIGURES, MAKING, MANIFESTO, RECOGNITION, STORY, TEAM, WHO, WORKSHOP } from "./aboutList";
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
      photos={WHO.photos}
      rest={WHO.rest}
      lines={WHO.lines}
    />
  );
}

/**
 * The statement, its words lighting from pale to red as it scrolls past
 * (CSS only; where the browser can't, or motion is reduced, it stands in
 * full red), with two small photos set in the line. Then four figures.
 */
export function Manifesto() {
  let n = 0;
  const count = MANIFESTO.words.filter((w) => typeof w === "string").length;
  return (
    <section className={styles.manifesto} aria-labelledby="manifesto-title">
      <h2 id="manifesto-title" className={collection.headingLabel}>
        {MANIFESTO.label}
      </h2>
      <p className={styles.statement} style={{ "--n": count } as CSSProperties}>
        {MANIFESTO.words.map((w, i) =>
          typeof w === "string" ? (
            <span key={i} className={styles.word} style={{ "--i": n++ } as CSSProperties}>
              {w}{" "}
            </span>
          ) : (
            <span key={i} className={styles.inline}>
              <Image src={w.photo} alt="" fill sizes="200px" />
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

/** Where it is made: the facts as short label and value lines on a panel, joined to a photo as one block. */
export function Workshop() {
  return (
    <section className={collection.section} aria-labelledby="workshop-title">
      <div className={styles.workshopBlock}>
        <div className={styles.workshopText}>
          <h2 id="workshop-title" className={collection.heading}>
            <span className={collection.headingLabel}>{WORKSHOP.label}</span>
            {WORKSHOP.title} <span className={collection.headingRest}>{WORKSHOP.rest}</span>
          </h2>
          <p className={styles.lead}>{WORKSHOP.line}</p>
          <dl className={styles.facts}>
            {WORKSHOP.facts.map((f) => (
              <div key={f.label}>
                <dt className={styles.factLabel}>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.workshopPhoto}>
          <Image src={WORKSHOP.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 58vw" />
        </div>
      </div>
    </section>
  );
}

/** From order to your home: the five steps on one tile, as every page's steps. */
export function MakingDays() {
  return <Steps id="making-title" label={MAKING.label} title={MAKING.title} rest={MAKING.rest} steps={MAKING.steps} />;
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

/**
 * Our story: three parts as the site's index, so the page's one list that
 * opens is its questions.
 */
export function Story() {
  return (
    <Section id="story-title" label={STORY.label} title={STORY.title} rest={STORY.rest}>
      <Index entries={STORY.parts} />
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
