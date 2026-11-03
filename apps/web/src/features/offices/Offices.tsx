import { PieceCard } from "@/features/catalog/PieceCard";
import catalog from "@/features/catalog/Catalog.module.css";
import collection from "@/features/collection/Collection.module.css";
import { Opening } from "@/features/collection/Opening";
import { Index, Section, Steps } from "@/features/collection/Sections";
import { OFFICE_PIECES, OFFICES, ORDER_STEPS, PIECES_HEAD, WHY } from "./officesList";

/**
 * The offices page, from the site's own parts: the opening with the way to
 * ask for a quote, the pieces made for an office, why they suit a team as
 * an index, and how an office order goes.
 */
export function Offices() {
  return (
    <>
      <Opening
        label={OFFICES.label}
        title={OFFICES.title}
        photos={OFFICES.photos}
        rest={OFFICES.rest}
        lines={OFFICES.lines}
      >
        <a className={collection.outline} href={OFFICES.quote.href}>
          {OFFICES.quote.label}
        </a>
      </Opening>

      <Section id={PIECES_HEAD.id} label={PIECES_HEAD.label} title={PIECES_HEAD.title} rest={PIECES_HEAD.rest}>
        <ul className={catalog.grid}>
          {OFFICE_PIECES.map((p) => (
            <PieceCard key={p.slug} piece={p} />
          ))}
        </ul>
      </Section>

      <Section id={WHY.id} label={WHY.label} title={WHY.title} rest={WHY.rest}>
        <Index entries={WHY.tiles} />
      </Section>

      <Steps {...ORDER_STEPS} />
    </>
  );
}
