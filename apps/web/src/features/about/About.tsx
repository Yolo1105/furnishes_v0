import Image from "next/image";
import type { CSSProperties } from "react";
import { Section } from "@/features/collection/Sections";
import collection from "@/features/collection/Collection.module.css";
import { FIGURES, MAKING, MANIFESTO, RECOGNITION, STORY, TEAM, WHO, WORKSHOP } from "./aboutList";
import styles from "./About.module.css";

/** The page's opening: the title as every section's, one paragraph, and two rooms beside it. */
export function WhoWeAre() {
  return (
    <section className={styles.who} aria-labelledby="who-title">
      <div className={styles.whoText}>
        <h1 id="who-title" className={collection.heading}>
          <span className={collection.headingLabel}>{WHO.label}</span>
          {WHO.title} <span className={collection.headingRest}>{WHO.rest}</span>
        </h1>
        <p className={styles.lead}>{WHO.line}</p>
      </div>
      <div className={styles.whoPhotos}>
        {WHO.photos.map((p) => (
          <div key={p.alt} className={styles.photo}>
            <Image src={p.src} alt={p.alt} fill sizes="(max-width: 1023px) 50vw, 28vw" priority />
          </div>
        ))}
      </div>
    </section>
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

/** Where it is made: the facts as short label and value lines, a photo beside them. */
export function Workshop() {
  return (
    <section className={`${collection.section} ${styles.workshop}`} aria-labelledby="workshop-title">
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
        <Image src={WORKSHOP.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 50vw" />
      </div>
    </section>
  );
}

/** From order to your home: five steps on one line, which draws across as it scrolls into view. */
export function MakingDays() {
  return (
    <Section id="making-title" label={MAKING.label} title={MAKING.title} rest={MAKING.rest}>
      <ol className={styles.days}>
        {MAKING.steps.map((s, i) => (
          <li key={s.name} className={styles.day}>
            <p className={collection.cardLabel}>Step {i + 1}</p>
            <h3 className={collection.promiseName}>{s.name}</h3>
            <p className={collection.promiseLine}>{s.line}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** The people behind Furnishes: a portrait (its initial until there is a photo), the name, the role and one line. */
export function Team() {
  return (
    <Section id="team-title" label={TEAM.label} title={TEAM.title} rest={TEAM.rest}>
      <ul className={styles.team}>
        {TEAM.people.map((p, i) => (
          <li key={`${p.name}-${i}`}>
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

/** Our story: three numbered parts side by side, spaced rather than ruled. */
export function Story() {
  return (
    <Section id="story-title" label={STORY.label} title={STORY.title} rest={STORY.rest}>
      <ol className={styles.story}>
        {STORY.parts.map((p, i) => (
          <li key={p.name}>
            <p className={collection.cardLabel}>{String(i + 1).padStart(2, "0")}</p>
            <h3 className={collection.promiseName}>{p.name}</h3>
            <p className={collection.promiseLine}>{p.line}</p>
          </li>
        ))}
      </ol>
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
