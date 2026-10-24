"use client"

import { useMemo } from "react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { HERO } from "@/lib/content/hero"
import { PROFILE_PHOTO, SOCIAL, type SectionId } from "@/lib/portfolio-data"
import type { ContactReason } from "@/lib/content/contact"
import Icon from "@/components/terminal/icon"
import KV from "@/components/terminal/kv"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import TypedTitle from "@/components/terminal/typed-title"

type HeroSectionProps = {
  onNav: (id: SectionId) => void
  onContact: (reason?: ContactReason) => void
}

export default function HeroSection({ onNav, onContact }: HeroSectionProps) {
  const { t, language } = useLanguage()
  const titles = useMemo(() => HERO.roles[language], [language])

  return (
    <section id="home" className="section" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
      <span className="sect-ghost" aria-hidden>
        01
      </span>
      <div className="container hero-drift" style={{ width: "100%" }}>
        <div className="hero-grid">
          <Reveal variant="rise" sweep>
            <Pane
              title={
                <>
                  ~/portfolio — <b>hello.tsx</b>
                </>
              }
              meta="● live"
            >
              <TypedTitle prompt={HERO.prompt} prefix={pick(HERO.prefix, language)} titles={titles} />
              <h1 className="hero-headline">{pick(HERO.headline, language)}</h1>
              <p className="hero-sub">{pick(HERO.subtitle, language)}</p>
              <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
                <button className="btn" onClick={() => onNav("pulse")} type="button">
                  {pick(HERO.cta.primary, language)} <Icon name="arrow" size={13} />
                </button>
                <button className="btn ghost" onClick={() => onContact()} type="button">
                  <Icon name="send" size={13} /> {pick(HERO.cta.secondary, language)}
                </button>
                <button className="link-quiet" onClick={() => onNav("cases")} type="button">
                  {pick(HERO.cta.tertiary, language)} →
                </button>
              </div>
              <div className="hero-status">
                <span>
                  <span style={{ color: "var(--acc)" }}>●</span> {pick(HERO.status.open, language)}
                </span>
                <span>{pick(HERO.status.location, language)}</span>
                <span>{pick(HERO.status.response, language)}</span>
              </div>
            </Pane>
          </Reveal>

          <Reveal variant="right" delay={140} sweep>
            <Pane
              title={
                <>
                  ~/<b>{t("hero.profile.file")}</b>
                </>
              }
              meta="hex"
              hoverable
            >
              <div className="hero-profile">
                <div className="hex-wrap" style={{ width: 170, height: 196 }}>
                  <div className="hex-orbit" />
                  <div className="hex-ring">
                    <div className="hex-inner">
                      <Image src={PROFILE_PHOTO} alt="Raúl Malagarriga" width={220} height={254} priority />
                    </div>
                  </div>
                </div>
                <div className="hero-profile-name">
                  <strong>Raúl Malagarriga</strong>
                  <span>{pick(HERO.profile.role, language)}</span>
                </div>
                <div className="hero-kv">
                  <KV k={t("hero.kv.based")} v={pick(HERO.profile.based, language)} />
                  <KV k={t("hero.kv.exp")} v={pick(HERO.profile.exp, language)} />
                  <KV
                    k={t("hero.kv.status")}
                    v={
                      <span>
                        <span style={{ color: "var(--acc)" }}>●</span> {pick(HERO.profile.status, language)}
                      </span>
                    }
                  />
                  <KV
                    k={t("hero.kv.contact")}
                    v={
                      <a className="footer-link" href={`mailto:${SOCIAL.email}`}>
                        {SOCIAL.email}
                      </a>
                    }
                  />
                </div>
                <div className="hero-quick">
                  <a className="btn ghost sm" href={SOCIAL.github} target="_blank" rel="noreferrer">
                    <Icon name="github" size={12} /> github
                  </a>
                  <a className="btn ghost sm" href={SOCIAL.linkedin} target="_blank" rel="noreferrer">
                    <Icon name="linkedin" size={12} /> linkedin
                  </a>
                  <a className="btn ghost sm" href="/Resume-RaulJMalagarriga.pdf" download>
                    <Icon name="download" size={12} /> cv
                  </a>
                </div>
              </div>
            </Pane>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
