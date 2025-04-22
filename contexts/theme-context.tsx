"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type ThemeColor = "green" | "blue" | "yellow" | "white"

type ThemeContextType = {
  themeColor: ThemeColor
  setThemeColor: (color: ThemeColor) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColor>("green")

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("terminal-theme") as ThemeColor
    if (savedTheme && ["green", "blue", "yellow", "white"].includes(savedTheme)) {
      setThemeColor(savedTheme)
      document.documentElement.setAttribute("data-theme-color", savedTheme)
    }
  }, [])

  // Save theme to localStorage and update CSS variables when theme changes
  const handleThemeChange = (color: ThemeColor) => {
    setThemeColor(color)
    localStorage.setItem("terminal-theme", color)
    document.documentElement.setAttribute("data-theme-color", color)
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor: handleThemeChange }}>{children}</ThemeContext.Provider>
  )
}

export function useThemeColor() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeColor must be used within a ThemeColorProvider")
  }
  return context
}
