"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import emailjs from "@emailjs/browser"
import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { CONTACT_REASONS, type ContactReason } from "@/lib/content/contact"
import { SOCIAL } from "@/lib/portfolio-data"
import Icon from "@/components/terminal/icon"
import KV from "@/components/terminal/kv"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import SectionHeader from "@/components/terminal/section-header"

type SubmissionStatus = "idle" | "loading" | "success" | "error"

type Props = {
  /** Reason preselected by a CTA elsewhere on the page (or by ?reason= in the URL). */
  reason: ContactReason | null
  onReasonChange: (reason: ContactReason) => void
}

export default function ContactSection({ reason, onReasonChange }: Props) {
  const { t, language } = useLanguage()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<SubmissionStatus>("idle")
  const [flash, setFlash] = useState(false)

  // Flash the selector when a CTA preselects a reason so the visitor notices it.
  useEffect(() => {
    if (!reason) return
    setFlash(true)
    const id = window.setTimeout(() => setFlash(false), 1600)
    return () => window.clearTimeout(id)
  }, [reason])

  const update =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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

  const selected = reason ?? "consulting"
  const selectedLabel = pick(CONTACT_REASONS.find((r) => r.id === selected)!.label, language)

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <SectionHeader id="contact" title={t("contact.title")} />
        </Reveal>

        <div className="contact-grid">
          <Reveal delay={80}>
            <Pane
              title={
                <>
                  ./contact/<b>send.sh</b>
                </>
              }
              meta="form"
              hoverable
            >
              <form ref={formRef} onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label className="label" htmlFor="contact-reason">
                    <span className="b">$</span> {t("contact.form.reason")}
                  </label>
                  <select
                    id="contact-reason"
                    className={`input select${flash ? " flash" : ""}`}
                    name="reason"
                    value={selected}
                    onChange={(e) => onReasonChange(e.target.value as ContactReason)}
                  >
                    {CONTACT_REASONS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {pick(r.label, language)}
                      </option>
                    ))}
                  </select>
                  {/* Human-readable copy of the reason for the EmailJS template ({{reason_label}}). */}
                  <input type="hidden" name="reason_label" value={selectedLabel} />
                </div>
                <div className="contact-2col">
                  <div>
                    <label className="label" htmlFor="contact-name">
                      <span className="b">$</span> {t("contact.form.name")}
                    </label>
                    <input
                      id="contact-name"
                      className="input"
                      name="name"
                      placeholder={t("contact.form.placeholder.name")}
                      value={form.name}
                      onChange={update("name")}
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="contact-email">
                      <span className="b">$</span> {t("contact.form.email")}
                    </label>
                    <input
                      id="contact-email"
                      className="input"
                      name="email"
                      type="email"
                      placeholder={t("contact.form.placeholder.email")}
                      value={form.email}
                      onChange={update("email")}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="contact-subject">
                    <span className="b">$</span> {t("contact.form.subject")}
                  </label>
                  <input
                    id="contact-subject"
                    className="input"
                    name="subject"
                    placeholder={t("contact.form.placeholder.subject")}
                    value={form.subject}
                    onChange={update("subject")}
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="contact-message">
                    <span className="b">$</span> {t("contact.form.message")}
                  </label>
                  <textarea
                    id="contact-message"
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
                    <Icon name="send" size={12} /> {status === "loading" ? t("contact.form.sending") : t("contact.form.send")}
                  </button>
                  <span style={{ fontSize: 11.5, color: "var(--ink-dim)" }} role="status" aria-live="polite">
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

          <Reveal delay={140}>
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
                <KV k={t("contact.info.email")} v={<a className="footer-link" href={`mailto:${SOCIAL.email}`}>{SOCIAL.email}</a>} />
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
                  <span style={{ color: "var(--acc)" }}>{t("contact.info.tip.prefix")}</span> {t("contact.info.tip.body")}{" "}
                  <span className="kbd">⌘ K</span> {t("contact.info.tip.body2")}
                </div>
              </div>
            </Pane>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
