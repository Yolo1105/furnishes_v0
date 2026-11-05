import type { Metadata } from "next";
import { Opening } from "@/features/collection/Opening";
import { FindYourPiece, Guides, QuizBanner, RoomByRoom } from "@/features/quiz/Quiz";
import { readAnswers } from "@/features/quiz/match";
import { FINDER_HEAD, OPENING_LABEL } from "@/features/quiz/quizList";
import { Problems } from "@/features/quiz/Problems";
import { QuizStart } from "@/features/quiz/Stage";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Find your piece",
  description: "Every kind of piece we make, and the rooms they're made for.",
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

/** Quiz: the four short questions on a screen of their own, one at a time; then the opening, as on the other pages, and the answers with the pieces that fit; the showroom band, then find a piece by what it is, by the problem it answers, or by the room it is for, and two short guides before ordering. */
export default async function QuizPage({ searchParams }: Props) {
  const initial = readAnswers(await searchParams);
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Sora, as on the other pages, on the owner's word */}
        <TypeTrial page="quiz">
          <QuizStart
            initial={initial}
            opening={<Opening label={OPENING_LABEL} title={FINDER_HEAD.title} photos={[]} rest={FINDER_HEAD.line} />}
          />
          <QuizBanner />
          <FindYourPiece />
          <Problems />
          <RoomByRoom />
          <Guides />
        </TypeTrial>
      </main>
    </>
  );
}
