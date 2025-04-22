"use client"

import { useThemeColor } from "@/contexts/theme-context"
import { useLanguage } from "@/contexts/language-context"
import { ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function ThemeSelector() {
  const { themeColor, setThemeColor } = useThemeColor()
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const themes = [
    { id: "green", name: t("theme.green") },
    { id: "blue", name: t("theme.blue") },
    { id: "yellow", name: t("theme.yellow") },
    { id: "white", name: t("theme.white") },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1 rounded border border-theme-30 hover:border-theme-light transition-colors"
      >
        <span className="hidden sm:inline">{t("theme.select")}:</span>
        <span >{t(`theme.${themeColor}`)}</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 bg-black border border-theme-30 rounded-md shadow-lg py-1 z-50">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                setThemeColor(theme.id as any)
                setIsOpen(false)
              }}
              className={`block w-full text-left px-4 py-2 hover:bg-theme-10 transition-colors ${
                themeColor === theme.id ? "bg-theme-10" : ""
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
