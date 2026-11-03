# What to take from the rebuild

A plan for bringing sections of the rebuild (the site at localhost:3101, its
`/studio` and `/about` pages) into furnishes v0. Written 2 Nov 2026.

**Status, 2 Nov 2026: all six are built** on the `rebuild-sections` branch.
Two changes from the plan:

- The About page also has the story, the team, and awards and press, with
  placeholders, on the owner's word.
- "Why modular" already existed on the modular page. It gained its one line
  on limits rather than becoming a second section.

Scope: the rebuild only. The other old repos are left for later.

## How every section is adapted

The rebuild's sections hold good content, but their look doesn't match v0.
Each one is rebuilt in v0's own style rather than copied:

- **Look:** cream page, square corners, v0's tokens only.
- **Title:** red, with a brown Jost second line, as the collection's titles.
- **Labels and lines:** pale brown labels; brown Jost lines under names.
- **Remove:**
  - the peach gradient background
  - the "[ WHO WE ARE ]" bracket labels and monospace capitals
  - ruled tables
  - outlined buttons
  - bordered cards
- **Text:** cut each section to about a third. One line per item where possible.
- **Facts:** no placeholder text on the page. A section whose facts aren't
  confirmed waits.
- **Photos:** v0's own photos come first. Renders come over only where a
  section can't work without them, such as before/after.

## Sections to bring over

Most worth doing first is at the top.

### 1. A new About page (v0 has none, though the bar links to it)

The rebuild's about page, rebuilt as one page, in this order:

| Order | Rebuild section      | What it holds                                                                  | Changes                                                                               |
| ----- | -------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| 1     | `WhoWeAre`           | "Furniture that fits how you live and work", two photos                        | Cut three paragraphs to one; red title with a brown line                              |
| 2     | `Manifesto` (studio) | A short statement and four figures: 18 mm, 6 weeks, S$180, 24 hours            | Statement to two lines; figures in one row, number large in red, words under in brown |
| 3     | `Workshop`           | Made by our partner factory: made in, factory, material, arrives, delivered to | Short label/value lines beside a photo; no ruled monospace table                      |
| 4     | `MakingDays`         | From order to your home, 5 steps                                               | One row of five steps with no boxes; reuse v0's `Steps` look                          |
| 5     | v0 `Questions`       | About 6 answers from the rebuild's 31                                          | Reuse v0's FAQ (first open, no lines)                                                 |
| 6     | v0 `Visit`           | The home visit band                                                            | Reuse as it is                                                                        |

**Wait for real content:**

- `Heritage`, "Our story": two of its three parts are empty.
- `Team`: a placeholder person.

### 2. Quiz page: "What's bothering you?" (`SoundFamiliar`)

**How it works:** pick a room (entryway, work, bedroom, kitchen, living room,
sharing a room), then the problem that sounds like yours. A suggested piece
appears.

**Where:** after "Find your piece", before "Room by room".

**Changes:**

- Three problems per room, not more.
- The result is a photo card: photo, name, price and "See this piece".
- Drop the warnings and "not included" lines.
- Drop the "Or choose by the kind of answer you want" list under it.

**Needs:** each problem matched to one of v0's 14 pieces.

### 3. Inspiration page: "You may have got used to these" (`NotNoticed`)

**What it is:** 8 everyday problems, such as the chair by the door or the
phone on the floor at night, each with the piece that fixes it.

**Where:** between the room row and the stories.

**Changes:**

- Keep 4.
- Each becomes a photo card: the problem as the title, one line, and the
  piece as a link.

The rebuild's `CaseSheets` ("Where it helps, day to day", 8 cases) says much
the same. Take only this one.

### 4. Collection page: "Three kinds of furniture, and why" (`Compare`)

**Where:** after the mosaic.

**Changes:**

- Three columns: ready-made, modular, design your own.
- Four rows instead of eleven: what it is, how long it takes, price, and a link.
- No ruled lines. Columns are told apart by spacing, and the row names are
  pale brown labels.

### 5. Modular page: four sections

