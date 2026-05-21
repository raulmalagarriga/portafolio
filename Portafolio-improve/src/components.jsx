// Reusable building blocks: Pane, ScrambleText, Reveal, SectionTitle, TopBar, StatusBar, CommandPalette, ProjectModal.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ──────────────────────────────────────────────────────────────────────────
// Pane — terminal-window chrome with traffic lights and optional corners
// ──────────────────────────────────────────────────────────────────────────
function Pane({ title, meta, corners = false, hoverable = false, children, className = "", style }) {
  return (
    <div className={`pane ${hoverable ? "hoverable" : ""} ${className}`} style={style}>
      {corners && <><span className="corner tl"></span><span className="corner tr"></span><span className="corner bl"></span><span className="corner br"></span></>}
      {(title || meta) && (
        <div className="pane-head">
          <div className="tl"><span></span><span></span><span></span></div>
          {title && <div className="pane-title">{title}</div>}
          {meta && <div className="pane-meta">{meta}</div>}
        </div>
      )}
      <div className="pane-body">{children}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Reveal on scroll — with directional variants + optional pane sweep
// ──────────────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, variant = "up", sweep = false, as: As = "div", className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true); return;
    }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setShown(true), delay);
        if (sweep) {
          const pane = el.querySelector(".pane") || (el.classList?.contains("pane") ? el : null);
          if (pane) {
            pane.classList.add("sweep");
            setTimeout(() => pane.classList.add("swept"), delay + 60);
          }
        }
        obs.disconnect();
      }
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, sweep]);
  return (
    <As ref={ref} data-rv={variant} className={`reveal ${shown ? "in" : ""} ${className}`}>
      {children}
    </As>
  );
}

// Stagger group — children fade-up in sequence using --i index var
function Stagger({ children, className = "", style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); obs.disconnect(); }
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const kids = React.Children.toArray(children).map((c, i) =>
    React.isValidElement(c)
      ? React.cloneElement(c, { style: { ...(c.props.style || {}), "--i": i } })
      : c
  );
  return <div ref={ref} className={`stagger ${shown ? "in" : ""} ${className}`} style={style}>{kids}</div>;
}

// ──────────────────────────────────────────────────────────────────────────
// ScrambleText — on-mount and on-hover scramble effect
// ──────────────────────────────────────────────────────────────────────────
const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>";
function ScrambleText({ text, duration = 700, trigger = "mount", className = "" }) {
  const [out, setOut] = useState(text);
  const ref = useRef(null);
  const tokRef = useRef(0);

  const run = useCallback(() => {
    const tok = ++tokRef.current;
    const start = performance.now();
    const tick = () => {
      if (tok !== tokRef.current) return;
      const t = Math.min(1, (performance.now() - start) / duration);
      const settle = Math.floor(t * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        if (i < settle || text[i] === " ") s += text[i];
        else s += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setOut(s);
      if (t < 1) requestAnimationFrame(tick);
      else setOut(text);
    };
    tick();
  }, [text, duration]);

  useEffect(() => {
    if (trigger === "mount") run();
  }, [run, trigger]);

  // Re-trigger on each scroll-into-view (toggles when leaving + re-entering)
  useEffect(() => {
    if (trigger !== "scroll") return;
    const el = ref.current; if (!el) return;
    let wasIn = false;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !wasIn) { wasIn = true; run(); }
      else if (!e.isIntersecting) { wasIn = false; }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger, run]);

  const handlers = trigger === "hover" ? { onMouseEnter: run } : {};
  return <span ref={ref} className={className} {...handlers}>{out}</span>;
}

