"use client"

import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { STACK } from "@/lib/content/stack"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import ScrambleText from "@/components/terminal/scramble-text"
import SectionHeader from "@/components/terminal/section-header"

export default function StackSection() {
  const { t, language } = useLanguage()

  return (
    <section id="stack" className="section">
      <span className="sect-ghost" aria-hidden>
        08
      </span>
      <div className="container">
        <Reveal variant="up">
          <SectionHeader num="08" file="stack.tsx" title={t("stack.title")} sub={t("stack.sub")} />
        </Reveal>

        <Reveal variant="rise" delay={80} sweep>
          <Pane
            title={
              <>
                ~/<b>stack</b>
              </>
            }
            meta={t("stack.label")}
            hoverable
          >
            <div className="stack-rows">
              {STACK.map((cat) => (
                <div key={cat.key} className="stack-row">
                  <div className="stack-cat">
                    <span className="icon">{cat.letter}</span>
                    <span>{pick(cat.title, language)}</span>
                  </div>
                  <div className="chips">
                    {cat.items.map((item) => (
                      <span key={item} className="tag">
                        <ScrambleText text={item} trigger="hover" duration={450} />
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Pane>
        </Reveal>
      </div>
    </section>
  )
}
