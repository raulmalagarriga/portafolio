"use client"

import { useEffect, useState } from "react"

type TypedTitleProps = {
  prompt: string
  prefix: string
  titles: string[]
}

export default function TypedTitle({ prompt, prefix, titles }: TypedTitleProps) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (titles.length === 0) return
    const current = titles[idx % titles.length]

    if (!deleting && text === current) {
      const t = window.setTimeout(() => setDeleting(true), 1800)
      return () => window.clearTimeout(t)
    }
    if (deleting && text === "") {
      setDeleting(false)
      setIdx((i) => (i + 1) % titles.length)
      return
    }
    const step = deleting ? 35 : 65
    const t = window.setTimeout(() => {
      setText(
        deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)
      )
    }, step)
    return () => window.clearTimeout(t)
  }, [text, deleting, idx, titles])

  // Reset when titles array identity changes (e.g. language switch).
  useEffect(() => {
    setIdx(0)
    setText("")
    setDeleting(false)
  }, [titles])

  return (
    <div className="hero-h">
      <div
        style={{
          color: "var(--ink-mute)",
          fontSize: 13,
          marginBottom: 14,
          letterSpacing: ".05em",
        }}
      >
        <span style={{ color: "var(--acc)" }}>$</span> {prompt}
      </div>
      <h1
        style={{
          margin: 0,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          fontSize: "clamp(28px, 4.6vw, 56px)",
          lineHeight: 1.12,
          color: "var(--ink)",
        }}
      >
        <span style={{ color: "var(--acc)", opacity: 0.85 }}>{prefix}</span>
        <span style={{ color: "var(--ink)" }}>{text}</span>
        <span className="caret" />
      </h1>
    </div>
  )
}
