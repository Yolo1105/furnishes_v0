import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import collection from "@/features/collection/Collection.module.css";
import type { SoonPage } from "./soonList";
import styles from "./Soon.module.css";

/**
 * A page whose tool is still to come, in its own opening:
 * the title, what it will do, and the ways in that work today, beside a room,
 * with anything the page adds under them.
 */
export function Soon({ page, children }: { page: SoonPage; children?: ReactNode }) {
  return (
    <section className={styles.top} aria-labelledby="soon-title">
      <div className={styles.text}>
        <h1 id="soon-title" className={collection.heading}>
          <span className={collection.headingLabel}>{page.label}</span>
          {page.title} <span className={collection.headingRest}>{page.rest}</span>
        </h1>
        <p className={collection.designLine}>{page.line}</p>
        <ul className={styles.ways}>
          {page.ways.map((w) => (
            <li key={w.label}>
              {w.href.startsWith("/") ? (
                <Link className={collection.outline} href={w.href}>
                  {w.label}
                </Link>
              ) : (
                <a className={collection.outline} href={w.href}>
                  {w.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        {children}
      </div>
      <div className={styles.photo}>
        <Image src={page.photo} alt="" fill priority sizes="(max-width: 1023px) 100vw, 55vw" />
      </div>
    </section>
  );
}
