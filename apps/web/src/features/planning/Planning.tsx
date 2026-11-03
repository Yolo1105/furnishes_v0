import Link from "next/link";
import { tryDemo } from "@/features/account/actions";
import account from "@/features/account/Account.module.css";
import collection from "@/features/collection/Collection.module.css";
import { Opening } from "@/features/collection/Opening";
import { Section, Steps } from "@/features/collection/Sections";
import contact from "@/features/contact/Contact.module.css";
import { Brief } from "./Brief";
import { EVA, PLANNER, PLANNING, WAYS } from "./planningList";
import styles from "./Planning.module.css";

/**
 * Planning help, for a visitor not logged in: what Eva and the room planner
 * do, from the site's own parts, then the three ways to get help side by
 * side, and a room told to us by email.
 */
export function Planning() {
  return (
    <>
      <Opening
        label={PLANNING.label}
        title={PLANNING.title}
        photos={PLANNING.photos}
        rest={PLANNING.rest}
        lines={PLANNING.lines}
      >
        <Link className={collection.outline} href={PLANNING.go.href}>
          {PLANNING.go.label}
        </Link>
        <form className={account.logOutLine} action={tryDemo}>
          {PLANNING.demo.line}{" "}
          <button className={`${account.link} ${account.logOut}`} type="submit">
            {PLANNING.demo.go}
          </button>
        </form>
      </Opening>

      <Section id={EVA.id} label={EVA.label} title={EVA.title} rest={EVA.rest}>
        <ul className={contact.topics}>
          {EVA.tiles.map((t) => (
            <li key={t.name} className={contact.topic}>
              <h3 className={collection.promiseName}>{t.name}</h3>
              <p className={collection.promiseLine}>{t.line}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Steps {...PLANNER} />

      <Section id={WAYS.id} label={WAYS.label} title={WAYS.title} rest={WAYS.rest}>
        <ul className={contact.topics}>
          {WAYS.tiles.map((t) => (
            <li key={t.name} className={contact.topic}>
              <h3 className={collection.promiseName}>{t.name}</h3>
              <dl className={styles.facts}>
                {t.facts.map((f) => (
                  <div key={f.label}>
                    <dt className={collection.cardLabel}>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              {t.go.href.startsWith("/") ? (
                <Link className={collection.outline} href={t.go.href}>
                  {t.go.label}
                </Link>
              ) : (
                <a className={collection.outline} href={t.go.href}>
                  {t.go.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Brief />
    </>
  );
}
