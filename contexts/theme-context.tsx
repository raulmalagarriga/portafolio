"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type ThemeColor = "green" | "amber" | "cyan" | "magenta" | "white"

export const THEME_COLORS: ThemeColor[] = ["green", "amber", "cyan", "magenta", "white"]

type ThemeContextType = {
  themeColor: ThemeColor
  setThemeColor: (color: ThemeColor) => void
  cycleThemeColor: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function isValidTheme(value: string | null): value is ThemeColor {
  return !!value && (THEME_COLORS as string[]).includes(value)
}

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColor>("green")

  useEffect(() => {
    const saved = localStorage.getItem("terminal-theme")
    const next: ThemeColor = isValidTheme(saved) ? saved : "green"
    setThemeColor(next)
  }, [])

  useEffect(() => {
    document.body.setAttribute("data-accent", themeColor)
  }, [themeColor])

  const handleThemeChange = (color: ThemeColor) => {
    setThemeColor(color)
    try {
      localStorage.setItem("terminal-theme", color)
    } catch {}
  }

  const cycleThemeColor = () => {
    const i = THEME_COLORS.indexOf(themeColor)
    const next = THEME_COLORS[(i + 1) % THEME_COLORS.length]
    handleThemeChange(next)
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor: handleThemeChange, cycleThemeColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeColor() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeColor must be used within a ThemeColorProvider")
  }
  return context
}
