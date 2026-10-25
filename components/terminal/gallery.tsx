"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import type { GalleryItem } from "@/lib/content/pulse"
import Icon from "@/components/terminal/icon"
import ScreenshotPlaceholder from "@/components/terminal/screenshot-placeholder"

type GalleryProps = {
  items: GalleryItem[]
  /** Public paths that exist on disk (computed server-side). */
  available: string[]
  aspectRatio?: string
  sizes?: string
  /** "contain" shows the whole screenshot (default); "cover" fills the frame. */
  fit?: "contain" | "cover"
  keyboard?: boolean
  className?: string
}

/**
 * Screenshot carousel. File slots that are missing on disk are skipped; when nothing is
 * available at all, a single "screenshot coming soon" placeholder is rendered instead.
 */
export default function Gallery({
  items,
  available,
  aspectRatio = "16/9",
  sizes = "(max-width: 820px) 100vw, 820px",
  fit = "contain",
  keyboard = false,
  className = "",
}: GalleryProps) {
  const { language } = useLanguage()
  const [i, setI] = useState(0)

  const slides = items.filter((item) => item.kind === "static" || available.includes(item.src))
  const n = slides.length

  useEffect(() => {
    setI(0)
  }, [n])

  useEffect(() => {
    if (!keyboard || n < 2) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((v) => (v + 1) % n)
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + n) % n)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [keyboard, n])

  if (n === 0) {
    const first = items.find((it) => it.kind === "file")
    return (
      <div className={`gallery${className ? " " + className : ""}`}>
        <div className="gallery-stage" style={{ aspectRatio }}>
          <ScreenshotPlaceholder path={first?.src} style={{ position: "absolute", inset: 0, height: "100%" }} />
        </div>
      </div>
    )
  }

  return (
    <div className={`gallery${className ? " " + className : ""}`}>
      <div className="gallery-stage" style={{ aspectRatio }}>
        {slides.map((item, idx) => {
          const alt = pick(item.alt, language)
          const active = idx === i
          const style: React.CSSProperties = {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: fit,
            objectPosition: "center",
            opacity: active ? 1 : 0,
            transition: "opacity .45s ease",
            pointerEvents: active ? "auto" : "none",
          }
          return item.kind === "static" ? (
            <Image key={`s-${idx}`} src={item.src} alt={alt} fill sizes={sizes} style={style} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={`f-${idx}`} src={item.src} alt={alt} style={style} />
          )
        })}
      </div>
      {n > 1 && (
        <>
          <button type="button" className="iconbtn gallery-nav prev" onClick={() => setI((v) => (v - 1 + n) % n)} aria-label="Previous image">
            <Icon name="chevronLeft" size={14} />
          </button>
          <button type="button" className="iconbtn gallery-nav next" onClick={() => setI((v) => (v + 1) % n)} aria-label="Next image">
            <Icon name="chevronRight" size={14} />
          </button>
          <div className="gallery-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Go to image ${idx + 1}`}
                aria-current={idx === i}
                className={`gallery-dot${idx === i ? " on" : ""}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
