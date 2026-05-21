# Handoff — Portfolio "Modern Terminal" Refresh

## Overview

Este handoff documenta una renovación visual del portafolio existente en `portafolio/`
(Next.js 14 + Tailwind + shadcn/ui). El objetivo es **mantener la estética
terminal/consola**, pero modernizarla con:

- Tipografía mono más refinada (JetBrains Mono en lugar de Courier New)
- Cromado de ventana de terminal (traffic lights + título de pane) en cada tarjeta
- Background ambiental con grid + dots + gradient mesh + parallax en scroll
- Sistema de animaciones on-scroll (revelados direccionales, light-sweep, ghost numbers, scramble re-trigger)
- Top bar tipo VS Code / Warp con tabs + command palette (⌘K)
- Status bar tipo vim/tmux en el footer fijo
- Heatmap de actividad estilo GitHub en About
- Acentos de color intercambiables (verde matrix, amber, cyan, magenta, white) — ya tenías el sistema, sólo se amplía

## About the design files

Los archivos en `design_reference/` son **prototipos HTML/React puros** creados
como referencia visual y de comportamiento. **No son código de producción para
copiar directamente.** El trabajo es recrear estas pantallas dentro del codebase
existente (`portafolio/`) usando sus patrones ya establecidos:

- Next.js App Router (`app/page.tsx`)
- Tailwind con CSS variables en `app/globals.css`
- Componentes en `components/`
- Contextos para tema/idioma (`contexts/`)

Los archivos HTML usan inline `<style>` y CSS plano para velocidad de prototipado.
Esos estilos deben portarse a Tailwind classes + `globals.css` siguiendo la
convención del repo (ya usa `--theme-color-rgb`, `bg-theme-10`, `border-theme-30`, etc.).

## Fidelity

**High-fidelity.** Colores, tipografía, espaciado, timings de animación y
easings son finales. Replicar lo más cerca posible.

---

## Files in this handoff

```
design_handoff_modern_terminal/
├── README.md                         (este archivo)
├── design_reference/
│   ├── Portfolio Modern Terminal.html  (entrada — abrir en navegador)
│   ├── tweaks-panel.jsx               (panel de tweaks — no necesario en prod)
│   └── src/
│       ├── app.jsx                    (composición + scroll FX + accent cycling)
│       ├── components.jsx             (Pane, Reveal, Stagger, ScrambleText, TypedTitle, TopBar, StatusBar, CommandPalette, ProjectModal)
│       ├── sections.jsx               (Hero, About, Projects, Links, Contact)
│       ├── data.jsx                   (SECTIONS, TITLES, SKILLS, PROJECTS, LINKS, makeHeatmap)
│       └── icons.jsx                  (set de íconos SVG inline)
└── assets/                            (los mismos assets que ya tiene el repo)
```

---

## Mapping prototipo → codebase

| Prototipo | Codebase actual |
|---|---|
| `src/app.jsx` (App component) | `portafolio/app/page.tsx` |
| `src/sections.jsx` (Hero/About/Projects/Links/Contact) | secciones dentro de `app/page.tsx` (separar en componentes nuevos en `components/sections/`) |
| `src/components.jsx → Pane` | nuevo: `components/terminal-pane.tsx` |
| `src/components.jsx → Reveal, Stagger` | nuevo: `components/reveal.tsx` |
| `src/components.jsx → ScrambleText` | reemplaza `components/decrypt-text.tsx` (o vive junto a ella) |
| `src/components.jsx → TopBar` | reemplaza el `<header>` actual en `page.tsx` |
| `src/components.jsx → StatusBar` | nuevo: `components/status-bar.tsx` |
| `src/components.jsx → CommandPalette` | nuevo: `components/command-palette.tsx` (usar `components/ui/command.tsx` ya disponible de shadcn) |
| `src/components.jsx → ProjectModal` | refactor del Dialog que ya está inline en `page.tsx` → `components/project-modal.tsx` |
| Background layers (mesh/grid/dots/scanlines/noise) | nuevo: `components/ambient-background.tsx` (reemplaza `particles-background.tsx`) |
| Scroll-progress + parallax + ghost numbers | hook nuevo: `hooks/use-scroll-fx.ts` |

---

## Design tokens

Añadir a `app/globals.css` dentro de `:root`:

