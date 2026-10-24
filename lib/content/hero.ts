import type { L, LList } from "@/lib/i18n"

export const HERO = {
  prompt: "whoami --intro",
  prefix: { es: "Hola Mundo. Soy ", en: "Hello World. I am a " } satisfies L,
  roles: {
    es: [
      "Cofundador & COO de PULSE",
      "Responsable de Tecnología e Innovación",
      "Consultor de software a medida",
      "Ingeniero en Computación",
    ],
    en: [
      "Co-founder & COO of PULSE",
      "Head of Technology & Innovation",
      "Custom software consultant",
      "Computer Engineer",
    ],
  } satisfies LList,
  headline: {
    es: "Construyo software que resuelve problemas reales de negocio.",
    en: "I build software that solves real business problems.",
  } satisfies L,
  subtitle: {
    es: "Soy Raúl Malagarriga, ingeniero en computación. Cofundé PULSE, lidero la tecnología e innovación de Mega Copias y ayudo a empresas a convertir sus problemas operativos en software a medida.",
    en: "I'm Raúl Malagarriga, a computer engineer. I co-founded PULSE, lead technology and innovation at Mega Copias, and help companies turn operational problems into custom software.",
  } satisfies L,
  cta: {
    primary: { es: "Conoce PULSE", en: "Discover PULSE" } satisfies L,
    secondary: { es: "Trabajemos juntos", en: "Let's work together" } satisfies L,
    tertiary: { es: "Ver casos", en: "See case studies" } satisfies L,
  },
  status: {
    open: { es: "abierto a proyectos", en: "open to projects" } satisfies L,
    location: { es: "desde venezuela 🌎", en: "based in venezuela 🌎" } satisfies L,
    response: { es: "respondo en < 24h", en: "response < 24h" } satisfies L,
  },
  profile: {
    role: { es: "Cofundador · Tech lead · Consultor", en: "Co-founder · Tech lead · Consultant" } satisfies L,
    based: { es: "Maracaibo · UTC−4", en: "Maracaibo · UTC−4" } satisfies L,
    exp: { es: "5+ años", en: "5+ years" } satisfies L,
    status: { es: "abierto a proyectos", en: "open to projects" } satisfies L,
  },
}
