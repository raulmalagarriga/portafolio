"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "rise"

type RevealProps = {
  children: ReactNode
  delay?: number
  variant?: RevealVariant
  sweep?: boolean
  className?: string
}

export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  sweep = false,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setShown(true), delay)
          if (sweep) {
            const pane =
              el.querySelector(".pane") ?? (el.classList.contains("pane") ? el : null)
            if (pane) {
              pane.classList.add("sweep")
              window.setTimeout(() => pane.classList.add("swept"), delay + 60)
            }
          }
          obs.disconnect()
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay, sweep])

  return (
    <div
      ref={ref}
      data-rv={variant}
      className={`reveal${shown ? " in" : ""}${className ? " " + className : ""}`}
    >
      {children}
    </div>
  )
}