```css
:root {
  /* Backgrounds */
  --bg:        #0a0b0e;
  --bg-elev:   #0f1116;
  --bg-elev-2: #14161d;

  /* Ink (texto) */
  --ink:       #d6dbe2;
  --ink-mute:  #8d96a4;
  --ink-dim:   #5a626f;

  /* Lines / dividers */
  --line:      rgba(255,255,255,0.06);
  --line-2:    rgba(255,255,255,0.10);

  /* Status colors */
  --warn:      #f59e0b;
  --danger:    #ef4444;
  --info:      #38bdf8;

  /* Radii */
  --r-sm: 6px;
  --r-md: 10px;
  --r-lg: 14px;
}
```

**Acentos** (mantén el sistema actual `data-theme-color`, sólo añade nuevos):

| Tema | Hex | Light | RGB |
|---|---|---|---|
| green (default) | `#4ade80` | `#86efac` | `74,222,128` |
| amber | `#fbbf24` | `#fde68a` | `251,191,36` |
| cyan | `#22d3ee` | `#a5f3fc` | `34,211,238` |
| magenta | `#e879f9` | `#f5d0fe` | `232,121,249` |
| white | `#e5e7eb` | `#f3f4f6` | `229,231,235` |

> Tu sistema actual ya usa `--theme-color-rgb`. Mantener compatibilidad.

---

## Typography

- **Familia principal:** `"JetBrains Mono"` (cargar desde Google Fonts) con fallback
  `"Geist Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace`
- **Feature settings:** `font-feature-settings: "ss01","ss02","cv02","cv11";`
- **Letter-spacing global body:** `-0.005em`
- **Section h2:** `clamp(22px, 2.4vw, 32px)`, weight 600, letter-spacing -0.02em
- **Hero h1:** `clamp(28px, 4.6vw, 56px)`, weight 600, letter-spacing -0.02em, line-height 1.12
- **Labels (uppercase):** `10.5px`, letter-spacing `.08em`, color `var(--ink-mute)`
- **Body copy:** `13.5px`, line-height `1.7`

Cargar en `app/layout.tsx`:

```tsx
import { JetBrains_Mono } from "next/font/google";
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["300","400","500","600","700"], variable: "--font-mono" });
```

Aplicar `mono.variable` al `<html>` y usar `font-family: var(--font-mono)` en body.

---

## Component spec

### 1. `<Pane>` — la ventana de terminal

Es la primitiva visual del rediseño. Reemplaza las `border border-theme-30 p-3 rounded-md bg-black/80` que están en todo `page.tsx`.

**Estructura:**
```
.pane                              ← contenedor con backdrop-filter blur
  .pane-head (opcional)            ← barra superior 36px
    .tl (traffic lights)           ← 3 círculos #ff5f57 / #febc2e / #28c840
    .pane-title                    ← "~/portfolio — hello.tsx"
    .pane-meta (right)             ← "● live" / "readme" / etc
  .pane-body                       ← padding 18px 22px
```

**CSS clave:**
```css
.pane {
  background: linear-gradient(180deg, rgba(20,22,29,.78), rgba(15,17,22,.78));
  backdrop-filter: blur(14px) saturate(130%);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  box-shadow: 0 1px 0 rgba(255,255,255,.04) inset, 0 24px 60px -30px rgba(0,0,0,.7);
  position: relative;
  transition: border-color .35s, box-shadow .35s, transform .35s;
}
/* Borde gradiente animado en hover */
.pane::before {
  content:""; position:absolute; inset:-1px; border-radius:inherit; padding:1px;
  background: linear-gradient(135deg, rgba(var(--acc-rgb),0) 0%, rgba(var(--acc-rgb),0) 35%, rgba(var(--acc-rgb),.35) 55%, rgba(var(--acc-rgb),0) 75%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  opacity:0; transition: opacity .5s; pointer-events:none;
}
.pane:hover::before { opacity: 1; }
.pane.hoverable:hover {
  border-color: rgba(var(--acc-rgb),.35);
  box-shadow: 0 1px 0 rgba(255,255,255,.06) inset, 0 30px 70px -30px rgba(0,0,0,.8), 0 0 0 1px rgba(var(--acc-rgb),.05);
}
```

Ver `design_reference/Portfolio Modern Terminal.html` (líneas `.pane`, `.pane-head`, `.tl`, `.pane-title`, `.pane-meta`) para el CSS completo.

**API esperada (React):**
```tsx
<Pane title={<>~/about/<b>bio.md</b></>} meta="read-only" hoverable>
  ...children
</Pane>
```

