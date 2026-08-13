import { ImageResponse } from "next/og";
import { siteConfig } from "../lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #f8f9fb 0%, #eef1f6 45%, #e8ecf4 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(59, 130, 246, 0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -40,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.1)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            YR
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: "#1a1f2e",
                letterSpacing: -1.5,
                lineHeight: 1.1,
              }}
            >
              Yash Rendalkar
            </div>
            <div
              style={{
                fontSize: 26,
                color: "#4b5563",
                fontWeight: 500,
              }}
            >
              AI &amp; Data Science Student | Software Developer
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
