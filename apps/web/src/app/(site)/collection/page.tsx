import type { Metadata } from "next";
import { Catalogue } from "@/features/collection/Catalogue";
import { Compare } from "@/features/collection/Compare";
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
import { ForYou } from "@/features/collection/ForYou";
import { Visit } from "@/features/collection/Visit";
import styles from "@/features/collection/Collection.module.css";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Collection",
  description: "Ready-made furniture, and modular pieces and separator walls sized to Singapore homes.",
};

/**
 * Collection: what we sell over a room; right under it a statement of who
 * we are, the pieces a logged-in visitor's answers suit, a mosaic of the three things we make, the catalogue by kind with its counts, and how they compare, then the ready-made line's quickest ways in, who it's for and its looks, as four tiles, then
 * one piece to start a room with as three cards, then titled sections: the two things we sell, what goes into each piece, a few pieces to start with,
 * quick ways in, questions, then what every order comes with and the home visit.
 */
export default function CollectionPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        {/* Sora, as on the home page, on the owner's word */}
        <TypeTrial page="collection">
          <CollectionBanner banner={BANNER} bare />
          <Intro />
          <ForYou />
          <Mosaic />
          <Catalogue />
          <Compare />
          <ReadyMade />
          <UnevenTiles
            id="for-title"
            label="Made for"
            title={FOR_AND_LOOKS.title}
            rest={FOR_AND_LOOKS.rest}
            tiles={FOR_AND_LOOKS.tiles}
          />
          <RoomCards />
          {/* Every room starts with one piece (FirstPiece) is hidden for now, at the owner's request. */}
          <Tiles />
          <Details />
          <DesignOwn />
          <StartWith />
          <QuickLinks />
          <Questions questions={COLLECTION_QUESTIONS} />
          {/* the two photo bands last, as a pair: the order's photo on the left,
              the visit's on the right, so they zigzag to the page's end; in
              Sora with the rest, so the page reads as one, on the owner's word */}
          <Promises />
          <Visit />
        </TypeTrial>
      </main>
    </>
  );
}
