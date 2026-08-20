import { ImageResponse } from "next/og";

export const alt =
  "Kerokero, software a medida para convertir datos en mejores decisiones";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f4fff4",
          color: "#355133",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "3px solid #93c492",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "58px 64px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", fontSize: 34, letterSpacing: 1 }}>
            KeroKero
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 70,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 940,
            }}
          >
            Software a medida para mejores decisiones.
          </div>
          <div style={{ color: "#598a56", display: "flex", fontSize: 27 }}>
            Datos, modelos y software para actuar antes.
          </div>
        </div>
      </div>
    ),
    size,
  );
}

