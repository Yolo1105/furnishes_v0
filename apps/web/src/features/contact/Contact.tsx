import Image from "next/image";
import Link from "next/link";
import collection from "@/features/collection/Collection.module.css";
import { CONTACT, WAYS, WHEN } from "./contactList";
import styles from "./Contact.module.css";

/**
 * The contact page: the title and the hours beside a room, then the ways to
 * reach us side by side, each a short line and its way in. No form: every
 * way is an email or the assistant, so nothing is sent from the page.
 */
export function Contact() {
  return (
    <>
      <section className={styles.top} aria-labelledby="contact-title">
        <div className={styles.topText}>
          <h1 id="contact-title" className={collection.heading}>
            <span className={collection.headingLabel}>{CONTACT.label}</span>
            {CONTACT.title} <span className={collection.headingRest}>{CONTACT.rest}</span>
          </h1>
          <dl className={styles.when}>
            {WHEN.map((w) => (
              <div key={w.label}>
                <dt className={collection.cardLabel}>{w.label}</dt>
                {w.lines.map((l) => (
                  <dd key={l}>{l}</dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.photo}>
          <Image src={CONTACT.photo} alt="" fill priority sizes="(max-width: 1023px) 100vw, 55vw" />
        </div>
      </section>
      <section className={collection.section} aria-label="Ways to reach us">
        <ul className={styles.ways}>
          {WAYS.map((w) => (
            <li key={w.name} className={styles.way}>
              <h2 className={collection.promiseName}>{w.name}</h2>
              <p className={collection.promiseLine}>{w.line}</p>
              {w.go.href.startsWith("/") ? (
                <Link className={styles.go} href={w.go.href}>
                  {w.go.label}
                </Link>
              ) : (
                <a className={styles.go} href={w.go.href}>
                  {w.go.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
