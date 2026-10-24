"use client"

import type React from "react"
import { createContext, useCallback, useContext, useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import { translations } from "@/lib/translations"
import { LOCALE_COOKIE, localizePath, type Locale } from "@/lib/i18n"

export type Language = Locale

type TranslationKey = keyof typeof translations.es

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: TranslationKey | (string & {})) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  locale,
  children,
}: {
  locale: Language
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  const setLanguage = useCallback(
    (lang: Language) => {
      if (lang === locale) return
      try {
        document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`
      } catch {}
      const hash = typeof window !== "undefined" ? window.location.hash : ""
      const search = typeof window !== "undefined" ? window.location.search : ""
      router.push(`${localizePath(pathname || "/", lang)}${search}${hash}`, { scroll: false })
    },
    [locale, pathname, router]
  )

  const toggleLanguage = useCallback(() => {
    setLanguage(locale === "es" ? "en" : "es")
  }, [locale, setLanguage])

  const t = useCallback(
    (key: TranslationKey | (string & {})): string => {
      const bag = translations[locale] as Record<string, string>
      return bag[key as string] ?? (translations.es as Record<string, string>)[key as string] ?? (key as string)
    },
    [locale]
  )

  const value = useMemo(
    () => ({ language: locale, setLanguage, toggleLanguage, t }),
    [locale, setLanguage, toggleLanguage, t]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
