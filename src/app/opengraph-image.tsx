import { ImageResponse } from "next/og";

export const alt = "OdontoHub Care — Diga o que sente.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f5f5f7",
          padding: "72px 80px",
          fontFamily: "Inter, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <div style={{ fontSize: 32, fontWeight: 600, color: "#1d1d1f" }}>OdontoHub</div>
          <div style={{ fontSize: 22, fontWeight: 500, color: "#1F6B57" }}>Care</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: "-0.04em", color: "#1d1d1f" }}>
            Diga o que sente.
          </div>
          <div style={{ marginTop: 20, fontSize: 28, color: "#86868b", maxWidth: 720 }}>
            Você não precisa saber o nome do tratamento.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
