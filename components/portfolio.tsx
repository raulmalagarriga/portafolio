"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useThemeColor, THEME_COLORS, type ThemeColor } from "@/contexts/theme-context"
import { useTweaks } from "@/hooks/use-tweaks"
import { useScrollFx } from "@/hooks/use-scroll-fx"
import { SECTIONS, SOCIAL, type SectionId } from "@/lib/portfolio-data"
import { pick } from "@/lib/i18n"
import type { CaseDef } from "@/lib/content/cases"
import { isContactReason, type ContactReason } from "@/lib/content/contact"
import { PULSE } from "@/lib/content/pulse"

import TopBar from "@/components/terminal/top-bar"
import StatusBar from "@/components/terminal/status-bar"
import CommandPalette, { type Command } from "@/components/terminal/command-palette"
import CaseModal from "@/components/terminal/case-modal"

import HeroSection from "@/components/sections/hero-section"
import PulseSection from "@/components/sections/pulse-section"
import CasesSection from "@/components/sections/cases-section"
import ExperienceSection from "@/components/sections/experience-section"
import ConsultingSection from "@/components/sections/consulting-section"
import ContactSection from "@/components/sections/contact-section"
import FooterSection from "@/components/sections/footer-section"

const DENSITY_PAD: Record<string, string> = {
  compact: "64px",
  comfortable: "96px",
  spacious: "128px",
}

const ACCENT_KEYS = THEME_COLORS

type PortfolioProps = {
  /** Public screenshot paths that exist on disk (computed on the server). */
  availableScreenshots: string[]
}