// ──────────────────────────────────────────────────────────────────────────
// Typed headline cycler
// ──────────────────────────────────────────────────────────────────────────
function TypedTitle({ prefix, titles, accentColor }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[idx];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % titles.length);
      return;
    }
    const step = deleting ? 35 : 65;
    const t = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, step);
    return () => clearTimeout(t);
  }, [text, deleting, idx, titles]);

  return (
    <div className="hero-h">
      <div style={{ color: "var(--ink-mute)", fontSize: 13, marginBottom: 14, letterSpacing: ".05em" }}>
        <span style={{ color: "var(--acc)" }}>$</span> whoami --intro
      </div>
      <h1 style={{
        margin: 0, fontWeight: 600, letterSpacing: "-0.02em",
        fontSize: "clamp(28px, 4.6vw, 56px)", lineHeight: 1.12, color: "var(--ink)"
      }}>
        <span style={{ color: "var(--acc)", opacity: 0.85 }}>{prefix}</span>
        <span style={{ color: "var(--ink)" }}>{text}</span>
        <span className="caret"></span>
      </h1>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Top bar
// ──────────────────────────────────────────────────────────────────────────
function TopBar({ sections, active, onNav, onOpenPalette, onCycleAccent, accent }) {
  return (
    <div className="topbar">
      <div className="brand">
        <div className="glyph">R</div>
        <div>
          <span style={{ color: "var(--ink)" }}>raulmalagarriga</span>
          <span style={{ color: "var(--ink-mute)" }}>.dev</span>
        </div>
      </div>

      <nav className="navtabs" aria-label="Sections">
        {sections.map((s) => (
          <button
            key={s.id}
            className={`navtab ${active === s.id ? "active" : ""}`}
            onClick={() => onNav(s.id)}
          >
            <span className="hash">#</span> {s.label}
          </button>
        ))}
      </nav>

      <div className="right">
        <button className="iconbtn" title="Cycle accent color" onClick={onCycleAccent}>
          <Icon name="palette" size={14} />
        </button>
        <button className="iconbtn" title="Open command palette (⌘K)" onClick={onOpenPalette}>
          <Icon name="search" size={14} />
        </button>
        <span className="kbd" style={{ marginLeft: 4 }}>⌘ K</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Status bar (vim/tmux style)
// ──────────────────────────────────────────────────────────────────────────
function StatusBar({ active }) {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);
  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  return (
    <div className="statusbar">
      <div className="mode">NORMAL</div>
      <div><span className="dot"></span> {active}.tsx</div>
      <div className="hide-mobile">utf-8</div>
      <div className="hide-mobile">main</div>
      <div className="spacer"></div>
      <div className="hide-mobile">↑↓ navigate</div>
      <div className="hide-mobile">⌘K palette</div>
      <div>{hh}:{mm}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Command palette
// ──────────────────────────────────────────────────────────────────────────
function CommandPalette({ open, onClose, commands, onRun }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return commands;
    return commands.filter(c => c.label.toLowerCase().includes(s) || c.keywords?.some(k => k.includes(s)));
  }, [q, commands]);

  useEffect(() => { setSel(0); }, [q]);
  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(s + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp")   { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
    else if (e.key === "Enter") {
      const c = filtered[sel];
      if (c) { onRun(c); onClose(); }
    }
  };

  if (!open) return null;
  return (
    <div className="palette-back" onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder="Type a command or jump to a section…" />
        <ul>
          {filtered.length === 0 && <li style={{ opacity: .5 }}>No matches</li>}
          {filtered.map((c, i) => (
            <li key={c.id} className={i === sel ? "sel" : ""} onMouseEnter={() => setSel(i)} onClick={() => { onRun(c); onClose(); }}>
              <span className="ico">{c.glyph || "›"}</span>
              <span>{c.label}</span>
              <span style={{ marginLeft: "auto", color: "var(--ink-dim)", fontSize: 11 }}>{c.hint}</span>
            </li>
          ))}
        </ul>
        <div className="hint">
          <span><span className="kbd">↵</span> run</span>
          <span><span className="kbd">↑↓</span> nav</span>
          <span><span className="kbd">esc</span> close</span>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Project modal (gallery + details)
// ──────────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const [i, setI] = useState(0);
  useEffect(() => { setI(0); }, [project?.key]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (project && project.gallery.length > 1) {
        if (e.key === "ArrowRight") setI((v) => (v + 1) % project.gallery.length);
        if (e.key === "ArrowLeft")  setI((v) => (v - 1 + project.gallery.length) % project.gallery.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="pane-head">
          <div className="tl"><span></span><span></span><span></span></div>
          <div className="pane-title">~/projects/<b>{project.key}</b>.md</div>
          <div className="pane-meta">readme</div>
          <button className="iconbtn" style={{ marginLeft: 8 }} onClick={onClose} title="Close (Esc)">
            <Icon name="close" size={14} />
          </button>
        </div>
        <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 16, overflow: "auto" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div className="proj-card" style={{ background: "none", border: "none", padding: 0 }}>
              <div className="glyph" style={{ width: 56, height: 56, fontSize: 20 }}>{project.glyph}</div>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 20, color: "var(--ink)" }}>{project.name}</h3>
              <div style={{ color: "var(--ink-mute)", fontSize: 12, marginTop: 4, letterSpacing: ".04em" }}>
                <span style={{ color: "var(--acc)" }}>$</span> open ./{project.key}
              </div>
            </div>
          </div>

          {project.gallery.length > 0 && (
            <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: "1px solid var(--line)" }}>
              <div style={{ aspectRatio: "16/9", position: "relative", background: "#0a0b0e" }}>
                {project.gallery.map((src, idx) => (
                  <img key={idx} src={src} alt="" style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                    opacity: idx === i ? 1 : 0, transition: "opacity .45s ease",
                  }} />
                ))}
              </div>
              {project.gallery.length > 1 && (
                <>
                  <button className="iconbtn" style={{ position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)" }}
                    onClick={() => setI((v) => (v - 1 + project.gallery.length) % project.gallery.length)}>
                    <Icon name="chevronLeft" size={14} />
                  </button>
                  <button className="iconbtn" style={{ position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)" }}
                    onClick={() => setI((v) => (v + 1) % project.gallery.length)}>
                    <Icon name="chevronRight" size={14} />
                  </button>
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 10, display: "flex", justifyContent: "center", gap: 6 }}>
                    {project.gallery.map((_, idx) => (
                      <button key={idx} onClick={() => setI(idx)} style={{
                        width: idx === i ? 18 : 6, height: 6, borderRadius: 3,
                        background: idx === i ? "var(--acc)" : "rgba(255,255,255,.25)",
                        border: 0, transition: "all .25s ease",
                      }} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <p style={{ margin: 0, color: "var(--ink-mute)", fontSize: 13, lineHeight: 1.65 }}>{project.long}</p>

          <div>
            <div className="label" style={{ marginBottom: 8 }}><span className="b">$</span> stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {project.url && (
              <a className="btn" href={project.url} target="_blank" rel="noreferrer">
                <Icon name="external" size={13} /> visit
              </a>
            )}
            {project.github && (
              <a className="btn ghost" href={project.github} target="_blank" rel="noreferrer">
                <Icon name="github" size={13} /> source
              </a>
            )}
            <button className="btn ghost" onClick={onClose}>esc / close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  Pane, Reveal, Stagger, ScrambleText, TypedTitle,
  TopBar, StatusBar, CommandPalette, ProjectModal,
});
