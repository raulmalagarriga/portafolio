"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { SECTIONS, type SectionId } from "@/lib/portfolio-data"

type StatusBarProps = {
  active: SectionId
}

export default function StatusBar({ active }: StatusBarProps) {
  const { language } = useLanguage()
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const interval = window.setInterval(() => setTime(new Date()), 30_000)
    return () => window.clearInterval(interval)
  }, [])

  const hh = time ? String(time.getHours()).padStart(2, "0") : "--"
  const mm = time ? String(time.getMinutes()).padStart(2, "0") : "--"
  const file = SECTIONS.find((s) => s.id === active)?.file ?? `${active}.tsx`

  return (
    <div className="statusbar">
      <div className="mode">NORMAL</div>
      <div>
        <span className="dot" /> {file}
      </div>
      <div className="hide-mobile">utf-8</div>
      <div className="hide-mobile">{language}</div>
      <div className="hide-mobile">main</div>
      <div className="spacer" />
      <div className="hide-mobile">↑↓ navigate</div>
      <div className="hide-mobile">⌘K palette</div>
      <div>
        {hh}:{mm}
      </div>
    </div>
  )
}
