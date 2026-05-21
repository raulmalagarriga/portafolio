"use client"

import { useCallback, useEffect, useState } from "react"
import type { ThemeColor } from "@/contexts/theme-context"
import { THEME_COLORS } from "@/contexts/theme-context"

export type Density = "compact" | "comfortable" | "spacious"
export type BackgroundStyle = "mesh" | "grid" | "dots" | "none"
export type ScrollFxIntensity = "off" | "minimal" | "full"

export type Tweaks = {
  accent: ThemeColor
  scanlines: boolean
  noise: boolean
  density: Density
  background: BackgroundStyle
  scrollFx: ScrollFxIntensity
}

export const TWEAK_DEFAULTS: Tweaks = {
  accent: "green",
  scanlines: true,
  noise: true,
  density: "comfortable",
  background: "mesh",
  scrollFx: "full",
}

const STORAGE_KEY = "__tweaks_panel_state"

function normalize(value: unknown): Tweaks {
  const v = (value || {}) as Partial<Tweaks>
  const accent: ThemeColor = THEME_COLORS.includes(v.accent as ThemeColor)
    ? (v.accent as ThemeColor)
    : TWEAK_DEFAULTS.accent
  const density: Density = ["compact", "comfortable", "spacious"].includes(v.density as string)
    ? (v.density as Density)
    : TWEAK_DEFAULTS.density
  const background: BackgroundStyle = ["mesh", "grid", "dots", "none"].includes(
    v.background as string
  )
    ? (v.background as BackgroundStyle)
    : TWEAK_DEFAULTS.background
  const scrollFx: ScrollFxIntensity = ["off", "minimal", "full"].includes(v.scrollFx as string)
    ? (v.scrollFx as ScrollFxIntensity)
    : TWEAK_DEFAULTS.scrollFx
  return {
    accent,
    scanlines: typeof v.scanlines === "boolean" ? v.scanlines : TWEAK_DEFAULTS.scanlines,
    noise: typeof v.noise === "boolean" ? v.noise : TWEAK_DEFAULTS.noise,
    density,
    background,
    scrollFx,
  }
}

export function useTweaks(): [Tweaks, <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void] {
  const [values, setValues] = useState<Tweaks>(TWEAK_DEFAULTS)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setValues(normalize(JSON.parse(raw)))
      }
    } catch {}
  }, [])

  const setTweak = useCallback(<K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

  return [values, setTweak]
}
