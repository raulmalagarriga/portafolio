"use client"

import { useLanguage } from "@/contexts/language-context"
import { LINKS } from "@/lib/portfolio-data"
import Icon from "@/components/terminal/icon"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import SectionHeader from "@/components/terminal/section-header"

export default function LinksSection() {
  const { t } = useLanguage()

  return (
    <section id="links" className="section">
      <span className="sect-ghost" aria-hidden>
        04
      </span>
      <div className="container">
        <Reveal variant="up">
          <SectionHeader num="04" file="links.tsx" title={t("links.title")} sub={t("links.sub")} />
        </Reveal>

        <div className="links-grid">
          {LINKS.map((link, i) => {
            const isResume = link.key === "resume"
            const linkProps = isResume
              ? { href: link.url, download: true }
              : { href: link.url, target: "_blank", rel: "noreferrer" }
            return (
              <Reveal key={link.key} variant="scale" delay={80 + i * 80}>
                <a {...linkProps} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <Pane hoverable>
                    <div className="link-card">
                      <div className="icon-wrap">
                        <Icon name={link.icon} size={16} />
                      </div>
                      <h4>{t(`links.${link.key}.name`)}</h4>
                      <p>{t(`links.${link.key}.desc`)}</p>
                      <div className="arrow">
                        {t("links.open")} <Icon name="arrow" size={11} />
                      </div>
                    </div>
                  </Pane>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
