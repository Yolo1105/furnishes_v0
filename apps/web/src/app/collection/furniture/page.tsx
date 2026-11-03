import type { Metadata } from "next";
import { CollectionBanner } from "@/features/collection/CollectionBanner";
import { Promises } from "@/features/collection/Promises";
import { Questions } from "@/features/collection/Questions";
import { LinePieces, Steps } from "@/features/collection/Sections";
import { DesignOwn } from "@/features/collection/DesignOwn";
import { Visit } from "@/features/collection/Visit";
import styles from "@/features/collection/Collection.module.css";
import {
  FURNITURE_BANNER,
  FURNITURE_PROMISES,
  FURNITURE_QUESTIONS,
  FURNITURE_STEPS,
  TO_MODULAR,
} from "@/features/furniture/furnitureList";
import { Bestsellers, Featured, Kinds, MadeBy, OwnSize, Spotlight } from "@/features/furniture/FurnitureSections";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Furniture",
  description:
    "Desks, chairs, tables, sofas and storage, ready-made by our partner factory and delivered in Singapore.",
};

/**
 * Furniture: the line's banner; its kinds as tiles, bestsellers, the way
 * to your own size, featured pieces, the sofa over a full-width photo, and who makes it; then every piece by
 * kind, how a piece reaches you, what every order comes with, questions, designing your own and the home visit.
 */
export default function FurniturePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <CollectionBanner banner={FURNITURE_BANNER} />
        <Kinds />
        <Bestsellers />
        <OwnSize />
        <Featured />
        <Spotlight />
        <MadeBy />
        <LinePieces line="furniture" aside={TO_MODULAR} />
        <Steps label="Delivery" title="How it reaches you" rest="From order to your room" steps={FURNITURE_STEPS} />
        <Promises promises={FURNITURE_PROMISES} />
        <Questions questions={FURNITURE_QUESTIONS} />
        <DesignOwn />
        <Visit />
      </main>
    </>
  );
}
