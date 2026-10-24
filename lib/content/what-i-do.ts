import type { L } from "@/lib/i18n"
import type { SectionId } from "@/lib/portfolio-data"

export type FacetDef = {
  key: string
  glyph: string
  title: L
  line: L
  linkLabel: L
  target: SectionId
}

export const FACETS: FacetDef[] = [
  {
    key: "product",
    glyph: "PL",
    title: { es: "Producto · PULSE", en: "Product · PULSE" },
    line: {
      es: "Cofundé y construyo una plataforma usada por entrenadores y atletas en Latinoamérica.",
      en: "I co-founded and build a platform used by trainers and athletes across Latin America.",
    },
    linkLabel: { es: "Ver PULSE", en: "See PULSE" },
    target: "pulse",
  },
  {
    key: "business",
    glyph: "MC",
    title: { es: "Tecnología para negocios · Mega Copias", en: "Tech for business · Mega Copias" },
    line: {
      es: "Llevo la tecnología e innovación de un negocio con 25 años de trayectoria, automatizando lo que antes se hacía a mano.",
      en: "I lead technology and innovation at a 25-year-old business, automating what used to be done by hand.",
    },
    linkLabel: { es: "Ver casos", en: "See case studies" },
    target: "cases",
  },
  {
    key: "consulting",
    glyph: "CS",
    title: { es: "Consultoría · Software a medida", en: "Consulting · Custom software" },
    line: {
      es: "Entiendo tu operación, encuentro el cuello de botella y construyo la solución por fases.",
      en: "I learn how your operation works, find the bottleneck, and build the solution in phases.",
    },
    linkLabel: { es: "Cómo trabajo", en: "How I work" },
    target: "consulting",
  },
]

export type StatDef = {
  key: string
  value: string
  label: L
}

export const STATS: StatDef[] = [
  { key: "users", value: "+2k", label: { es: "usuarios en PULSE", en: "PULSE users" } },
  { key: "countries", value: "+4", label: { es: "países de Latinoamérica", en: "Latin American countries" } },
  {
    key: "verifica",
    value: "2h → <10min",
    label: { es: "conciliación de pagos con Verifica", en: "payment reconciliation with Verifica" },
  },
  {
    key: "years",
    value: "5+",
    label: { es: "años construyendo software en producción", en: "years shipping production software" },
  },
]
