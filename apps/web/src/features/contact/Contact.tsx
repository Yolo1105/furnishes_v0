import Image from "next/image";
import Link from "next/link";
import collection from "@/features/collection/Collection.module.css";
import { Icon } from "@/features/collection/Icon";
import { askHref, CONTACT, DETAILS, ENQUIRY, TOPICS, TOPICS_HEAD } from "./contactList";
import { Enquiry } from "./Enquiry";
import styles from "./Contact.module.css";

/**
 * The contact page, after the owner's two references: the title and how
 * to reach us on the left, held in view while the enquiry on the right is
 * filled in, then what people write about: a card for a home and one for a
 * company, each need on it a tag that opens the enquiry with it picked.
 * Every way in, the enquiry too, is an email or the assistant.
 */
export function Contact() {
  return (
    <>
      <section className={styles.top} aria-labelledby="contact-title">
        <div className={styles.topSide}>
          <h1 id="contact-title" className={styles.title}>
            <span className={collection.headingLabel}>{CONTACT.label}</span>
            {CONTACT.title}
          </h1>
          <p className={styles.rest}>{CONTACT.rest}</p>
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
      <section className={collection.section} aria-labelledby="topics-title">
        <div className={styles.topicsTop}>
          <h2 id="topics-title" className={collection.heading}>
            <span className={collection.headingLabel}>{TOPICS_HEAD.label}</span>
            {TOPICS_HEAD.title}
          </h2>
          <div className={styles.topicsNote}>
            <p>{TOPICS_HEAD.note}</p>
            <a className={styles.sendGo} href="#enquiry">
              {TOPICS_HEAD.go}
            </a>
          </div>
        </div>
        <ul className={styles.topics}>
          {TOPICS.map((t) => (
            <li key={t.who} className={styles.topic}>
              <Image src={t.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 50vw" />
              <h3 className={styles.topicTitle}>{t.title}</h3>
              <p className={styles.topicLine}>{t.line}</p>
              <ul className={styles.tags}>
                {ENQUIRY.needs[t.who].map((n) => (
                  <li key={n.name}>
                    <a className={styles.tag} href={askHref(t.who, n.name)}>
                      {n.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
