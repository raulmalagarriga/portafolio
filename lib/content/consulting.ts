import type { L, LList } from "@/lib/i18n"
import type { ContactReason } from "@/lib/content/contact"

export const CONSULTING = {
  intro: {
    es: "Si tu negocio pierde tiempo en tareas manuales, información dispersa o procesos que dependen de una sola persona, probablemente se puede resolver con software.",
    en: "If your business loses time on manual tasks, scattered information, or processes that depend on one person, software can probably fix it.",
  } satisfies L,
  steps: [
    {
      cmd: "diagnose",
      title: { es: "Diagnóstico", en: "Diagnosis" } satisfies L,
      body: {
        es: "Entiendo cómo opera tu negocio antes de escribir código.",
        en: "I learn how your business runs before writing code.",
      } satisfies L,
    },
    {
      cmd: "propose",
      title: { es: "Propuesta", en: "Proposal" } satisfies L,
      body: {
        es: "Una solución por fases, con alcance claro.",
        en: "A phased solution with a clear scope.",
      } satisfies L,
    },
    {
      cmd: "build",
      title: { es: "Construcción", en: "Build" } satisfies L,
      body: {
        es: "Entregas que tu equipo usa desde la primera fase.",
        en: "Deliveries your team uses from phase one.",
      } satisfies L,
    },
    {
      cmd: "support",
      title: { es: "Acompañamiento", en: "Support" } satisfies L,
      body: {
        es: "Ajustes y mejoras mientras el sistema crece contigo.",
        en: "Adjustments and improvements as the system grows with you.",
      } satisfies L,
    },
  ],
  services: {
    es: [
      "software a medida",
      "automatización de procesos",
      "integraciones (WhatsApp, pagos, bancos)",
      "sistemas internos y dashboards",
      "arquitectura y consultoría técnica",
    ],
    en: [
      "custom software",
      "process automation",
      "integrations (WhatsApp, payments, banks)",
      "internal tools & dashboards",
      "architecture & technical consulting",
    ],
  } satisfies LList,
  cta: {
    label: { es: "Cuéntame tu problema", en: "Tell me about your problem" } satisfies L,
    reason: "consulting" as ContactReason,
  },
}
