"use client"

import { useLanguage } from "@/contexts/language-context"

type ScreenshotPlaceholderProps = {
  /** Expected public path, shown as a hint so the owner knows where to drop the file. */
  path?: string
  style?: React.CSSProperties
}

/** Elegant "screenshot coming soon" slot that matches the terminal look. */
export default function ScreenshotPlaceholder({ path, style }: ScreenshotPlaceholderProps) {
  const { t } = useLanguage()
  return (
    <div className="shot-placeholder" style={style} role="img" aria-label={t("common.screenshotSoon")}>
      <div className="shot-placeholder-inner">
        <span className="shot-placeholder-glyph" aria-hidden>
          ▣
        </span>
        <span className="shot-placeholder-text">
          <span className="b">$</span> {t("common.screenshotSoon")}
        </span>
        {path && <span className="shot-placeholder-path">{path}</span>}
      </div>
    </div>
  )
}
