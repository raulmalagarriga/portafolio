import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeColorProvider } from "@/contexts/theme-context"
import { LanguageProvider } from "@/contexts/language-context"
import { Analytics } from "@vercel/analytics/react"
import BgLayers from "@/components/terminal/bg-layers"
import ScrollProgress from "@/components/terminal/scroll-progress"

export const metadata: Metadata = {
  title: "raulmalagarriga.dev — Modern Terminal",
  description: "Raul Malagarriga — Fullstack developer · Software architect · Computer engineer",
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
      </body>
    </html>
  )
}
