import Link from "next/link";
import collection from "@/features/collection/Collection.module.css";
import { Opening } from "@/features/collection/Opening";
import { Section, Steps } from "@/features/collection/Sections";
import { CONTACT, DETAILS, NEXT, TOPICS, TOPICS_HEAD } from "./contactList";
import styles from "./Contact.module.css";

/**
 * The contact page, after the rebuild's: the opening with how to reach us
 * beside it, what people write about, each its own email, then what happens
 * next. No form: every way in is an email or the assistant.
 */
export function Contact() {
  return (
    <>
      <Opening label={CONTACT.label} title={CONTACT.title} photos={CONTACT.photos} rest={CONTACT.rest}>
        <dl className={styles.details}>
          {DETAILS.map((d) => (
            <div key={d.label}>
              <dt className={styles.detailLabel}>{d.label}</dt>
              <dd>
                {"href" in d ? (
                  d.href.startsWith("/") ? (
                    <Link className={collection.qaMail} href={d.href}>
                      {d.lines[0]}
                    </Link>
                  ) : (
                    <a className={collection.qaMail} href={d.href}>
                      {d.lines[0]}
                    </a>
                  )
                ) : (
                  d.lines.map((l) => <span key={l}>{l}</span>)
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Opening>
      <Section id="topics-title" {...TOPICS_HEAD}>
        <ul className={styles.topics}>
          {TOPICS.map((t) => (
            <li key={t.name} className={styles.topic}>
              <p className={collection.cardLabel}>{t.runs}</p>
              <h3 className={collection.promiseName}>{t.name}</h3>
              <p className={collection.promiseLine}>{t.line}</p>
              <a className={collection.outline} href={t.href}>
                {t.go}
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <Steps label={NEXT.label} title={NEXT.title} rest={NEXT.rest} steps={NEXT.steps} />
    </>
  );
}
