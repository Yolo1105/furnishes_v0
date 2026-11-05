import Link from "next/link";
import shared from "@/features/collection/Collection.module.css";
import { Section } from "@/features/collection/Sections";
import { pieceBySlug } from "@/features/catalog/catalog";
import { pieceOf } from "@/lib/routes";
import { Compare } from "./Compare";
import { BEFORE_AFTER } from "./modularList";
import styles from "./Modular.module.css";

/**
 * One room before and after one piece, as one large pair you drag across:
 * the after render laid over the before, as the shared compare draws it.
 */
export function BeforeAfter() {
  const piece = pieceBySlug(BEFORE_AFTER.piece);
  return (
    <Section id="before-title" label={BEFORE_AFTER.label} title={BEFORE_AFTER.title} rest={BEFORE_AFTER.rest}>
      <Compare before={BEFORE_AFTER.before} after={BEFORE_AFTER.after} label="Before and after" />
      <p className={styles.compareFoot}>
        <span>Before</span>
        {piece && (
          <Link className={shared.qaMail} href={pieceOf(piece.slug)}>
            {piece.name}
          </Link>
        )}
        <span>After</span>
      </p>
    </Section>
  );
}
