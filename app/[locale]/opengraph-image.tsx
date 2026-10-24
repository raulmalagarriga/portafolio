import { ImageResponse } from "next/og"
import { LOCALES, isLocale, pick, type Locale } from "@/lib/i18n"
import { SEO } from "@/lib/content/seo"

export const alt = "Raúl Malagarriga — Software Engineer · Co-founder of PULSE · Software Consultant"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : "es"
  const facets = SEO.ogFacets[locale]
  const status = pick(SEO.ogStatus, locale)

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
          <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#4ade80" }} />
          <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#4ade80" }} />
          <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#4ade80" }} />
          <span style={{ marginLeft: 12, color: "#8d96a4" }}>~/portfolio — hello.tsx · {locale}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 30, color: "#8d96a4", display: "flex", gap: 12 }}>
            <span style={{ color: "#4ade80" }}>$</span>
            <span>whoami</span>
          </div>
          <div style={{ fontSize: 82, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>Raúl Malagarriga</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
            {facets.map((f) => (
              <div key={f} style={{ fontSize: 30, color: "#b8c0cc", display: "flex", gap: 14, lineHeight: 1.25 }}>
                <span style={{ color: "#4ade80" }}>&gt;</span>
                <span>{f}</span>
              </div>
            ))}
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
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#4ade80" }} />
            <span>{status}</span>
          </span>
          <span>raulmalagarrigadev.vercel.app/{locale}</span>
        </div>
      </div>
    ),
    { ...size }
  )
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}
