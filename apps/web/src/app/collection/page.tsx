import type { Metadata } from "next";
import { CollectionBanner } from "@/features/collection/CollectionBanner";
import { BANNER, COLLECTION_QUESTIONS, FOR_AND_LOOKS } from "@/features/collection/collectionList";
import { ReadyMade } from "@/features/collection/ReadyMade";
import { RoomCards } from "@/features/collection/RoomCards";
import { UnevenTiles } from "@/features/collection/UnevenTiles";
import { Intro } from "@/features/collection/Intro";
import { Mosaic } from "@/features/collection/Mosaic";
import { Promises } from "@/features/collection/Promises";
import { Questions } from "@/features/collection/Questions";
import { QuickLinks } from "@/features/collection/QuickLinks";
import { StartWith } from "@/features/collection/StartWith";
import { Tiles } from "@/features/collection/Tiles";
import { DesignOwn } from "@/features/collection/DesignOwn";
import { Details } from "@/features/collection/Details";
import { Visit } from "@/features/collection/Visit";
import styles from "@/features/collection/Collection.module.css";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Collection",
  description: "Ready-made furniture, and modular pieces and separator walls sized to Singapore homes.",
};

/**
 * Collection: what we sell over a room; right under it a statement of who
 * we are, a mosaic of the three things we make, then the ready-made line's quickest ways in, who it's for and its looks, as four tiles, then
 * titled sections: the two things we sell, what goes into each piece, a few pieces to start with,
 * quick ways in, questions, then what every order comes with and the home visit.
 */
export default function CollectionPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <CollectionBanner banner={BANNER} bare />
        <Intro />
        <Mosaic />
        <ReadyMade />
        <UnevenTiles
          id="for-title"
          label="Made for"
          title={FOR_AND_LOOKS.title}
          rest={FOR_AND_LOOKS.rest}
          tiles={FOR_AND_LOOKS.tiles}
        />
        <RoomCards />
        <Tiles />
        <Details />
        <DesignOwn />
        <StartWith />
        <QuickLinks />
        <Questions questions={COLLECTION_QUESTIONS} />
        {/* the two photo bands last, as a pair: the order's photo on the left,
            the visit's on the right, so they zigzag to the page's end */}
        <Promises />
        <Visit />
      </main>
    </>
  );
}
