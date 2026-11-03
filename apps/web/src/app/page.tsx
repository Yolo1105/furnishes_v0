import { Banner } from "@/features/banner/Banner";
import { Partners } from "@/features/partners/Partners";
import { RoomProvider } from "@/features/rooms/RoomContext";
import { FlatTour } from "@/features/tour/FlatTour";
import { SiteHeader } from "@/shell/SiteHeader";

/** The landing: the banner of rooms, the partners, then the flat toured a step at a time. */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <RoomProvider>
        <main id="main">
          <Banner />
          <Partners />
          <FlatTour />
        </main>
      </RoomProvider>
    </>
  );
}
