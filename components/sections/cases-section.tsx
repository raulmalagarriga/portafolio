"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { CASES, type CaseDef } from "@/lib/content/cases"
import type { ContactReason } from "@/lib/content/contact"
import Icon from "@/components/terminal/icon"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import ScrambleText from "@/components/terminal/scramble-text"
import ScreenshotPlaceholder from "@/components/terminal/screenshot-placeholder"
import SectionHeader from "@/components/terminal/section-header"
import StatusBadge from "@/components/terminal/status-badge"

type Props = {
  available: string[]
  onOpen: (item: CaseDef) => void
  onContact: (reason: ContactReason) => void
}

export default function CasesSection({ available, onOpen, onContact }: Props) {
  const { t, language } = useLanguage()

  return (
    <section id="cases" className="section">
      <span className="sect-ghost" aria-hidden>
        04
      </span>
      <div className="container">
        <Reveal variant="up">
          <SectionHeader num="04" file="cases/" title={t("cases.title")} sub={t("cases.sub")} />
        </Reveal>

        <div className="case-grid">
          {CASES.map((c, i) => {
            const cover = c.gallery.find((g) => g.kind === "static" || available.includes(g.src))
            return (
              <Reveal key={c.slug} variant={i % 2 === 0 ? "left" : "right"} delay={80 + i * 90} sweep>
                <Pane
                  hoverable
                  className="proj-card case-card"
                  title={
                    <>
                      ~/cases/<b>{c.slug}</b>.md
                    </>
                  }
                  meta={<StatusBadge status={c.status} />}
                >
                  <div className="body">
                    <div className="top">
                      <div className="glyph">{c.glyph}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3>
                          <ScrambleText text={c.name} trigger="hover" duration={650} />
                        </h3>
                        <p className="desc">{pick(c.org, language)}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="preview case-preview"
                      onClick={() => onOpen(c)}
                      aria-label={`${t("common.openDetails")}: ${c.name}`}
                      style={{ padding: 0, border: "1px solid var(--line)" }}
                    >
                      {cover?.kind === "static" ? (
                        <Image
                          src={cover.src}
                          alt={pick(cover.alt, language)}
                          width={520}
                          height={120}
                          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
                        />
                      ) : cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cover.src}
                          alt={pick(cover.alt, language)}
                          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
                        />
                      ) : (
                        <ScreenshotPlaceholder path={c.gallery[0]?.kind === "file" ? c.gallery[0].src : undefined} style={{ height: "100%" }} />
                      )}
                    </button>

                    <div className="case-brief">
                      <div className="case-brief-row">
                        <span className="label">
                          <span className="b">$</span> {t("cases.problem")}
                        </span>
                        <p>{pick(c.problem, language)}</p>
                      </div>
                      <div className="case-brief-row">
                        <span className="label">
                          <span className="b">$</span> {t("cases.impact")}
                        </span>
                        {c.impactHighlight ? (
                          <p className="impact-big">{pick(c.impactHighlight, language)}</p>
                        ) : (
                          <p>{pick(c.impact, language)}</p>
                        )}
                      </div>
                    </div>

                    <div className="meta">
                      {c.stack.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                      {c.stackTodo && (
                        <span className="tag todo" title="TODO">
                          {t("common.todo")}
                        </span>
                      )}
                    </div>

                    <div className="actions">
                      <button type="button" onClick={() => onOpen(c)}>
                        <Icon name="terminal" size={12} /> {t("common.openDetails")}
                      </button>
                      {c.url && (
                        <a href={c.url} target="_blank" rel="noreferrer">
                          <Icon name="external" size={12} /> {t("common.visit")}
                        </a>
                      )}
                      {c.cta && (
                        <button type="button" className="cta" onClick={() => onContact(c.cta!.reason)}>
                          <Icon name="send" size={12} /> {pick(c.cta.label, language)}
                        </button>
                      )}
                    </div>
                  </div>
                </Pane>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
