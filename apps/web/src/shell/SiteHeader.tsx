"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { BROWSE, routes } from "@/lib/routes";
import { logOut } from "@/features/account/actions";
import { readLoggedIn } from "@/features/account/loggedIn";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { Region } from "./Region";
import { Search } from "./Search";
import styles from "./SiteHeader.module.css";

/** The log-in flag never changes while a page is open: logging in or out loads a new one. */
const unchanging = () => () => {};

/** Where the browsing links fold into the menu, px; the CSS's 1023px breakpoint. */
const FOLD = 1023;

/**
 * The bar: the wordmark, the browsing links and contact on the left; a
 * search magnifier that opens a field leftwards, the region and currency, "Design your room" boxed, and log in (log out, once in) on the right
 * (contact moved left to make room for the region, on the owner's word). It floats over the
 * banner with no fill of its own, and takes the paper behind it once the
 * page moves, so what scrolls under stays out of the links.
 *
 * Narrower than FOLD the browsing links and contact fold into a menu that
 * opens under the bar (on a phone, search, the region and log in go in it too). It closes on
 * Escape, on choosing a link, and when the screen widens past the fold.
 */
export function SiteHeader() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  // logged in, the bar offers Log out where it offered Log in
  const inside = useSyncExternalStore(unchanging, readLoggedIn, () => false);

  useEffect(() => {
    const stick = () => setStuck(scrollY > 0);
    stick();
    addEventListener("scroll", stick, { passive: true });
    return () => removeEventListener("scroll", stick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const wide = matchMedia(`(width > ${FOLD}px)`);
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    addEventListener("keydown", onKey);
    wide.addEventListener("change", close);
    return () => {
      removeEventListener("keydown", onKey);
      wide.removeEventListener("change", close);
    };
  }, [open]);

  const close = () => setOpen(false);

  // Sora, as on the pages, on the owner's word
  return (
    <TypeTrial page="bar">
      <header className={styles.header} data-stuck={stuck || undefined} data-open={open || undefined}>
        <Link className={styles.wordmark} href={routes.home}>
          furnishes.
        </Link>
        <nav className={styles.start} aria-label="Browse">
          {BROWSE.map((l) => (
            <Link key={l.href} className={styles.link} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link className={styles.link} href={routes.contact}>
            Contact
          </Link>
        </nav>
        <div className={styles.end}>
          <Search className={styles.barRegion} />
          <Region className={styles.barRegion} />
          <Link className={`${styles.link} ${styles.primary}`} href={routes.designYourRoom}>
            Design your room
          </Link>
          {inside ? (
            <form className={styles.logIn} action={logOut}>
              <button type="submit" className={`${styles.link} ${styles.logOut}`}>
                Log out
              </button>
            </form>
          ) : (
            <Link className={`${styles.link} ${styles.logIn}`} href={routes.logIn}>
              Log in
            </Link>
          )}
          <button
            type="button"
            className={`${styles.link} ${styles.menuButton}`}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        <nav id="site-menu" className={styles.menu} aria-label="Menu" hidden={!open}>
          {BROWSE.map((l) => (
            <Link key={l.href} className={styles.menuLink} href={l.href} onClick={close}>
              {l.label}
            </Link>
          ))}
          <Link className={styles.menuLink} href={routes.contact} onClick={close}>
            Contact
          </Link>
          <Search className={styles.menuRegion} inMenu />
          <Region className={`${styles.menuLink} ${styles.menuRegion}`} />
          {inside ? (
            <form className={styles.menuLogIn} action={logOut}>
              <button type="submit" className={`${styles.menuLink} ${styles.logOut}`}>
                Log out
              </button>
            </form>
          ) : (
            <Link className={`${styles.menuLink} ${styles.menuLogIn}`} href={routes.logIn} onClick={close}>
              Log in
            </Link>
          )}
        </nav>
      </header>
    </TypeTrial>
  );
}
