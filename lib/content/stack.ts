import type { L } from "@/lib/i18n"

export type StackCategory = {
  key: string
  title: L
  items: string[]
  /** Label and items for the condensed `$ stack --top` card; categories without it are not shown there. */
  top?: { label: L; items: string[] }
}

export const STACK: StackCategory[] = [
  {
    key: "frontend",
    title: { es: "Frontend", en: "Frontend" },
    items: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS"],
    top: { label: { es: "frontend", en: "frontend" }, items: ["React", "Next.js", "React Native", "TypeScript"] },
  },
  {
    key: "backend",
    title: { es: "Backend", en: "Backend" },
    items: ["Node.js", "Nest.js", ".NET", "Entity Framework", "FastAPI"],
    top: { label: { es: "backend", en: "backend" }, items: ["Node.js", "Nest.js", ".NET", "FastAPI"] },
  },
  {
    key: "databases",
    title: { es: "Bases de datos", en: "Databases" },
    items: ["MongoDB", "PostgreSQL", "SQL Server", "Redis", "Supabase"],
    top: { label: { es: "datos", en: "data" }, items: ["MongoDB", "PostgreSQL", "Redis"] },
  },
  {
    key: "cloud",
    title: { es: "Cloud & DevOps", en: "Cloud & DevOps" },
    items: ["Google Cloud Run", "Cloudflare R2", "Vercel", "Docker", "GCP", "Ubuntu Server", "CI/CD", "GitHub Actions"],
    top: { label: { es: "cloud", en: "cloud" }, items: ["Cloud Run", "Cloudflare R2", "Vercel", "Docker"] },
  },
  {
    key: "tools",
    title: { es: "Herramientas", en: "Tools" },
    items: ["Git", "Postman", "Swagger", "Jira", "Claude Code", "Codex"],
  },
  {
    key: "concepts",
    title: { es: "Conceptos", en: "Concepts" },
    items: ["Clean Architecture", "Multi-tenancy", "Event-Driven", "Microservices", "Caching"],
  },
]
