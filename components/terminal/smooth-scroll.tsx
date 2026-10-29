"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { setLenis } from "@/lib/smooth-scroll"

/** Overlays that scroll on their own; wheel/touch inside them never moves the page. */
const OWN_SCROLL = ".modal-back, .palette-back, .mobile-menu"

/** Inertial page scrolling. Skipped entirely with prefers-reduced-motion. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      prevent: (node) => node.closest(OWN_SCROLL) !== null,
    })
    setLenis(lenis)
    return () => {
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return null
}
