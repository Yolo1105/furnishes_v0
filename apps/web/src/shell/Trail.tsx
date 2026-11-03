import Link from "next/link";
import styles from "./Trail.module.css";

/** The way back up from a page: each step a link, the page itself last and plain. */
export function Trail({ steps, here }: { steps: readonly { href: string; label: string }[]; here: string }) {
  return (
    <nav className={styles.trail} aria-label="Breadcrumb">
      <ol>
        {steps.map((s) => (
          <li key={s.href}>
            <Link className={styles.step} href={s.href}>
              {s.label}
            </Link>
          </li>
        ))}
        <li aria-current="page">{here}</li>
      </ol>
    </nav>
  );
}
