import { fromPrice, type Piece, PIECES } from "@/features/catalog/catalog";
import { sgd } from "@/lib/money";
import { FINDER } from "./quizList";

type Question = (typeof FINDER)[number];
export type QuestionId = Question["id"];

/** Each question's pick, by the option's id; a skipped question has none. */
export type Answers = Partial<Record<QuestionId, string>>;

/** At most this many pieces, so the answer stays a short list. */
const MOST = 3;

const optionOf = <Q extends Question>(q: Q, id: string | undefined) =>
  q.options.find((o) => o.id === id) as Q["options"][number] | undefined;

const [ROOM, WANT, WIDTH, BUDGET] = FINDER;

/** A piece's narrowest width, in mm. */
const narrowest = (p: Piece) => Math.min(...p.sizes.map((s) => s.w));

/**
 * Up to three pieces that fit every answer given, in the catalogue's order,
 * each with why.
 */
export function match(a: Answers): { piece: Piece; reasons: string[] }[] {
  const room = optionOf(ROOM, a.room);
  const want = optionOf(WANT, a.want);
  const width = optionOf(WIDTH, a.width);
  const budget = optionOf(BUDGET, a.budget);
  const jobs: readonly string[] = want?.pieces ?? [];

  return PIECES.filter(
    (p) =>
      (!room || p.rooms.includes(room.room)) &&
      (!want || jobs.includes(p.slug)) &&
      (!width || narrowest(p) <= width.up) &&
      (!budget || fromPrice(p) <= budget.up),
  )
    .slice(0, MOST)
    .map((piece) => {
      const reasons: string[] = [];
      if (want) reasons.push(want.fits);
      if (room) reasons.push(`Made for the ${room.room.toLowerCase()}.`);
      if (width && width.up !== Infinity)
        reasons.push(`${narrowest(piece) / 10} cm wide, so it fits ${width.name.toLowerCase()}.`);
      if (budget && budget.up !== Infinity) reasons.push(`From ${sgd(fromPrice(piece))}, within your budget.`);
      return { piece, reasons };
    });
}

/** The answers the address carries, keeping only ones the questions offer. */
export function readAnswers(params: Record<string, string | string[] | undefined>): Answers {
  const answers: Answers = {};
  for (const q of FINDER) {
    const v = params[q.id];
    const id = Array.isArray(v) ? v[0] : v;
    if (id && q.options.some((o) => o.id === id)) answers[q.id] = id;
  }
  return answers;
}
