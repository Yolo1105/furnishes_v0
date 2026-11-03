import { Opening } from "@/features/collection/Opening";
import { Index, Section, Steps } from "@/features/collection/Sections";
import { BASICS, BUILD, GUIDE, HDB, MEASURE, ORDER } from "./guideList";
import styles from "./Guide.module.css";

/**
 * The buying guide, built from the site's own parts: the opening, then what
 * to measure, what usually fits each HDB flat, what an order holds, the
 * basics, each as the site's index, and the steps for a piece in parts.
 */
export function Guide() {
  return (
    <>
      <Opening label={GUIDE.label} title={GUIDE.title} photos={GUIDE.photos} rest={GUIDE.rest} lines={GUIDE.lines} />
      <Steps {...MEASURE} />

      <Section id={HDB.id} label={HDB.label} title={HDB.title} rest={HDB.rest}>
        <Index entries={HDB.flats.map((f) => ({ name: f.name, note: f.size, lines: f.lines }))} />
        <p className={styles.note}>{HDB.way}</p>
      </Section>

      <Section id={ORDER.id} label={ORDER.label} title={ORDER.title} rest={ORDER.rest}>
        <Index entries={ORDER.lists.map((l) => ({ name: l.name, lines: l.items }))} />
      </Section>

      <Section id={BASICS.id} label={BASICS.label} title={BASICS.title} rest={BASICS.rest}>
        <Index entries={BASICS.tiles} />
      </Section>

      <Steps {...BUILD} />
    </>
  );
}
