"use client"

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

  return (
    <header className="topbar">
      <div className="brand">
        <div className="glyph">R</div>
        <div>
          <span style={{ color: "var(--ink)" }}>raulmalagarriga</span>
          <span style={{ color: "var(--ink-mute)" }}>.dev</span>
        </div>
      </div>

      <nav className="navtabs" aria-label="Sections">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`navtab${active === s.id ? " active" : ""}${s.secondary ? " secondary" : ""}`}
            onClick={() => onNav(s.id)}
            aria-current={active === s.id ? "true" : undefined}
            type="button"
          >
            <span className="hash">#</span> {t(s.labelKey)}
          </button>
        ))}
      </nav>

      <div className="right">
        <LanguageToggle compact />
        <button className="iconbtn" title="Cycle accent color" aria-label="Cycle accent color" onClick={onCycleAccent} type="button">
          <Icon name="palette" size={14} />
        </button>
        <button className="iconbtn" title="Open command palette (⌘K)" aria-label="Open command palette" onClick={onOpenPalette} type="button">
          <Icon name="search" size={14} />
        </button>
        <span className="kbd hide-mobile" style={{ marginLeft: 4 }}>⌘ K</span>
      </div>
    </header>
  )
}
