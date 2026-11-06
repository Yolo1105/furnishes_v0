import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";
import { SITE } from "@/lib/site";

/* What a shared link shows (WhatsApp, Telegram, social sites): the name and
   the site's one line on the cream. A placeholder until there is a room
   photo for it; it uses the image tool's own font, since the site's fonts
   would have to be fetched at build time. */
export const alt = `${SITE.name}: ${SITE.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        gap: 24,
        width: "100%",
        height: "100%",
        padding: 80,
        background: BRAND.paper,
      }}
    >
      <div style={{ color: BRAND.ink, fontSize: 120, letterSpacing: "-0.03em", lineHeight: 1 }}>furnishes.</div>
      <div style={{ maxWidth: 900, color: BRAND.inkDark, fontSize: 36, lineHeight: 1.35 }}>{SITE.description}</div>
    </div>,
    size,
  );
}
