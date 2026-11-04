import { PieceCard } from "@/features/catalog/PieceCard";
import catalog from "@/features/catalog/Catalog.module.css";
import collection from "@/features/collection/Collection.module.css";
import { Opening } from "@/features/collection/Opening";
import { Examples } from "@/features/examples/Examples";
import { OFFICE_EXAMPLES } from "@/features/examples/examplesList";
import { Index, Section, Steps } from "@/features/collection/Sections";
import { Layouts } from "./Layouts";
import { EXAMPLES_REST, EXAMPLES_TITLE, OFFICE_PIECES, OFFICES, ORDER_STEPS, PIECES_HEAD, WHY } from "./officesList";

/**
 * The offices page, from the site's own parts: the opening with the way to
 * ask for a quote, office layouts by team size, the pieces made for an
 * office, why they suit a team as an index, example offices as stacked
 * cards, and how an office order goes.
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

      <Layouts />

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

      <Examples
        id="office-examples"
        title={EXAMPLES_TITLE}
        rest={EXAMPLES_REST}
        go={OFFICES.quote}
        examples={OFFICE_EXAMPLES}
      />

      <Steps {...ORDER_STEPS} />
    </>
  );
}
