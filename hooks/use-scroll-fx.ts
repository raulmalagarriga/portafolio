"use client"

import { useEffect } from "react"

export type ScrollFxIntensity = "off" | "minimal" | "full"

export function useScrollFx(intensity: ScrollFxIntensity, background: string) {
  useEffect(() => {
    if (typeof window === "undefined") return

    if (intensity === "off") {
      document.documentElement.style.setProperty("--sp", "0")
      document.querySelectorAll<HTMLElement>(".parallax").forEach((el) => {
        el.style.transform = ""
      })
      document.querySelectorAll<HTMLElement>(".sect-ghost").forEach((el) => {
        el.style.transform = ""
      })
      const sp = document.getElementById("scrollProgress")
      if (sp) sp.style.opacity = "0"
      return
    }

    const sp = document.getElementById("scrollProgress")
    if (sp) sp.style.opacity = "1"

    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>(".parallax"))
    const ghosts = Array.from(document.querySelectorAll<HTMLElement>(".sect-ghost"))
    const heroDrift = document.querySelector<HTMLElement>(".hero-drift")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const minimal = intensity === "minimal" || reduced

    let raf = 0
    let lastY = window.scrollY
    let lastT = performance.now()
    let fastTimer: number | null = null

    const update = () => {
      raf = 0
      const y = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const sp01 = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0
      document.documentElement.style.setProperty("--sp", sp01.toFixed(4))

      const now = performance.now()
      const dy = Math.abs(y - lastY)
      const dt = Math.max(1, now - lastT)
      const vel = dy / dt
      lastY = y
      lastT = now
      if (!minimal && vel > 2.5) {
        document.body.classList.add("scrolling-fast")
        if (fastTimer !== null) window.clearTimeout(fastTimer)
        fastTimer = window.setTimeout(
          () => document.body.classList.remove("scrolling-fast"),
          180
        )
      }

      if (!minimal) {
        for (const node of parallaxNodes) {
          const rate = parseFloat(node.dataset.parallax || "0")
          node.style.transform = `translate3d(0, ${(y * rate).toFixed(1)}px, 0)`
        }
      }

      for (const ghost of ghosts) {
        const parent = ghost.parentElement
        if (!parent) continue
        const rect = parent.getBoundingClientRect()
        const center = rect.top + rect.height / 2 - window.innerHeight / 2
        const off = minimal ? center * -0.04 : center * -0.18
        ghost.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`
      }

      if (heroDrift && !minimal) {
        heroDrift.style.setProperty("--hero-y", `${(-y * 0.12).toFixed(1)}px`)
        heroDrift.style.opacity = Math.max(0, 1 - y / 700).toFixed(2)
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    update()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
      if (fastTimer !== null) window.clearTimeout(fastTimer)
    }
  }, [intensity, background])
}
