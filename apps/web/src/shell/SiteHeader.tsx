"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BROWSE, routes } from "@/lib/routes";
import styles from "./SiteHeader.module.css";

/** Where the browsing links fold into the menu, px: the 1024px breakpoint. */
const FOLD = 1024;

/**
 * The bar: the wordmark, the browsing links and contact on the left;
 * "Design your room" boxed and log in on the right. It floats with no fill
 * of its own, and takes the paper behind it once the page moves, so what
 * scrolls under stays out of the links.
 *
 * Narrower than FOLD the browsing links and contact fold into a menu that
 * opens under the bar (on a phone, log in goes in it too). It closes on
 * Escape, on choosing a link, and when the screen widens past the fold.
 *
 * Search and the region come in the next steps; log out, once accounts are
 * built.
 */
export function SiteHeader() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stick = () => setStuck(scrollY > 0);
    stick();
    addEventListener("scroll", stick, { passive: true });
    return () => removeEventListener("scroll", stick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const wide = matchMedia(`(width >= ${FOLD}px)`);
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

  return (
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
        <Link className={`${styles.link} ${styles.primary}`} href={routes.designYourRoom}>
          Design your room
        </Link>
        <Link className={`${styles.link} ${styles.logIn}`} href={routes.logIn}>
          Log in
        </Link>
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
        <Link className={`${styles.menuLink} ${styles.menuLogIn}`} href={routes.logIn} onClick={close}>
          Log in
        </Link>
      </nav>
    </header>
  );
}
