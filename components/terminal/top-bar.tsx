"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { SECTIONS, type SectionId } from "@/lib/portfolio-data"
import Icon from "@/components/terminal/icon"
import LanguageToggle from "@/components/terminal/language-toggle"

type TopBarProps = {
  active: SectionId
  onNav: (id: SectionId) => void
  onOpenPalette: () => void
  onCycleAccent: () => void
}

export default function TopBar({ active, onNav, onOpenPalette, onCycleAccent }: TopBarProps) {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu on Escape or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    const mq = window.matchMedia("(min-width: 960px)")
    const onMq = () => mq.matches && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    mq.addEventListener("change", onMq)
    return () => {
      window.removeEventListener("keydown", onKey)
      mq.removeEventListener("change", onMq)
    }
  }, [menuOpen])

  const go = (id: SectionId) => {
    setMenuOpen(false)
    onNav(id)
  }

  // The logo leads home, so the nav lists the other five sections.
  const links = SECTIONS.filter((s) => s.id !== "home")

  return (
    <header className="topbar">
      <button type="button" className="brand" onClick={() => go("home")} aria-label={t("nav.home")}>
        <span className="glyph" aria-hidden>
          R
        </span>
        <span className="brand-text">
          <span style={{ color: "var(--ink)" }}>raulmalagarriga</span>
          <span style={{ color: "var(--ink-mute)" }}>.dev</span>
        </span>
      </button>

      <nav className="navtabs" aria-label="Sections">
        {links.map((s) => (
          <button
            key={s.id}
            className={`navtab${active === s.id ? " active" : ""}`}
            onClick={() => onNav(s.id)}
            aria-current={active === s.id ? "true" : undefined}
            type="button"
          >
            {t(s.labelKey)}
          </button>
        ))}
      </nav>

      <div className="right">
        <LanguageToggle compact />
        <button className="iconbtn accent-btn" title="Cycle accent color" aria-label="Cycle accent color" onClick={onCycleAccent} type="button">
          <Icon name="palette" size={14} />
        </button>
        <button className="iconbtn search-btn" title="Open command palette (⌘K)" aria-label="Open command palette" onClick={onOpenPalette} type="button">
          <Icon name="search" size={14} />
        </button>
        <span className="kbd hide-mobile" style={{ marginLeft: 4 }}>⌘ K</span>
        <button
          className={`iconbtn menu-btn${menuOpen ? " on" : ""}`}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          type="button"
        >
          <Icon name={menuOpen ? "close" : "menu"} size={16} />
        </button>
      </div>

      {menuOpen && (
        <>
          <div className="mobile-menu-back" onClick={() => setMenuOpen(false)} aria-hidden />
          <nav id="mobile-menu" className="mobile-menu" aria-label="Sections">
            <ul>
              {links.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={active === s.id ? "on" : ""}
                    aria-current={active === s.id ? "true" : undefined}
                    onClick={() => go(s.id)}
                  >
                    <span className="num">{s.num}</span>
                    {t(s.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mobile-menu-palette"
              onClick={() => {
                setMenuOpen(false)
                onOpenPalette()
              }}
            >
              <Icon name="search" size={13} /> {t("palette.placeholder")}
            </button>
          </nav>
        </>
      )}
    </header>
  )
}
