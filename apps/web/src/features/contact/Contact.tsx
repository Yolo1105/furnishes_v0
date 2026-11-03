import Link from "next/link";
import collection from "@/features/collection/Collection.module.css";
import { Icon } from "@/features/collection/Icon";
import { Index, Section, Steps } from "@/features/collection/Sections";
import { CONTACT, DETAILS, NEXT, TOPICS, TOPICS_HEAD, WAYS, WAYS_HEAD } from "./contactList";
import { Enquiry } from "./Enquiry";
import styles from "./Contact.module.css";

/**
 * The contact page, after the owner's two references: the title and how
 * to reach us on the left, held in view while the enquiry on the right is
 * filled in, then the other ways we help, what people write about, each
 * its own email, and what happens next. Every way in, the enquiry too, is an email or the assistant.
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
                      <Link className={collection.qaMail} href={d.href}>
                        {d.lines[0]}
                      </Link>
                    ) : (
                      <a className={collection.qaMail} href={d.href}>
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
      <section className={styles.ways} aria-labelledby="ways-title">
        <h2 id="ways-title" className={`${collection.heading} ${styles.centred}`}>
          <span className={collection.headingLabel}>{WAYS_HEAD.label}</span>
          {WAYS_HEAD.title} <span className={collection.headingRest}>{WAYS_HEAD.rest}</span>
        </h2>
        <ul className={styles.cards}>
          {WAYS.map((w) => (
            <li key={w.name} className={styles.card}>
              <Icon name={w.icon} />
              <h3 className={styles.cardName}>{w.name}</h3>
              <p className={styles.cardLine}>{w.line}</p>
              {w.go.href.startsWith("/") ? (
                <Link className={collection.qaMail} href={w.go.href}>
                  {w.go.label}
                </Link>
              ) : (
                <a className={collection.qaMail} href={w.go.href}>
                  {w.go.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
      <Section id="topics-title" {...TOPICS_HEAD}>
        <Index
          entries={TOPICS.map((t) => ({ name: t.name, note: t.get, line: t.line, go: { label: t.go, href: t.href } }))}
        />
      </Section>
      <Steps label={NEXT.label} title={NEXT.title} rest={NEXT.rest} steps={NEXT.steps} />
    </>
  );
}
