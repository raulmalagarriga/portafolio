"use client"

import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { CONSULTING } from "@/lib/content/consulting"
import type { ContactReason } from "@/lib/content/contact"
import Reveal from "@/components/terminal/reveal"
import Stagger from "@/components/terminal/stagger"
import SectionHeader from "@/components/terminal/section-header"

type Props = { onContact: (reason: ContactReason) => void }

export default function ConsultingSection({ onContact }: Props) {
  const { t, language } = useLanguage()

  return (
    <section id="consulting" className="section">
      <div className="container">
        <Reveal>
          <SectionHeader id="consulting" title={t("consulting.title")} lead={pick(CONSULTING.intro, language)} />
        </Reveal>

        <Stagger as="ol" className="steps">
          {CONSULTING.steps.map((s, i) => (
            <li key={s.cmd} className="step">
              <div className="step-cmd">
                {String(i + 1).padStart(2, "0")} ./{s.cmd}
              </div>
              <h3>{pick(s.title, language)}</h3>
              <p className="body-text">{pick(s.body, language)}</p>
            </li>
          ))}
        </Stagger>

        <div className="services-row">
          <p className="services">
            <span className="acc">{t("consulting.services")}</span> {CONSULTING.services[language].join(" · ")}
          </p>
          <button type="button" className="btn" onClick={() => onContact(CONSULTING.cta.reason)}>
            {pick(CONSULTING.cta.label, language)}
          </button>
        </div>
      </div>
    </section>
  )
}
