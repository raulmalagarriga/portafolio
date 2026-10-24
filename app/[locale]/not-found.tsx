import Link from "next/link"

export default function NotFound() {
  return (
    <main className="app" style={{ minHeight: "80vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div className="pane" style={{ padding: 28, maxWidth: 520 }}>
        <div style={{ color: "var(--ink-mute)", fontSize: 13, marginBottom: 10 }}>
          <span style={{ color: "var(--acc)" }}>$</span> cat ./404
        </div>
        <h1 style={{ margin: 0, fontSize: 24, color: "var(--ink)" }}>404 — not found</h1>
        <p style={{ color: "var(--ink-mute)", fontSize: 13, lineHeight: 1.6 }}>
          Esa ruta no existe. / That route does not exist.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn" href="/es">
            → /es
          </Link>
          <Link className="btn ghost" href="/en">
            → /en
          </Link>
        </div>
      </div>
    </main>
  )
}
