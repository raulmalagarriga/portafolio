import type { StaticImageData } from "next/image"

import ProfilePhoto from "@/assets/profile-photo.png"

import SliveMenu from "@/assets/slive/sliveMenu.png"
import SliveChat from "@/assets/slive/sliveChat.png"
import SliveInterfaz from "@/assets/slive/SLIVE2.png"

import SentimentNeutral from "@/assets/sentiment/SentimentNeutral.png"
import SentimentHappy from "@/assets/sentiment/SentimentHappy.png"

import WaitingBattleship from "@/assets/battleship/Waiting.png"
import PlayingBattleship from "@/assets/battleship/Playing.png"

import LandingPulse1 from "@/assets/pulse/landing.png"
import LandingPulse2 from "@/assets/pulse/landing2.png"
import InterfazPulse from "@/assets/pulse/pulseinterfaz.png"

export type IconName =
  | "github"
  | "linkedin"
  | "external"
  | "arrow"
  | "send"
  | "download"
  | "search"
  | "chevronLeft"
  | "chevronRight"
  | "close"
  | "terminal"
  | "menu"
  | "medium"
  | "palette"
  | "cpu"

export type SectionDef = {
  id: SectionId
  labelKey: string
  file: string
  num: string
}

export type SectionId = "home" | "about" | "projects" | "links" | "contact"

export const SECTIONS: SectionDef[] = [
  { id: "home", labelKey: "nav.home", file: "index.tsx", num: "01" },
  { id: "about", labelKey: "nav.about", file: "about.tsx", num: "02" },
  { id: "projects", labelKey: "nav.projects", file: "projects.tsx", num: "03" },
  { id: "links", labelKey: "nav.links", file: "links.tsx", num: "04" },
  { id: "contact", labelKey: "nav.contact", file: "contact.tsx", num: "05" },
]

export const HERO_TITLE_KEYS = [
  "hero.title.fullstack",
  "hero.title.architect",
  "hero.title.engineer",
] as const

export type SkillCategory = {
  letter: string
  titleKey: string
  items: string[]
}

export const SKILLS: SkillCategory[] = [
  { letter: "F", titleKey: "skills.frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { letter: "B", titleKey: "skills.backend", items: [".NET", "Entity Framework", "Node.js", "Nest.js", "FastAPI"] },
  { letter: "D", titleKey: "skills.databases", items: ["PostgreSQL", "SQL Server", "MongoDB", "Redis", "Supabase"] },
  { letter: "C", titleKey: "skills.cloud", items: ["Docker", "Ubuntu Server", "CI/CD", "GitHub Actions", "GCP"] },
  { letter: "T", titleKey: "skills.tools", items: ["Git", "Postman", "Swagger", "Jira", "Claude Code", "Codex"] },
  { letter: "K", titleKey: "skills.concepts", items: ["Clean Architecture", "Multi-tenancy", "Event-Driven", "Microservices", "Caching"] },
]

export type ProjectDef = {
  key: string
  nameKey: string
  glyph: string
  tech: string[]
  url?: string
  github?: string
  summaryKey: string
  longKey: string
  gallery: StaticImageData[]
  cover: StaticImageData
}

export const PROJECTS: ProjectDef[] = [
  {
    key: "slive",
    nameKey: "projects.slive.name",
    glyph: "SL",
    tech: [".NET", "Next.js", "MongoDB", "PostgreSQL", "Redis", "Docker"],
    url: "https://slive.ai/",
    summaryKey: "projects.slive.summary",
    longKey: "projects.slive.long",
    gallery: [SliveMenu, SliveChat, SliveInterfaz],
    cover: SliveInterfaz,
  },
  {
    key: "sentiment",
    nameKey: "projects.sentiment.name",
    glyph: "SA",
    tech: ["Python", "Next.js", "FastAPI"],
    url: "https://happy-face-sentiment-analyzer.vercel.app/",
    github: "https://github.com/raulmalagarriga/sentimentAnalyzer",
    summaryKey: "projects.sentiment.summary",
    longKey: "projects.sentiment.long",
    gallery: [SentimentNeutral, SentimentHappy],
    cover: SentimentHappy,
  },
  {
    key: "battleship",
    nameKey: "projects.battleship.name",
    glyph: "BS",
    tech: ["Node.js", "JavaScript", "Express", "Socket.io"],
    github: "https://github.com/raulmalagarriga/Battleship_game",
    summaryKey: "projects.battleship.summary",
    longKey: "projects.battleship.long",
    gallery: [PlayingBattleship, WaitingBattleship],
    cover: PlayingBattleship,
  },
  {
    key: "pulse",
    nameKey: "projects.pulse.name",
    glyph: "PL",
    tech: ["Node.js", "TypeScript", "MongoDB", "React Native", "Next.js", "Docker"],
    url: "https://www.pulsefit.app/en",
    summaryKey: "projects.pulse.summary",
    longKey: "projects.pulse.long",
    gallery: [LandingPulse1, LandingPulse2, InterfazPulse],
    cover: LandingPulse1,
  },
]

export type LinkDef = {
  key: "github" | "linkedin" | "blog" | "resume"
  icon: IconName
  url: string
}

export const LINKS: LinkDef[] = [
  { key: "github", icon: "github", url: "https://github.com/raulmalagarriga" },
  { key: "linkedin", icon: "linkedin", url: "https://www.linkedin.com/in/rjmalagarrigat/" },
  { key: "blog", icon: "medium", url: "https://medium.com/@rjmalagarrigat" },
  { key: "resume", icon: "download", url: "/Resume-RaulJMalagarriga.pdf" },
]

export const PROFILE_PHOTO = ProfilePhoto

// Deterministic pseudo-random heatmap (so it doesn't flicker on rerender)
export function makeHeatmap(weeks = 26, daysPerWeek = 7, seed = 7): number[] {
  let s = seed
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const arr: number[] = []
  for (let i = 0; i < weeks * daysPerWeek; i++) {
    const v = rnd()
    const level = v < 0.45 ? 0 : v < 0.7 ? 1 : v < 0.86 ? 2 : v < 0.96 ? 3 : 4
    arr.push(level)
  }
  return arr
}
