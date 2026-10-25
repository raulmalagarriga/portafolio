"use client"

import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { CONSULTING } from "@/lib/content/consulting"
import type { ContactReason } from "@/lib/content/contact"
import Icon from "@/components/terminal/icon"
import { ClipboardList, Hammer, LifeBuoy, ScanSearch, type LucideIcon } from "lucide-react"

const STEP_ICONS: Record<string, LucideIcon> = {
  diagnose: ScanSearch,
  propose: ClipboardList,
  build: Hammer,
  support: LifeBuoy,
}
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

        <Reveal variant="rise" delay={80} sweep>
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
            <div className="label" style={{ marginBottom: 12 }}>
              <span className="b">$</span> {t("consulting.process")}
            </div>
            <ol className="stepper">
              {CONSULTING.steps.map((s, i) => (
                <li key={s.cmd} className="stepper-item">
                  <div className="step">
                    <div className="step-top">
                      <span className="step-icon" aria-hidden>
                        {(() => {
                          const StepIcon = STEP_ICONS[s.icon]
                          return <StepIcon size={18} strokeWidth={1.75} />
                        })()}
                      </span>
                      <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="step-cmd">
                      <span className="b">$</span> ./{s.cmd}
                    </div>
                    <h3>{pick(s.title, language)}</h3>
                    <p>{pick(s.body, language)}</p>
                  </div>
                  {i < CONSULTING.steps.length - 1 && (
                    <span className="step-arrow" aria-hidden>
                      <Icon name="arrow" size={16} />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Pane>
        </Reveal>

        <Reveal variant="up" delay={140} sweep>
          <div style={{ marginTop: 18 }}>
            <Pane
              title={
                <>
                  ~/consulting/<b>services.json</b>
                </>
              }
              meta="scope"
              hoverable
            >
              <div className="services-row">
                <div className="principles">
                  {CONSULTING.services[language].map((s) => (
                    <span key={s} className="principle">
                      <span className="glyph">◆</span> {s}
                    </span>
                  ))}
                </div>
                <button type="button" className="btn" onClick={() => onContact(CONSULTING.cta.reason)}>
                  <Icon name="send" size={13} /> {pick(CONSULTING.cta.label, language)}
                </button>
              </div>
            </Pane>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
