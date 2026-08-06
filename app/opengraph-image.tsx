import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "KidPad — Have Fun and Learn";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const iconData = await readFile(join(process.cwd(), "public/icon.png"));
  const iconSrc = `data:image/png;base64,${iconData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #FFF6E5 0%, #FFE9C7 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconSrc}
          width={200}
          height={200}
          alt=""
          style={{ borderRadius: 44, boxShadow: "0 18px 40px rgba(58,46,42,0.20)" }}
        />
        <div
          style={{
            marginTop: 40,
            fontSize: 96,
            fontWeight: 800,
            color: "#3A2E2A",
            letterSpacing: -2,
          }}
        >
          KidPad
        </div>
        <div style={{ marginTop: 8, fontSize: 40, fontWeight: 700, color: "#7A6E66" }}>
          Have Fun and Learn
        </div>
        <div style={{ marginTop: 28, fontSize: 26, color: "#7A6E66" }}>
          A playful learning app for young children
        </div>
      </div>
    ),
    { ...size },
  );
}
