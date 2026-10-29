"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { CASES, type CaseDef } from "@/lib/content/cases"
import type { ContactReason } from "@/lib/content/contact"
import Card from "@/components/terminal/card"
import Reveal from "@/components/terminal/reveal"
import ScrambleText from "@/components/terminal/scramble-text"
import ScreenshotPlaceholder from "@/components/terminal/screenshot-placeholder"
import SectionHeader from "@/components/terminal/section-header"

type Props = {
  available: string[]
  onOpen: (item: CaseDef) => void
  onContact: (reason: ContactReason) => void
}

function coverOf(c: CaseDef, available: string[]) {
  const usable = (i: number) => {
    const g = c.gallery[i]
    return g && (g.kind === "static" || available.includes(g.src))
  }
  if (c.cover !== undefined && usable(c.cover)) return c.gallery[c.cover]
  return c.gallery.find((_, i) => usable(i))
}

export default function CasesSection({ available, onOpen, onContact }: Props) {
  const { t, language } = useLanguage()

  return (
    <section id="cases" className="section">
      <div className="container">
        <Reveal>
          <SectionHeader id="cases" title={t("cases.title")} />
        </Reveal>

        <div className="case-grid">
          {CASES.map((c, i) => {
            const cover = coverOf(c, available)
            const alt = cover ? pick(cover.alt, language) : ""
            return (
              <Reveal key={c.slug} delay={60 + i * 80}>
                <Card as="article" className="case-card">
                  <button
                    type="button"
                    className="case-cover"
                    onClick={() => onOpen(c)}
                    aria-label={`${t("common.openDetails")}: ${c.name}`}
                  >
                    {cover?.kind === "static" ? (
                      <Image src={cover.src} alt={alt} fill sizes="(max-width: 960px) 100vw, 380px" />
                    ) : cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cover.src} alt={alt} />
                    ) : (
                      <ScreenshotPlaceholder path={c.gallery[0]?.kind === "file" ? c.gallery[0].src : undefined} style={{ height: "100%" }} />
                    )}
                  </button>

                  <div className="case-body">
                    <div className="card-meta">
                      <span>{c.slug}.md</span>
                      <span className={`status ${c.status}`}>
                        <span aria-hidden>●</span> {t(`cases.status.${c.status}`)}
                      </span>
                    </div>
                    <div>
                      <h3 className="case-name">
                        <ScrambleText text={c.name} trigger="hover" duration={650} />
                      </h3>
                      <p className="case-org">{pick(c.org, language)}</p>
                    </div>
                    <p className="case-summary body-text">{pick(c.summary, language)}</p>
                    <div className="case-impact">
                      <div className={`v${c.impactHighlight ? " big" : ""}`}>{pick(c.impactValue, language)}</div>
                      <div className="k">{pick(c.impactLabel, language)}</div>
                    </div>
                    <div className="card-links">
                      <button type="button" className="acc-link" onClick={() => onOpen(c)}>
                        {t("cases.viewCase")}
                      </button>
                      {c.url && (
                        <a className="mute-link" href={c.url} target="_blank" rel="noreferrer">
                          {new URL(c.url).hostname.replace(/^www\./, "")} ↗
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </Reveal>
            )
          })}
        </div>

        <p className="cases-cta body-text">
          {t("cases.similar")}{" "}
          <button type="button" className="acc-link mono" onClick={() => onContact("consulting")}>
            {t("cases.talk")}
          </button>
        </p>
      </div>
    </section>
  )
}
