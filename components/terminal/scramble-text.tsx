"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>"

type ScrambleTextProps = {
  text: string
  duration?: number
  trigger?: "mount" | "hover" | "scroll"
  className?: string
}

export default function ScrambleText({
  text,
  duration = 700,
  trigger = "mount",
  className,
}: ScrambleTextProps) {
  const [out, setOut] = useState(text)
  const ref = useRef<HTMLSpanElement | null>(null)
  const tokRef = useRef(0)

  const run = useCallback(() => {
    const tok = ++tokRef.current
    const start = performance.now()
    const tick = () => {
      if (tok !== tokRef.current) return
      const elapsed = (performance.now() - start) / duration
      const t = Math.min(1, elapsed)
      const settle = Math.floor(t * text.length)
      let s = ""
      for (let i = 0; i < text.length; i++) {
        if (i < settle || text[i] === " ") {
          s += text[i]
        } else {
          s += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }
      }
      setOut(s)
      if (t < 1) requestAnimationFrame(tick)
      else setOut(text)
    }
    tick()
  }, [text, duration])

  useEffect(() => {
    if (trigger === "mount") run()
  }, [run, trigger])

  useEffect(() => {
    if (trigger !== "scroll") return
    const el = ref.current
    if (!el) return
    let wasIn = false
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasIn) {
          wasIn = true
          run()
        } else if (!entry.isIntersecting) {
          wasIn = false
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [trigger, run])

  // Reset output if the `text` prop changes (e.g. language switch).
  useEffect(() => {
    setOut(text)
    if (trigger === "mount") run()
  }, [text, trigger, run])

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={trigger === "hover" ? run : undefined}
    >
      {out}
    </span>
  )
}
