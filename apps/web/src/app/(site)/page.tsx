import { MakingDays } from "@/features/about/About";
import { ABOUT_QUESTIONS } from "@/features/about/aboutList";
import { Banner } from "@/features/banner/Banner";
import { Examples } from "@/features/examples/Examples";
import { HOME_EXAMPLES, HOME_EXAMPLES_HEAD } from "@/features/examples/examplesList";
import { LinesPair } from "@/features/lines/Lines";
import { Questions } from "@/features/collection/Questions";
import styles from "@/features/collection/Collection.module.css";
// import { Partners } from "@/features/partners/Partners";
import { Assistant } from "@/features/planning/Assistant";
import { RoomProvider } from "@/features/rooms/RoomContext";
import { FlatTour } from "@/features/tour/FlatTour";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { SiteHeader } from "@/shell/SiteHeader";

/**
 * The landing: the banner of rooms, the partners, the two lines we sell, the
 * flat toured a step at a time, example rooms as stacked cards, Eva the
 * assistant, how an order gets from the factory to you, and the
 * questions. The team is on the contact page; recognition
 * waits for something to show.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <RoomProvider>
        <main id="main" className={styles.page}>
          {/* Sora across the page, the owner's pick after the trial */}
          <TypeTrial page="home">
            <Banner />
            {/* Partners is hidden for now: the names are made up. Show it again with real partners. */}
            <LinesPair />
            {/* What we believe (Manifesto) is hidden for now, at the owner's request. */}
            <FlatTour />
            <Examples id="examples" {...HOME_EXAMPLES_HEAD} examples={HOME_EXAMPLES} />
            <Assistant />
            {/* from the factory to your room, one section, on the owner's word */}
            <MakingDays />
            {/* Design your own (DesignOwn) is hidden for now, at the owner's request. */}
            {/* About Furnishes (WhoWeAre) is hidden for now, at the owner's request. */}
            <Questions questions={ABOUT_QUESTIONS} />
            {/* Furnishes in real rooms (RealRooms) is hidden for now, at the owner's request. */}
            {/* Recognition comes back here once there is an award or article to show. */}
            {/* For offices (OfficeBand) is hidden for now, at the owner's request. */}
          </TypeTrial>
        </main>
      </RoomProvider>
    </>
  );
}