### 2. `<Reveal>` — animación de entrada al scroll

Reemplaza el patrón actual `opacity-0 + animate-fade-in-up` con un componente declarativo. Usa `IntersectionObserver` con `threshold: 0.16` y `rootMargin: "0px 0px -8% 0px"`.

**Variantes (prop `variant`):**
- `up` — translateY(28px) → 0 (default)
- `down` — translateY(-22px) → 0
- `left` — translateX(-32px) → 0
- `right` — translateX(32px) → 0
- `scale` — scale(.94) → 1
- `blur` — blur(10px) + translateY(14px) → 0
- `rise` — translateY(40px) + scale(.985) + blur(4px) → 0 (premium)

**Timing:** `transition: opacity .75s cubic-bezier(.2,.8,.2,1), transform .85s same, filter .85s same`

**Props:**
```tsx
<Reveal variant="left" delay={120} sweep>
  <Pane>...</Pane>
</Reveal>
```

Cuando `sweep` está activo, busca el `.pane` interno y le añade clase `swept` 60ms después para activar el light-sweep CSS (ver más abajo).

**Respeta `prefers-reduced-motion`** — si el usuario lo tiene activado, muestra todo sin animación.

Código fuente completo en `design_reference/src/components.jsx` (función `Reveal`).

### 3. `<ScrambleText>` — efecto descifrado/scramble

Reemplaza `components/decrypt-text.tsx`. Diferencias:
- Más limpio: charset `"abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>"`
- Tres triggers: `mount`, `hover`, `scroll`
- En modo `scroll`, **re-ejecuta** cada vez que el elemento entra al viewport (toggle al salir + reentrar)

**Spec:** `duration` en ms, settle progresivo (cada char se "fija" cuando `i < t * text.length`).

Código en `design_reference/src/components.jsx` función `ScrambleText`.

### 4. `<TopBar>` — header fijo

Reemplaza el `<header>` actual de `page.tsx`.

**Estructura:**
```
.topbar (fixed, height 48px, backdrop-blur)
  .brand
    .glyph (22×22, gradient acc → acc-2, "R")
    span "raulmalagarriga" + ".dev"
  .navtabs
    .navtab (con .active y underline animado)
      "<span class=hash>#</span> {label}"
  .right
    .iconbtn (palette icon, cycle accent)
    .iconbtn (search icon, open palette)
    .kbd "⌘ K"
```

**Active tab underline:**
```css
.navtab.active::after {
  content:""; position:absolute; left:10px; right:10px; bottom:-1px; height:2px;
  background: var(--acc); border-radius: 2px 2px 0 0;
  box-shadow: 0 0 12px var(--acc-glow);
}
```

### 5. `<StatusBar>` — barra inferior fija (vim/tmux)

Nueva. Sustituye nada — se añade al final del layout, `position: fixed; bottom: 0`.

```
[NORMAL] [● home.tsx] [utf-8] [main]            [↑↓ navigate] [⌘K palette] [HH:MM]
```

CSS: height 26px, fondo `linear-gradient(180deg, rgba(15,17,22,.92), rgba(10,11,14,.96))`, divisores `border-right: 1px solid var(--line)`, font-size 11px.

El bloque `.mode` tiene background `var(--acc)` con texto `#0a0b0e` (invertido).

### 6. `<CommandPalette>` — ⌘K

Modal fixed centrado verticalmente (padding-top 18vh), 560px max, input arriba, lista filtrable abajo, hint bar de teclas (↵ run · ↑↓ nav · esc close).

Comandos a poblar:
- "Go to {section}" (5 entries)
- "Accent → {color}" (5 entries)
- "Enable/Disable scanlines"
- "Enable/Disable film grain"
- "Open GitHub" / "Open LinkedIn" / "Email Raúl"

Recomendación: **usar `cmdk` (ya instalado vía `components/ui/command.tsx`)** en lugar de hacerlo desde cero — sólo restilizarlo.

### 7. Background ambiental (`<AmbientBackground>`)

Reemplaza completamente `components/particles-background.tsx` y `components/terminal-background.tsx`.

Cinco capas, todas `position: fixed; inset: 0; pointer-events: none`:

