import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0071e3",
          color: "#fff",
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        C
      </div>
    ),
    { ...size },
  );
}
