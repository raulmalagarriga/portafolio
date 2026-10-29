import type { L } from "@/lib/i18n"
import type { SectionId } from "@/lib/portfolio-data"

export type FacetDef = {
  key: string
  /** Folder shown in the hero's `$ ls ~/raul` listing. */
  folder: L
  title: L
  line: L
  linkLabel: L
  target: SectionId
}

export const FACETS: FacetDef[] = [
  {
    key: "product",
    folder: { es: "producto/", en: "product/" },
    title: { es: "PULSE", en: "PULSE" },
    line: {
      es: "Cofundé y construyo una plataforma usada por entrenadores y atletas en Latinoamérica.",
      en: "I co-founded and build a platform used by trainers and athletes across Latin America.",
    },
    linkLabel: { es: "ver PULSE", en: "see PULSE" },
    target: "pulse",
  },
  {
    key: "business",
    folder: { es: "negocios/", en: "business/" },
    title: { es: "Mega Copias", en: "Mega Copias" },
    line: {
      es: "Llevo la tecnología de un negocio con 25 años de trayectoria, automatizando lo que antes se hacía a mano.",
      en: "I run technology at a 25-year-old business, automating what used to be done by hand.",
    },
    linkLabel: { es: "ver casos", en: "see cases" },
    target: "cases",
  },
  {
    key: "consulting",
    folder: { es: "consultoría/", en: "consulting/" },
    title: { es: "Software a medida", en: "Custom software" },
    line: {
      es: "Entiendo tu operación, encuentro el cuello de botella y construyo la solución por fases.",
      en: "I learn how your operation works, find the bottleneck, and build the solution in phases.",
    },
    linkLabel: { es: "cómo trabajo", en: "how I work" },
    target: "consulting",
  },
]

export type StatDef = {
  key: string
  value: string
  label: L
  /** Rendered in the accent color. */
  accent?: boolean
}

export const STATS: StatDef[] = [
  { key: "users", value: "+2k", label: { es: "usuarios en PULSE", en: "PULSE users" } },
  { key: "countries", value: "+4", label: { es: "países de Latinoamérica", en: "Latin American countries" } },
  {
    key: "verifica",
    value: "2h → <10min",
    accent: true,
    label: { es: "conciliación de pagos con Verifica", en: "payment reconciliation with Verifica" },
  },
  {
    key: "years",
    value: "5+",
    label: { es: "años construyendo software", en: "years building software" },
  },
]
