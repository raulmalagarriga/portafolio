import type { ReactNode } from "react"

type KVProps = {
  k: ReactNode
  v: ReactNode
}

export default function KV({ k, v }: KVProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 10, alignItems: "baseline" }}>
      <span
        style={{
          color: "var(--ink-dim)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: ".06em",
        }}
      >
        {k}
      </span>
      <span style={{ color: "var(--ink)" }}>{v}</span>
    </div>
  )
}
