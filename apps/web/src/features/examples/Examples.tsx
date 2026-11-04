import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { pieceBySlug } from "@/features/catalog/catalog";
import shared from "@/features/collection/Collection.module.css";
import { pieceOf } from "@/lib/routes";
import { EXAMPLES_LABEL, type Example } from "./examplesList";
import styles from "./Examples.module.css";

/**
 * Example rooms as cards that stack as the page scrolls, after the owner's
 * reference: each a photo with what the room is in its corner, then a
 * sentence, three figures and the pieces used, each one a link. The title
 * sits over them with one way on beside it.
 */
export function Examples({
  id,
  title,
  rest,
  go,
  examples,
}: {
  id: string;
  title: string;
  rest?: string;
  go: { label: string; href: string };
  examples: readonly Example[];
}) {
  return (
    <section className={shared.section} aria-labelledby={`${id}-title`}>
      <div className={styles.top}>
        <h2 id={`${id}-title`} className={shared.heading}>
          <span className={shared.headingLabel}>{EXAMPLES_LABEL}</span>
          {title}
          {rest && <span className={shared.headingRest}> {rest}</span>}
        </h2>
        {go.href.startsWith("/") ? (
          <Link className={styles.go} href={go.href}>
            {go.label}
          </Link>
        ) : (
          <a className={styles.go} href={go.href}>
            {go.label}
          </a>
        )}
      </div>
      <ul className={styles.stack}>
        {examples.map((e, i) => (
          <li key={e.id} className={styles.card} style={{ "--i": i } as CSSProperties}>
            <div className={styles.photo}>
              <Image src={e.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 45vw" />
            </div>
            <div className={styles.words}>
              <h3 className={styles.line}>
                <span className={styles.lead}>{e.lead}</span>
                {e.line}
              </h3>
              <dl className={styles.figures}>
                {e.figures.map((f) => (
                  <div key={f.line}>
                    <dt className={styles.value}>{f.value}</dt>
                    <dd className={styles.figureLine}>{f.line}</dd>
                  </div>
                ))}
              </dl>
              <ul className={styles.pieces} aria-label="Pieces used">
                {e.pieces.flatMap((slug) => {
                  const p = pieceBySlug(slug);
                  return p
                    ? [
                        <li key={slug}>
                          <Link className={styles.piece} href={pieceOf(slug)}>
                            {p.name}
                          </Link>
                        </li>,
                      ]
                    : [];
                })}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
