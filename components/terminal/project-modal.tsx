"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import type { ProjectDef } from "@/lib/portfolio-data"
import Icon from "@/components/terminal/icon"

type ProjectModalProps = {
  project: ProjectDef | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLanguage()
  const [i, setI] = useState(0)

  useEffect(() => {
    setI(0)
  }, [project?.key])

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (project.gallery.length > 1) {
        if (e.key === "ArrowRight") setI((v) => (v + 1) % project.gallery.length)
        if (e.key === "ArrowLeft")
          setI((v) => (v - 1 + project.gallery.length) % project.gallery.length)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [project, onClose])

  if (!project) return null

  const name = t(project.nameKey)

  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true" aria-label={name}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="pane-head">
          <div className="tl">
            <span />
            <span />
            <span />
          </div>
          <div className="pane-title">
            ~/projects/<b>{project.key}</b>.md
          </div>
          <div className="pane-meta">readme</div>
          <button
            type="button"
            className="iconbtn"
            style={{ marginLeft: 8 }}
            onClick={onClose}
            title="Close (Esc)"
            aria-label="Close"
          >
            <Icon name="close" size={14} />
          </button>
        </div>
        <div
          style={{
            padding: "18px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            overflow: "auto",
          }}
        >
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div
              className="glyph"
              style={{
                width: 56,
                height: 56,
                fontSize: 20,
                borderRadius: 10,
                display: "grid",
                placeItems: "center",
                background:
                  "linear-gradient(135deg, rgba(var(--acc-rgb),.12), rgba(var(--acc-rgb),.04))",
                border: "1px solid rgba(var(--acc-rgb),.18)",
                color: "var(--acc)",
                fontWeight: 700,
                letterSpacing: ".04em",
              }}
            >
              {project.glyph}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 20, color: "var(--ink)" }}>{name}</h3>
              <div
                style={{
                  color: "var(--ink-mute)",
                  fontSize: 12,
                  marginTop: 4,
                  letterSpacing: ".04em",
                }}
              >
                <span style={{ color: "var(--acc)" }}>$</span> open ./{project.key}
              </div>
            </div>
          </div>

          {project.gallery.length > 0 && (
            <div
              style={{
                position: "relative",
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  aspectRatio: "16/9",
                  position: "relative",
                  background: "#0a0b0e",
                }}
              >
                {project.gallery.map((src, idx) => (
                  <Image
                    key={idx}
                    src={src}
                    alt={`${name} screenshot ${idx + 1}`}
                    fill
                    sizes="(max-width: 820px) 100vw, 820px"
                    style={{
                      objectFit: "cover",
                      opacity: idx === i ? 1 : 0,
                      transition: "opacity .45s ease",
                    }}
                  />
                ))}
              </div>
              {project.gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    className="iconbtn"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 10,
                      transform: "translateY(-50%)",
                    }}
                    onClick={() =>
                      setI((v) => (v - 1 + project.gallery.length) % project.gallery.length)
                    }
                    aria-label="Previous image"
                  >
                    <Icon name="chevronLeft" size={14} />
                  </button>
                  <button
                    type="button"
                    className="iconbtn"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: 10,
                      transform: "translateY(-50%)",
                    }}
                    onClick={() => setI((v) => (v + 1) % project.gallery.length)}
                    aria-label="Next image"
                  >
                    <Icon name="chevronRight" size={14} />
                  </button>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 10,
                      display: "flex",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    {project.gallery.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setI(idx)}
                        aria-label={`Go to image ${idx + 1}`}
                        style={{
                          width: idx === i ? 18 : 6,
                          height: 6,
                          borderRadius: 3,
                          background: idx === i ? "var(--acc)" : "rgba(255,255,255,.25)",
                          border: 0,
                          transition: "all .25s ease",
                          padding: 0,
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <p
            style={{
              margin: 0,
              color: "var(--ink-mute)",
              fontSize: 13,
              lineHeight: 1.65,
            }}
          >
            {t(project.longKey)}
          </p>

          <div>
            <div className="label" style={{ marginBottom: 8 }}>
              <span className="b">$</span> {t("projects.stack")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.tech.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {project.url && (
              <a className="btn" href={project.url} target="_blank" rel="noreferrer">
                <Icon name="external" size={13} /> {t("projects.visit")}
              </a>
            )}
            {project.github && (
              <a className="btn ghost" href={project.github} target="_blank" rel="noreferrer">
                <Icon name="github" size={13} /> {t("projects.source")}
              </a>
            )}
            <button type="button" className="btn ghost" onClick={onClose}>
              {t("projects.close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
