import type { NextConfig } from "next";

/** Headers every response carries: no sniffing, no framing by other sites, and a referrer kept to our own origin. */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // every photo served at quality 90 rather than Next's 75, on the owner's
  // word, so rooms stay sharp on large screens; an image asking for another
  // quality gets the nearest one listed here
  images: { qualities: [90] },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default config;
