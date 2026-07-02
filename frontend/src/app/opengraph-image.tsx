import { ImageResponse } from "next/og";
import { SITE } from "@/shared/constants/site";

export const runtime = "edge";
export const alt = `${SITE.name} — ${SITE.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #4f7eff 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 24,
              color: "#0a0a0a",
            }}
          >
            S
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "0.04em" }}>
            {SITE.shortName}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          <div>Engineering digital solutions.</div>
          <div style={{ color: "#4f7eff" }}>Shaping futures.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#a0a0a0",
          }}
        >
          <span>{SITE.url.replace("https://", "")}</span>
          <span>
            {SITE.address.city}, {SITE.address.country}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}