import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0071e3",
          borderRadius: 40,
          color: "#ffffff",
          gap: 4,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 600, letterSpacing: "-0.03em" }}>
          OdontoHub
        </div>
        <div style={{ display: "flex", fontSize: 22, fontWeight: 600, opacity: 0.82 }}>
          Care
        </div>
      </div>
    ),
    { ...size },
  );
}
