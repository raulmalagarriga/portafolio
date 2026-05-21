"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { PROJECTS, type ProjectDef } from "@/lib/portfolio-data"
import Icon from "@/components/terminal/icon"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import ScrambleText from "@/components/terminal/scramble-text"
import SectionHeader from "@/components/terminal/section-header"

type ProjectsSectionProps = {
  onOpen: (project: ProjectDef) => void
}

export default function ProjectsSection({ onOpen }: ProjectsSectionProps) {
  const { t } = useLanguage()

  return (
    <section id="projects" className="section">
      <span className="sect-ghost" aria-hidden>
        03
      </span>
      <div className="container">
        <Reveal variant="up">
          <SectionHeader
            num="03"
            file="projects.tsx"
            title={t("projects.title")}
            sub={t("projects.sub")}
          />
        </Reveal>

        <div className="proj-grid">
          {PROJECTS.map((p, i) => {
            const name = t(p.nameKey)
            return (
              <Reveal key={p.key} variant={i % 2 === 0 ? "left" : "right"} delay={80 + i * 90} sweep>
                <Pane
                  hoverable
                  className="proj-card"
                  title={
                    <>
                      ./<b>{p.key}</b>
                    </>
                  }
                  meta="readme"
                >
                  <div className="body">
                    <div className="top">
                      <div className="glyph">{p.glyph}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3>
                          <ScrambleText text={name} trigger="hover" duration={650} />
                        </h3>
                        <p className="desc">{t(p.summaryKey)}</p>
                      </div>
                    </div>

                    {p.cover && (
                      <button
                        type="button"
                        className="preview"
                        onClick={() => onOpen(p)}
                        aria-label={`Open ${name}`}
                        style={{ padding: 0, border: "1px solid var(--line)" }}
                      >
                        <Image
                          src={p.cover}
                          alt={name}
                          width={520}
                          height={120}
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                        />
                      </button>
                    )}

                    <div className="meta">
                      {p.tech.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="actions">
                      <button type="button" onClick={() => onOpen(p)}>
                        <Icon name="terminal" size={12} /> {t("projects.openDetails")}
                      </button>
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icon name="external" size={12} /> {t("projects.visit")}
                        </a>
                      )}
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icon name="github" size={12} /> {t("projects.source")}
                        </a>
                      )}
                    </div>
                  </div>
                </Pane>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
