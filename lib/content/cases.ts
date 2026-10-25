import type { L } from "@/lib/i18n"
import type { ContactReason } from "@/lib/content/contact"
import type { GalleryItem } from "@/lib/content/pulse"

import VerificaReportes from "@/assets/verifica/reportes.png"
import VerificaMonedas from "@/assets/verifica/monedas.png"
import VerificaConciliacion from "@/assets/verifica/conciliacion.png"

import SliveMenu from "@/assets/slive/sliveMenu.png"
import SliveChat from "@/assets/slive/sliveChat.png"
import SliveInterfaz from "@/assets/slive/SLIVE2.png"

export type CaseStatus = "production" | "development"

export type CaseDef = {
  slug: string
  glyph: string
  name: string
  org: L
  context: L
  problem: L
  solution: L
  impact: L
  /** Big highlighted figure shown in the card and the detail view. */
  impactHighlight?: L
  note?: L
  stack: string[]
  /** TODO marker: the stack is a placeholder the owner must confirm. */
  stackTodo?: boolean
  status: CaseStatus
  url?: string
  cta?: { label: L; reason: ContactReason }
  gallery: GalleryItem[]
}

export const CASES: CaseDef[] = [
  {
    slug: "verifica",
    glyph: "VE",
    name: "Verifica",
    org: { es: "Mega Copias", en: "Mega Copias" },
    context: {
      es: "Mega Copias, papelería y centro de impresión con 25 años de trayectoria, recibe a diario un alto volumen de pagos móviles y transferencias.",
      en: "Mega Copias, a print shop and stationery business with 25 years of history, receives a high daily volume of mobile payments and bank transfers.",
    },
    problem: {
      es: "Conciliar cada pago contra el banco se hacía a mano y tomaba alrededor de 2 horas, con riesgo de errores y pagos sin verificar.",
      en: "Reconciling each payment against the bank was manual, took around 2 hours, and left room for errors and unverified payments.",
    },
    solution: {
      es: "Verifica, una app en la nube para registrar pagos rápidamente, validarlos contra el banco, manejar varias monedas y hacer el cierre diario con reportes claros.",
      en: "Verifica, a cloud app to capture payments quickly, validate them against the bank, handle multiple currencies, and run the daily close with clear reports.",
    },
    impact: {
      es: "El cierre diario pasó de un proceso manual propenso a errores a una verificación guiada en minutos.",
      en: "The daily close went from an error-prone manual process to a guided verification in minutes.",
    },
    impactHighlight: {
      es: "de 2 horas a menos de 10 minutos",
      en: "from 2 hours to under 10 minutes",
    },
    note: {
      es: "Diseñada para Mega Copias, adaptable a cualquier negocio que reciba muchos pagos móviles o transferencias.",
      en: "Built for Mega Copias, adaptable to any business that handles a high volume of mobile payments or transfers.",
    },
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Docker"],
    status: "production",
    cta: {
      label: {
        es: "¿Tu negocio tiene este problema? Hablemos",
        en: "Does your business have this problem? Let's talk",
      },
      reason: "consulting",
    },
    gallery: [
      { kind: "static", src: VerificaReportes, alt: { es: "Verifica · reportes", en: "Verifica · reports" } },
      { kind: "static", src: VerificaMonedas, alt: { es: "Verifica · monedas", en: "Verifica · currencies" } },
      { kind: "static", src: VerificaConciliacion, alt: { es: "Verifica · conciliación", en: "Verifica · reconciliation" } },
      // TODO: optional extra screenshots: /public/cases/verifica-1.png (hidden until the file exists).
      { kind: "file", src: "/cases/verifica-1.png", alt: { es: "Verifica · captura", en: "Verifica · screenshot" } },
    ],
  },
  {
    slug: "whatsapp-manager",
    glyph: "WA",
    name: "Gestor de chats de WhatsApp",
    org: { es: "Mega Copias", en: "Mega Copias" },
    context: {
      es: "Mega Copias atiende a sus clientes principalmente por WhatsApp Business, con varias personas respondiendo pedidos a la vez.",
      en: "Mega Copias serves its customers mainly through WhatsApp Business, with several people answering orders at once.",
    },
    problem: {
      es: "Todo el equipo atendía clientes desde un solo número de WhatsApp Business abierto en varias ventanas. No había forma de saber quién atendía a cada cliente, en qué estado estaba su pedido, ni qué chats llevaban demasiado tiempo sin respuesta.",
      en: "The whole team served customers from a single WhatsApp Business number open in several windows. There was no way to know who was handling each customer, where their order stood, or which chats had gone too long without a reply.",
    },
    solution: {
      es: "Un panel central para asignar un responsable a cada chat, marcar su estado (sin atender, atendiendo, pagado, entregado, cerrado...), recibir alertas de chats sin respuesta y responder 1:1 desde el mismo panel.",
      en: "A central dashboard to assign an owner to each chat, track its status (unattended, in progress, paid, delivered, closed...), get alerts for unanswered chats, and reply 1:1 from the same panel.",
    },
    impact: {
      es: "Objetivo: que ningún cliente quede sin atender y que el flujo de trabajo sea visible para todo el equipo.",
      en: "Goal: no customer left unattended, and a workflow the whole team can see.",
    },
    stack: ["Next.js", "MongoDB", "Docker"],
    status: "development",
    gallery: [
      // TODO: add /public/cases/whatsapp-1.png (and -2…) once there is something to show.
      { kind: "file", src: "/cases/whatsapp-1.png", alt: { es: "Gestor de chats · panel", en: "Chat manager · dashboard" } },
      { kind: "file", src: "/cases/whatsapp-2.png", alt: { es: "Gestor de chats · conversación", en: "Chat manager · conversation" } },
    ],
  },
  {
    slug: "slive",
    glyph: "SL",
    name: "Slive",
    org: { es: "Bigwise", en: "Bigwise" },
    context: {
      es: "Desarrollado como parte del equipo de Bigwise. Slive es un sistema administrativo integral en la nube para retail: ventas, inventario, POS e IA propia para análisis predictivo y guía estratégica de negocio.",
      en: "Built as part of the Bigwise team. Slive is a comprehensive cloud-based administrative system for retail: sales, inventory, POS, and proprietary AI for predictive analytics and strategic business guidance.",
    },
    problem: {
      es: "Los comercios necesitaban operar punto de venta, inventario, facturación y logística desde una sola consola, con información confiable para tomar decisiones.",
      en: "Retailers needed to run point of sale, inventory, billing and logistics from a single console, with reliable data to make decisions.",
    },
    solution: {
      es: "Suite de gestión minorista que unifica POS, inventario, CRM y analítica en la nube, con una IA propia para forecasting, detección de anomalías y recomendaciones adaptadas a cada catálogo.",
      en: "Retail management suite unifying POS, inventory, CRM and analytics in the cloud, with proprietary AI for forecasting, anomaly detection and recommendations tuned to each merchant's catalog.",
    },
    impact: {
      es: "Mi rol: desarrollo backend con arquitectura de microservicios (.NET Core, PostgreSQL), diseño de base de datos code-first y despliegue en Windows y Ubuntu Server.",
      en: "My role: backend development with a microservices architecture (.NET Core, PostgreSQL), code-first database design and deployment on Windows and Ubuntu Server.",
    },
    stack: [".NET Core", "PostgreSQL", "Next.js", "MongoDB", "Redis", "Docker"],
    status: "production",
    url: "https://slive.ai/",
    gallery: [
      { kind: "static", src: SliveMenu, alt: { es: "Slive · menú", en: "Slive · menu" } },
      { kind: "static", src: SliveChat, alt: { es: "Slive · chat", en: "Slive · chat" } },
      { kind: "static", src: SliveInterfaz, alt: { es: "Slive · interfaz", en: "Slive · interface" } },
    ],
  },
]
