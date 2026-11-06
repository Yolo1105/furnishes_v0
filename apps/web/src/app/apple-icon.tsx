import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

/* The icon a phone shows when the site is saved to its home screen: the
   same red full stop as the tab icon, at the size iOS asks for (180px). */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
      <div style={{ width: "40%", height: "40%", borderRadius: "50%", background: BRAND.ink }} />
    </div>,
    size,
  );
}
