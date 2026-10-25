"use client"

import { useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import type { CaseDef } from "@/lib/content/cases"
import type { ContactReason } from "@/lib/content/contact"
import Icon from "@/components/terminal/icon"
import Gallery from "@/components/terminal/gallery"
import StatusBadge from "@/components/terminal/status-badge"

type CaseModalProps = {
  item: CaseDef | null
  available: string[]
  onClose: () => void
  onContact: (reason: ContactReason) => void
}

export default function CaseModal({ item, available, onClose, onContact }: CaseModalProps) {
  const { t, language } = useLanguage()

  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [item, onClose])

  if (!item) return null

  const rows: { label: string; value: string }[] = [
    { label: t("cases.client"), value: pick(item.context, language) },
    { label: t("cases.problem"), value: pick(item.problem, language) },
    { label: t("cases.solution"), value: pick(item.solution, language) },
  ]

  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.name}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="pane-head">
          <div className="tl">
            <span />
            <span />
            <span />
          </div>
          <div className="pane-title">
            ~/cases/<b>{item.slug}</b>.md
          </div>
          <div className="pane-meta">readme</div>
          <button
            type="button"
            className="iconbtn"
            style={{ marginLeft: 8 }}
            onClick={onClose}
            title="Close (Esc)"
            aria-label="Close"
          >
            <Icon name="close" size={14} />
          </button>
        </div>
        <div className="modal-body">
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <div className="case-glyph">{item.glyph}</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ margin: 0, fontSize: 20, color: "var(--ink)" }}>{item.name}</h3>
              <div style={{ color: "var(--ink-mute)", fontSize: 12, marginTop: 4, letterSpacing: ".04em" }}>
                <span style={{ color: "var(--acc)" }}>$</span> cat ./{item.slug} · {pick(item.org, language)}
              </div>
            </div>
            <StatusBadge status={item.status} />
          </div>

          <Gallery items={item.gallery} available={available} aspectRatio="2.15" keyboard />

          <dl className="case-rows">
            {rows.map((r) => (
              <div key={r.label} className="case-row">
                <dt className="label">
                  <span className="b">$</span> {r.label}
                </dt>
                <dd>{r.value}</dd>
              </div>
            ))}
            <div className="case-row">
              <dt className="label">
                <span className="b">$</span> {t("cases.impact")}
              </dt>
              <dd>
                {item.impactHighlight && (
                  <div className="impact-big">{pick(item.impactHighlight, language)}</div>
                )}
                {pick(item.impact, language)}
              </dd>
            </div>
            {item.note && (
              <div className="case-row">
                <dt className="label">
                  <span className="b">$</span> {t("cases.note")}
                </dt>
                <dd>{pick(item.note, language)}</dd>
              </div>
            )}
            <div className="case-row">
              <dt className="label">
                <span className="b">$</span> {t("common.stack")}
              </dt>
              <dd>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {item.stack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                  {item.stackTodo && (
                    <span className="tag todo" title="TODO">
                      {t("common.todo")}
                    </span>
                  )}
                </div>
              </dd>
            </div>
            <div className="case-row">
              <dt className="label">
                <span className="b">$</span> {t("common.status")}
              </dt>
              <dd>
                <StatusBadge status={item.status} />
              </dd>
            </div>
          </dl>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {item.cta && (
              <button
                type="button"
                className="btn"
                onClick={() => {
                  onClose()
                  onContact(item.cta!.reason)
                }}
              >
                <Icon name="send" size={13} /> {pick(item.cta.label, language)}
              </button>
            )}
            {item.url && (
              <a className={item.cta ? "btn ghost" : "btn"} href={item.url} target="_blank" rel="noreferrer">
                <Icon name="external" size={13} /> {t("common.visit")}
              </a>
            )}
            <button type="button" className="btn ghost" onClick={onClose}>
              {t("common.close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
