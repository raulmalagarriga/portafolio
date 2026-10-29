"use client"

import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { STACK } from "@/lib/content/stack"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import ScrambleText from "@/components/terminal/scramble-text"

export default function StackSection() {
  const { t, language } = useLanguage()

  return (
    <section id="stack" className="section">
      <div className="container">
        <Reveal>
          <h2 className="sect-h">{t("stack.title")}</h2>
        </Reveal>

        <Reveal delay={80}>
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
