import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { BANNER, FIND, GUIDES, GUIDES_CALL, GUIDES_HEAD, KINDS, ROOMS, ROOMS_HEAD } from "./quizList";
import styles from "./Quiz.module.css";

/**
 * The showroom band, after the questions: its words running across it, and
 * at its foot the title, a line and the way to draw a room. The words are
 * laid twice, so the row can slide half its width and start again unseen.
 */
export function QuizBanner() {
  const run = BANNER.words.map((w) => (
    <span key={w} className={styles.runWord}>
      {w}
      <span className={styles.runDot}>·</span>
    </span>
  ));
  return (
    <section className={styles.banner} aria-labelledby="banner-title">
      <span className={styles.bannerPhoto}>
        <Image src={BANNER.photo} alt="" fill priority sizes="100vw" />
      </span>
      <div className={styles.run} aria-hidden="true">
        <div className={styles.runRow}>
          {run}
          {run}
        </div>
      </div>
      <div className={styles.bannerFoot}>
        <h2 id="banner-title" className={styles.bannerTitle}>
          {BANNER.title}
        </h2>
        <p className={styles.bannerLine}>{BANNER.line}</p>
        <Link className={styles.bannerCall} href={routes.designYourRoom}>
          {BANNER.call}
        </Link>
      </div>
    </section>
  );
}

/** Every kind of piece as a large button into the list, with how many there are. */
export function FindYourPiece() {
  return (
    <section className={styles.find} aria-labelledby="find-title">
      <h2 id="find-title" className={styles.findTitle}>
        {FIND.lead} <span className={styles.rest}>{FIND.rest}</span>
      </h2>
      <ul className={styles.kinds}>
        {KINDS.map((k) => (
          <li key={k.label}>
            <Link className={styles.kind} href={k.href}>
              {k.label}
              <span className={styles.kindCount}>{k.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The rooms, each a photo with its name on a cream panel; the whole card opens the list. */
export function RoomByRoom() {
  return (
    <section className={styles.rooms} aria-labelledby="rooms-title">
      <p className={styles.label}>{ROOMS_HEAD.label}</p>
      <h2 id="rooms-title" className={styles.roomsTitle}>
        {ROOMS_HEAD.title}
      </h2>
      <ul className={styles.cards}>
        {ROOMS.map((r) => (
          <li key={r.name}>
            <Link className={styles.card} href={r.href}>
              <Image src={r.photo} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" />
              <span className={styles.cardWords}>
                <span className={styles.cardName}>{r.name}</span>
                <span className={styles.cardLine}>{r.line}</span>
                <span className={styles.shop}>Shop now</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Two short guides before ordering, beside a room: the heading over both
 * halves, the photo on the left, and on the right each guide's name over its
 * numbered steps, then the way to book a visit.
 */
export function Guides() {
  return (
    <section className={styles.guides} aria-labelledby="guides-title">
      <p className={styles.label}>{GUIDES_HEAD.label}</p>
      <h2 id="guides-title" className={styles.roomsTitle}>
        {GUIDES_HEAD.title}
      </h2>
      <div className={styles.guideRow}>
        <span className={styles.guidePhoto}>
          <Image src={GUIDES_HEAD.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 40vw" />
        </span>
        <div className={styles.guideSide}>
          {GUIDES.map((g) => (
            <div key={g.name} className={styles.guide}>
              <h3 className={styles.guideName}>{g.name}</h3>
              <ol className={styles.guidePoints}>
                {g.points.map((p, n) => (
                  <li key={p}>
                    <span className={styles.problemNumber}>{String(n + 1).padStart(2, "0")}</span>
                    {p}
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <Link className={styles.guideCall} href={GUIDES_CALL.href}>
            {GUIDES_CALL.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
