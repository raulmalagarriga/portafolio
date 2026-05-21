"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useThemeColor, THEME_COLORS, type ThemeColor } from "@/contexts/theme-context"
import type { Tweaks, BackgroundStyle, Density, ScrollFxIntensity } from "@/hooks/use-tweaks"
import Icon from "@/components/terminal/icon"

const ACCENT_HEX: Record<ThemeColor, string> = {
  green: "#4ade80",
  amber: "#fbbf24",
  cyan: "#22d3ee",
  magenta: "#e879f9",
  white: "#e5e7eb",
}

type TweaksPanelProps = {
  tweaks: Tweaks
  setTweak: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void
}

export default function TweaksPanel({ tweaks, setTweak }: TweaksPanelProps) {
  const { t, language, toggleLanguage } = useLanguage()
  const { setThemeColor } = useThemeColor()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const offsetRef = useRef({ x: 16, y: 36 })

  const clampToViewport = () => {
    const panel = panelRef.current
    if (!panel) return
    const w = panel.offsetWidth
    const h = panel.offsetHeight
    const maxRight = Math.max(16, window.innerWidth - w - 16)
    const maxBottom = Math.max(16, window.innerHeight - h - 16)
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(16, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(16, offsetRef.current.y)),
    }
    panel.style.right = offsetRef.current.x + "px"
    panel.style.bottom = offsetRef.current.y + "px"
  }

  useEffect(() => {
    if (!open) return
    clampToViewport()
    const onResize = () => clampToViewport()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [open])

  const onDragStart = (e: MouseEvent<HTMLDivElement>) => {
    const panel = panelRef.current
    if (!panel) return
    e.preventDefault()
    const rect = panel.getBoundingClientRect()
    const sx = e.clientX
    const sy = e.clientY
    const startRight = window.innerWidth - rect.right
    const startBottom = window.innerHeight - rect.bottom

    const move = (ev: globalThis.MouseEvent) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      }
      clampToViewport()
    }
    const up = () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
    }
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)
  }

  if (!open) {
    return (
      <button
        type="button"
        className="twk-fab"
        title={t("tweaks.title")}
        onClick={() => setOpen(true)}
        aria-label={t("tweaks.title")}
      >
        <Icon name="palette" size={16} />
      </button>
    )
  }

  const accentChange = (color: ThemeColor) => {
    setTweak("accent", color)
    setThemeColor(color)
  }

  return (
    <div
      ref={panelRef}
      className="twk-panel"
      style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}
    >
      <div className="twk-hd" onMouseDown={onDragStart}>
        <b>{t("tweaks.title")}</b>
        <button
          type="button"
          className="twk-x"
          aria-label="Close tweaks"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
      </div>
      <div className="twk-body">
        <div className="twk-sect">{t("tweaks.theme")}</div>
        <TweakRow label={t("tweaks.accent")}>
          <div className="twk-chips" role="radiogroup">
            {THEME_COLORS.map((color) => {
              const on = tweaks.accent === color
              return (
                <button
                  key={color}
                  type="button"
                  className="twk-chip"
                  role="radio"
                  aria-checked={on}
                  data-on={on ? "1" : "0"}
                  title={color}
                  style={{ background: ACCENT_HEX[color] }}
                  onClick={() => accentChange(color)}
                />
              )
            })}
          </div>
        </TweakRow>

        <div className="twk-sect">{t("tweaks.background")}</div>
        <TweakSegment<BackgroundStyle>
          label={t("tweaks.style")}
          value={tweaks.background}
          options={["mesh", "grid", "dots", "none"]}
          onChange={(v) => setTweak("background", v)}
        />
        <TweakToggle
          label={t("tweaks.scanlines")}
          value={tweaks.scanlines}
          onChange={(v) => setTweak("scanlines", v)}
        />
        <TweakToggle
          label={t("tweaks.filmgrain")}
          value={tweaks.noise}
          onChange={(v) => setTweak("noise", v)}
        />

        <div className="twk-sect">{t("tweaks.layout")}</div>
        <TweakSegment<Density>
          label={t("tweaks.density")}
          value={tweaks.density}
          options={["compact", "comfortable", "spacious"]}
          onChange={(v) => setTweak("density", v)}
        />

        <div className="twk-sect">{t("tweaks.scrollFx")}</div>
        <TweakSegment<ScrollFxIntensity>
          label={t("tweaks.intensity")}
          value={tweaks.scrollFx}
          options={["off", "minimal", "full"]}
          onChange={(v) => setTweak("scrollFx", v)}
        />

        <div className="twk-sect">{t("tweaks.language")}</div>
        <TweakSegment<"en" | "es">
          label={t("tweaks.language")}
          value={language}
          options={["en", "es"]}
          onChange={() => toggleLanguage()}
        />
      </div>
    </div>
  )
}

function TweakRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="twk-row">
      <div className="twk-lbl">
        <span>{label}</span>
      </div>
      {children}
    </div>
  )
}

function TweakToggle({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl">
        <span>{label}</span>
      </div>
      <button
        type="button"
        className="twk-toggle"
        data-on={value ? "1" : "0"}
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
      >
        <i />
      </button>
    </div>
  )
}

function TweakSegment<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly T[]
  onChange: (v: T) => void
}) {
  const idx = Math.max(0, options.indexOf(value))
  const n = options.length
  return (
    <TweakRow label={label}>
      <div className="twk-seg" role="radiogroup">
        <div
          className="twk-seg-thumb"
          style={{
            left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
            width: `calc((100% - 4px) / ${n})`,
          }}
        />
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={opt === value}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </TweakRow>
  )
}
