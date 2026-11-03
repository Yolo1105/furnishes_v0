import Link from "next/link";
import type { CSSProperties } from "react";
import { dims, fromPrice, pieceBySlug } from "@/features/catalog/catalog";
import shared from "@/features/collection/Collection.module.css";
import { sgd } from "@/lib/money";
import { pieceOf } from "@/lib/routes";
import { ASSEMBLY } from "./modularList";
import styles from "./Modular.module.css";

const COUNT = ASSEMBLY.parts.length;

/** The parts each step brings in, as their first place in the list and the place after their last. */
const spanOf = (step: number) => {
  const at = ASSEMBLY.parts.flatMap((p, i) => (p.step === step ? [i] : []));
  return { "--a": Math.min(...at), "--b": Math.max(...at) + 1, "--n": COUNT } as CSSProperties;
};

/**
 * A room divider put together as the page scrolls: the screen holds while
 * its parts come in one at a time, each from its own side, and the step
 * that brings them in lights beside it. CSS only; where the browser can't,
 * or motion is reduced, the piece stands built and the steps read as a list.
 */
export function Assembly() {
  const piece = pieceBySlug(ASSEMBLY.piece);
  const size = piece?.sizes[0];
  return (
    <section className={styles.assembly} aria-labelledby="assembly-title">
      <div className={styles.assemblyStage}>
        <h2 id="assembly-title" className={`${shared.heading} ${styles.assemblyHead}`}>
          <span className={shared.headingLabel}>{ASSEMBLY.label}</span>
          {ASSEMBLY.title} <span className={shared.headingRest}>{ASSEMBLY.rest}</span>
        </h2>
        <ol className={styles.assemblySteps}>
          {ASSEMBLY.steps.map((s, i) => (
            <li key={s.name} className={styles.assemblyStep} style={spanOf(i)}>
              <p className={`${shared.cardLabel} ${styles.assemblyNo}`}>{String(i + 1).padStart(2, "0")}</p>
              <h3 className={styles.assemblyName}>{s.name}</h3>
              <p className={styles.assemblyLine}>{s.line}</p>
            </li>
          ))}
        </ol>
        <svg
          className={styles.assemblyDrawing}
          viewBox="-60 -60 1320 1680"
          role="img"
          aria-label="A room divider, built"
        >
          <line className={styles.assemblyFloor} x1="-60" x2="1260" y1="1600" y2="1600" />
          {ASSEMBLY.parts.map((p, i) => (
            <rect
              key={i}
              className={styles.assemblyPart}
              data-from={p.from}
              style={{ "--i": i, "--n": COUNT } as CSSProperties}
              x={p.x}
              y={p.y}
              width={p.w}
              height={p.h}
            />
          ))}
        </svg>
        {piece && size && (
          <div className={styles.assemblyFoot}>
            <p className={styles.assemblyPiece}>
              {piece.name} <span>{dims(size)}</span> <span>From {sgd(fromPrice(piece))}</span>
            </p>
            <Link className={shared.outline} href={pieceOf(piece.slug)}>
              See the {piece.name.toLowerCase()}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
