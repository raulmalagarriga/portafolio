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
            meta="featured"
            hoverable
          >
            {/* Row 1: tagline + metrics */}
            <div className="pulse-head">
              <div>
                <p className="pulse-tagline">{pick(PULSE.tagline, language)}</p>
                <p className="pulse-desc">{pick(PULSE.description, language)}</p>
              </div>
              <div className="pulse-metrics">
                {PULSE.metrics.map((m) => (
                  <div key={m.value} className="pulse-metric">
                    <div className="v">{m.value}</div>
                    <div className="k">{pick(m.label, language)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: web gallery + phone frame */}
            <div className="pulse-media">
              <Gallery items={PULSE.gallery} available={available} aspectRatio="2.15" sizes="(max-width: 900px) 100vw, 760px" />
              <div className="phone">
                <div className="phone-notch" aria-hidden />
                <Gallery items={PULSE.phone} available={available} aspectRatio="390/844" sizes="220px" fit="cover" className="phone-gallery" />
              </div>
            </div>

            {/* Row 3: features + role / apps + CTA */}
            <div className="pulse-foot">
              <div>
                <div className="label">
                  <span className="b">$</span> {t("pulse.features")}
                </div>
                <ul className="feature-list">
                  {PULSE.features[language].map((f) => (
                    <li key={f}>
                      <span className="b">›</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="label" style={{ marginTop: 14 }}>
                  <span className="b">$</span> {t("pulse.role")}
                </div>
                <p className="pulse-role">{pick(PULSE.role, language)}</p>
              </div>

              <div className="pulse-actions">
                <a className="btn" href={pick(PULSE.links.website, language)} target="_blank" rel="noreferrer">
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
                <button type="button" className="investor-cta" onClick={() => onContact(PULSE.investorCta.reason)}>
                  <span className="b">›</span> {pick(PULSE.investorCta.label, language)}
                  <Icon name="arrow" size={12} />
                </button>
              </div>
            </div>
          </Pane>
        </Reveal>
      </div>
    </section>
  )
}
