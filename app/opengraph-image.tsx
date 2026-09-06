import { ImageResponse } from "next/og";

export const alt = "Vivexa Tech — affordable websites for startups in Gurugram";
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
          justifyContent: "space-between",
          background: "#050b14",
          padding: "72px",
          color: "#f3f1ec",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#00c2e0",
            fontWeight: 600,
          }}
        >
          Gurugram web studio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            Vivexa Tech
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.4,
              color: "rgba(243,241,236,0.72)",
              maxWidth: 860,
            }}
          >
            Professional, attractive, and budget-friendly websites for startups
            and new businesses.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "rgba(243,241,236,0.55)",
          }}
        >
          www.vivexatech.in
        </div>
      </div>
    ),
    size,
  );
}
