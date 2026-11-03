import type { Metadata } from "next";
import { CollectionBanner } from "@/features/collection/CollectionBanner";
import { DesignOwn } from "@/features/collection/DesignOwn";
import { Visit } from "@/features/collection/Visit";
import styles from "@/features/collection/Collection.module.css";
import { Questions } from "@/features/collection/Questions";
import { LinePieces, Steps } from "@/features/collection/Sections";
import { MODULAR_BANNER, QUESTIONS, STEPS } from "@/features/modular/modularList";
import { Features, Walls } from "@/features/modular/ModularSections";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Modular furniture",
  description: "Modular pieces and separator walls sized to your room, ready to go or made yourself.",
};

/**
 * Modular: the line's banner, its pieces by kind, how it works, why it is
 * modular, the separator walls with their limits, questions, and designing your own and
 * the home visit.
 */
export default function ModularPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <CollectionBanner banner={MODULAR_BANNER} />
        <LinePieces line="modular" />
        <Steps label="Step by step" title="How it works" rest="From your wall to your room" steps={STEPS} />
        <Features />
        <Walls />
        <Questions questions={QUESTIONS} />
        <DesignOwn />
        <Visit />
      </main>
    </>
  );
}
