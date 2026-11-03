import collection from "@/features/collection/Collection.module.css";
import { Opening } from "@/features/collection/Opening";
import { Section, Steps } from "@/features/collection/Sections";
import contact from "@/features/contact/Contact.module.css";
import { BASICS, BUILD, GUIDE, HDB, MEASURE, ORDER } from "./guideList";
import styles from "./Guide.module.css";

/**
 * The buying guide, built from the site's own parts: the opening, then what
 * to measure, what usually fits each HDB flat, what an order holds, the
 * basics as tiles like the contact page's, and the steps for a piece in parts.
 */
export function Guide() {
  return (
    <>
      <Opening label={GUIDE.label} title={GUIDE.title} photos={GUIDE.photos} rest={GUIDE.rest} lines={GUIDE.lines} />
      <Steps {...MEASURE} />

      <Section id={HDB.id} label={HDB.label} title={HDB.title} rest={HDB.rest}>
        <ul className={contact.topics}>
          {HDB.flats.map((f) => (
            <li key={f.name} className={contact.topic}>
              <p className={collection.cardLabel}>{f.size}</p>
              <h3 className={collection.promiseName}>{f.name}</h3>
              <ul className={styles.lines}>
                {f.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className={styles.note}>{HDB.way}</p>
      </Section>

      <Section id={ORDER.id} label={ORDER.label} title={ORDER.title} rest={ORDER.rest}>
        <ul className={`${contact.topics} ${styles.pair}`}>
          {ORDER.lists.map((l) => (
            <li key={l.name} className={contact.topic}>
              <h3 className={collection.promiseName}>{l.name}</h3>
              <ul className={styles.lines}>
                {l.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section id={BASICS.id} label={BASICS.label} title={BASICS.title} rest={BASICS.rest}>
        <ul className={contact.topics}>
          {BASICS.tiles.map((t) => (
            <li key={t.name} className={contact.topic}>
              <h3 className={collection.promiseName}>{t.name}</h3>
              <p className={collection.promiseLine}>{t.line}</p>
              {"go" in t && (
                <a className={collection.outline} href={t.go.href}>
                  {t.go.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Steps {...BUILD} />
    </>
  );
}