```html
<div class="bg-layers" style="z-index: 0">
  <div class="parallax" data-parallax="-0.06"><div class="bg-mesh" /></div>
  <div class="parallax" data-parallax="-0.025"><div class="bg-grid" /></div>
  <div class="parallax" data-parallax="-0.045"><div class="bg-dots" /></div>
  <div class="bg-vignette" />
</div>
<div class="scanlines" style="z-index: 1" />
<div class="noise" style="z-index: 2" />
```

**Capas:**
- `.bg-mesh` — 3 radial-gradients (acc-glow, info, magenta) + `filter: blur(40px)`, animación `meshFloat` 22s lenta
- `.bg-grid` — `linear-gradient` cuadrícula 56px, opacidad .03
- `.bg-dots` — `radial-gradient` puntos 18px, opacidad .06
- `.bg-vignette` — `radial-gradient` ellipse oscurece bordes
- `.scanlines` — `repeating-linear-gradient` 2px/3px, `mix-blend-mode: overlay`, opacidad .35
- `.noise` — SVG fractalNoise base64 inline, opacidad .04, `mix-blend-mode: overlay`

CSS completo en `design_reference/Portfolio Modern Terminal.html` (líneas 56–110).

---

## Scroll FX system (la pieza nueva clave)

Crear un hook `hooks/use-scroll-fx.ts` que se monte una vez en `RootLayout` (o en el componente que envuelve todo) y maneje vía `requestAnimationFrame`:

### a. Scroll progress bar
Elemento fijo top 0, height 2px, gradiente accent. Se controla por CSS variable `--sp` (0 a 1).

```css
.scroll-progress {
  position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 45;
  background: linear-gradient(90deg, transparent 0%, var(--acc) 30%, var(--acc-2) 50%, var(--acc) 70%, transparent 100%);
  transform: scaleX(var(--sp, 0)); transform-origin: 0 50%;
  box-shadow: 0 0 14px var(--acc-glow);
  transition: transform .08s linear;
}
```

JS: `document.documentElement.style.setProperty("--sp", scrollY / (scrollHeight - innerHeight))`

### b. Parallax layers
Itera elementos con `.parallax[data-parallax]` y aplica `translate3d(0, scrollY * rate, 0)`. Valores recomendados:
- mesh: `-0.06` (más lento)
- grid: `-0.025`
- dots: `-0.045`

### c. Ghost section numbers
Cada `<section>` tiene `<span class="sect-ghost">02</span>` posicionado `absolute; top: 40px; right: -10px`, `font: 800 clamp(140px, 22vw, 280px)`, color `rgba(var(--acc-rgb),.045)`, `mix-blend-mode: screen`.

Cada frame: calcular `center = rect.top + rect.height/2 - innerHeight/2` y aplicar `translate3d(0, center * -0.18, 0)`.

### d. Hero drift
El contenedor `.hero-drift` recibe `--hero-y: ${-scrollY * 0.12}px` y opacidad `max(0, 1 - scrollY/700)`.

### e. Velocity blur
Calcular velocidad `|dy| / dt`. Si > 2.5 px/ms, añadir clase `scrolling-fast` al body (CSS: `.bg-mesh { filter: blur(56px); }`), y retirarla 180ms después.

### f. Pane light-sweep
Cuando un `<Reveal sweep>` entra al viewport, añadir clase `.swept` a su `.pane` interno. CSS:

```css
.pane.sweep::after {
  content:""; position:absolute; left:0; right:0; top:-40%; height:60%;
  background: linear-gradient(180deg, transparent 0%, rgba(var(--acc-rgb),.10) 50%, transparent 100%);
  opacity:0; pointer-events:none;
}
.pane.sweep.swept::after {
  animation: paneSweep 1.5s cubic-bezier(.2,.8,.2,1) .15s forwards;
}
@keyframes paneSweep {
  0%   { opacity: 0; transform: translateY(0); }
  15%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(360%); }
}
```

### g. Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  .reveal, .stagger > *, .pane.sweep::after, .bg-mesh, .hex-wrap, .hero-drift {
    transition: none !important; animation: none !important;
    transform: none !important; filter: none !important;
  }
  .reveal { opacity: 1; }
}
```

Código JS completo del scroll handler en `design_reference/src/app.jsx` líneas 48–125 (efecto "Scroll-driven effects").

---

## Sección por sección

### Hero (`#home`)
- `min-height: 92vh`, centrado vertical
- Un único `<Pane>` con título `~/portfolio — hello.tsx` y meta `● live`
- Dentro: `<TypedTitle prefix="Hello World. I am a " titles={["Fullstack Developer.", "Software Developer.", "Software Architect."]} />` — ya tienes lógica similar en `page.tsx` líneas 145–198. Solamente cambia el render para que viva dentro del Pane y use los colores nuevos (acc para el prefix, ink para el typed text)
- Botones: `.btn` (sólido accent) + 2 `.btn.ghost` (github, linkedin)
- Bottom meta row: "● available for work · based in Venezuela 🌎 · response < 24h"

