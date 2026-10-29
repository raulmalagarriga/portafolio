"use client"

import type { ReactNode } from "react"
import { useLanguage } from "@/contexts/language-context"
import { sectionDef, type SectionId } from "@/lib/portfolio-data"
import ScrambleText from "@/components/terminal/scramble-text"

type SectionHeaderProps = {
  id: SectionId
  title: string
  /** Short mono line under the title (e.g. "Producto destacado · Chokotech LLC"). */
  sub?: string
  /** Body-font intro paragraph under the title. */
  lead?: ReactNode
  /** Heading level and size; contact uses a larger h2. */
  size?: "md" | "lg"
}

/** `02  ~/pulse  ───` line + section title (decrypts on scroll). Number and path come from SECTIONS. */
export default function SectionHeader({ id, title, sub, lead, size = "md" }: SectionHeaderProps) {
  const { t } = useLanguage()
  const def = sectionDef(id)
  const hasText = Boolean(sub || lead)

  return (
    <div className={`sect-header${hasText ? " has-text" : ""}`}>
      <div className="sect-title">
        <span className="num">{def.num}</span>
        <span>{t(def.pathKey)}</span>
        <span className="bar" aria-hidden />
      </div>
      <h2 className={`sect-h${size === "lg" ? " lg" : ""}`} aria-label={title}>
        <ScrambleText text={title} duration={750} trigger="scroll" aria-hidden />
      </h2>
      {sub && <p className="sect-sub">{sub}</p>}
      {lead && <p className="sect-lead">{lead}</p>}
    </div>
  )
}
