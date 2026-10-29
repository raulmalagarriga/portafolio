"use client"

import { useLanguage } from "@/contexts/language-context"
import { pick, type Locale } from "@/lib/i18n"
import { EXPERIENCE } from "@/lib/content/experience"
import Icon from "@/components/terminal/icon"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import SectionHeader from "@/components/terminal/section-header"

const MONTHS: Record<Locale, string[]> = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  en: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
}

function fmt(ym: string, locale: Locale): string {
  const [y, m] = ym.split("-")
  if (!m) return y
  const mi = Number(m) - 1
  const month = MONTHS[locale][mi] ?? ""
  return month ? `${month} ${y}` : y
}

export default function ExperienceSection() {
  const { t, language } = useLanguage()

  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal>
          <SectionHeader id="experience" title={t("experience.title")} />
        </Reveal>

        <Reveal delay={80}>
          <Pane
            title={
              <>
                ~/<b>experience.log</b>
              </>
            }
            meta="git log --oneline"
            hoverable
          >
            <ol className="timeline">
              {EXPERIENCE.map((e, i) => {
                const start = e.start ? fmt(e.start, language) : null
                const end = e.end ? fmt(e.end, language) : t("common.present")
                return (
                  <li key={e.key} className="tl-item" style={{ ["--i" as string]: i }}>
                    <span className="tl-dot" aria-hidden />
                    <div className="tl-when">
                      {start ? (
                        <span>{start}</span>
                      ) : (
                        // TODO: fill `start` in lib/content/experience.ts
                        <span className="tl-pending" title={t("common.datePending")}>
                          ····
                        </span>
                      )}
                      <span className="tl-sep">–</span>
                      <span>{end}</span>
                    </div>
                    <div className="tl-body">
                      <h3>
                        {pick(e.role, language)}
                        {e.roleTodo && (
                          <span className="tag todo" style={{ marginLeft: 8 }} title="TODO">
                            {t("common.todo")}
                          </span>
                        )}
                      </h3>
                      <div className="tl-org">
                        {e.url ? (
                          <a href={e.url} target="_blank" rel="noreferrer" className="footer-link">
                            {pick(e.org, language)} <Icon name="external" size={10} />
                          </a>
                        ) : (
                          pick(e.org, language)
                        )}
                      </div>
                      <ul>
                        {e.highlights[language].map((h) => (
                          <li key={h}>
                            <span className="b">›</span> {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
              })}
            </ol>
          </Pane>
        </Reveal>
      </div>
    </section>
  )
}