### About (`#about`)
- 2 panes lado a lado (con `Reveal variant="left"` y `variant="right"`):
  - **bio.md** — copy actual + heatmap nuevo (`git log --activity --last=26w`)
  - **profile** — hex con foto (mantén el `.profile-hexagon` actual, sólo añade `.hex-orbit` (dashed border + `animation: orbit 30s linear infinite`) y `.hex-wrap` con `animation: hexBreathe 6s ease-in-out infinite`)
- Grid de 6 skill cards con `<Stagger>` (cada hijo `--i: index`, delay `i * 70ms`)
- Cada skill card tiene un icon-square 26×26 (con la letra inicial del título) y lista de items con scramble en hover

### Heatmap helper

```ts
// 26 weeks * 7 days = 182 cells, valor 0–4
function makeHeatmap(weeks = 26, days = 7, seed = 7) {
  const out: number[] = [];
  let s = seed;
  for (let i = 0; i < weeks * days; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    out.push(r < 0.35 ? 0 : r < 0.6 ? 1 : r < 0.82 ? 2 : r < 0.95 ? 3 : 4);
  }
  return out;
}
```

CSS:
```css
.heatmap { display: grid; grid-template-columns: repeat(26, 1fr); gap: 3px; }
.heat-cell { aspect-ratio: 1; border-radius: 2px; background: rgba(255,255,255,.04); transition: transform .15s; }
.heat-cell.l1 { background: rgba(var(--acc-rgb),.18); }
.heat-cell.l2 { background: rgba(var(--acc-rgb),.36); }
.heat-cell.l3 { background: rgba(var(--acc-rgb),.6); }
.heat-cell.l4 { background: var(--acc); box-shadow: 0 0 6px var(--acc-glow); }
.heat-cell:hover { transform: scale(1.4); }
```

### Projects (`#projects`)
- Grid 2 columnas (mobile 1)
- Cada card es un `<Pane>` con `pane-head` mostrando `./{p.key}` y meta `readme`
- Body: row con glyph (52×52, gradient acc, primera letra del proyecto), título + summary, preview de imagen 120px, tags y action buttons
- Las cards alternan `Reveal variant="left"` (par) y `"right"` (impar)
- Preview imagen tiene `transform: scale(1.04)` por default, hover scale `1.05`, transition `.6s`
- Click abre `<ProjectModal>` (el modal actual ya funciona — sólo restilizarlo con la estética nueva: pane-head + traffic lights + gallery con dots/arrows accent)

### Links/Profiles (`#links`)
- Grid 4 columnas (mobile 2)
- Card simple con icon-square 34×34 acc-tinted, título, descripción y `arrow` ("open →") con `Reveal variant="scale"`

### Contact (`#contact`)
- 2 panes:
  - **send.sh** — form con labels uppercase tipo `$ name`, `$ email`, `$ subject`, `$ message` y botón sólido accent
  - **card.tsx** — KV list (email, linkedin, github, timezone, languages) + tip box `<span class="kbd">⌘ K</span>` para abrir el palette

Mantener `components/contact-form.tsx` actual pero restilizar.

### Footer
- Barra simple con `$ designed & built by Raúl Malagarriga · © 2026`
- "handcrafted html · zero dependencies in production"

---

## Animations & timings (resumen)

| Element | Property | Duration | Easing |
|---|---|---|---|
| Reveal opacity | opacity | .75s | cubic-bezier(.2,.8,.2,1) |
| Reveal transform | transform/filter | .85s | cubic-bezier(.2,.8,.2,1) |
| Pane sweep | translateY 0→360% | 1.5s | cubic-bezier(.2,.8,.2,1), delay .15s |
| Pane hover border | gradient ::before | .5s | ease |
| Caret blink | opacity | 1.06s | steps(1) infinite |
| Mesh float | transform/scale | 22s | ease-in-out alternate |
| Hex breathe | filter drop-shadow | 6s | ease-in-out infinite |
| Hex orbit | rotate 360° | 30s | linear infinite |
| Section title bar | scaleX 0→1 | 1.1s | cubic-bezier(.2,.8,.2,1) |
| Scroll progress | scaleX | .08s | linear |
| Velocity blur | filter | .25s | ease |
| Tag hover | all | .25s | ease |
| Button hover | translate/shadow | .2s | ease |

