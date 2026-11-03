import type { StaticImageData } from "next/image";
import hallway from "@/assets/rooms/hallway.jpg";
import home from "@/assets/rooms/home.jpg";
import kitchen from "@/assets/rooms/kitchen.jpg";
import living from "@/assets/rooms/living.jpg";
import study from "@/assets/rooms/study.jpg";

/**
 * The rooms the banner names, in its order: the word on the front of each
 * drum and the one underneath, the banner's line about it, its photo, and
 * what the flat's plan says about it. "home" is the whole flat, the banner's
 * title and where it rests.
 */
export type Room = {
  key: RoomKey;
  word: string;
  under: string;
  line: string;
  photo: StaticImageData;
  note: { name: string; line: string };
};

export type RoomKey = "home" | "living" | "study" | "kitchen" | "hallway";

export const ROOMS: readonly Room[] = [
  {
    key: "home",
    word: "Furniture",
    under: "Made to fit",
    line: "Ready-made and modular furniture for Singapore homes, cut to fit and delivered built or flat-packed. Tell us the room and the gap you have, and we make the pieces to suit it, from one shelf to a whole flat.",
    photo: home,
    note: {
      name: "The whole flat",
      line: "Five rooms, a kitchen, two baths and a yard. Point at a room on the plan to see what is in it.",
    },
  },
  {
    key: "living",
    word: "Living",
    under: "Sideboards",
    line: "Shelves, low cabinets and sideboards for the room you spend the most time in. Made to the length of your wall, with room for the TV, the books and the things you keep out.",
    photo: living,
    note: {
      name: "Living & dining",
      line: "The sofa faces the television, an armchair sits by the east window, and the table seats four. Light from two sides.",
    },
  },
  {
    key: "study",
    word: "Study",
    under: "Desks",
    line: "A desk and the shelves around it, sized to a corner of the flat or a small office. Drawers where you reach for them, cables kept out of sight, and a top deep enough for a screen and your work.",
    photo: study,
    note: { name: "Study", line: "A single bed, and a desk in the bay window with the wardrobe by the door." },
  },
  {
    key: "kitchen",
    word: "Kitchen",
    under: "Storage",
    line: "Room for jars, spices and cups, sized to the gap you have. Open shelves and closed cabinets that fit between the counter and the ceiling, in finishes that wipe clean after cooking.",
    photo: kitchen,
    note: {
      name: "Kitchen",
      line: "Counters along two walls, the hob and the sink under the window, the fridge by the yard door.",
    },
  },
  {
    key: "hallway",
    word: "Hallway",
    under: "Consoles",
    line: "A console, a mirror and somewhere for the keys, for the first wall you see coming home. Shoe cabinets and slim benches cut to fit narrow HDB corridors without getting in the way.",
    photo: hallway,
    note: {
      name: "Hallway",
      line: "The way from the living room to the bedrooms, with the bathroom and the shelter off it.",
    },
  },
];

export const roomOf = (key: RoomKey) => ROOMS.find((r) => r.key === key) ?? ROOMS[0]!;
