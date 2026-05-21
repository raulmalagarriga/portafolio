"use client"

import { useLanguage } from "@/contexts/language-context"
import { HERO_TITLE_KEYS } from "@/lib/portfolio-data"
import Icon from "@/components/terminal/icon"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import TypedTitle from "@/components/terminal/typed-title"

type HeroSectionProps = {
  onExplore: () => void
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  const { t } = useLanguage()

  const titles = HERO_TITLE_KEYS.map((key) => t(key))

  return (
    <section
      id="home"
      className="section"
      style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}
    >
      <span className="sect-ghost" aria-hidden>
        01
      </span>
      <div className="container hero-drift" style={{ width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "center" }}>
          <Reveal variant="rise" sweep>
            <Pane
              title={
                <>
                  ~/portfolio — <b>hello.tsx</b>
                </>
              }
              meta="● live"
            >
              <TypedTitle prompt={t("hero.prompt")} prefix={t("hero.prefix")} titles={titles} />
              <p
                style={{
                  marginTop: 22,
                  color: "var(--ink-mute)",
                  fontSize: 15,
                  lineHeight: 1.65,
                  maxWidth: 760,
                }}
              >
                {t("hero.intro.welcome")}{" "}
                <span style={{ color: "var(--ink)" }}>{t("hero.intro.backends")}</span>,{" "}
                <span style={{ color: "var(--ink)" }}>{t("hero.intro.frontends")}</span>,{" "}
                {t("hero.intro.and")}{" "}
                <span style={{ color: "var(--ink)" }}>{t("hero.intro.systems")}</span>.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
                <button className="btn" onClick={onExplore} type="button">
                  {t("hero.explore")} <Icon name="arrow" size={13} />
                </button>
                <a
                  className="btn ghost"
                  href="https://github.com/raulmalagarriga"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="github" size={13} /> github
                </a>
                <a
                  className="btn ghost"
                  href="https://www.linkedin.com/in/rjmalagarrigat/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="linkedin" size={13} /> linkedin
                </a>
              </div>
              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  gap: 18,
                  flexWrap: "wrap",
                  fontSize: 11.5,
                  color: "var(--ink-dim)",
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                }}
              >
                <span>
                  <span style={{ color: "var(--acc)" }}>●</span> {t("hero.status.available")}
                </span>
                <span>{t("hero.status.location")}</span>
                <span>{t("hero.status.response")}</span>
              </div>
            </Pane>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
