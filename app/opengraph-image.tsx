import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/business";

// Dynamic 1200x630 social share image (also used as the Twitter card image).
// Pure code — no external font or asset needed; matches the brand red on ink.
export const alt = `${BUSINESS.name} — Factory-Authorized Repair, Lincoln NE`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RED = "#DE1F27";
const INK = "#0f1217";
const MIST = "#f6f8fb";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: MIST,
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: RED,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            M
          </div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>{BUSINESS.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, letterSpacing: "-2px" }}>
            <span>Fixed right</span>
            <span style={{ color: RED }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#c8cfd9", marginTop: 28 }}>
            Factory-authorized appliance, TV &amp; audio repair · Lincoln, NE · Since {BUSINESS.founded}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: RED }}>
          {BUSINESS.phone}
        </div>
      </div>
    ),
    { ...size },
  );
}
