"use client"

import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { EXPERIENCE } from "@/lib/content/experience"
import { STACK } from "@/lib/content/stack"
import { LAB, LAB_INTRO } from "@/lib/content/lab"
import Card from "@/components/terminal/card"
import { LAB_ILLUSTRATIONS } from "@/components/terminal/lab-illustrations"
import Reveal from "@/components/terminal/reveal"
import SectionHeader from "@/components/terminal/section-header"

/** "2026-02" → "2026" (the list shows years only). */
const year = (ym: string) => ym.split("-")[0]

export default function ExperienceSection() {
  const { t, language } = useLanguage()
  const stackTop = STACK.filter((c) => c.top)

  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal>
          <SectionHeader id="experience" title={t("experience.title")} />
        </Reveal>

        <Reveal>
          <ol className="exp-list">
            {EXPERIENCE.map((e) => {
              const current = !e.end
              return (
                <li key={e.key} className="exp">
                  <span className={`exp-when${current ? " current" : ""}`}>
                    {e.start ? (
                      year(e.start)
                    ) : (
                      // TODO: fill `start` in lib/content/experience.ts
                      <span className="tl-pending" title={t("common.datePending")}>
                        ····
                      </span>
                    )}{" "}
                    — {e.end ? year(e.end) : t("common.present")}
                  </span>
                  <div>
                    <h3 className="exp-role">
                      {pick(e.role, language)}
                      {e.roleTodo && (
                        <span className="tag todo" style={{ marginLeft: 8 }} title="TODO">
                          {t("common.todo")}
                        </span>
                      )}
                    </h3>
                    <p className="exp-org">{pick(e.org, language)}</p>
                  </div>
                  <p className="exp-summary body-text">{pick(e.summary, language)}</p>
                </li>
              )
            })}
          </ol>
        </Reveal>

        <Reveal>
          <Card className="stack-card">
            <p className="cmd-line">
              <span className="acc">$</span> stack --top
            </p>
            <dl className="stack-grid">
              {stackTop.map((c) => (
                <div key={c.key}>
                  <dt>{pick(c.top!.label, language)}</dt>
                  <dd>{c.top!.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>

        <div className="lab">
          <Reveal>
            <p className="cmd-line">
              <span className="acc">$</span> ls lab/
            </p>
            <h3 className="lab-title">{t("lab.title")}</h3>
            <p className="lab-intro body-text">{pick(LAB_INTRO, language)}</p>
          </Reveal>
          <div className="lab-grid">
            {LAB.map((p, i) => {
              const Art = LAB_ILLUSTRATIONS[p.key]
              return (
                <Reveal key={p.key} delay={60 + i * 80}>
                  <Card as="article" className="lab-card">
                    <div className="lab-art">
                      <Art label={t(`lab.art.${p.key}`)} />
                    </div>
                    <div className="lab-body">
                      <div className="card-meta">
                        <span>
                          <span className="acc">›</span> lab/{p.key}
                        </span>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <h4 className="lab-name">{p.name}</h4>
                      <p className="lab-summary body-text">{pick(p.summary, language)}</p>
                      <ul className="chip-list sm">
                        {p.tech.map((tech) => (
                          <li key={tech} className="chip">
                            {tech}
                          </li>
                        ))}
                      </ul>
                      <div className="card-links lab-links">
                        {p.url && (
                          <a className="acc-link" href={p.url} target="_blank" rel="noreferrer">
                            {t("lab.demo")}
                          </a>
                        )}
                        {p.github && (
                          <a className={p.url ? "mute-link" : "acc-link"} href={p.github} target="_blank" rel="noreferrer">
                            {t("lab.code")}
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
