import Link from "next/link";
import collection from "@/features/collection/Collection.module.css";
import { Opening } from "@/features/collection/Opening";
import { Section, Steps } from "@/features/collection/Sections";
import contact from "@/features/contact/Contact.module.css";
import { EVA, PLANNER, PLANNING, WAYS } from "./planningList";

/**
 * Planning help, for a visitor not logged in: what Eva and the room planner
 * do, from the site's own parts, then what needs an account and what doesn't.
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
              <p className={collection.promiseLine}>{t.line}</p>
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
    </>
  );
}
