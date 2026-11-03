import Link from "next/link";
import { EMAIL, HOURS, MAILTO, PLACE } from "@/lib/contact";
import { FOOT_PAGES, LEGAL, routes } from "@/lib/routes";
import { SITE } from "@/lib/site";
import styles from "./SiteFooter.module.css";

/** The year the copyright line names; fixed at build, as the page is static. */
const YEAR = new Date().getFullYear();

/**
 * The footer: one big line asking to get in touch, then who we are, how to
 * reach us and the pages, then the small print. The page turned over, paper
 * on red, on the same two columns as the banner.
 */
export function SiteFooter() {
  return (
    <footer className={styles.foot}>
      <p className={styles.call}>
        <a href={MAILTO}>Sounds right? Let’s fit your room.</a>
      </p>
      <div className={styles.about}>
        <Link className={styles.wordmark} href={routes.home}>
          furnishes.
        </Link>
        <p>{SITE.description}</p>
      </div>
      <div className={styles.cols}>
        <div>
          <h2 className={styles.head}>Visit</h2>
          <ul>
            {PLACE.map((l) => (
              <li key={l}>{l}</li>
            ))}
            <li>Home visits</li>
          </ul>
        </div>
        <div>
          <h2 className={styles.head}>Hours</h2>
          <ul>
            {HOURS.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={styles.head}>Contact</h2>
          <ul>
            <li>
              <a href={MAILTO}>{EMAIL}</a>
            </li>
            <li>Email and AI support</li>
          </ul>
        </div>
        <nav aria-labelledby="foot-pages">
          <h2 className={styles.head} id="foot-pages">
            Pages
          </h2>
          <ul>
            {FOOT_PAGES.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
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
