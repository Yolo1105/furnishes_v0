import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { pieceBySlug } from "@/features/catalog/catalog";
import { Head } from "@/features/journal/Journal";
import { pieceOf } from "@/lib/routes";
import { Arrow } from "@/shell/Arrow";
import { LOOK_CALL, LOOKS, LOOKS_HEAD, NOTICED, NOTICED_HEAD } from "./inspirationList";
import styles from "./Inspiration.module.css";

type Card = { name: string; line?: string; call: string; href: string; photo: StaticImageData };

/** Four photos in a row, each with its name, an optional line and a way on with an arrow; the whole card is the link. */
function PhotoRow({ cards }: { cards: readonly Card[] }) {
  return (
    <ul className={styles.lookRow}>
      {cards.map((c) => (
        <li key={c.name}>
          <Link className={styles.look} href={c.href}>
            <span className={styles.lookPhoto}>
              <Image src={c.photo} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" />
            </span>
            <span className={styles.lookName}>{c.name}</span>
            {c.line && <span className={styles.lookLine}>{c.line}</span>}
            <span className={styles.line}>
              {c.call}
              <Arrow className={styles.arrow} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Everyday problems people stop seeing, each with the piece that answers it, between the rooms and the journal. */
export function NotNoticed() {
  const cards = NOTICED.flatMap((n) => {
    const piece = pieceBySlug(n.piece);
    return piece ? [{ name: n.name, line: n.line, call: piece.name, href: pieceOf(piece.slug), photo: n.photo }] : [];
  });
  return (
    <section className={`${styles.looks} ${styles.noticed}`} aria-labelledby="noticed-title">
      <Head id="noticed-title" {...NOTICED_HEAD} />
      <PhotoRow cards={cards} />
    </section>
  );
}

/** Four rooms in a row at the page's foot, under a heading in the journal's shape, each with its name and a way to its pieces. */
export function Looks() {
  return (
    <section className={styles.looks} aria-labelledby="looks-title">
      <Head id="looks-title" {...LOOKS_HEAD} />
      <PhotoRow cards={LOOKS.map((l) => ({ name: l.name, call: LOOK_CALL, href: l.href, photo: l.photo }))} />
    </section>
  );
}
