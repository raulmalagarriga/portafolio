// Main App — wires sections, command palette, keyboard nav, accent cycling, status bar, tweaks.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "green",
  "scanlines": true,
  "noise": true,
  "density": "comfortable",
  "background": "mesh",
  "scrollFx": "full"
}/*EDITMODE-END*/;

const ACCENTS = ["green", "amber", "cyan", "magenta", "white"];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = React.useState("home");
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [project, setProject] = React.useState(null);

  // Apply accent to body
  React.useEffect(() => {
    document.body.setAttribute("data-accent", t.accent || "green");
  }, [t.accent]);

  // Toggle scanlines / noise via tweaks
  React.useEffect(() => {
    const sl = document.getElementById("scanlines");
    if (sl) sl.style.display = t.scanlines ? "" : "none";
    const nz = document.querySelector(".noise");
    if (nz) nz.style.display = t.noise ? "" : "none";
  }, [t.scanlines, t.noise]);

  // Density spacing
  React.useEffect(() => {
    const map = { compact: "44px", comfortable: "64px", spacious: "92px" };
    document.documentElement.style.setProperty("--section-pad", map[t.density] || "64px");
  }, [t.density]);

  // Background variant
  React.useEffect(() => {
    const grid = document.querySelector(".bg-grid");
    const dots = document.querySelector(".bg-dots");
    const mesh = document.querySelector(".bg-mesh");
    if (!grid || !dots || !mesh) return;
    grid.style.display = t.background === "grid" || t.background === "mesh" ? "" : "none";
    dots.style.display = t.background === "dots" || t.background === "mesh" ? "" : "none";
    mesh.style.display = t.background === "none" ? "none" : "";
  }, [t.background]);

  // ── Scroll-driven effects: progress bar, parallax, ghost numbers, velocity blur
  React.useEffect(() => {
    if (t.scrollFx === "off") {
      document.documentElement.style.setProperty("--sp", 0);
      document.querySelectorAll(".parallax").forEach(el => { el.style.transform = ""; });
      document.querySelectorAll(".sect-ghost").forEach(el => { el.style.transform = ""; });
      const sp = document.getElementById("scrollProgress");
      if (sp) sp.style.opacity = 0;
      return;
    }
    const sp = document.getElementById("scrollProgress");
    if (sp) sp.style.opacity = 1;

    const parallaxNodes = Array.from(document.querySelectorAll(".parallax"));
    const ghosts = Array.from(document.querySelectorAll(".sect-ghost"));
    const heroDrift = document.querySelector(".hero-drift");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimal = t.scrollFx === "minimal" || reduced;

    let raf = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let fastTimer = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const sp01 = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;
      document.documentElement.style.setProperty("--sp", sp01.toFixed(4));

      // velocity
      const now = performance.now();
      const dy = Math.abs(y - lastY);
      const dt = Math.max(1, now - lastT);
      const vel = dy / dt; // px/ms
      lastY = y; lastT = now;
      if (!minimal && vel > 2.5) {
        document.body.classList.add("scrolling-fast");
        clearTimeout(fastTimer);
        fastTimer = setTimeout(() => document.body.classList.remove("scrolling-fast"), 180);
      }

      // parallax background layers
      if (!minimal) {
        for (const n of parallaxNodes) {
          const rate = parseFloat(n.dataset.parallax || "0");
          n.style.transform = `translate3d(0, ${(y * rate).toFixed(1)}px, 0)`;
        }
      }

      // ghost section numbers — slide upward relative to scroll
      for (const g of ghosts) {
        const rect = g.parentElement.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        const off = minimal ? center * -0.04 : center * -0.18;
        g.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
      }

      // hero drift
      if (heroDrift && !minimal) {
        heroDrift.style.setProperty("--hero-y", `${(-y * 0.12).toFixed(1)}px`);
        heroDrift.style.opacity = Math.max(0, 1 - y / 700).toFixed(2);
      }
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(fastTimer);
    };
  }, [t.scrollFx, t.background]);

  // Scroll-spy active section
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.35) setActive(e.target.id);
      });
    }, { threshold: [0.2, 0.4, 0.6] });
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const onNav = React.useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }, []);

  // Global keyboard: ⌘K palette, ⌘1..5 sections
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setPaletteOpen((v) => !v); return;
      }
      if ((e.metaKey || e.ctrlKey) && /^[1-5]$/.test(e.key)) {
        e.preventDefault();
        const s = SECTIONS[Number(e.key) - 1];
        if (s) onNav(s.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNav]);

  const cycleAccent = React.useCallback(() => {
    const i = ACCENTS.indexOf(t.accent || "green");
    const next = ACCENTS[(i + 1) % ACCENTS.length];
    setTweak("accent", next);
  }, [t.accent, setTweak]);

  // Command palette items
  const commands = React.useMemo(() => ([
    ...SECTIONS.map(s => ({ id: "go:" + s.id, label: "Go to " + s.label, hint: "section", glyph: "›", action: () => onNav(s.id) })),
    { id: "accent:green",   label: "Accent → matrix green",   hint: "theme", glyph: "◆", action: () => setTweak("accent", "green") },
    { id: "accent:amber",   label: "Accent → sunset amber",   hint: "theme", glyph: "◆", action: () => setTweak("accent", "amber") },
    { id: "accent:cyan",    label: "Accent → ice cyan",       hint: "theme", glyph: "◆", action: () => setTweak("accent", "cyan") },
    { id: "accent:magenta", label: "Accent → plasma magenta", hint: "theme", glyph: "◆", action: () => setTweak("accent", "magenta") },
    { id: "accent:white",   label: "Accent → mono white",     hint: "theme", glyph: "◆", action: () => setTweak("accent", "white") },
    { id: "toggle:scanlines", label: (t.scanlines ? "Disable" : "Enable") + " CRT scanlines", hint: "fx", glyph: "▤", action: () => setTweak("scanlines", !t.scanlines) },
    { id: "toggle:noise",     label: (t.noise ? "Disable" : "Enable") + " film grain",          hint: "fx", glyph: "▒", action: () => setTweak("noise", !t.noise) },
    { id: "ext:github",   label: "Open GitHub",   hint: "external", glyph: "↗", action: () => window.open("https://github.com/raulmalagarriga", "_blank") },
    { id: "ext:linkedin", label: "Open LinkedIn", hint: "external", glyph: "↗", action: () => window.open("https://www.linkedin.com/in/rjmalagarrigat/", "_blank") },
    { id: "ext:email",    label: "Email Raúl",    hint: "external", glyph: "✉", action: () => window.location.href = "mailto:rjmalagarrigat@gmail.com" },
  ]), [t, setTweak, onNav]);

  return (
    <>
      <TopBar
        sections={SECTIONS}
        active={active}
        onNav={onNav}
        onOpenPalette={() => setPaletteOpen(true)}
        onCycleAccent={cycleAccent}
        accent={t.accent}
      />

      <main className="app">
        <HeroSection onExplore={() => onNav("about")} />
        <AboutSection />
        <ProjectsSection onOpen={setProject} />
        <LinksSection />
        <ContactSection />
        <FooterSection />
      </main>

      <StatusBar active={active} />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
        onRun={(c) => c.action()}
      />

      {project && <ProjectModal project={project} onClose={() => setProject(null)} />}

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakColor label="Accent"
                    value={t.accent}
                    options={["#4ade80", "#fbbf24", "#22d3ee", "#e879f9", "#e5e7eb"]}
                    onChange={(hex) => {
                      const map = { "#4ade80": "green", "#fbbf24": "amber", "#22d3ee": "cyan", "#e879f9": "magenta", "#e5e7eb": "white" };
                      setTweak("accent", map[hex] || "green");
                    }}
        />

        <TweakSection label="Background" />
        <TweakRadio label="Style"
                    value={t.background}
                    options={["mesh", "grid", "dots", "none"]}
                    onChange={(v) => setTweak("background", v)}
        />
        <TweakToggle label="Scanlines"   value={t.scanlines} onChange={(v) => setTweak("scanlines", v)} />
        <TweakToggle label="Film grain"  value={t.noise}     onChange={(v) => setTweak("noise", v)} />

        <TweakSection label="Layout" />
        <TweakRadio label="Density"
                    value={t.density}
                    options={["compact", "comfortable", "spacious"]}
                    onChange={(v) => setTweak("density", v)}
        />

        <TweakSection label="Scroll FX" />
        <TweakRadio label="Intensity"
                    value={t.scrollFx}
                    options={["off", "minimal", "full"]}
                    onChange={(v) => setTweak("scrollFx", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
