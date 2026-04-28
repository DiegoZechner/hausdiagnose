import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Hausdiagnose — Healthy Home";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F8FAFC",
          display: "flex",
          padding: 64,
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 820 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 700,
                color: "#1E293B",
              }}
            >
              HD
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1E293B" }}>Hausdiagnose</div>
              <div style={{ fontSize: 16, color: "#475569" }}>Wohnumfeld · Gesundheit · Schweiz</div>
            </div>
          </div>

          <div style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 700, color: "#1E293B" }}>
            Ihr Zuhause beeinflusst Ihre Gesundheit.
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.35, color: "#0F766E", fontWeight: 600 }}>
            Die Luft, die Sie einatmen. Das Wasser, das Sie trinken.
          </div>
          <div style={{ fontSize: 18, lineHeight: 1.5, color: "#475569" }}>
            Wissenschaftliche Analyse von Luft, Wasser, Schimmel und Radon — mit klaren Prioritäten und Massnahmen.
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <div
              style={{
                padding: "10px 16px",
                borderRadius: 14,
                background: "#0F766E",
                color: "#F8FAFC",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Auf die Warteliste
            </div>
            <div
              style={{
                padding: "10px 16px",
                borderRadius: 14,
                background: "#CCFBF1",
                color: "#0F766E",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Pilot · Raum Zürich
            </div>
          </div>
        </div>

        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: 40,
            background:
              "radial-gradient(circle at 30% 30%, rgba(15,118,110,0.28), transparent 55%), radial-gradient(circle at 70% 70%, rgba(204,251,241,0.85), transparent 60%), #FFFFFF",
            border: "1px solid #E2E8F0",
          }}
        />
      </div>
    ),
    size,
  );
}
