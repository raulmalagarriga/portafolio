"use client"

import { useLanguage } from "@/contexts/language-context"
import { LOCALES } from "@/lib/i18n"

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div className={`lang-toggle${compact ? " compact" : ""}`} role="group" aria-label={t("common.language")}>
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          className={`lang-opt${language === l ? " on" : ""}`}
          aria-pressed={language === l}
          onClick={() => setLanguage(l)}
          lang={l}
          title={t(`common.switchTo.${l}`)}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
