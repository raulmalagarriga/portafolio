import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeColorProvider } from "@/contexts/theme-context"
import { LanguageProvider } from "@/contexts/language-context"
import { Analytics } from "@vercel/analytics/react"
import BgLayers from "@/components/terminal/bg-layers"
import ScrollProgress from "@/components/terminal/scroll-progress"
import { getSiteUrl } from "@/lib/site-url"
import { LOCALES, OG_LOCALE, isLocale, pick, type Locale } from "@/lib/i18n"
import { SEO } from "@/lib/content/seo"

const siteUrl = getSiteUrl()

/** Body face for paragraphs and descriptions; everything else stays in JetBrains Mono. */
const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-body",
})

/** Mono face for titles, labels, commands, chips, dates, buttons, nav and figures. */
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jetbrains",
})

type Params = Promise<{ locale: string }>

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : "es"
  const title = pick(SEO.title, locale)
  const description = pick(SEO.description, locale)
  const other = LOCALES.filter((l) => l !== locale)

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: "%s · Raúl Malagarriga" },
    description,
    applicationName: "raulmalagarrigadev.vercel.app",
    authors: [{ name: "Raúl Malagarriga", url: siteUrl }],
    creator: "Raúl Malagarriga",
    publisher: "Raúl Malagarriga",
    keywords: [...SEO.keywords[locale]],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
        "x-default": "/es",
      },
    },
    openGraph: {
      type: "profile",
      locale: OG_LOCALE[locale],
      alternateLocale: other.map((l) => OG_LOCALE[l]),
      url: `/${locale}`,
      siteName: SEO.siteName,
      title,
      description,
      firstName: "Raúl",
      lastName: "Malagarriga",
      username: "rjmalagarrigat",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@rjmalagarrigat",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
    category: "technology",
  }
}

function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Raúl Malagarriga",
    alternateName: ["Raul Malagarriga", "raulmalagarriga", "rjmalagarrigat"],
    jobTitle: pick(SEO.jobTitle, locale),
    description: pick(SEO.description, locale),
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}/${locale}/opengraph-image`,
    email: "mailto:rjmalagarrigat@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Maracaibo",
      addressRegion: "Zulia",
      addressCountry: "VE",
    },
    worksFor: SEO.worksFor.map((org) => ({
      "@type": "Organization",
      name: org.name,
      ...(org.url ? { url: org.url } : {}),
    })),
    sameAs: SEO.sameAs,
    knowsAbout: [
      "TypeScript",
      "Next.js",
      "React Native",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      ".NET",
      "Google Cloud Run",
      "Docker",
      "Microservices",
      "Clean Architecture",
      "Process automation",
      "Custom software",
    ],
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale} className={`${bodyFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ThemeColorProvider>
            <LanguageProvider locale={locale}>
              <BgLayers />
              <ScrollProgress />
              {children}
            </LanguageProvider>
            <Analytics />
          </ThemeColorProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }}
        />
      </body>
    </html>
  )
}
