"use client"

import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { CONSULTING } from "@/lib/content/consulting"
import type { ContactReason } from "@/lib/content/contact"
import Icon from "@/components/terminal/icon"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import SectionHeader from "@/components/terminal/section-header"

type Props = { onContact: (reason: ContactReason) => void }

export default function ConsultingSection({ onContact }: Props) {
  const { t, language } = useLanguage()

  return (
    <section id="consulting" className="section">
      <span className="sect-ghost" aria-hidden>
        06
      </span>
      <div className="container">
        <Reveal variant="up">
          <SectionHeader num="06" file="consulting.tsx" title={t("consulting.title")} sub={t("consulting.sub")} />
        </Reveal>

        <div className="consulting-grid">
          <Reveal variant="left" delay={80} sweep>
            <Pane
              title={
                <>
                  ~/consulting/<b>process.sh</b>
                </>
              }
              meta="4 steps"
              hoverable
            >
              <p className="bio-lead" style={{ marginBottom: 20 }}>
                {pick(CONSULTING.intro, language)}
              </p>
              <div className="label" style={{ marginBottom: 10 }}>
                <span className="b">$</span> {t("consulting.process")}
              </div>
              <ol className="steps">
                {CONSULTING.steps.map((s, i) => (
                  <li key={s.cmd} className="step">
                    <div className="step-cmd">
                      <span className="b">$</span> {String(i + 1).padStart(2, "0")} ./{s.cmd}
                    </div>
                    <h3>{pick(s.title, language)}</h3>
                    <p>{pick(s.body, language)}</p>
                  </li>
                ))}
              </ol>
            </Pane>
          </Reveal>

          <Reveal variant="right" delay={140} sweep>
            <Pane
              title={
                <>
                  ~/consulting/<b>services.json</b>
                </>
              }
              meta="scope"
              hoverable
            >
              <div className="label" style={{ marginBottom: 10 }}>
                <span className="b">$</span> {t("consulting.services")}
              </div>
              <div className="principles">
                {CONSULTING.services[language].map((s) => (
                  <span key={s} className="principle">
                    <span className="glyph">◆</span> {s}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <button type="button" className="btn" onClick={() => onContact(CONSULTING.cta.reason)}>
                  <Icon name="send" size={13} /> {pick(CONSULTING.cta.label, language)}
                </button>
              </div>
            </Pane>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
