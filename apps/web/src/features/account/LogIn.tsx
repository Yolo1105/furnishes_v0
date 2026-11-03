import Image from "next/image";
import Link from "next/link";
import collection from "@/features/collection/Collection.module.css";
import { routes } from "@/lib/routes";
import { logIn } from "./actions";
import { LOG_IN } from "./accountList";
import styles from "./Account.module.css";

/**
 * Log in, after the owner's other site: a room on the left, the wordmark
 * over its top and a line over its foot, and the form on the cream to the
 * right. No bar and no footer, so the page is the form alone. `next` is
 * where to go once logged in.
 */
export function LogIn({ next }: { next?: string }) {
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
        <form className={styles.form} action={logIn}>
          <h1 className={collection.heading}>
            <span className={collection.headingLabel}>{LOG_IN.label}</span>
            {LOG_IN.title} <span className={collection.headingRest}>{LOG_IN.line}</span>
          </h1>
          {next && <input type="hidden" name="next" value={next} />}
          <label className={styles.field}>
            <span className={styles.fieldLabel}>{LOG_IN.email}</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>{LOG_IN.password}</span>
            <input type="password" name="password" autoComplete="current-password" required />
          </label>
          <button className={collection.outline} type="submit">
            {LOG_IN.go}
          </button>
          <p className={styles.help}>
            {LOG_IN.trouble}{" "}
            <a className={collection.qaMail} href={LOG_IN.help.href}>
              {LOG_IN.help.label}
            </a>
          </p>
        </form>
      </main>
    </div>
  );
}
