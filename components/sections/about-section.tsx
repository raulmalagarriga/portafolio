"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { PROFILE_PHOTO, SKILLS } from "@/lib/portfolio-data"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import SectionHeader from "@/components/terminal/section-header"
import ScrambleText from "@/components/terminal/scramble-text"
import KV from "@/components/terminal/kv"

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="section">
      <span className="sect-ghost" aria-hidden>
        02
      </span>
      <div className="container">
        <Reveal variant="up">
          <SectionHeader num="02" file="about.tsx" title={t("about.title")} sub={t("about.sub")} />
        </Reveal>

        <div className="about-2col">
          <Reveal variant="left" delay={80} sweep>
            <Pane
              title={
                <>
                  ~/about/<b>bio.md</b>
                </>
              }
              meta="read-only"
              hoverable
            >
              <p className="bio-lead">
                {t("about.p1.lead")}{" "}
                <span className="acc">{t("about.name")}</span>
                {t("about.p1.rest")}
              </p>

              <div className="label" style={{ marginTop: 4, marginBottom: 10 }}>
                <span className="b">$</span> {t("about.principles.label")}
              </div>
              <div className="principles">
                <span className="principle">
                  <span className="glyph">◆</span> {t("about.principles.architecture")}
                </span>
                <span className="principle">
                  <span className="glyph">◆</span> {t("about.principles.multitenancy")}
                </span>
                <span className="principle">
                  <span className="glyph">◆</span> {t("about.principles.eventdriven")}
                </span>
                <span className="principle">
                  <span className="glyph">★</span> {t("about.principles.clarity")}
                </span>
                <span className="principle">
                  <span className="glyph">⌘</span> {t("about.principles.docs")}
                </span>
              </div>
            </Pane>
          </Reveal>

          <Reveal variant="right" delay={140} sweep>
            <Pane
              title={
                <>
                  ~/about/<b>profile</b>
                </>
              }
              meta="hex"
              hoverable
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "center" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="hex-wrap" style={{ width: 170, height: 196 }}>
                    <div className="hex-orbit" />
                    <div className="hex-ring">
                      <div className="hex-inner">
                        <Image
                          src={PROFILE_PHOTO}
                          alt={t("about.name")}
                          width={220}
                          height={254}
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12 }}>
                  <KV k={t("about.kv.role")} v={t("about.kv.role.value")} />
                  <KV k={t("about.kv.based")} v={t("about.kv.based.value")} />
                  <KV k={t("about.kv.exp")} v={t("about.kv.exp.value")} />
                  <KV
                    k={t("about.kv.status")}
                    v={
                      <span>
                        <span style={{ color: "var(--acc)" }}>●</span> {t("about.kv.status.value")}
                      </span>
                    }
                  />
                  <KV k={t("about.kv.contact")} v="rjmalagarrigat@gmail.com" />
                </div>
              </div>
            </Pane>
          </Reveal>
        </div>

        <Reveal variant="up" delay={120}>
          <div style={{ marginTop: 18 }}>
            <Pane
              title={
                <>
                  ~/about/<b>stats.json</b>
                </>
              }
              meta="summary"
              hoverable
            >
              <div className="stat-strip">
                <div className="stat-cell">
                  <div className="k">{t("about.stats.years.k")}</div>
                  <div className="v">
                    5<span className="acc">+</span>
                  </div>
                  <div className="sub">{t("about.stats.years.sub")}</div>
                </div>
                <div className="stat-cell">
                  <div className="k">{t("about.stats.projects.k")}</div>
                  <div className="v">{t("about.stats.projects.v")}</div>
                  <div className="sub">{t("about.stats.projects.sub")}</div>
                </div>
                <div className="stat-cell">
                  <div className="k">{t("about.stats.stack.k")}</div>
                  <div className="v">
                    12<span className="small">techs</span>
                  </div>
                  <div className="sub">{t("about.stats.stack.sub")}</div>
                </div>
                <div className="stat-cell">
                  <div className="k">{t("about.stats.reply.k")}</div>
                  <div className="v">
                    &lt;24<span className="small">h</span>
                  </div>
                  <div className="sub">{t("about.stats.reply.sub")}</div>
                </div>
              </div>
            </Pane>
          </div>
        </Reveal>

        <Reveal variant="up" delay={160}>
          <div style={{ marginTop: 22 }}>
            <div className="label" style={{ marginBottom: 12 }}>
              <span className="b">$</span> {t("skills.label")}
            </div>
            <div className="skill-grid">
              {SKILLS.map((cat, i) => (
                <Reveal key={cat.titleKey} variant="rise" delay={80 + i * 70}>
                  <Pane hoverable>
                    <div className="skill-card">
                      <div className="icon">{cat.letter}</div>
                      <h4>{t(cat.titleKey)}</h4>
                      <ul>
                        {cat.items.map((skill) => (
                          <li key={skill}>
                            <span className="b">›</span>{" "}
                            <ScrambleText text={skill} trigger="hover" duration={500} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Pane>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
