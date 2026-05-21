"use client"

import { useEffect, useState } from "react"
import type { SectionId } from "@/lib/portfolio-data"

type StatusBarProps = {
  active: SectionId
}

export default function StatusBar({ active }: StatusBarProps) {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const interval = window.setInterval(() => setTime(new Date()), 30_000)
    return () => window.clearInterval(interval)
  }, [])

  const hh = time ? String(time.getHours()).padStart(2, "0") : "--"
  const mm = time ? String(time.getMinutes()).padStart(2, "0") : "--"

  return (
    <div className="statusbar">
      <div className="mode">NORMAL</div>
      <div>
        <span className="dot" /> {active}.tsx
      </div>
      <div className="hide-mobile">utf-8</div>
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
