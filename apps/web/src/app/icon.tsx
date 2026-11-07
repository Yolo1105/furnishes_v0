import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

/* The tab icon: the wordmark's "f." in cream on the red, a placeholder
   until the logo is drawn as a mark. It uses the image tool's own font,
   since Jost would have to be fetched at build time. */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND.ink,
        color: BRAND.paper,
        fontSize: 46,
        letterSpacing: "-0.04em",
        lineHeight: 1,
      }}
    >
      f.
    </div>,
    size,
  );
}
