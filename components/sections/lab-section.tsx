"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { LAB, LAB_INTRO } from "@/lib/content/lab"
import Icon from "@/components/terminal/icon"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"

export default function LabSection() {
  const { t, language } = useLanguage()

  return (
    <section id="lab" className="section">
      <div className="container">
        <Reveal>
          <h2 className="sect-h">{t("lab.title")}</h2>
        </Reveal>

        <div className="lab-grid">
          {LAB.map((p, i) => (
            <Reveal key={p.key} delay={80 + i * 80}>
              <Pane
                hoverable
                title={
                  <>
                    ./lab/<b>{p.key}</b>
                  </>
                }
                meta="side project"
              >
                <div className="lab-card">
                  <div className="lab-thumb">
                    <Image src={p.cover} alt={p.name} width={160} height={100} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                  </div>
                  <div className="lab-text">
                    <h3>
                      <span className="glyph">{p.glyph}</span> {p.name}
                    </h3>
                    <p>{pick(p.summary, language)}</p>
                    <div className="chips" style={{ marginTop: 8 }}>
                      {p.tech.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="lab-actions">
                      {p.url && (
                        <a href={p.url} target="_blank" rel="noreferrer">
                          <Icon name="external" size={11} /> {t("common.visit")}
                        </a>
                      )}
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer">
                          <Icon name="github" size={11} /> {t("common.source")}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Pane>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
