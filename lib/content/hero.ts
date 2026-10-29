import type { L, LList } from "@/lib/i18n"

export const HERO = {
  prompt: "whoami",
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
    es: "Ingeniero en computación. Cofundé PULSE, lidero la tecnología de Mega Copias y construyo software a medida para empresas.",
    en: "Computer engineer. I co-founded PULSE, lead technology at Mega Copias, and build custom software for companies.",
  } satisfies L,
  cta: {
    primary: { es: "Conoce PULSE", en: "Discover PULSE" } satisfies L,
    secondary: { es: "Trabajemos juntos", en: "Let's work together" } satisfies L,
  },
  status: {
    open: { es: "abierto a proyectos", en: "open to projects" } satisfies L,
    location: { es: "Maracaibo · UTC−4", en: "Maracaibo · UTC−4" } satisfies L,
    response: { es: "respondo en < 24h", en: "response < 24h" } satisfies L,
  },
  profile: {
    role: { es: "Cofundador · Tech lead · Consultor", en: "Co-founder · Tech lead · Consultant" } satisfies L,
  },
}
