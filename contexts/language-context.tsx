"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { translations } from "@/lib/translations"

export type Language = "en" | "es"

type TranslationKey = keyof typeof translations.en

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: TranslationKey | (string & {})) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("terminal-language") as Language | null
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    try {
      localStorage.setItem("terminal-language", lang)
    } catch {}
  }

  const toggleLanguage = () => {
    handleLanguageChange(language === "en" ? "es" : "en")
  }

  const t = (key: TranslationKey | (string & {})): string => {
    const bag = translations[language] as Record<string, string>
    return bag[key as string] ?? (key as string)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