---

## Assets

Todos los assets ya están en `portafolio/assets/` y `portafolio/public/images/`.
No se necesitan nuevos assets. Asegurar que `assets/profile-photo.png` (que el
prototipo referencia) corresponde a `public/images/profile-photo.png` del repo.

---

## Implementation checklist

- [ ] Añadir `JetBrains Mono` via `next/font/google` en `app/layout.tsx`
- [ ] Migrar tokens nuevos a `app/globals.css` (--bg, --ink, --line, --r-*, etc)
- [ ] Crear `components/ambient-background.tsx` (reemplaza particles-background)
- [ ] Crear `components/terminal-pane.tsx` (Pane primitivo)
- [ ] Crear `components/reveal.tsx` con variantes y prop `sweep`
- [ ] Refactor `components/decrypt-text.tsx` → `scramble-text.tsx` con trigger="scroll"
- [ ] Crear `hooks/use-scroll-fx.ts` (rAF: progress, parallax, ghost, hero drift, velocity)
- [ ] Crear `components/scroll-progress.tsx` (div fijo, lee `--sp`)
- [ ] Crear `components/top-bar.tsx` (reemplaza el `<header>` inline)
- [ ] Crear `components/status-bar.tsx` (vim/tmux footer fijo)
- [ ] Crear `components/command-palette.tsx` (usar `cmdk` de shadcn ya instalado)
- [ ] Separar secciones de `app/page.tsx` en `components/sections/{hero,about,projects,links,contact}.tsx`
- [ ] Cada sección recibe su número (01..05) y añade `<span class="sect-ghost">`
- [ ] Reemplazar tarjetas `border-theme-30 rounded-md bg-black/80` por `<Pane hoverable>`
- [ ] Añadir heatmap component en About
- [ ] Añadir `.hex-orbit` y `hexBreathe` animation al perfil
- [ ] Verificar `prefers-reduced-motion` en todos los componentes animados
- [ ] Mantener compatibilidad con `data-theme-color` actual (mapear a `data-accent`)
- [ ] Mantener `LanguageContext` y `t()` funcionando en todas las copias

---

## Acceptance criteria

1. Al hacer scroll, una línea verde (color accent) se ve creciendo en el top — está visible y suave.
2. Cada pane entra a la vista con dirección distinta (no todo desde abajo).
3. Cuando una pane entra, un destello suave del color accent baja a través de ella una vez.
4. Los números grandes 01–05 son visibles detrás de cada sección y se mueven al hacer scroll (parallax fuerte).
5. Los títulos `About me`, `Selected projects`, etc se vuelven a "descifrar" cada vez que vuelves a esa sección.
6. El background mesh se desenfoca brevemente cuando haces scroll rápido.
7. La hero se desvanece y sube ligeramente al hacer scroll.
8. `⌘K` abre un command palette funcional.
9. La status bar inferior muestra `NORMAL ● home.tsx ... HH:MM`.
10. Con `prefers-reduced-motion: reduce`, todo es estático e instantáneo.

---

## Notes

- El prototipo usa React puro inline; el codebase usa Next.js App Router con `"use client"`. **Todos los componentes con hooks (`useState`, `useEffect`, `useRef`) necesitan `"use client"` directive.**
- El `useTweaks` y `<TweaksPanel>` que ves en `app.jsx` son sólo para el entorno de prototipado **— NO portarlos**. El usuario final no necesita ese panel. Los cambios de tema/accent se manejan vía el `ThemeSelector` que ya existe.
- El sistema de idiomas (`useLanguage`, `t()`) se mantiene tal cual. Las strings del prototipo están hardcoded en inglés — al portar, envolverlas en `t("…")` y añadir traducciones a `lib/translations.ts`.
- Para el `<canvas>` particles actual: **eliminarlo**. El nuevo background ambient lo reemplaza.

Cualquier duda, abrir el archivo HTML del prototipo en un navegador y explorar
las interacciones — todo lo que se ve y siente ahí es lo que debe replicar.
