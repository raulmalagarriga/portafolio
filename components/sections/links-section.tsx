"use client"

import { useLanguage } from "@/contexts/language-context"
import { LINKS } from "@/lib/portfolio-data"
import Icon from "@/components/terminal/icon"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"

export default function LinksSection() {
  const { t } = useLanguage()

  return (
    <section id="links" className="section">
      <div className="container">
        <Reveal>
          <h2 className="sect-h">{t("links.title")}</h2>
        </Reveal>

        <div className="links-grid">
          {LINKS.map((link, i) => {
            const linkProps = { href: link.url, target: "_blank", rel: "noreferrer" }
            return (
              <Reveal key={link.key} delay={80 + i * 80}>
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
