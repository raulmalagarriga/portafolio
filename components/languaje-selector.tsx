"use client"

import { useLanguage } from "@/contexts/language-context"
import { ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { id: "en", name: t("language.en") },
    { id: "es", name: t("language.es") },
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
        <span className="hidden sm:inline">{t("language.select")}:</span>
        <span className="uppercase">{language}</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 bg-black border border-theme-30 rounded-md shadow-lg py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => {
                setLanguage(lang.id as any)
                setIsOpen(false)
              }}
              className={`block w-full text-left px-4 py-2 hover:bg-theme-10 transition-colors ${
                language === lang.id ? "bg-theme-10" : ""
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
