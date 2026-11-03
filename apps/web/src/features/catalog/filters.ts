import { routes } from "@/lib/routes";
import { FINISHES, fromPrice, type Finish, type Piece, PIECES } from "./catalog";

/**
 * The list's filters, in one place, read by the server (from the address)
 * and the browser (as visitors choose). The line is picked at the top;
 * the groups on the left narrow within it. Inside a group any choice may
 * match; across groups every group must.
 */

export const slug = (s: string) => s.toLowerCase().replaceAll(" ", "-");

/** The lines across the top, each with the list's title when it is on. */
export const TABS = [
  { key: "all", label: "All", title: "Every piece", has: () => true },
  { key: "furniture", label: "Furniture", title: "Furniture", has: (p: Piece) => p.line === "furniture" },
  { key: "modular", label: "Modular", title: "Modular furniture", has: (p: Piece) => p.line === "modular" },
  { key: "walls", label: "Separator walls", title: "Separator walls", has: (p: Piece) => !!p.wall },
] as const;

export type TabKey = (typeof TABS)[number]["key"];

export const SORTS = [
  { key: "ours", label: "Our order" },
  { key: "low", label: "Price, low to high" },
  { key: "high", label: "Price, high to low" },
] as const;

export type SortKey = (typeof SORTS)[number]["key"];

export const sortBy = (pieces: readonly Piece[], sort: SortKey) =>
  pieces.toSorted((a, b) => (sort === "ours" ? 0 : (fromPrice(a) - fromPrice(b)) * (sort === "low" ? 1 : -1)));

export type Option = { value: string; label: string; finish?: Finish["slug"] };

type Range = Option & { in: (n: number) => boolean };

/** Ranges of the lowest price, in SGD, spread so each holds a few pieces. */
const PRICES: readonly Range[] = [
  { value: "under-300", label: "Under $300", in: (n) => n < 300 },
  { value: "300-600", label: "$300–600", in: (n) => n >= 300 && n < 600 },
  { value: "600-1000", label: "$600–1,000", in: (n) => n >= 600 && n < 1000 },
  { value: "over-1000", label: "Over $1,000", in: (n) => n >= 1000 },
];

/** Ranges of width, in mm; a piece matches if any of its sizes does. */
const WIDTHS: readonly Range[] = [
  { value: "under-800", label: "Under 800 mm", in: (n) => n < 800 },
  { value: "800-1400", label: "800–1,400 mm", in: (n) => n >= 800 && n <= 1400 },
  { value: "over-1400", label: "Over 1,400 mm", in: (n) => n > 1400 },
];

const unique = (labels: readonly string[]): Option[] =>
  [...new Set(labels)].map((label) => ({ value: slug(label), label }));

const ROOMS = unique(PIECES.flatMap((p) => p.rooms));

const ranged = (ranges: readonly Range[], n: (p: Piece) => number[]) => ({
  options: () => ranges,
  has: (p: Piece, v: string) => n(p).some((x) => ranges.find((r) => r.value === v)?.in(x) ?? false),
});

/** The groups on the left, in order; a kind's options follow the line on top. */
export const GROUPS = [
  {
    key: "kind",
    label: "Type",
    options: (inTab: readonly Piece[]) => unique(inTab.map((p) => p.kind)),
    has: (p: Piece, v: string) => slug(p.kind) === v,
  },
  {
    key: "room",
    label: "Room",
    options: () => ROOMS,
    has: (p: Piece, v: string) => p.rooms.some((r) => slug(r) === v),
  },
  { key: "price", label: "Price", ...ranged(PRICES, (p) => [fromPrice(p)]) },
  { key: "width", label: "Width", ...ranged(WIDTHS, (p) => p.sizes.map((s) => s.w)) },
  {
    key: "finish",
    label: "Finish",
    options: (): Option[] => FINISHES.map((f) => ({ value: f.slug, label: f.name, finish: f.slug })),
    has: (p: Piece, v: string) => p.finishes.some((f) => f === v),
  },
] as const;

export type GroupKey = (typeof GROUPS)[number]["key"];

export type Filters = { tab: TabKey; sort: SortKey; picked: Record<GroupKey, readonly string[]> };

const NONE: Filters["picked"] = { kind: [], room: [], price: [], width: [], finish: [] };

export const tabOf = (key: TabKey) => TABS.find((t) => t.key === key)!;

/** Whether a piece passes the filters, leaving out one group when counting that group's choices. */
export const passes = (p: Piece, f: Filters, except?: GroupKey) =>
  tabOf(f.tab).has(p) &&
  GROUPS.every((g) => g.key === except || f.picked[g.key].length === 0 || f.picked[g.key].some((v) => g.has(p, v)));

/** How many pieces a choice would show, with the rest of the filters as they are. */
export const countOf = (f: Filters, key: GroupKey, value: string) => {
  const g = GROUPS.find((x) => x.key === key)!;
  return PIECES.filter((p) => passes(p, f, key) && g.has(p, value)).length;
};

/** Every option of a group across the whole catalogue, to check an address against. */
const allOptions = (key: GroupKey) => GROUPS.find((g) => g.key === key)!.options(PIECES);

/** The labels of the choices that are on, for the row of active filters. */
export const pickedLabels = (f: Filters) =>
  GROUPS.flatMap((g) =>
    f.picked[g.key].map((value) => ({
      key: g.key,
      value,
      label: allOptions(g.key).find((o) => o.value === value)?.label ?? value,
    })),
  );

/** The rooms a home has; the overview's "For homes" link opens the list on these. */
const HOME_ROOMS = ROOMS.filter((r) => r.value !== "office").map((r) => r.value);

type Params = Record<string, string | string[] | undefined>;

/** The filters an address asks for; anything unknown is dropped. */
export function readFilters(params: Params): Filters {
  const one = (k: string) => [params[k]].flat()[0];
  const line = one("line");
  const tab = TABS.find((t) => t.key === line)?.key ?? "all";
  const sort = SORTS.find((s) => s.key === one("sort"))?.key ?? "ours";
  const picked = { ...NONE };
  for (const g of GROUPS) {
    const known = allOptions(g.key).map((o) => o.value);
    picked[g.key] = (one(g.key) ?? "").split(",").filter((v) => known.includes(v));
  }
  if (line === "homes") picked.room = HOME_ROOMS;
  if (line === "offices") picked.room = ["office"];
  return { tab, sort, picked };
}

/** The address's query for some filters, empty when nothing is chosen; commas kept readable. */
export function writeFilters(f: Filters) {
  const parts = [
    f.tab !== "all" && `line=${f.tab}`,
    ...GROUPS.map((g) => f.picked[g.key].length > 0 && `${g.key}=${f.picked[g.key].join(",")}`),
    f.sort !== "ours" && `sort=${f.sort}`,
  ].filter(Boolean);
  return parts.length > 0 ? `?${parts.join("&")}` : "";
}

export const clearPicked = (f: Filters): Filters => ({ ...f, picked: NONE });

/** The list's address opened on some choices, as `shopHref({ room: ["kitchen"] })`. */
export const shopHref = (picked: Partial<Filters["picked"]>) =>
  `${routes.products}${writeFilters({ tab: "all", sort: "ours", picked: { ...NONE, ...picked } })}`;
