import Link from "next/link";
import { PieceList } from "@/features/catalog/PieceList";
import type { LineSlug } from "@/features/catalog/catalog";
import styles from "./Collection.module.css";

type Aside = { href: string; label: string };

/**
 * A titled section in the collection pages' shape: a small label in
 * capitals, the title in red with its second line in brown under it, and a
 * link beside it if it has one.
 */
export function Section({
  id,
  label,
  title,
  rest,
  aside,
  children,
}: {
  id: string;
  label: string;
  title: string;
  rest: string;
  aside?: Aside;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <div className={styles.head}>
        <h2 id={id} className={styles.heading}>
          <span className={styles.headingLabel}>{label}</span>
          {title} <span className={styles.headingRest}>{rest}</span>
        </h2>
        {aside && (
          <Link className={styles.all} href={aside.href}>
            {aside.label}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

/** A line's pieces, narrowed by kind. */
export function LinePieces({ line, aside }: { line: LineSlug; aside?: Aside }) {
  return (
    <Section id="pieces-title" label="Shop all" title="The pieces" rest="Every one, by kind" {...(aside && { aside })}>
      <PieceList line={line} />
    </Section>
  );
}

type Step = { name: string; line: string };

/** Numbered steps on one tile. */
export function Steps({
  label,
  title,
  rest,
  steps,
}: {
  label: string;
  title: string;
  rest: string;
  steps: readonly Step[];
}) {
  return (
    <Section id="steps-title" label={label} title={title} rest={rest}>
      <ol className={styles.steps}>
        {steps.map((s, i) => (
          <li key={s.name}>
            <p className={styles.cardLabel}>Step {i + 1}</p>
            <h3 className={styles.promiseName}>{s.name}</h3>
            <p className={styles.promiseLine}>{s.line}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
