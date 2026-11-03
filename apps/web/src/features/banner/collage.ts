import type { StaticImageData } from "next/image";
import aFrame from "@/assets/banner/a-frame.jpg";
import bunk from "@/assets/banner/bunk.jpg";
import cabinSofa from "@/assets/banner/cabin-sofa.jpg";
import logCabin from "@/assets/banner/log-cabin.jpg";
import orangeRoom from "@/assets/banner/orange-room.jpg";
import showroom from "@/assets/banner/showroom.jpg";

/**
 * The six small photos round the banner, each named by where it sits (the
 * places are in Banner.module.css). `sizes` is the width the whole photo is
 * drawn at, which is wider than its frame: the frame shows a part of it at
 * rest, and the whole opens out under the mouse.
 */
export const COLLAGE: readonly {
  spot: "top" | "strip" | "corner" | "mid" | "right" | "left";
  src: StaticImageData;
  sizes: string;
}[] = [
  { spot: "top", src: showroom, sizes: "42vh" },
  { spot: "strip", src: orangeRoom, sizes: "15vw" },
  { spot: "corner", src: bunk, sizes: "42vh" },
  { spot: "mid", src: aFrame, sizes: "36vh" },
  { spot: "right", src: cabinSofa, sizes: "51vh" },
  { spot: "left", src: logCabin, sizes: "33vh" },
];
