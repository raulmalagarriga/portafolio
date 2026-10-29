import type Lenis from "lenis"

/** The page-wide Lenis instance (null until mounted, or when reduced motion is on). */
let instance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

/** Smoothly scrolls to an element: Lenis when active, native smooth scroll otherwise. */
export function scrollToElement(el: HTMLElement) {
  if (instance) {
    instance.scrollTo(el, { duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}