export default function Portfolio({ availableScreenshots }: PortfolioProps) {
  const { t, language, toggleLanguage } = useLanguage()
  const { themeColor, setThemeColor } = useThemeColor()
  const [tweaks, setTweak] = useTweaks()

  const [active, setActive] = useState<SectionId>("home")
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [caseItem, setCaseItem] = useState<CaseDef | null>(null)
  const [contactReason, setContactReason] = useState<ContactReason | null>(null)

  // Keep theme-context and tweaks.accent in sync. Tweaks is the source of truth for "accent" on save.
  useEffect(() => {
    if (tweaks.accent !== themeColor) setThemeColor(tweaks.accent)
  }, [tweaks.accent, themeColor, setThemeColor])

  useEffect(() => {
    const sl = document.getElementById("scanlines")
    if (sl) sl.style.display = tweaks.scanlines ? "" : "none"
  }, [tweaks.scanlines])

  useEffect(() => {
    const nz = document.querySelector<HTMLElement>(".noise")
    if (nz) nz.style.display = tweaks.noise ? "" : "none"
  }, [tweaks.noise])

  useEffect(() => {
    document.documentElement.style.setProperty("--section-pad", DENSITY_PAD[tweaks.density] || "96px")
  }, [tweaks.density])

  useEffect(() => {
    const grid = document.querySelector<HTMLElement>(".bg-grid")
    const dots = document.querySelector<HTMLElement>(".bg-dots")
    const mesh = document.querySelector<HTMLElement>(".bg-mesh")
    const vignette = document.querySelector<HTMLElement>(".bg-vignette")
    if (!grid || !dots || !mesh || !vignette) return
    grid.style.display = tweaks.background === "grid" || tweaks.background === "mesh" ? "" : "none"
    dots.style.display = tweaks.background === "dots" || tweaks.background === "mesh" ? "" : "none"
    mesh.style.display = tweaks.background === "none" ? "none" : ""
    vignette.style.display = tweaks.background === "none" ? "none" : ""
  }, [tweaks.background])

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

  const onContact = useCallback(
    (reason?: ContactReason) => {
      if (reason) setContactReason(reason)
      onNav("contact")
    },
    [onNav]
  )

  // Deep links: /es?reason=pulse#contact preselects the reason and scrolls to the form.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const reason = params.get("reason")
    if (isContactReason(reason)) {
      setContactReason(reason)
      window.setTimeout(() => onNav("contact"), 150)
    }
  }, [onNav])

  // ⌘K + ⌘1..6
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setPaletteOpen((v) => !v)
        return
      }
      if ((e.metaKey || e.ctrlKey) && /^[1-9]$/.test(e.key)) {
        const s = SECTIONS[Number(e.key) - 1]
        if (s) {
          e.preventDefault()
          onNav(s.id)
        }
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
    setAccent(ACCENT_KEYS[(i + 1) % ACCENT_KEYS.length])
  }, [themeColor, setAccent])

  const commands: Command[] = useMemo(() => {
    const sectionCmds: Command[] = SECTIONS.map((s) => ({
      id: "go:" + s.id,
      label: `${t("palette.goto")} ${t(s.labelKey)}`,
      hint: `${t("palette.hint.section")} ${s.num}`,
      glyph: "›",
      keywords: [s.id, s.file],
      action: () => onNav(s.id),
    }))

    const contactCmds: Command[] = [
      {
        id: "contact:consulting",
        label: t("palette.contact.consulting"),
        hint: t("palette.hint.contact"),
        glyph: "✉",
        keywords: ["consulting", "consultoria", "proyecto"],
        action: () => onContact("consulting"),
      },
      {
        id: "contact:pulse",
        label: t("palette.contact.pulse"),
        hint: t("palette.hint.contact"),
        glyph: "✉",
        keywords: ["pulse", "inversion", "investment", "startup"],
        action: () => onContact("pulse"),
      },
    ]

    const languageCmd: Command = {
      id: "toggle:language",
      label: t(language === "en" ? "palette.toggle.language.es" : "palette.toggle.language.en"),
      hint: t("palette.hint.language"),
      glyph: "⌥",
      keywords: ["language", "idioma", "english", "español", "espanol"],
      action: () => toggleLanguage(),
    }

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
    ]

    const externalCmds: Command[] = [
      {
        id: "ext:pulse",
        label: t("palette.ext.pulse"),
        hint: t("palette.hint.external"),
        glyph: "↗",
        keywords: ["pulse", "pulsefit"],
        action: () => window.open(pick(PULSE.links.website, language), "_blank"),
      },
      {
        id: "ext:github",
        label: t("palette.ext.github"),
        hint: t("palette.hint.external"),
        glyph: "↗",
        action: () => window.open(SOCIAL.github, "_blank"),
      },
      {
        id: "ext:linkedin",
        label: t("palette.ext.linkedin"),
        hint: t("palette.hint.external"),
        glyph: "↗",
        action: () => window.open(SOCIAL.linkedin, "_blank"),
      },
      {
        id: "ext:email",
        label: t("palette.ext.email"),
        hint: t("palette.hint.external"),
        glyph: "✉",
        action: () => {
          window.location.href = `mailto:${SOCIAL.email}`
        },
      },
    ]

    return [...sectionCmds, ...contactCmds, languageCmd, ...accentCmds, ...toggleCmds, ...externalCmds]
  }, [t, language, tweaks.scanlines, tweaks.noise, onNav, onContact, setAccent, setTweak, toggleLanguage])

  return (
    <>
      <TopBar active={active} onNav={onNav} onOpenPalette={() => setPaletteOpen(true)} onCycleAccent={handleCycleAccent} />

      <main className="app">
        <HeroSection onNav={onNav} onContact={onContact} />
        <PulseSection onContact={onContact} />
        <CasesSection available={availableScreenshots} onOpen={setCaseItem} onContact={onContact} />
        <ExperienceSection />
        <ConsultingSection onContact={onContact} />
        <ContactSection reason={contactReason} onReasonChange={setContactReason} />
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

      <CaseModal item={caseItem} available={availableScreenshots} onClose={() => setCaseItem(null)} onContact={onContact} />
    </>
  )
}