| Rebuild section | What it holds                                                                       | Changes                                                                                                |
| --------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `LeadTimes`     | A chart of weeks: flat-packed, built, ready-made, add-ons, drawn as measuring lines | Three lines, v0 red, no grid lines; the weeks come from v0's own figures                               |
| `BeforeAfter`   | The same room before and after one piece, 5 pairs side by side                      | One large pair you drag across, rather than a row of small ones; needs the rebuild's renders copied in |
| `WhyModular`    | Six reasons to build from parts, then its limits                                    | Three reasons (fits where fixed sizes don't, can change its job, can grow) and one line on its limits  |
| `Swatches`      | Six finishes, marked as not on sale                                                 | Label them "Coming"; drop the two outlined buttons                                                     |

### 6. Piece page: what you can change (`Customize`)

**What it is:** size, finish, add-ons and installation, each with what it
costs.

**Where:** under the piece's choices, near Customize.

**Changes:** a short list of four lines. The prices come from the catalogue.

## Already done

- **Quiz page guides** (`BeforeYouOrder` and the HDB page): how to measure,
  and what to check in an HDB flat.
- **Quiz band:** "Create with intention" over the showroom, after the
  rebuild's closing band.

## Left out, and why

| Rebuild section                                             | Why                                                                                    |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `StudioView` (photos and floor-plan tour)                   | v0's home page has its own flat tour                                                   |
| `OnThisPage`                                                | v0's pages are short enough not to need a contents list                                |
| `Furniture` (the piece cards and price list)                | v0's catalogue cards already do this                                                   |
| `WhoFor`                                                    | v0's "Made for" tiles already cover it                                                 |
| `CloserLook` ("Where you'll use it")                        | Covered by the quiz guides                                                             |
| `WhatItDoes` (dividers, moving cabinets, small pieces)      | Most of it is "coming soon"; revisit when those pieces exist                           |
| `OtherUses` (about 6,400 px of other uses and arrangements) | Mostly concepts or "needs testing"                                                     |
| `CaseSheets`                                                | Overlaps `NotNoticed`; one is enough                                                   |
| `KeepWhatYouHave`                                           | One line of it can go in the About statement                                           |
| `HowToBuy`                                                  | Overlaps "order to your home"; its facts (delivery, returns, warranty) go into the FAQ |
| `BuildIt`, `AfterYouBuy`                                    | Better as FAQ answers than sections                                                    |
| `AiHelps`, `DesignYourRoom`                                 | Belong on the design page, which isn't built yet                                       |
| `Packages` (visit, AI or email)                             | Belongs on the contact page, which isn't built yet                                     |
| `NotSure`, `StartProject`, `WorkWithUs`                     | v0's quiz, visit band and partners already do these jobs                               |

## Facts to confirm before building

These are in the rebuild but are placeholders or guesses. Each section using
one waits on it.

- **Figures:**
  - 18 mm birch plywood
  - 6 weeks at the soonest
  - from S$180
  - the AI assistant answering within 24 hours
- **Lead times:** 6–8 weeks flat-packed, 8–10 built, 8–12 ready-made, 4–6
  for add-ons.
- **Costs:** a custom size at 15% more plus 2–3 weeks, a special finish at
  10% more, add-ons at S$12–160, installation at S$80–250.
- **Factory details:** what can be said about the partner factory.
- **The six finishes:** which are really planned.
- **The team, and the story's three parts.**

## Build order

1. The About page (section 1), without the story and team.
2. The quiz's "What's bothering you?" (section 2).
3. Inspiration's "You may have got used to these" (section 3).
4. The collection's comparison (section 4).
5. The modular page's lead times, why modular, swatches, then before/after
   (section 5).
6. The piece page's list of changes (section 6).

Each step is checked at 1440 px and on a phone, with `pnpm check` passing,
before the next one starts.

## Code details for each section

From reading the rebuild's code. Paths are under the rebuild's
`apps/web/src`.

**Placeholders.** The rebuild keeps unsettled facts in `lib/facts.ts`. Only
six show as "[Placeholder: …]" on the page:

- weight limits
- stability
- the team
- awards
- company details
- data-protection contact

Prices, lead times and terms are drafts shown as normal text. They are still
guesses until you confirm them.

**Images.** v0 has none of the rebuild's images.

- The rebuild's `.jpg` files are stock room photos, not Furnishes pieces.
- Its `.webp` files are 3D renders of its own pieces:
  - 14 pieces in rooms
  - 14 pieces on their own
  - 10 before/after renders
  - 28 renders of other uses
- Any render v0 needs has to be copied into `apps/web/src/assets`.

| Section                        | Rebuild files                                                              | How it moves                                                                  | Images it needs                       | Notes for v0                                                                                                                                                                      |
| ------------------------------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| About: who we are              | `app/about/WhoWeAre.tsx`, `aboutCopy.ts`                                   | None                                                                          | 2 room photos                         | Use v0's own photos                                                                                                                                                               |
| About: statement and figures   | `app/studio/Manifesto.tsx`, `whoWeAre.ts`                                  | Words light up one by one as you scroll; small photos sit inside the sentence | 6 room photos                         | Keep the scroll read-in, as it's the strongest moment on that page; use v0 photos inline; it must stay still with reduced motion                                                  |
| About: made by our factory     | `app/about/Workshop.tsx`                                                   | None                                                                          | 1 room photo                          | Its five rows are a ruled table; turn them into plain label/value lines                                                                                                           |
| About: order to your home      | `app/about/MakingDays.tsx`                                                 | A line draws across and each step lights in turn as you scroll, in CSS only   | None                                  | Worth keeping the line drawing in, in v0 red; still with reduced motion                                                                                                           |
| About: questions               | `app/studio/Questions.tsx`, `faqs.ts` (32)                                 | Accordion, first open                                                         | None                                  | Use v0's `Questions`; pick 6 of the 32 answers                                                                                                                                    |
| Quiz: what's bothering you     | `app/studio/SoundFamiliar.tsx`, `app/inspiration/ideaList.ts`              | Room tabs, then problem buttons; the answer updates                           | The chosen piece's room render        | 31 problems over 6 rooms, matched to the rebuild's 14 pieces; they must be re-matched to v0's 14 pieces and photos; the rebuild's filled/outlined tabs become v0's red/pale words |
| Inspiration: got used to these | `app/studio/NotNoticed.tsx`, `ideaList.ts` (8)                             | None                                                                          | None (text only)                      | The photo cards are new work; use v0's room photos                                                                                                                                |
| Collection: three kinds        | `app/studio/Compare.tsx`                                                   | None                                                                          | None                                  | A 9-row ruled table; cut to 4 rows with no rules                                                                                                                                  |
| Modular: lead times            | `app/contact/LeadTimes.tsx`, `leadTimeList.ts`, `app/studio/Dimension.tsx` | None                                                                          | None (bars in CSS)                    | Bars drawn as measuring lines with end ticks, solid for the usual wait and dashed for the longest; keep that idea in v0 red; weeks from v0's catalogue                            |
| Modular: before/after          | `app/studio/BeforeAfter.tsx`, `ideaList.ts`                                | None: static pairs side by side                                               | 10 renders in `assets/before-after/`  | The drag-across slider is new work; copy one or two pairs of renders                                                                                                              |
| Modular: why modular           | `app/studio/WhyModular.tsx`                                                | Each piece's parts open and close                                             | None                                  | Take the reasons only, not the 17 parts                                                                                                                                           |
| Modular: swatches              | `app/studio/Swatches.tsx`, `swatchList.ts`                                 | None                                                                          | None: textures drawn in CSS gradients | No real finish photos exist; use flat colour squares from v0's finishes, or wait for sample photos                                                                                |
| Piece: what you can change     | `app/studio/Customize.tsx`                                                 | None                                                                          | None                                  | Its "What it's made of" side has a weight-limits placeholder; leave that side out                                                                                                 |

**Left-out sections, confirmed by the code:**

- `StudioView` is the heaviest part of the rebuild: a scroll-driven floor plan
  and a live 3D walk-through, about 1,800 lines. It stays out.
- `CaseSheets` uses bordered "drawing sheet" cards with stand-in photos. It
  stays out.
- `Partners` and `Projects` exist in the rebuild but aren't shown anywhere.
  `Projects` is all placeholders.
- `PeachBackdrop`, the drifting peach gradient behind every page, is the main
  look v0 doesn't take.
