"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

interface ScrollIndicatorProps {
  sections: string[]
  activeSection: string
  onDotClick: (section: string) => void
}

export default function ScrollIndicator({ sections, activeSection, onDotClick }: ScrollIndicatorProps) {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  // Show indicator after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Hide indicator when not scrolling
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleScroll = () => {
      setIsVisible(true)

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setIsVisible(false)
      }, 2000)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeout)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="scroll-indicator">
      {sections.map((section) => (
        <div
          key={section}
          className={`scroll-indicator-dot ${activeSection === section ? "active" : ""}`}
          onClick={() => onDotClick(section)}
          title={section === "hero" ? "Home" : t(section)}
          role="button"
          tabIndex={0}
          aria-label={`Scroll to ${section === "hero" ? "home" : section} section`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onDotClick(section)
            }
          }}
        />
      ))}
    </div>
  )
}
