import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { logIn, logInWithGoogle } from "./actions";
import { LOG_IN } from "./accountList";
import styles from "./Account.module.css";

/** Google's own mark, in its own colours, as its sign-in buttons must show it. */
function GoogleMark() {
  return (
    <svg className={styles.googleMark} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.82-.07-1.64-.23-2.43H12v4.6h6.46a5.52 5.52 0 0 1-2.4 3.63v3h3.87c2.26-2.08 3.56-5.15 3.56-8.8Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.93l-3.87-3c-1.08.73-2.47 1.16-4.08 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.27V6.64H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.36l4-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.36.61 4.61 1.8l3.45-3.45C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.64l4 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

/**
 * Log in, after the owner's other site: a room on the left, the wordmark
 * over its top and a line over its foot, and on the cream to the right a
 * way back to the site, the form, and the terms at the foot. No bar and no
 * footer. `next` is where to go once logged in; `googleSoon` says Google
 * isn't connected yet, after its button is pressed.
 */
export function LogIn({ next, googleSoon }: { next?: string; googleSoon?: boolean }) {
  const keepNext = next && <input type="hidden" name="next" value={next} />;
  return (
    <div className={styles.split}>
      <div className={styles.room}>
        <Image src={LOG_IN.photo} alt="" fill priority sizes="(max-width: 1023px) 100vw, 58vw" />
        <Link className={styles.wordmark} href={routes.home}>
          furnishes.
        </Link>
        <div className={styles.over}>
          <p className={styles.overTitle}>{LOG_IN.over}</p>
          <p className={styles.overLine}>{LOG_IN.overLine}</p>
        </div>
      </div>
      <main id="main" className={styles.panel}>
        <Link className={styles.back} href={routes.home}>
          {LOG_IN.back}
        </Link>
        <div className={styles.form}>
          <div className={styles.head}>
            <h1 className={styles.title}>{LOG_IN.title}</h1>
            <p className={styles.line}>{LOG_IN.line}</p>
          </div>
          <form action={logInWithGoogle}>
            {keepNext}
            <button className={styles.google} type="submit">
              <GoogleMark />
              {LOG_IN.google}
            </button>
          </form>
          {googleSoon && (
            <p className={styles.note} role="status">
              {LOG_IN.googleSoon}
            </p>
          )}
          <p className={styles.or}>{LOG_IN.or}</p>
          <form className={styles.fields} action={logIn}>
            {keepNext}
            <label className={styles.field}>
              <span className={styles.fieldLabel}>{LOG_IN.email}</span>
              <input type="email" name="email" autoComplete="email" placeholder={LOG_IN.emailHint} required />
            </label>
            <div className={styles.field}>
              <span className={styles.fieldTop}>
                <label className={styles.fieldLabel} htmlFor="log-in-password">
                  {LOG_IN.password}
                </label>
                <a className={styles.link} href={LOG_IN.forgot.href}>
                  {LOG_IN.forgot.label}
                </a>
              </span>
              <input id="log-in-password" type="password" name="password" autoComplete="current-password" required />
            </div>
            <button className={styles.go} type="submit">
              {LOG_IN.go}
            </button>
          </form>
          <p className={styles.help}>
            {LOG_IN.trouble}{" "}
            <a className={styles.link} href={LOG_IN.help.href}>
              {LOG_IN.help.label}
            </a>
          </p>
          <p className={styles.help}>
            {LOG_IN.what.line}{" "}
            <Link className={styles.link} href={LOG_IN.what.href}>
              {LOG_IN.what.label}
            </Link>
          </p>
        </div>
        <p className={styles.agree}>
          {LOG_IN.agree[0]}{" "}
          <Link className={styles.link} href={routes.terms}>
            terms
          </Link>{" "}
          {LOG_IN.agree[1]}{" "}
          <Link className={styles.link} href={routes.privacy}>
            privacy policy
          </Link>
          {LOG_IN.agree[2]}
        </p>
      </main>
    </div>
  );
}
