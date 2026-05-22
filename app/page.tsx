"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useThemeColor, THEME_COLORS, type ThemeColor } from "@/contexts/theme-context"
import { useTweaks } from "@/hooks/use-tweaks"
import { useScrollFx } from "@/hooks/use-scroll-fx"
import { SECTIONS, type ProjectDef, type SectionId } from "@/lib/portfolio-data"

import TopBar from "@/components/terminal/top-bar"
import StatusBar from "@/components/terminal/status-bar"
import CommandPalette, { type Command } from "@/components/terminal/command-palette"
import ProjectModal from "@/components/terminal/project-modal"

import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import LinksSection from "@/components/sections/links-section"
import ContactSection from "@/components/sections/contact-section"
import FooterSection from "@/components/sections/footer-section"

const DENSITY_PAD: Record<string, string> = {
  compact: "44px",
  comfortable: "64px",
  spacious: "92px",
}

const ACCENT_KEYS = THEME_COLORS

export default function Portfolio() {
  const { t, language, toggleLanguage } = useLanguage()
  const { themeColor, setThemeColor, cycleThemeColor } = useThemeColor()
  const [tweaks, setTweak] = useTweaks()

  const [active, setActive] = useState<SectionId>("home")
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [project, setProject] = useState<ProjectDef | null>(null)

  // Keep theme-context and tweaks.accent in sync. Tweaks is the source of truth for "accent" on save.
  useEffect(() => {
    if (tweaks.accent !== themeColor) {
      setThemeColor(tweaks.accent)
    }
  }, [tweaks.accent, themeColor, setThemeColor])

  // Scanlines toggle
  useEffect(() => {
    const sl = document.getElementById("scanlines")
    if (sl) sl.style.display = tweaks.scanlines ? "" : "none"
  }, [tweaks.scanlines])

  // Noise toggle
  useEffect(() => {
    const nz = document.querySelector<HTMLElement>(".noise")
    if (nz) nz.style.display = tweaks.noise ? "" : "none"
  }, [tweaks.noise])

  // Density
  useEffect(() => {
    document.documentElement.style.setProperty("--section-pad", DENSITY_PAD[tweaks.density] || "64px")
  }, [tweaks.density])

  // Background variant
  useEffect(() => {
    const grid = document.querySelector<HTMLElement>(".bg-grid")
    const dots = document.querySelector<HTMLElement>(".bg-dots")
    const mesh = document.querySelector<HTMLElement>(".bg-mesh")
    if (!grid || !dots || !mesh) return
    grid.style.display = tweaks.background === "grid" || tweaks.background === "mesh" ? "" : "none"
    dots.style.display = tweaks.background === "dots" || tweaks.background === "mesh" ? "" : "none"
    mesh.style.display = tweaks.background === "none" ? "none" : ""
  }, [tweaks.background])

  // Scroll-driven effects (parallax, ghost numbers, progress bar, etc.)
  useScrollFx(tweaks.scrollFx, tweaks.background)

  // Scroll-spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
            setActive(entry.target.id as SectionId)
          }
        })
      },
      { threshold: [0.2, 0.4, 0.6] }
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const onNav = useCallback((id: SectionId) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    setActive(id)
  }, [])

  // ⌘K + ⌘1..5
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setPaletteOpen((v) => !v)
        return
      }
      if ((e.metaKey || e.ctrlKey) && /^[1-5]$/.test(e.key)) {
        e.preventDefault()
        const s = SECTIONS[Number(e.key) - 1]
        if (s) onNav(s.id)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onNav])

  const setAccent = useCallback(
    (accent: ThemeColor) => {
      setTweak("accent", accent)
      setThemeColor(accent)
    },
    [setTweak, setThemeColor]
  )

  const handleCycleAccent = useCallback(() => {
    const i = ACCENT_KEYS.indexOf(themeColor)
    const next = ACCENT_KEYS[(i + 1) % ACCENT_KEYS.length]
    setAccent(next)
  }, [themeColor, setAccent])

  const commands: Command[] = useMemo(() => {
    const sectionCmds: Command[] = SECTIONS.map((s) => ({
      id: "go:" + s.id,
      label: t("palette.goto") + " " + t(s.labelKey),
      hint: t("palette.hint.section"),
      glyph: "›",
      action: () => onNav(s.id),
    }))

    const accentCmds: Command[] = ACCENT_KEYS.map((accent) => ({
      id: "accent:" + accent,
      label: t(`palette.accent.${accent}`),
      hint: t("palette.hint.theme"),
      glyph: "◆",
      action: () => setAccent(accent),
    }))

    const toggleCmds: Command[] = [
      {
        id: "toggle:scanlines",
        label: t(tweaks.scanlines ? "palette.toggle.scanlines.off" : "palette.toggle.scanlines.on"),
        hint: t("palette.hint.fx"),
        glyph: "▤",
        action: () => setTweak("scanlines", !tweaks.scanlines),
      },
      {
        id: "toggle:noise",
        label: t(tweaks.noise ? "palette.toggle.noise.off" : "palette.toggle.noise.on"),
        hint: t("palette.hint.fx"),
        glyph: "▒",
        action: () => setTweak("noise", !tweaks.noise),
      },
      {
        id: "toggle:language",
        label: t(language === "en" ? "palette.toggle.language.es" : "palette.toggle.language.en"),
        hint: t("palette.hint.language"),
        glyph: "⌥",
        action: () => toggleLanguage(),
      },
    ]

    const externalCmds: Command[] = [
      {
        id: "ext:github",
        label: t("palette.ext.github"),
        hint: t("palette.hint.external"),
        glyph: "↗",
        action: () => window.open("https://github.com/raulmalagarriga", "_blank"),
      },
      {
        id: "ext:linkedin",
        label: t("palette.ext.linkedin"),
        hint: t("palette.hint.external"),
        glyph: "↗",
        action: () => window.open("https://www.linkedin.com/in/rjmalagarrigat/", "_blank"),
      },
      {
        id: "ext:email",
        label: t("palette.ext.email"),
        hint: t("palette.hint.external"),
        glyph: "✉",
        action: () => {
          window.location.href = "mailto:rjmalagarrigat@gmail.com"
        },
      },
    ]

    return [...sectionCmds, ...accentCmds, ...toggleCmds, ...externalCmds]
  }, [t, language, tweaks.scanlines, tweaks.noise, onNav, setAccent, setTweak, toggleLanguage])

  return (
    <>
      <TopBar
        active={active}
        onNav={onNav}
        onOpenPalette={() => setPaletteOpen(true)}
        onCycleAccent={handleCycleAccent}
      />

      <main className="app">
        <HeroSection onExplore={() => onNav("about")} />
        <AboutSection />
        <ProjectsSection onOpen={setProject} />
        <LinksSection />
        <ContactSection />
        <FooterSection />
      </main>

      <StatusBar active={active} />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
        placeholder={t("palette.placeholder")}
        hintRun={t("palette.run")}
        hintNav={t("palette.nav")}
        hintClose={t("palette.close")}
        emptyLabel={t("palette.empty")}
      />

      <ProjectModal project={project} onClose={() => setProject(null)} />
    </>
  )
}
