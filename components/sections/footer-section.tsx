"use client"

import { useLanguage } from "@/contexts/language-context"

export default function FooterSection() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        padding: "28px 0 60px",
        textAlign: "center",
        color: "var(--ink-dim)",
        fontSize: 11.5,
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container">
        <div>
          <span style={{ color: "var(--acc)" }}>$</span> {t("footer.designed")}{" "}
          <span style={{ color: "var(--ink)" }}>Raúl Malagarriga</span> · © {year}
        </div>
        <div style={{ marginTop: 6, opacity: 0.7 }}>{t("footer.handcrafted")}</div>
      </div>
    </footer>
  )
}
