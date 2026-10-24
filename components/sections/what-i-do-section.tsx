"use client"

import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { FACETS, STATS } from "@/lib/content/what-i-do"
import type { SectionId } from "@/lib/portfolio-data"
import Icon from "@/components/terminal/icon"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import SectionHeader from "@/components/terminal/section-header"

type Props = { onNav: (id: SectionId) => void }

export default function WhatIDoSection({ onNav }: Props) {
  const { t, language } = useLanguage()

  return (
    <section id="what-i-do" className="section">
      <span className="sect-ghost" aria-hidden>
        02
      </span>
      <div className="container">
        <Reveal variant="up">
          <SectionHeader num="02" file="what-i-do.tsx" title={t("whatido.title")} sub={t("whatido.sub")} />
        </Reveal>

        <div className="facet-grid">
          {FACETS.map((f, i) => (
            <Reveal key={f.key} variant="rise" delay={80 + i * 90} sweep>
              <Pane
                hoverable
                title={
                  <>
                    ./<b>{f.key}</b>
                  </>
                }
                meta={`0${i + 1}`}
              >
                <div className="facet-card">
                  <div className="facet-glyph">{f.glyph}</div>
                  <h3>{pick(f.title, language)}</h3>
                  <p>{pick(f.line, language)}</p>
                  <button type="button" className="facet-link" onClick={() => onNav(f.target)}>
                    {pick(f.linkLabel, language)} <Icon name="arrow" size={11} />
                  </button>
                </div>
              </Pane>
            </Reveal>
          ))}
        </div>

        <Reveal variant="up" delay={120}>
          <div style={{ marginTop: 18 }}>
            <Pane
              title={
                <>
                  ~/<b>{t("whatido.stats.label")}</b>
                </>
              }
              meta="summary"
              hoverable
            >
              <div className="stat-strip">
                {STATS.map((s) => (
                  <div key={s.key} className="stat-cell">
                    <div className="v stat-val">{s.value}</div>
                    <div className="sub">{pick(s.label, language)}</div>
                  </div>
                ))}
              </div>
            </Pane>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
