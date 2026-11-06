import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

/* The tab icon, a placeholder until the logo is drawn as a mark: the red
   full stop that ends the wordmark "furnishes.", on the cream. */
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
        background: BRAND.paper,
      }}
    >
      <div style={{ width: "50%", height: "50%", borderRadius: "50%", background: BRAND.ink }} />
    </div>,
    size,
  );
}
