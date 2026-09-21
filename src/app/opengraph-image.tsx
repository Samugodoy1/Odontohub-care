import { ImageResponse } from "next/og";

export const alt = "OdontoHub Care — Os dentistas certos. Para o seu caso.";
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
          backgroundColor: "#000",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", color: "#f5f5f7", fontSize: 32, fontWeight: 600 }}>
          OdontoHub Care
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "#f5f5f7",
              lineHeight: 1.05,
            }}
          >
            Os dentistas certos. Para o seu caso.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 26,
              color: "#86868b",
            }}
          >
            Dentistas que usam o OdontoHub. Verificados. Fora da rede, fora do Care.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
