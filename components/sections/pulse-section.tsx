"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { PULSE } from "@/lib/content/pulse"
import type { ContactReason } from "@/lib/content/contact"
import Icon from "@/components/terminal/icon"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import SectionHeader from "@/components/terminal/section-header"

type Props = {
  onContact: (reason: ContactReason) => void
}

export default function PulseSection({ onContact }: Props) {
  const { t, language } = useLanguage()
  const { web, phone } = PULSE.screens

  return (
    <section id="pulse" className="section">
      <div className="container">
        <Reveal>
          <SectionHeader id="pulse" title={t("pulse.title")} sub={t("pulse.sub")} />
        </Reveal>

        <Reveal delay={80}>
          <Pane
            title={
              <>
                ~/pulse/<b>README.md</b>
              </>
            }
            meta={
              <>
                <span className="on">●</span> {t("cases.status.production")}
              </>
            }
          >
            <div className="pulse-grid">
              <div>
                <p className="pulse-tagline body-text">{pick(PULSE.tagline, language)}</p>
                <p className="pulse-desc body-text">{pick(PULSE.description, language)}</p>
                <ul className="chip-list">
                  {PULSE.chips[language].map((c) => (
                    <li key={c} className="chip">
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="pulse-role body-text">
                  <span className="acc mono">{t("pulse.role")}</span> {pick(PULSE.role, language)}
                </p>
                <div className="pulse-actions">
                  <a className="btn" href={pick(PULSE.links.website, language)} target="_blank" rel="noreferrer">
                    {t("pulse.website")} <Icon name="external" size={13} />
                  </a>
                  <button type="button" className="btn ghost" onClick={() => onContact(PULSE.investorCta.reason)}>
                    {pick(PULSE.investorCta.label, language)}
                  </button>
                </div>
                <p className="pulse-stores">
                  {PULSE.apps.map((app) => (
                    <span key={app.key}>
                      {pick(app.audience, language)}:{" "}
                      <a className="acc-link" href={app.appStore} target="_blank" rel="noreferrer" aria-label={`${pick(app.name, language)} · App Store`}>
                        App Store
                      </a>{" "}
                      ·{" "}
                      <a className="acc-link" href={app.googlePlay} target="_blank" rel="noreferrer" aria-label={`${pick(app.name, language)} · Google Play`}>
                        Google Play
                      </a>
                    </span>
                  ))}
                </p>
              </div>

              <div className="pulse-media">
                <Image className="pulse-web" src={web.src} alt={pick(web.alt, language)} sizes="(max-width: 960px) 100vw, 560px" />
                <div className="pulse-phone">
                  <Image src={phone.src} alt={pick(phone.alt, language)} fill sizes="150px" />
                </div>
              </div>
            </div>
          </Pane>
        </Reveal>
      </div>
    </section>
  )
}
