"use client"

import { useRef, useState, type FormEvent } from "react"
import emailjs from "@emailjs/browser"
import { useLanguage } from "@/contexts/language-context"
import Icon from "@/components/terminal/icon"
import KV from "@/components/terminal/kv"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import SectionHeader from "@/components/terminal/section-header"

type SubmissionStatus = "idle" | "loading" | "success" | "error"

export default function ContactSection() {
  const { t } = useLanguage()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<SubmissionStatus>("idle")

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ""
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ""
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""

    try {
      if (!formRef.current) throw new Error("missing form")
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      setStatus("success")
      setForm({ name: "", email: "", subject: "", message: "" })
      window.setTimeout(() => setStatus("idle"), 4000)
    } catch (err) {
      console.error("Contact send failed:", err)
      setStatus("error")
      window.setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <section id="contact" className="section">
      <span className="sect-ghost" aria-hidden>
        05
      </span>
      <div className="container">
        <Reveal variant="up">
          <SectionHeader
            num="05"
            file="contact.tsx"
            title={t("contact.title")}
            sub={t("contact.sub")}
          />
        </Reveal>

        <div className="contact-grid">
          <Reveal variant="left" delay={80} sweep>
            <Pane
              title={
                <>
                  ./contact/<b>send.sh</b>
                </>
              }
              meta="form"
              hoverable
            >
              <form
                ref={formRef}
                onSubmit={onSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <div className="label">
                      <span className="b">$</span> {t("contact.form.name")}
                    </div>
                    <input
                      className="input"
                      name="name"
                      placeholder={t("contact.form.placeholder.name")}
                      value={form.name}
                      onChange={update("name")}
                      required
                    />
                  </div>
                  <div>
                    <div className="label">
                      <span className="b">$</span> {t("contact.form.email")}
                    </div>
                    <input
                      className="input"
                      name="email"
                      type="email"
                      placeholder={t("contact.form.placeholder.email")}
                      value={form.email}
                      onChange={update("email")}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="label">
                    <span className="b">$</span> {t("contact.form.subject")}
                  </div>
                  <input
                    className="input"
                    name="subject"
                    placeholder={t("contact.form.placeholder.subject")}
                    value={form.subject}
                    onChange={update("subject")}
                    required
                  />
                </div>
                <div>
                  <div className="label">
                    <span className="b">$</span> {t("contact.form.message")}
                  </div>
                  <textarea
                    className="input"
                    name="message"
                    rows={6}
                    placeholder={t("contact.form.placeholder.message")}
                    value={form.message}
                    onChange={update("message")}
                    required
                  />
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <button className="btn" type="submit" disabled={status === "loading"}>
                    <Icon name="send" size={12} />{" "}
                    {status === "loading" ? t("contact.form.sending") : t("contact.form.send")}
                  </button>
                  <span style={{ fontSize: 11.5, color: "var(--ink-dim)" }}>
                    {status === "success" ? (
                      <span style={{ color: "var(--acc)" }}>{t("contact.form.sent")}</span>
                    ) : status === "error" ? (
                      <span style={{ color: "var(--danger)" }}>{t("contact.form.error")}</span>
                    ) : (
                      t("contact.form.idle")
                    )}
                  </span>
                </div>
              </form>
            </Pane>
          </Reveal>

          <Reveal variant="right" delay={140} sweep>
            <Pane
              title={
                <>
                  ./contact/<b>card.tsx</b>
                </>
              }
              meta="info"
              hoverable
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
                <KV k={t("contact.info.email")} v="rjmalagarrigat@gmail.com" />
                <KV k={t("contact.info.linkedin")} v="/in/rjmalagarrigat" />
                <KV k={t("contact.info.github")} v="@raulmalagarriga" />
                <KV k={t("contact.info.timezone")} v={t("contact.info.timezone.value")} />
                <KV k={t("contact.info.languages")} v={t("contact.info.languages.value")} />

                <div
                  style={{
                    marginTop: 8,
                    padding: 14,
                    borderRadius: 8,
                    border: "1px dashed var(--line-2)",
                    background: "rgba(var(--acc-rgb),.03)",
                    color: "var(--ink-mute)",
                    fontSize: 12,
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: "var(--acc)" }}>{t("contact.info.tip.prefix")}</span>{" "}
                  {t("contact.info.tip.body")} <span className="kbd">⌘ K</span>{" "}
                  {t("contact.info.tip.body2")}
                </div>
              </div>
            </Pane>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
