"use client"

import { useMemo } from "react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { PROFILE_PHOTO, SKILLS, makeHeatmap } from "@/lib/portfolio-data"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import SectionHeader from "@/components/terminal/section-header"
import ScrambleText from "@/components/terminal/scramble-text"
import KV from "@/components/terminal/kv"

export default function AboutSection() {
  const { t } = useLanguage()
  const heat = useMemo(() => makeHeatmap(26, 7, 7), [])

  return (
    <section id="about" className="section">
      <span className="sect-ghost" aria-hidden>
        02
      </span>
      <div className="container">
        <Reveal variant="up">
          <SectionHeader num="02" file="about.tsx" title={t("about.title")} sub={t("about.sub")} />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
          <div style={{ display: "grid", gap: 18, gridTemplateColumns: "1fr" }}>
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
                <div>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--ink-mute)",
                      fontSize: 13.5,
                      lineHeight: 1.7,
                    }}
                  >
                    {t("about.p1.lead")}{" "}
                    <span style={{ color: "var(--ink)", fontWeight: 600 }}>{t("about.name")}</span>
                    {t("about.p1.rest")}
                  </p>
                  <p
                    style={{
                      marginTop: 14,
                      color: "var(--ink-mute)",
                      fontSize: 13.5,
                      lineHeight: 1.7,
                    }}
                  >
                    {t("about.p2")}
                  </p>

                  <div style={{ marginTop: 22 }}>
                    <div className="label" style={{ marginBottom: 10 }}>
                      <span className="b">$</span> {t("about.activity.label")}
                    </div>
                    <div className="heatmap" aria-hidden>
                      {heat.map((lvl, idx) => (
                        <div key={idx} className={`heat-cell${lvl ? " l" + lvl : ""}`} />
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        marginTop: 8,
                        fontSize: 10.5,
                        color: "var(--ink-dim)",
                        alignItems: "center",
                      }}
                    >
                      <span>{t("about.activity.less")}</span>
                      <span
                        className="heat-cell"
                        style={{ width: 12, height: 12, display: "inline-block", aspectRatio: "auto" }}
                      />
                      <span
                        className="heat-cell l1"
                        style={{ width: 12, height: 12, display: "inline-block", aspectRatio: "auto" }}
                      />
                      <span
                        className="heat-cell l2"
                        style={{ width: 12, height: 12, display: "inline-block", aspectRatio: "auto" }}
                      />
                      <span
                        className="heat-cell l3"
                        style={{ width: 12, height: 12, display: "inline-block", aspectRatio: "auto" }}
                      />
                      <span
                        className="heat-cell l4"
                        style={{ width: 12, height: 12, display: "inline-block", aspectRatio: "auto" }}
                      />
                      <span>{t("about.activity.more")}</span>
                    </div>
                  </div>
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
                <div className="profile-row">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="hex-wrap">
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
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 12.5 }}>
                    <KV k={t("about.kv.name")} v={t("about.name")} />
                    <KV k={t("about.kv.role")} v={t("about.kv.role.value")} />
                    <KV k={t("about.kv.exp")} v={t("about.kv.exp.value")} />
                    <KV k={t("about.kv.focus")} v={t("about.kv.focus.value")} />
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

          <Reveal variant="up" delay={160}>
            <div style={{ marginTop: 6 }}>
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
      </div>
    </section>
  )
}
