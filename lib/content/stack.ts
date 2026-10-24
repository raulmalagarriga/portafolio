import type { L } from "@/lib/i18n"

export type StackCategory = {
  key: string
  letter: string
  title: L
  items: string[]
}

export const STACK: StackCategory[] = [
  {
    key: "frontend",
    letter: "F",
    title: { es: "Frontend", en: "Frontend" },
    items: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS"],
  },
  {
    key: "backend",
    letter: "B",
    title: { es: "Backend", en: "Backend" },
    items: ["Node.js", "Nest.js", ".NET", "Entity Framework", "FastAPI"],
  },
  {
    key: "databases",
    letter: "D",
    title: { es: "Bases de datos", en: "Databases" },
    items: ["MongoDB", "PostgreSQL", "SQL Server", "Redis", "Supabase"],
  },
  {
    key: "cloud",
    letter: "C",
    title: { es: "Cloud & DevOps", en: "Cloud & DevOps" },
    items: ["Google Cloud Run", "Cloudflare R2", "Vercel", "Docker", "GCP", "Ubuntu Server", "CI/CD", "GitHub Actions"],
  },
  {
    key: "tools",
    letter: "T",
    title: { es: "Herramientas", en: "Tools" },
    items: ["Git", "Postman", "Swagger", "Jira", "Claude Code", "Codex"],
  },
  {
    key: "concepts",
    letter: "K",
    title: { es: "Conceptos", en: "Concepts" },
    items: ["Clean Architecture", "Multi-tenancy", "Event-Driven", "Microservices", "Caching"],
  },
]
