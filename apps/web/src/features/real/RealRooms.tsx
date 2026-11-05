import Image from "next/image";
import Link from "next/link";
import collection from "@/features/collection/Collection.module.css";
import { Icon } from "@/features/collection/Icon";
import { pieceOf } from "@/lib/routes";
import { REAL_HEAD, REAL_ROOMS } from "./realList";
import styles from "./Real.module.css";

/**
 * Our pieces in real rooms: the split head as the other sections', over a
 * row of cards that scrolls sideways, each card a room
 * photo over the piece's name, the rooms it suits and what it is. A whole
 * card opens the piece.
 */
export function RealRooms() {
  return (
    <section className={`${collection.section} ${styles.real}`} aria-labelledby="real-title">
      {/* the head split as Eva's and the example rooms', so the sections read as one family */}
      <div className={collection.splitHead}>
        <h2 id="real-title" className={collection.heading}>
          <span className={collection.headingLabel}>{REAL_HEAD.label}</span>
          {REAL_HEAD.title.map((line) => (
            <span key={line} className={collection.splitLine}>
              {line}
            </span>
          ))}
        </h2>
        <div className={collection.splitSide}>
          <p className={collection.splitRest}>{REAL_HEAD.rest}</p>
          <a className={collection.splitGo} href={REAL_HEAD.send.href}>
            {REAL_HEAD.send.label}
            <Icon name="arrow" />
          </a>
        </div>
      </div>
      <ul className={collection.row}>
        {REAL_ROOMS.map((p) => (
          <li key={p.slug}>
            <Link className={styles.card} href={pieceOf(p.slug)}>
              <span className={styles.photo}>
                {p.photos[0] && <Image src={p.photos[0]} alt="" fill sizes="(max-width: 639px) 80vw, 320px" />}
              </span>
              <span className={styles.words}>
                <span className={styles.name}>{p.name}</span>
                <span className={styles.room}>{p.rooms.join(", ")}</span>
                <span className={styles.line}>{p.tagline}.</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
