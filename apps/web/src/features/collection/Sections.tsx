import Link from "next/link";
import type { CSSProperties } from "react";
import { PieceList } from "@/features/catalog/PieceList";
import type { LineSlug } from "@/features/catalog/catalog";
import { Icon, type IconName } from "./Icon";
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

export type Step = { name: string; line: string; icon?: IconName };

/**
 * One entry of an index: a name, and to its right what it is, as a line,
 * a few short lines, or labelled facts; `note` sits over the name, and
 * `go` is the way on, a link at the foot of the words; `icon` a small mark
 * over it all.
 */
export type Entry = {
  name: string;
  note?: string;
  line?: string;
  lines?: readonly string[];
  facts?: readonly { label: string; value: string }[];
  go?: { label: string; href: string };
  icon?: IconName;
};

/**
 * An index, the site's one way to set out a short list: columns of text
 * side by side, each with its name over its words, parted by space alone
 * rather than set on cards. `numbered` puts the
 * row's number before the name, for steps, which light in turn on scroll.
 */
export function Index({ entries, numbered = false }: { entries: readonly Entry[]; numbered?: boolean }) {
  const List = numbered ? "ol" : "ul";
  return (
    <List
      className={styles.index}
      data-numbered={numbered || undefined}
      // numbered steps that carry marks stand on a line drawn across them
      data-track={(numbered && entries.some((e) => e.icon)) || undefined}
      style={{ "--count": entries.length, "--cols": entries.length <= 5 ? entries.length : 3 } as CSSProperties}
    >
      {entries.map((e, i) => (
        <li key={e.name} className={styles.entry} style={{ "--i": i } as CSSProperties}>
          <div className={styles.entryHead}>
            {e.icon &&
              (numbered ? (
                <span className={styles.entryStop}>
                  <Icon name={e.icon} />
                </span>
              ) : (
                <Icon name={e.icon} />
              ))}
            {numbered && (
              <span className={styles.entryNumber} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            {e.note && <p className={styles.entryNote}>{e.note}</p>}
            <h3 className={styles.entryName}>{e.name}</h3>
          </div>
          <div className={styles.entryBody}>
            {e.line && <p>{e.line}</p>}
            {e.lines?.map((l) => (
              <p key={l}>{l}</p>
            ))}
            {e.facts && (
              <dl className={styles.entryFacts}>
                {e.facts.map((f) => (
                  <div key={f.label}>
                    <dt className={styles.entryLabel}>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {e.go &&
              (e.go.href.startsWith("/") ? (
                <Link className={styles.entryGo} href={e.go.href}>
                  {e.go.label}
                </Link>
              ) : (
                <a className={styles.entryGo} href={e.go.href}>
                  {e.go.label}
                </a>
              ))}
          </div>
        </li>
      ))}
    </List>
  );
}

/** Numbered steps, as an index; `id` names its title, where a page has more than one. */
export function Steps({
  id = "steps-title",
  label,
  title,
  rest,
  steps,
}: {
  id?: string;
  label: string;
  title: string;
  rest: string;
  steps: readonly Step[];
}) {
  return (
    <Section id={id} label={label} title={title} rest={rest}>
      <Index entries={steps} numbered />
    </Section>
  );
}
