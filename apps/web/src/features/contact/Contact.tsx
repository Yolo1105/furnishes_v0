import Link from "next/link";
import collection from "@/features/collection/Collection.module.css";
import { Icon } from "@/features/collection/Icon";
import { Section } from "@/features/collection/Sections";
import { CONTACT, DETAILS, TOPICS, TOPICS_HEAD } from "./contactList";
import { Enquiry } from "./Enquiry";
import styles from "./Contact.module.css";

/**
 * The contact page, after the owner's two references: the title and how
 * to reach us on the left, held in view while the enquiry on the right is
 * filled in, then what people write about, each in its own box and its
 * own email. Every way in, the enquiry too, is an email or the assistant.
 */
export function Contact() {
  return (
    <>
      <section className={styles.top} aria-labelledby="contact-title">
        <div className={styles.topSide}>
          <h1 id="contact-title" className={collection.openingTitle}>
            <span className={collection.headingLabel}>{CONTACT.label}</span>
            {CONTACT.title}
          </h1>
          <p className={collection.openingRest}>{CONTACT.rest}</p>
          <dl className={styles.details}>
            {DETAILS.map((d) => (
              <div key={d.label}>
                <dt className={styles.detailLabel}>
                  <Icon name={d.icon} />
                  {d.label}
                </dt>
                <dd>
                  {"href" in d ? (
                    d.href.startsWith("/") ? (
                      <Link className={styles.link} href={d.href}>
                        {d.lines[0]}
                      </Link>
                    ) : (
                      <a className={styles.link} href={d.href}>
                        {d.lines[0]}
                      </a>
                    )
                  ) : (
                    // one line each, so the column reads evenly: "Monday to Friday, 10am to 6pm"
                    d.lines.map((l, i) => (i ? l.charAt(0).toLowerCase() + l.slice(1) : l)).join(", ")
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <Enquiry />
      </section>
      <Section id="topics-title" {...TOPICS_HEAD}>
        <ul className={styles.cards}>
          {TOPICS.map((t) => (
            <li key={t.name} className={styles.card}>
              <p className={styles.cardNote}>{t.get}</p>
              <h3 className={styles.cardName}>{t.name}</h3>
              <p className={styles.cardLine}>{t.line}</p>
              <a className={styles.link} href={t.href}>
                {t.go}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
