import type { L, LList } from "@/lib/i18n"

export const SEO = {
  siteName: "Raúl Malagarriga",
  title: {
    es: "Raúl Malagarriga — Ingeniero de Software · Cofundador de PULSE · Consultor",
    en: "Raúl Malagarriga — Software Engineer · Co-founder of PULSE · Software Consultant",
  } satisfies L,
  description: {
    es: "Ingeniero en computación, cofundador y COO de PULSE, responsable de tecnología e innovación en Mega Copias y consultor de software a medida. Construyo software que resuelve problemas reales de negocio.",
    en: "Computer engineer, co-founder and COO of PULSE, head of technology and innovation at Mega Copias, and custom software consultant. I build software that solves real business problems.",
  } satisfies L,
  jobTitle: {
    es: "Ingeniero de Software · Cofundador y COO de PULSE · Consultor de software a medida",
    en: "Software Engineer · Co-founder and COO of PULSE · Custom software consultant",
  } satisfies L,
  ogFacets: {
    es: ["Cofundador & COO de PULSE", "Responsable de Tecnología e Innovación · Mega Copias", "Consultor de software a medida"],
    en: ["Co-founder & COO of PULSE", "Head of Technology & Innovation · Mega Copias", "Custom software consultant"],
  } satisfies LList,
  ogStatus: { es: "abierto a proyectos · Maracaibo · UTC−4", en: "open to projects · Maracaibo · UTC−4" } satisfies L,
  keywords: {
    es: [
      "Raúl Malagarriga",
      "Raul Malagarriga",
      "rjmalagarrigat",
      "ingeniero de software Venezuela",
      "consultoría de software Venezuela",
      "software a medida",
      "desarrollo de software a medida Maracaibo",
      "automatización de procesos",
      "PULSE",
      "PULSE entrenadores",
      "pulsefit.app",
      "Chokotech",
      "Chokotech LLC",
      "Mega Copias",
      "Verifica conciliación de pagos",
      "cofundador PULSE",
    ],
    en: [
      "Raúl Malagarriga",
      "Raul Malagarriga",
      "rjmalagarrigat",
      "software engineer Venezuela",
      "software consulting Venezuela",
      "custom software",
      "custom software development Latin America",
      "process automation",
      "PULSE",
      "PULSE fitness trainers platform",
      "pulsefit.app",
      "Chokotech",
      "Chokotech LLC",
      "Mega Copias",
      "Verifica payment reconciliation",
      "PULSE co-founder",
    ],
  } satisfies LList,
  sameAs: [
    "https://github.com/raulmalagarriga",
    "https://www.linkedin.com/in/rjmalagarrigat/",
    "https://medium.com/@rjmalagarrigat",
  ],
  worksFor: [
    { name: "Chokotech LLC", url: "https://www.pulsefit.app/" },
    { name: "Mega Copias" },
  ],
}
