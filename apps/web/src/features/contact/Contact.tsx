import Link from "next/link";
import collection from "@/features/collection/Collection.module.css";
import { Opening } from "@/features/collection/Opening";
import { Index, Section, Steps } from "@/features/collection/Sections";
import { CONTACT, DETAILS, NEXT, TOPICS, TOPICS_HEAD } from "./contactList";
import styles from "./Contact.module.css";

/**
 * The contact page, after the rebuild's: the opening with how to reach us
 * beside it, no photos so they come first, what people write about, each its own email, then what happens
 * next. No form: every way in is an email or the assistant.
 */
export function Contact() {
  return (
    <>
      {/* no photos, so how to reach us sits right under the title, not under the fold */}
      <Opening label={CONTACT.label} title={CONTACT.title} photos={[]} rest={CONTACT.rest}>
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
                  // one line each, so the column reads evenly: "Monday to Friday, 10am to 6pm"
                  d.lines.map((l, i) => (i ? l.charAt(0).toLowerCase() + l.slice(1) : l)).join(", ")
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Opening>
      <Section id="topics-title" {...TOPICS_HEAD}>
        <Index
          entries={TOPICS.map((t) => ({ name: t.name, note: t.get, line: t.line, go: { label: t.go, href: t.href } }))}
        />
      </Section>
      <Steps label={NEXT.label} title={NEXT.title} rest={NEXT.rest} steps={NEXT.steps} />
    </>
  );
}
