"use client"

import { useLanguage } from "@/contexts/language-context"
import type { CaseStatus } from "@/lib/content/cases"

export default function StatusBadge({ status }: { status: CaseStatus }) {
  const { t } = useLanguage()
  return (
    <span className={`status-badge ${status}`}>
      <span className="dot" aria-hidden /> {t(`cases.status.${status}`)}
    </span>
  )
}
