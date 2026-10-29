"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import emailjs from "@emailjs/browser"
import { useLanguage } from "@/contexts/language-context"
import { pick } from "@/lib/i18n"
import { CONTACT_REASONS, type ContactReason } from "@/lib/content/contact"
import { SOCIAL } from "@/lib/portfolio-data"
import Icon from "@/components/terminal/icon"
import Pane from "@/components/terminal/pane"
import Reveal from "@/components/terminal/reveal"
import Stagger from "@/components/terminal/stagger"
import SectionHeader from "@/components/terminal/section-header"

type SubmissionStatus = "idle" | "loading" | "success" | "error"

type Props = {
  /** Reason preselected by a CTA elsewhere on the page (or by ?reason= in the URL). */
  reason: ContactReason | null
  onReasonChange: (reason: ContactReason) => void
}

const CV_PATH = "/CV-RaulJMalagarriga.pdf"

export default function ContactSection({ reason, onReasonChange }: Props) {
  const { t, language } = useLanguage()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
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
      setForm({ name: "", email: "", message: "" })
      window.setTimeout(() => setStatus("idle"), 4000)
    } catch (err) {
      console.error("Contact send failed:", err)
      setStatus("error")
      window.setTimeout(() => setStatus("idle"), 4000)
    }
  }

  const selected = reason ?? "consulting"
  const selectedLabel = pick(CONTACT_REASONS.find((r) => r.id === selected)!.label, language)

  const rows: { label: string; value: string; href: string; accent?: boolean; download?: boolean }[] = [
    { label: "email", value: SOCIAL.email, href: `mailto:${SOCIAL.email}` },
    { label: "linkedin", value: "in/rjmalagarrigat ↗", href: SOCIAL.linkedin },
    { label: "github", value: "raulmalagarriga ↗", href: SOCIAL.github },
    { label: "blog", value: "medium ↗", href: SOCIAL.medium },
    { label: "cv", value: t("contact.cv"), href: CV_PATH, accent: true, download: true },
  ]

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-grid">
          <Reveal>
            <SectionHeader id="contact" title={t("contact.title")} size="lg" />
            <p className="contact-lead body-text">{t("contact.lead")}</p>
            <Stagger as="ul" className="contact-rows">
              {rows.map((r) => {
                const external = r.href.startsWith("http")
                return (
                  <li key={r.label}>
                    <a
                      href={r.href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      {...(r.download ? { download: true } : {})}
                    >
                      <span className="k">{r.label}</span>
                      <span className={r.accent ? "v acc" : "v"}>{r.value}</span>
                    </a>
                  </li>
                )
              })}
            </Stagger>
          </Reveal>

          <Reveal delay={100}>
            <Pane
              title={
                <>
                  {t("path.contact")}/<b>{t("contact.file")}</b>
                </>
              }
            >
              <form ref={formRef} onSubmit={onSubmit} className="contact-form">
                <fieldset className={`reason-field${flash ? " flash" : ""}`}>
                  <legend className="field-label">{t("contact.form.reason")}</legend>
                  <div className="reason-chips">
                    {CONTACT_REASONS.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        className="chip-btn"
                        aria-pressed={selected === r.id}
                        onClick={() => onReasonChange(r.id)}
                      >
                        {pick(r.label, language)}
                      </button>
                    ))}
                  </div>
                  {/* Sent to the EmailJS template: reason id, its label, and the subject (= label, no visible input). */}
                  <input type="hidden" name="reason" value={selected} />
                  <input type="hidden" name="reason_label" value={selectedLabel} />
                  <input type="hidden" name="subject" value={selectedLabel} />
                </fieldset>
                <div className="contact-2col">
                  <div>
                    <label className="field-label" htmlFor="contact-name">
                      {t("contact.form.name")}
                    </label>
                    <input
                      id="contact-name"
                      className="field"
                      name="name"
                      placeholder={t("contact.form.placeholder.name")}
                      value={form.name}
                      onChange={update("name")}
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="contact-email">
                      {t("contact.form.email")}
                    </label>
                    <input
                      id="contact-email"
                      className="field"
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
                  <label className="field-label" htmlFor="contact-message">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="contact-message"
                    className="field"
                    name="message"
                    rows={5}
                    placeholder={t("contact.form.placeholder.message")}
                    value={form.message}
                    onChange={update("message")}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button className="btn" type="submit" disabled={status === "loading"}>
                    {status === "loading" ? t("contact.form.sending") : t("contact.form.send")} <Icon name="arrow" size={14} />
                  </button>
                  <span className="form-status" role="status" aria-live="polite">
                    {status === "success" ? (
                      <span className="acc">{t("contact.form.sent")}</span>
                    ) : status === "error" ? (
                      <span style={{ color: "var(--danger)" }}>{t("contact.form.error")}</span>
                    ) : null}
                  </span>
                </div>
              </form>
            </Pane>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
