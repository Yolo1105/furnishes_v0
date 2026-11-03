import type { StaticImageData } from "next/image";
import aFrame from "@/assets/banner/a-frame.jpg";
import bunk from "@/assets/banner/bunk.jpg";
import cabinSofa from "@/assets/banner/cabin-sofa.jpg";
import logCabin from "@/assets/banner/log-cabin.jpg";
import orangeRoom from "@/assets/banner/orange-room.jpg";
import showroom from "@/assets/banner/showroom.jpg";
import hallway from "@/assets/rooms/hallway.jpg";
import home from "@/assets/rooms/home.jpg";
import kitchen from "@/assets/rooms/kitchen.jpg";
import living from "@/assets/rooms/living.jpg";
import study from "@/assets/rooms/study.jpg";

/**
 * A story about a room. Its title is in two parts: the lead, in full red,
 * and the rest, in the softer red. Every story here is a placeholder until
 * the owner writes the real ones.
 */
export type Story = {
  key: string;
  tags: readonly string[];
  lead: string;
  rest: string;
  by: string;
  date: string;
  photo: StaticImageData;
};

const story = (
  key: string,
  tags: readonly string[],
  lead: string,
  rest: string,
  date: string,
  photo: StaticImageData,
): Story => ({ key, tags, lead, rest, by: "Furnishes studio", date, photo });

/** Six short reads, chosen by the people who make the pieces. */
export const FEATURED: readonly Story[] = [
  story("hdb-living", ["Living"], "A sideboard", "for a five-room HDB living room", "12 Oct 2026", living),
  story("corner-desk", ["Study"], "The corner desk", "that turned a spare room into an office", "8 Oct 2026", study),
  story("kitchen-wall", ["Kitchen"], "Shelves to the ceiling", "in a galley kitchen", "2 Oct 2026", kitchen),
  story("bunk", ["Kids"], "Two bunks,", "one small room and a lot of storage", "26 Sep 2026", bunk),
  story("hallway", ["Hallway"], "A shoe cabinet", "cut to the depth of the corridor", "19 Sep 2026", hallway),
  story("cabin", ["Family"], "Low storage", "under a long window", "11 Sep 2026", cabinSofa),
];

/** The newest stories, longest first in the list. */
export const LATEST: readonly Story[] = [
  story(
    "orange",
    ["Colour", "Living"],
    "Living with orange:",
    "a warm room on a north-facing block",
    "28 Oct 2026",
    orangeRoom,
  ),
  story("showroom", ["Studio"], "Inside the showroom", "where every sample can be touched", "21 Oct 2026", showroom),
  story("a-frame", ["Bedroom"], "A bed built into", "the slope of an attic roof", "15 Oct 2026", aFrame),
  story("home", ["Whole home"], "One finish, every room:", "a three-room flat in birch", "9 Oct 2026", home),
];

/** The most read, short list beside the newest. */
export const MOST_VIEWED: readonly Story[] = [
  FEATURED[0]!,
  FEATURED[2]!,
  LATEST[0]!,
  FEATURED[4]!,
  LATEST[2]!,
  FEATURED[1]!,
];

/** One story to look at again, and the readers' picks beside it. */
export const SECOND_LOOK: Story = story(
  "log-cabin",
  ["Living"],
  "Timber on timber:",
  "making new pieces sit in an old room",
  "4 Sep 2026",
  logCabin,
);
export const FAVOURITES: readonly Story[] = [
  FEATURED[1]!,
  LATEST[1]!,
  FEATURED[3]!,
  LATEST[3]!,
  FEATURED[5]!,
  LATEST[2]!,
];
