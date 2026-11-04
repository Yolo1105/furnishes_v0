import { MakingDays, Manifesto, WhoWeAre, Workshop } from "@/features/about/About";
import { ABOUT_QUESTIONS } from "@/features/about/aboutList";
import { Banner } from "@/features/banner/Banner";
import { Examples } from "@/features/examples/Examples";
import { HOME_EXAMPLES, HOME_EXAMPLES_HEAD } from "@/features/examples/examplesList";
import { Lines } from "@/features/lines/Lines";
import { Questions } from "@/features/collection/Questions";
import { Visit } from "@/features/collection/Visit";
import styles from "@/features/collection/Collection.module.css";
import { Partners } from "@/features/partners/Partners";
import { Assistant } from "@/features/planning/Assistant";
import { RoomProvider } from "@/features/rooms/RoomContext";
import { FlatTour } from "@/features/tour/FlatTour";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { SiteHeader } from "@/shell/SiteHeader";

/**
 * The landing: the banner of rooms, the partners, what we believe and four
 * figures, the two lines we sell, the flat toured a step at a time, Eva the
 * assistant, example rooms as stacked cards, then About (who we are, the
 * factory, the five steps to your home, questions and the home
 * visit). The team is on the contact page; recognition waits for
 * something to show.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <RoomProvider>
        <main id="main" className={styles.page}>
          {/* Sora across the page, the owner's pick after the trial */}
          <TypeTrial>
            <Banner />
            <Partners />
            <Manifesto />
            <Lines />
            <FlatTour />
            <Assistant />
            <Examples id="examples" {...HOME_EXAMPLES_HEAD} examples={HOME_EXAMPLES} />
            <WhoWeAre />
            <Workshop />
            <MakingDays />
            {/* Recognition comes back here once there is an award or article to show. */}
            <Questions questions={ABOUT_QUESTIONS} />
            <Visit />
          </TypeTrial>
        </main>
      </RoomProvider>
    </>
  );
}
