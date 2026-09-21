import { ImageResponse } from "next/og";

export const alt = "OdontoHub Care — Encontre o dentista certo.";
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
        }}
      >
        <div style={{ display: "flex", color: "#1d1d1f", fontSize: 32, fontWeight: 600 }}>
          OdontoHub Care
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "#1d1d1f",
              lineHeight: 1.05,
            }}
          >
            Encontre o dentista certo.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 26,
              color: "#86868b",
            }}
          >
            Limpeza, extração, aparelho. Na sua cidade. Escolhidos com rigor.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
