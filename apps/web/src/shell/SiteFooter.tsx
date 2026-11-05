import Link from "next/link";
import { EMAIL, HOURS, MAILTO, PLACE } from "@/lib/contact";
import { LANGUAGES } from "@/lib/regions";
import { FOOT_GROUPS, FOOT_SINGLES, LEGAL, routes } from "@/lib/routes";
import styles from "./SiteFooter.module.css";

/** The year the copyright line names; fixed at build, as the page is static. */
const YEAR = new Date().getFullYear();

/** Where we are and how to reach us, each a place's name over its lines. */
const REACH = [{ name: PLACE[0], lines: [...PLACE.slice(1), HOURS.join(", ")] }] as const;

/**
 * The footer, kept short: the wordmark and a line asking to get in touch,
 * then four columns (where we are, then the pages: groups under a heading,
 * single pages and the languages), then the small print. Paper on the red,
 * as before.
 */
export function SiteFooter() {
  return (
    <footer className={styles.foot}>
      <div className={styles.top}>
        <Link className={styles.mark} href={routes.home}>
          furnishes.
        </Link>
        <a className={styles.call} href={MAILTO}>
          Sounds right? Let’s fit your room.
        </a>
      </div>

      <div className={styles.cols}>
        <div className={styles.reach}>
          {REACH.map((r) => (
            <div key={r.name}>
              <h2 className={styles.head}>{r.name}</h2>
              {r.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          ))}
          <div>
            <h2 className={styles.head}>Email</h2>
            <p>
              <a href={MAILTO}>{EMAIL}</a>
            </p>
          </div>
        </div>

        <nav className={styles.pages} aria-label="Footer">
          {FOOT_GROUPS.map((col, i) => (
            <div key={i} className={styles.col}>
              {col.map((g) =>
                "href" in g ? (
                  <Link key={g.label} className={styles.head} href={g.href}>
                    {g.label}
                  </Link>
                ) : (
                  <div key={g.label}>
                    <h2 className={styles.head}>{g.label}</h2>
                    <ul>
                      {g.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href}>{l.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              )}
            </div>
          ))}
          <div className={styles.col}>
            {FOOT_SINGLES.map((l) => (
              <Link key={l.href} className={styles.head} href={l.href}>
                {l.label}
              </Link>
            ))}
            <p className={styles.languages}>
              {LANGUAGES.map((l) =>
                l.ready ? (
                  <span key={l.code} className={styles.language} aria-current="true">
                    {l.code}
                  </span>
                ) : (
                  <span key={l.code} className={styles.soon} title={`${l.name}: coming`}>
                    {l.code}
                    <span className="visually-hidden"> ({l.name}, coming)</span>
                  </span>
                ),
              )}
            </p>
          </div>
        </nav>
      </div>

      <div className={styles.small}>
        <nav aria-label="Legal">
          {LEGAL.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <p>© {YEAR} Furnishes Pte. Ltd.</p>
      </div>
    </footer>
  );
}
