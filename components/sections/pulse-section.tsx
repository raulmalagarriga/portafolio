"use client"

import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { PULSE } from "@/lib/content/pulse"
import type { ContactReason } from "@/lib/content/contact"
import Gallery from "@/components/terminal/gallery"
import Icon from "@/components/terminal/icon"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import SectionHeader from "@/components/terminal/section-header"

type Props = {
  available: string[]
  onContact: (reason: ContactReason) => void
}

export default function PulseSection({ available, onContact }: Props) {
  const { t, language } = useLanguage()

  return (
    <section id="pulse" className="section">
      <span className="sect-ghost" aria-hidden>
        03
      </span>
      <div className="container">
        <Reveal variant="up">
          <SectionHeader num="03" file="pulse.tsx" title={t("pulse.title")} sub={t("pulse.sub")} />
        </Reveal>

        <Reveal variant="rise" delay={80} sweep>
          <Pane
            title={
              <>
                ~/pulse/<b>README.md</b>
              </>
            }
            meta="featured"
            hoverable
          >
            <div className="pulse-grid">
              <div className="pulse-text">
                <p className="pulse-tagline">{pick(PULSE.tagline, language)}</p>
                <p className="pulse-desc">{pick(PULSE.description, language)}</p>

                <div className="pulse-metrics">
                  {PULSE.metrics.map((m) => (
                    <div key={m.value} className="pulse-metric">
                      <div className="v">{m.value}</div>
                      <div className="k">{pick(m.label, language)}</div>
                    </div>
                  ))}
                </div>

                <div className="label" style={{ marginTop: 18 }}>
                  <span className="b">$</span> {t("pulse.features")}
                </div>
                <div className="chips">
                  {PULSE.features[language].map((f) => (
                    <span key={f} className="tag">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="label" style={{ marginTop: 18 }}>
                  <span className="b">$</span> {t("pulse.role")}
                </div>
                <p className="pulse-role">{pick(PULSE.role, language)}</p>

                <button
                  type="button"
                  className="investor-cta"
                  onClick={() => onContact(PULSE.investorCta.reason)}
                >
                  <span className="b">›</span> {pick(PULSE.investorCta.label, language)}
                  <Icon name="arrow" size={12} />
                </button>
              </div>

              <div className="pulse-gallery">
                <Gallery items={PULSE.gallery} available={available} aspectRatio="4/3" sizes="(max-width: 900px) 100vw, 520px" />
                <a className="btn" href={pick(PULSE.links.website, language)} target="_blank" rel="noreferrer" style={{ alignSelf: "flex-start" }}>
                  <Icon name="external" size={13} /> {t("pulse.website")}
                </a>
                <ul className="app-rows">
                  {PULSE.apps.map((app) => (
                    <li key={app.key} className="app-row">
                      <div className="app-name">
                        <span className="b">›</span> {pick(app.name, language)}
                        <span className="app-aud">{pick(app.audience, language)}</span>
                      </div>
                      <div className="app-links">
                        <a href={app.appStore} target="_blank" rel="noreferrer">
                          App Store <Icon name="external" size={10} />
                        </a>
                        <a href={app.googlePlay} target="_blank" rel="noreferrer">
                          Google Play <Icon name="external" size={10} />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Pane>
        </Reveal>
      </div>
    </section>
  )
}
