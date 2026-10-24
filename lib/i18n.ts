export const LOCALES = ["es", "en"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "es"

/** A string localized in both languages. */
export type L = Record<Locale, string>
/** A list of strings localized in both languages. */
export type LList = Record<Locale, string[]>

export const OG_LOCALE: Record<Locale, string> = { es: "es_VE", en: "en_US" }
export const LOCALE_COOKIE = "NEXT_LOCALE"

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value)
}

export function pick<T>(value: Record<Locale, T>, locale: Locale): T {
  return value[locale] ?? value[DEFAULT_LOCALE]
}

/** Picks the best locale from an Accept-Language header. Defaults to Spanish. */
export function detectLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE
  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";")
      const q = params.find((p) => p.trim().startsWith("q="))
      const weight = q ? parseFloat(q.split("=")[1]) : 1
      return { lang: tag.toLowerCase().split("-")[0], weight: isNaN(weight) ? 0 : weight, index }
    })
    .sort((a, b) => b.weight - a.weight || a.index - b.index)
  for (const { lang } of ranked) {
    if (isLocale(lang)) return lang
  }
  return DEFAULT_LOCALE
}

/** Replaces the locale segment of a pathname (or prefixes it when missing). */
export function localizePath(pathname: string, locale: Locale): string {
  const stripped = pathname.replace(/^\/(es|en)(?=\/|$)/, "")
  return `/${locale}${stripped === "/" ? "" : stripped}`
}
