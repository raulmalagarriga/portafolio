import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeColorProvider } from "@/contexts/theme-context"
import { LanguageProvider } from "@/contexts/language-context"
import { Analytics } from "@vercel/analytics/react"
import BgLayers from "@/components/terminal/bg-layers"
import ScrollProgress from "@/components/terminal/scroll-progress"
import { getSiteUrl } from "@/lib/site-url"

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Raul Malagarriga · malagarrigadev.vercel.app — Fullstack Developer & Software Architect",
    template: "%s · Raul Malagarriga",
  },
  description:
    "Raul Malagarriga (rjmalagarrigat) — Computer Engineer, Fullstack Developer and Software Architect based in Maracaibo, Venezuela. I design reliable backends, cohesive frontends, and thoughtful systems that ship and keep working.",
  applicationName: "malagarrigadev.vercel.app",
  authors: [{ name: "Raul Malagarriga", url: siteUrl }],
  creator: "Raul Malagarriga",
  publisher: "Raul Malagarriga",
  keywords: [
    "Raul Malagarriga",
    "raul malagarriga",
    "raulmalagarriga",
    "rjmalagarrigat",
    "Raul Malagarriga developer",
    "Raul Malagarriga portfolio",
    "Raul Malagarriga Software Engineer",
    "Raul Malagarriga Fullstack Developer",
    "Raul Malagarriga Software Architect",
    "Ingeniero Raul Malagarriga",
    "Engineer Raul Malagarriga",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "/",
    siteName: "Raul Malagarriga — Portfolio",
    title:
      "Raul Malagarriga · malagarrigadev.vercel.app — Fullstack Developer & Software Architect",
    description:
      "Computer Engineer · Fullstack Developer · Software Architect. Reliable backends, cohesive frontends, thoughtful systems that ship and keep working.",
    firstName: "Raul",
    lastName: "Malagarriga",
    username: "rjmalagarrigat",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Raul Malagarriga · malagarrigadev.vercel.app — Fullstack Developer & Software Architect",
    description:
      "Computer Engineer · Fullstack Developer · Software Architect. Reliable backends, cohesive frontends, thoughtful systems.",
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Raul Malagarriga",
  alternateName: [
    "Raúl Malagarriga",
    "raulmalagarriga",
    "rjmalagarrigat",
    "Ingeniero Raul Malagarriga",
    "Engineer Raul Malagarriga",
    "Raul Malagarriga Software",
    "Raul Malagarriga Software Engineer",
    "Raul Malagarriga Software Architect",
    "Raul Malagarriga Fullstack Developer",
    "Raul Malagarriga Computer Engineer",
  ],
  jobTitle: "Fullstack Developer · Software Architect · Computer Engineer",
  description:
    "Computer Engineer who designs reliable backends, cohesive frontends, and thoughtful systems.",
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  email: "mailto:rjmalagarrigat@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Maracaibo",
    addressRegion: "Zulia",
    addressCountry: "VE",
  },
  sameAs: [
    "https://github.com/raulmalagarriga",
    "https://www.linkedin.com/in/rjmalagarrigat/",
    "https://medium.com/@rjmalagarrigat",
  ],
  knowsAbout: [
    ".NET",
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "Nest.js",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Clean Architecture",
    "Multi-tenancy",
    "Event-Driven Architecture",
    "Microservices",
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Geist+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ThemeColorProvider>
            <LanguageProvider>
              <BgLayers />
              <ScrollProgress />
              {children}
            </LanguageProvider>
            <Analytics />
          </ThemeColorProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  )
}
