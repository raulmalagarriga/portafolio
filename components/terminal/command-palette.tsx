"use client"

import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react"

export type Command = {
  id: string
  label: string
  hint?: string
  glyph?: string
  action: () => void
  keywords?: string[]
}

type CommandPaletteProps = {
  open: boolean
  onClose: () => void
  commands: Command[]
  placeholder: string
  hintRun: string
  hintNav: string
  hintClose: string
  emptyLabel: string
}

export default function CommandPalette({
  open,
  onClose,
  commands,
  placeholder,
  hintRun,
  hintNav,
  hintClose,
  emptyLabel,
}: CommandPaletteProps) {
  const [q, setQ] = useState("")
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim()
    if (!s) return commands
    return commands.filter(
      (c) => c.label.toLowerCase().includes(s) || c.keywords?.some((k) => k.includes(s))
    )
  }, [q, commands])

  useEffect(() => {
    setSel(0)
  }, [q])

  useEffect(() => {
    if (open) {
      setQ("")
      const t = window.setTimeout(() => inputRef.current?.focus(), 30)
      return () => window.clearTimeout(t)
    }
  }, [open])

  const onKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setSel((s) => Math.min(s + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSel((s) => Math.max(s - 1, 0))
    } else if (e.key === "Enter") {
      const c = filtered[sel]
      if (c) {
        c.action()
        onClose()
      }
    }
  }

  if (!open) return null

  return (
    <div className="palette-back" onClick={onClose} role="dialog" aria-modal="true">
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKey}
          placeholder={placeholder}
        />
        <ul>
          {filtered.length === 0 && <li style={{ opacity: 0.5 }}>{emptyLabel}</li>}
          {filtered.map((c, i) => (
            <li
              key={c.id}
              className={i === sel ? "sel" : ""}
              onMouseEnter={() => setSel(i)}
              onClick={() => {
                c.action()
                onClose()
              }}
            >
              <span className="ico">{c.glyph || "›"}</span>
              <span>{c.label}</span>
              <span style={{ marginLeft: "auto", color: "var(--ink-dim)", fontSize: 11 }}>{c.hint}</span>
            </li>
          ))}
        </ul>
        <div className="hint">
          <span>
            <span className="kbd">↵</span> {hintRun}
          </span>
          <span>
            <span className="kbd">↑↓</span> {hintNav}
          </span>
          <span>
            <span className="kbd">esc</span> {hintClose}
          </span>
        </div>
      </div>
    </div>
  )
}
