import type { L, LList } from "@/lib/i18n"

export type ExperienceDef = {
  key: string
  role: L
  org: L
  /** Start date (e.g. "2026-02"). `undefined` renders an elegant "date pending" placeholder. */
  start?: string
  /** End date (e.g. "2026-09"). `undefined` means "present". */
  end?: string
  /** TODO marker: the role title must be confirmed by the owner. */
  roleTodo?: boolean
  highlights: LList
  url?: string
}

export const EXPERIENCE: ExperienceDef[] = [
  {
    key: "pulse",
    role: { es: "Cofundador, COO e Ingeniería", en: "Co-founder, COO & Engineering" },
    org: { es: "Chokotech LLC · PULSE", en: "Chokotech LLC · PULSE" },
    start: "2026-02",
    url: "https://www.pulsefit.app/",
    highlights: {
      es: [
        "Lidero el backend (Node.js, MongoDB, Google Cloud Run), buena parte del frontend (React Native, Next.js) y las operaciones y finanzas de la empresa.",
        "Plataforma usada por más de 2k entrenadores y atletas en más de 4 países de Latinoamérica, en iOS, Android y web.",
      ],
      en: [
        "I lead the backend (Node.js, MongoDB, Google Cloud Run), much of the frontend (React Native, Next.js) and the company's operations and finance.",
        "Platform used by 2k+ trainers and athletes across 4+ Latin American countries, on iOS, Android and web.",
      ],
    },
  },
  {
    key: "megacopias",
    role: { es: "Responsable de Tecnología e Innovación", en: "Head of Technology & Innovation" },
    org: { es: "Mega Copias", en: "Mega Copias" },
    // TODO: add the month once confirmed (YYYY-MM); year-only renders as "2025".
    start: "2025",
    highlights: {
      es: [
        "Verifica: la conciliación diaria de pagos pasó de unas 2 horas a menos de 10 minutos.",
        "Gestor de chats de WhatsApp en desarrollo para que ningún cliente quede sin atender.",
      ],
      en: [
        "Verifica: daily payment reconciliation went from about 2 hours to under 10 minutes.",
        "WhatsApp chat manager in development so that no customer is left unattended.",
      ],
    },
  },
  {
    key: "consulting",
    role: { es: "Consultor de software a medida", en: "Custom software consultant" },
    org: { es: "Independiente", en: "Independent" },
    start: "2025-03",
    highlights: {
      es: [
        "Software a medida, automatización de procesos e integraciones (WhatsApp, pagos, bancos) para empresas.",
        "Trabajo por fases: diagnóstico, propuesta, construcción y acompañamiento.",
      ],
      en: [
        "Custom software, process automation and integrations (WhatsApp, payments, banks) for companies.",
        "Phased work: diagnosis, proposal, build and support.",
      ],
    },
  },
  {
    key: "bigwise",
    role: { es: "Desarrollador de software", en: "Software developer" },
    org: { es: "Bigwise · Slive", en: "Bigwise · Slive" },
    start: "2023-03",
    end: "2026-09",
    url: "https://slive.ai/",
    highlights: {
      es: [
        "Líder backend de Slive, sistema integral para retail basado en microservicios con .NET Core, EF Core y PostgreSQL.",
        "Diseño de base de datos code-first, API de migraciones y despliegue de microservicios en Windows y Ubuntu Server.",
      ],
      en: [
        "Backend lead for Slive, a comprehensive retail system built on microservices with .NET Core, EF Core and PostgreSQL.",
        "Code-first database design, migrations API and microservice deployment on Windows and Ubuntu Server.",
      ],
    },
  },
  {
    key: "saint",
    role: { es: "Soporte técnico", en: "Technical support" },
    org: { es: "Saint Latinoamérica", en: "Saint Latinoamérica" },
    start: "2019-03",
    end: "2023-03",
    url: "https://saintnet.com/",
    highlights: {
      es: [
        "Gestión de incidencias y pruebas técnicas del software de gestión empresarial de Saint.",
        "Documentación y tutoriales que facilitaron la adopción de las aplicaciones por parte de los usuarios.",
      ],
      en: [
        "Incident management and technical testing for Saint's business management software.",
        "Documentation and tutorials that eased user adoption of the applications.",
      ],
    },
  },
]
