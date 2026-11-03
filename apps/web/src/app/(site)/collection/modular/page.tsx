import type { Metadata } from "next";
import { CollectionBanner } from "@/features/collection/CollectionBanner";
import { DesignOwn } from "@/features/collection/DesignOwn";
import { Visit } from "@/features/collection/Visit";
import styles from "@/features/collection/Collection.module.css";
import { Questions } from "@/features/collection/Questions";
import { LinePieces, Steps } from "@/features/collection/Sections";
import { MODULAR_BANNER, QUESTIONS, STEPS } from "@/features/modular/modularList";
import { BeforeAfter } from "@/features/modular/BeforeAfter";
import { Assembly } from "@/features/modular/Assembly";
import { Features, LeadTimes, Sets, Swatches, Walls } from "@/features/modular/ModularSections";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Modular furniture",
  description: "Modular pieces and separator walls sized to your room, ready to go or made yourself.",
};

/**
 * Modular: the line's banner, a piece put together as the page scrolls,
 * sets for a room, its pieces by kind, how it works, how long it takes, one
 * room before and after, why it is modular, the finishes coming, the
 * separator walls with their limits, questions, and designing your own and
 * the home visit.
 */
export default function ModularPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <CollectionBanner banner={MODULAR_BANNER} />
        <Assembly />
        <Sets />
        <LinePieces line="modular" />
        <Steps label="Step by step" title="How it works" rest="From your wall to your room" steps={STEPS} />
        <LeadTimes />
        <BeforeAfter />
        <Features />
        <Swatches />
        <Walls />
        <Questions questions={QUESTIONS} />
        <DesignOwn />
        <Visit />
      </main>
    </>
  );
}
