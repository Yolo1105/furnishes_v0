import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { FAVOURITES, FEATURED, LATEST, MOST_VIEWED, SECOND_LOOK, type Story } from "./journalList";
import styles from "./Journal.module.css";

/** A small arrow up and to the right, for a way on. */
const Out = () => (
  <svg className={styles.out} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
  </svg>
);

/** A section's heading and, under it, a band saying what it holds; the inspiration page's looks use it too. */
export function Head({ id, title, label, note }: { id: string; title: string; label: string; note: string }) {
  return (
    <>
      <h2 id={id} className={styles.heading}>
        {title}
      </h2>
      <p className={styles.band}>
        <span className={styles.label}>{label}</span>
        <span className={styles.note}>{note}</span>
        <Link className={styles.all} href={routes.collection}>
          See all
          <Out />
        </Link>
      </p>
    </>
  );
}

/** A story's tags, title and byline. */
function Words({ story, size }: { story: Story; size: "sm" | "lg" }) {
  return (
    <div className={styles.words}>
      <h3 className={styles[size]}>
        {story.tags.map((t) => (
          <span key={t} className={styles.tag}>
            {t}
          </span>
        ))}
        <span>{story.lead}</span> <span className={styles.rest}>{story.rest}</span>
      </h3>
      <p className={styles.meta}>
        by {story.by} · <time>{story.date}</time>
      </p>
    </div>
  );
}

/** A small photo beside a story's words, for lists. */
function Small({ story }: { story: Story }) {
  return (
    <li className={styles.small}>
      <span className={styles.thumb}>
        <Image src={story.photo} alt="" fill sizes="(max-width: 1023px) 25vw, 8vw" />
      </span>
      <Words story={story} size="sm" />
    </li>
  );
}

/**
 * The journal under the rooms: picked reads, the newest stories with the
 * most read beside them, and one to look at again with the readers' picks.
 */
export function Journal() {
  return (
    <div className={styles.journal}>
      <section aria-labelledby="featured">
        <Head
          id="featured"
          title="Featured ideas"
          label="Handpicked"
          note="Chosen by the people who make the pieces."
        />
        <ul className={styles.grid3}>
          {FEATURED.map((s) => (
            <Small key={s.key} story={s} />
          ))}
        </ul>
      </section>

      <div className={styles.split}>
        <section aria-labelledby="latest">
          <h2 id="latest" className={styles.heading}>
            Latest stories
          </h2>
          <ul className={styles.latest}>
            {LATEST.map((s) => (
              <li key={s.key} className={styles.big}>
                <span className={styles.wide}>
                  <Image src={s.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 26vw" />
                </span>
                <Words story={s} size="lg" />
              </li>
            ))}
          </ul>
        </section>

        <aside className={styles.box} aria-labelledby="most-viewed">
          <h2 id="most-viewed" className={styles.heading}>
            Most viewed
          </h2>
          <ul className={styles.list}>
            {MOST_VIEWED.map((s) => (
              <Small key={s.key} story={s} />
            ))}
          </ul>
        </aside>
      </div>

      <div className={styles.again}>
        <section aria-labelledby="second-look">
          <h2 id="second-look" className={styles.heading}>
            Second look
          </h2>
          <div className={styles.look}>
            <span className={styles.wide}>
              <Image src={SECOND_LOOK.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 30vw" />
            </span>
            <Words story={SECOND_LOOK} size="lg" />
          </div>
        </section>

        <section aria-labelledby="favourites">
          <h2 id="favourites" className={styles.heading}>
            Reader favourites
          </h2>
          <ul className={styles.grid2}>
            {FAVOURITES.map((s) => (
              <Small key={s.key} story={s} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
