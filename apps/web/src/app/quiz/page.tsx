import type { Metadata } from "next";
import { FindYourPiece, Guides, QuizBanner, RoomByRoom } from "@/features/quiz/Quiz";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Find your piece",
  description: "Every kind of piece we make, and the rooms they're made for.",
};

/** Quiz: the showroom band, then find a piece by what it is, or by the room it is for, and two short guides before ordering. */
export default function QuizPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <QuizBanner />
        <FindYourPiece />
        <RoomByRoom />
        <Guides />
      </main>
    </>
  );
}
