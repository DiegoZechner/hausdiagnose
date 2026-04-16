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
          background: "#EEF2F5",
          display: "flex",
          padding: 64,
          justifyContent: "space-between",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 820 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "#F8FAFC",
                border: "1px solid #D8E0E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 700,
                color: "#111827",
              }}
            >
              HD
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>Hausdiagnose</div>
              <div style={{ fontSize: 16, color: "#475569" }}>Wohnumfeld · Gesundheit · Schweiz</div>
            </div>
          </div>

          <div style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 700, color: "#111827" }}>
            Ihr Zuhause beeinflusst Ihre Gesundheit.
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.35, color: "#475569" }}>
            Wissenschaftliche Analyse von Luft, Wasser, Schimmel/Feuchte, Radon – mit klaren Prioritäten und Massnahmen.
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 14,
                background: "#0F766E",
                color: "#F8FAFC",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Warteliste offen
            </div>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 14,
                background: "#F8FAFC",
                border: "1px solid #D8E0E8",
                color: "#111827",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Start Raum Zürich
            </div>
          </div>
        </div>

        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: 40,
            background:
              "radial-gradient(circle at 30% 30%, rgba(15,118,110,0.22), transparent 55%), radial-gradient(circle at 70% 70%, rgba(17,24,39,0.10), transparent 60%), #F8FAFC",
            border: "1px solid #D8E0E8",
          }}
        />
      </div>
    ),
    size
  );
}

