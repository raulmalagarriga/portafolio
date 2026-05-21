import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Raul Malagarriga — Fullstack Developer & Software Architect"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          backgroundColor: "#0a0b0e",
          fontFamily: "monospace",
          color: "#d6dbe2",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#4ade80", fontSize: 22 }}>
          <span>●</span>
          <span>●</span>
          <span>●</span>
          <span style={{ marginLeft: 12, color: "#8d96a4" }}>~/portfolio — hello.tsx</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 32, color: "#8d96a4", display: "flex", gap: 12 }}>
            <span style={{ color: "#4ade80" }}>$</span>
            <span>whoami</span>
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Raul Malagarriga
          </div>
          <div style={{ fontSize: 36, color: "#8d96a4", lineHeight: 1.3 }}>
            Fullstack Developer · Software Architect · Computer Engineer
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#5a626f",
          }}
        >
          <span style={{ display: "flex", gap: 8 }}>
            <span style={{ color: "#4ade80" }}>●</span>
            <span>available for work · Maracaibo · UTC−4</span>
          </span>
          <span>raulmalagarriga.dev</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
