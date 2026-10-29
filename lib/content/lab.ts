import type { L } from "@/lib/i18n"

/** `key` also selects the illustration in components/terminal/lab-illustrations.tsx. */
export type LabProjectDef = {
  key: "sentiment" | "battleship"
  name: string
  summary: L
  tech: string[]
  url?: string
  github?: string
}

export const LAB_INTRO: L = {
  es: "Proyectos personales para experimentar.",
  en: "Side projects for experimenting.",
}

export const LAB: LabProjectDef[] = [
  {
    key: "sentiment",
    name: "Sentiment Analyzer",
    summary: {
      es: "API que determina el tono emocional de un texto (positivo, neutral o negativo) y le asigna una puntuación de polaridad.",
      en: "API that determines the emotional tone of a text (positive, neutral or negative) and gives it a polarity score.",
    },
    tech: ["Python", "FastAPI", "Next.js"],
    url: "https://happy-face-sentiment-analyzer.vercel.app/",
    github: "https://github.com/raulmalagarriga/sentimentAnalyzer",
  },
  {
    key: "battleship",
    name: "Battleship Game",
    summary: {
      es: "El clásico battleship en versión multijugador, con chat en tiempo real integrado.",
      en: "The classic battleship game in multiplayer, with built-in real-time chat.",
    },
    tech: ["Node.js", "Express", "Socket.io"],
    github: "https://github.com/raulmalagarriga/Battleship_game",
  },
]
