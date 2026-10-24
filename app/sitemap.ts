import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-url"
import { LOCALES } from "@/lib/i18n"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const languages = Object.fromEntries(LOCALES.map((l) => [l, `${siteUrl}/${l}`]))

  return LOCALES.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "es" ? 1 : 0.9,
    alternates: { languages: { ...languages, "x-default": `${siteUrl}/es` } },
  }))
}
