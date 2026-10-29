"use client"

import { useLanguage } from "@/contexts/language-context"

export default function FooterSection() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <span className="acc">$</span> {t("footer.line")} <span style={{ color: "var(--ink)" }}>Raúl Malagarriga</span> · © {year}
      </div>
    </footer>
  )
}
