// Section components: Hero, About, Projects, Links, Contact, Footer.

const HeroSection = ({ onExplore }) => (
  <section id="home" className="section" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
    <span className="sect-ghost" aria-hidden>01</span>
    <div className="container hero-drift" style={{ width: "100%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "center" }}>
        <Reveal variant="rise" sweep>
          <Pane title={<>~/portfolio — <b>hello.tsx</b></>} meta="● live">
            <TypedTitle prefix="Hello World. I am a " titles={TITLES} />
            <p style={{ marginTop: 22, color: "var(--ink-mute)", fontSize: 15, lineHeight: 1.65, maxWidth: 760 }}>
              Welcome to my portfolio. Got an idea? Let's bring it to life with well-crafted technology,
              built to grow. I design <span style={{ color: "var(--ink)" }}>reliable backends</span>,{" "}
              <span style={{ color: "var(--ink)" }}>cohesive frontends</span>, and{" "}
              <span style={{ color: "var(--ink)" }}>thoughtful systems</span>.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <button className="btn" onClick={onExplore}>
                explore <Icon name="arrow" size={13} />
              </button>
              <a className="btn ghost" href="https://github.com/raulmalagarriga" target="_blank" rel="noreferrer">
                <Icon name="github" size={13} /> github
              </a>
              <a className="btn ghost" href="https://www.linkedin.com/in/rjmalagarrigat/" target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={13} /> linkedin
              </a>
            </div>
            <div style={{
              marginTop: 28, display: "flex", gap: 18, flexWrap: "wrap",
              fontSize: 11.5, color: "var(--ink-dim)", letterSpacing: ".06em", textTransform: "uppercase"
            }}>
              <span><span style={{ color: "var(--acc)" }}>●</span> available for work</span>
              <span>based in venezuela 🌎</span>
              <span>response &lt; 24h</span>
            </div>
          </Pane>
        </Reveal>
      </div>
    </div>
  </section>
);

// ────────────────────────────────────────────────────────────────────────────
const AboutSection = () => {
  const heat = window.__heat || (window.__heat = makeHeatmap(26, 7, 7));
  return (
    <section id="about" className="section">
      <span className="sect-ghost" aria-hidden>02</span>
      <div className="container">
        <Reveal variant="up">
          <SectionHeader num="02" file="about.tsx" title="About me" sub="A look at who I am and how I work" />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 18 }}>
            <div className="about-grid" style={{ display: "grid", gap: 18, gridTemplateColumns: "1fr" }}>
              <Reveal variant="left" delay={80} sweep>
                <Pane title={<>~/about/<b>bio.md</b></>} meta="read-only" hoverable>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 22, alignItems: "center" }}>
                    <div className="bio-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
                      <div>
                        <p style={{ margin: 0, color: "var(--ink-mute)", fontSize: 13.5, lineHeight: 1.7 }}>
                          Hi! I'm <span style={{ color: "var(--ink)", fontWeight: 600 }}>Raúl Malagarriga</span>, a software development
                          professional with a strong focus on building reliable, efficient solutions aligned with each client's goals.
                          I'm passionate about understanding how things work, designing clean structures, and creating systems that
                          truly make an impact.
                        </p>
                        <p style={{ marginTop: 14, color: "var(--ink-mute)", fontSize: 13.5, lineHeight: 1.7 }}>
                          I consider myself a problem-solver, detail-oriented, and highly collaborative. I value clear communication
                          and proper documentation as essential tools for any project's success. My goal is always to bring real value
                          through technology.
                        </p>

                        <div style={{ marginTop: 22 }}>
                          <div className="label" style={{ marginBottom: 10 }}>
                            <span className="b">$</span> git log --activity --last=26w
                          </div>
                          <div className="heatmap" aria-hidden>
                            {heat.map((lvl, idx) => (
                              <div key={idx} className={`heat-cell ${lvl ? "l" + lvl : ""}`} />
                            ))}
                          </div>
                          <div style={{ display: "flex", gap: 10, marginTop: 8, fontSize: 10.5, color: "var(--ink-dim)", alignItems: "center" }}>
                            <span>less</span>
                            <span className="heat-cell" style={{ width: 12, height: 12, display: "inline-block" }}></span>
                            <span className="heat-cell l1" style={{ width: 12, height: 12, display: "inline-block" }}></span>
                            <span className="heat-cell l2" style={{ width: 12, height: 12, display: "inline-block" }}></span>
                            <span className="heat-cell l3" style={{ width: 12, height: 12, display: "inline-block" }}></span>
                            <span className="heat-cell l4" style={{ width: 12, height: 12, display: "inline-block" }}></span>
                            <span>more</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Pane>
              </Reveal>

              <Reveal variant="right" delay={140} sweep>
                <Pane title={<>~/about/<b>profile</b></>} meta="hex" hoverable>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div className="hex-wrap">
                        <div className="hex-orbit"></div>
                        <div className="hex-ring">
                          <div className="hex-inner">
                            <img src="assets/profile-photo.png" alt="Raúl Malagarriga" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 12.5 }}>
                      <KV k="name"     v="Raúl Malagarriga" />
                      <KV k="role"     v="Fullstack / Architect" />
                      <KV k="exp"      v="5+ years building production systems" />
                      <KV k="focus"    v="reliability · scale · clarity" />
                      <KV k="status"   v={<span><span style={{ color: "var(--acc)" }}>●</span> available</span>} />
                      <KV k="contact"  v="rjmalagarrigat@gmail.com" />
                    </div>
                  </div>
                </Pane>
              </Reveal>
            </div>
          </div>

          <Reveal variant="up" delay={160}>
            <div style={{ marginTop: 6 }}>
              <div className="label" style={{ marginBottom: 12 }}><span className="b">$</span> ls ./skills</div>
              <div className="skill-grid">
                {SKILLS.map((cat, i) => (
                  <Reveal key={cat.title} variant="rise" delay={80 + i * 70}>
                    <Pane hoverable className="skill-card-wrap">
                      <div className="skill-card">
                        <div className="icon">{cat.letter}</div>
                        <h4>{cat.title}</h4>
                        <ul>
                          {cat.items.map((s) => (
                            <li key={s}><span className="b">›</span> <ScrambleText text={s} trigger="hover" duration={500} /></li>
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
  );
};

const KV = ({ k, v }) => (
  <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 10, alignItems: "baseline" }}>
    <span style={{ color: "var(--ink-dim)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em" }}>{k}</span>
    <span style={{ color: "var(--ink)" }}>{v}</span>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
const ProjectsSection = ({ onOpen }) => (
  <section id="projects" className="section">
    <span className="sect-ghost" aria-hidden>03</span>
    <div className="container">
      <Reveal variant="up">
        <SectionHeader num="03" file="projects.tsx" title="Selected projects" sub="A few things I've built end-to-end" />
      </Reveal>
      <div className="proj-grid">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.key} variant={i % 2 === 0 ? "left" : "right"} delay={80 + i * 90} sweep>
            <Pane hoverable className="proj-card" title={<>./<b>{p.key}</b></>} meta="readme">
              <div className="body">
                <div className="top">
                  <div className="glyph">{p.glyph}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3><ScrambleText text={p.name} trigger="hover" duration={650} /></h3>
                    <p className="desc">{p.summary}</p>
                  </div>
                </div>

                {p.cover && (
                  <div className="preview" onClick={() => onOpen(p)} style={{ cursor: "default" }}>
                    <img src={p.cover} alt={p.name} />
                  </div>
                )}

                <div className="meta">
                  {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>

                <div className="actions">
                  <a onClick={(e) => { e.preventDefault(); onOpen(p); }} href="#">
                    <Icon name="terminal" size={12} /> open details
                  </a>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                      <Icon name="external" size={12} /> visit
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                      <Icon name="github" size={12} /> source
                    </a>
                  )}
                </div>
              </div>
            </Pane>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ────────────────────────────────────────────────────────────────────────────
const LinksSection = () => (
  <section id="links" className="section">
    <span className="sect-ghost" aria-hidden>04</span>
    <div className="container">
      <Reveal variant="up">
        <SectionHeader num="04" file="links.tsx" title="Profiles" sub="Where to find me" />
      </Reveal>
      <div className="links-grid">
        {LINKS.map((l, i) => (
          <Reveal key={l.name} variant="scale" delay={80 + i * 80}>
            <a href={l.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
              <Pane hoverable className="link-card-wrap">
                <div className="link-card">
                  <div className="icon-wrap"><Icon name={l.icon} size={16} /></div>
                  <h4>{l.name}</h4>
                  <p>{l.desc}</p>
                  <div className="arrow">open <Icon name="arrow" size={11} /></div>
                </div>
              </Pane>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ────────────────────────────────────────────────────────────────────────────
const ContactSection = () => {
  const [form, setForm] = React.useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = React.useState(false);
  const onChange = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const onSubmit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3500); setForm({ name: "", email: "", subject: "", message: "" }); };

  return (
    <section id="contact" className="section">
      <span className="sect-ghost" aria-hidden>05</span>
      <div className="container">
        <Reveal variant="up">
          <SectionHeader num="05" file="contact.tsx" title="Let's build something" sub="Drop me a line and I'll get back to you" />
        </Reveal>

        <div className="contact-grid">
          <Reveal variant="left" delay={80} sweep>
            <Pane title={<>./contact/<b>send.sh</b></>} meta="form" hoverable>
              <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <div className="label"><span className="b">$</span> name</div>
                    <input className="input" placeholder="Ada Lovelace" value={form.name} onChange={onChange("name")} required />
                  </div>
                  <div>
                    <div className="label"><span className="b">$</span> email</div>
                    <input className="input" type="email" placeholder="ada@example.com" value={form.email} onChange={onChange("email")} required />
                  </div>
                </div>
                <div>
                  <div className="label"><span className="b">$</span> subject</div>
                  <input className="input" placeholder="A project I'd love your eyes on…" value={form.subject} onChange={onChange("subject")} required />
                </div>
                <div>
                  <div className="label"><span className="b">$</span> message</div>
                  <textarea className="input" rows={6} placeholder="Tell me a bit about it." value={form.message} onChange={onChange("message")} required />
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <button className="btn" type="submit">
                    <Icon name="send" size={12} /> send
                  </button>
                  <span style={{ fontSize: 11.5, color: "var(--ink-dim)" }}>
                    {sent ? <span style={{ color: "var(--acc)" }}>✓ sent — I'll reply soon</span> : "encrypted in transit · response under 24h"}
                  </span>
                </div>
              </form>
            </Pane>
          </Reveal>

          <Reveal variant="right" delay={140} sweep>
            <Pane title={<>./contact/<b>card.tsx</b></>} meta="info" hoverable>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
                <KV k="email"    v="rjmalagarrigat@gmail.com" />
                <KV k="linkedin" v="/in/rjmalagarrigat" />
                <KV k="github"   v="@raulmalagarriga" />
                <KV k="timezone" v="UTC−4 (Caracas)" />
                <KV k="languages" v="Español · English" />

                <div style={{ marginTop: 8, padding: 14, borderRadius: 8, border: "1px dashed var(--line-2)", background: "rgba(var(--acc-rgb),.03)", color: "var(--ink-mute)", fontSize: 12, lineHeight: 1.6 }}>
                  <span style={{ color: "var(--acc)" }}>tip:</span> hit{" "}
                  <span className="kbd">⌘ K</span> from anywhere to jump to a section,
                  switch theme, or contact me.
                </div>
              </div>
            </Pane>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────────────────────────────────
const SectionHeader = ({ num, file, title, sub }) => (
  <div style={{ marginBottom: 24 }}>
    <div className="sect-title">
      <span className="num">{num}</span>
      <span>—</span>
      <span style={{ color: "var(--ink-mute)" }}>~/<span style={{ color: "var(--ink)" }}>{file}</span></span>
      <span className="bar"></span>
    </div>
    <h2 className="sect-h"><ScrambleText text={title} duration={750} trigger="scroll" /></h2>
    {sub && <p className="sect-sub">{sub}</p>}
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
const FooterSection = () => (
  <footer style={{ borderTop: "1px solid var(--line)", padding: "28px 0 60px", textAlign: "center", color: "var(--ink-dim)", fontSize: 11.5 }}>
    <div className="container">
      <div>
        <span style={{ color: "var(--acc)" }}>$</span> designed &amp; built by{" "}
        <span style={{ color: "var(--ink)" }}>Raúl Malagarriga</span> · © {new Date().getFullYear()}
      </div>
      <div style={{ marginTop: 6, opacity: .7 }}>handcrafted html · zero dependencies in production</div>
    </div>
  </footer>
);

Object.assign(window, { HeroSection, AboutSection, ProjectsSection, LinksSection, ContactSection, FooterSection });
