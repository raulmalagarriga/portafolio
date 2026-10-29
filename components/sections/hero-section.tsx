"use client"

import { useMemo, type MouseEvent } from "react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { HERO } from "@/lib/content/hero"
import { FACETS, STATS } from "@/lib/content/what-i-do"
import { PROFILE_PHOTO, SOCIAL, type SectionId } from "@/lib/portfolio-data"
import type { ContactReason } from "@/lib/content/contact"
import Icon from "@/components/terminal/icon"
import Reveal from "@/components/terminal/reveal"
import TypedTitle from "@/components/terminal/typed-title"

type HeroSectionProps = {
  onNav: (id: SectionId) => void
  onContact: (reason?: ContactReason) => void
}

export default function HeroSection({ onNav, onContact }: HeroSectionProps) {
  const { language } = useLanguage()
  const titles = useMemo(() => HERO.roles[language], [language])

  const go = (id: SectionId) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onNav(id)
  }

  return (
    <section id="home" className="section hero-section">
      <div className="container">
        <div className="hero-grid">
          <Reveal>
            <TypedTitle prompt={HERO.prompt} prefix={pick(HERO.prefix, language)} titles={titles} />
            <h1 className="hero-headline">{pick(HERO.headline, language)}</h1>
            <p className="hero-sub body-text">{pick(HERO.subtitle, language)}</p>
            <div className="hero-ctas">
              <a className="btn" href="#pulse" onClick={go("pulse")}>
                {pick(HERO.cta.primary, language)} <Icon name="arrow" size={14} />
              </a>
              <button className="btn ghost" onClick={() => onContact()} type="button">
                {pick(HERO.cta.secondary, language)}
              </button>
            </div>
            <p className="hero-status">
              <span>
                <span className="acc">●</span> {pick(HERO.status.open, language)}
              </span>
              <span>{pick(HERO.status.location, language)}</span>
              <span>{pick(HERO.status.response, language)}</span>
            </p>
          </Reveal>

          <Reveal delay={120} className="hero-profile">
            <div className="hero-photo">
              <Image src={PROFILE_PHOTO} alt="Raúl Malagarriga" fill sizes="300px" priority />
            </div>
            <div className="hero-profile-name">
              <p className="name">Raúl Malagarriga</p>
              <p className="role">{pick(HERO.profile.role, language)}</p>
            </div>
            <div className="hero-quick">
              <a href={SOCIAL.github} target="_blank" rel="noreferrer">
                <Icon name="github" size={13} /> github
              </a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={13} /> linkedin
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <dl className="stats">
            {STATS.map((s) => (
              <div key={s.key} className="stat">
                <dt className={`stat-v${s.accent ? " acc" : ""}`}>{s.value}</dt>
                <dd className="stat-k body-text">{pick(s.label, language)}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <div className="facets">
            <p className="cmd-line">
              <span className="acc">$</span> ls ~/raul
            </p>
            <div className="facet-list">
              {FACETS.map((f) => (
                <a key={f.key} className="facet" href={`#${f.target}`} onClick={go(f.target)}>
                  <span className="facet-folder">{pick(f.folder, language)}</span>
                  <span>
                    <span className="facet-title">{pick(f.title, language)}</span>
                    <span className="facet-line body-text">{pick(f.line, language)}</span>
                  </span>
                  <span className="go">{pick(f.linkLabel, language)} →</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
