import type { StaticImageData } from "next/image"
import type { L } from "@/lib/i18n"

import SentimentHappy from "@/assets/sentiment/SentimentHappy.png"
import PlayingBattleship from "@/assets/battleship/Playing.png"

export type LabProjectDef = {
  key: string
  glyph: string
  name: string
  summary: L
  tech: string[]
  url?: string
  github?: string
  cover: StaticImageData
}

export const LAB_INTRO: L = {
  es: "Proyectos personales para experimentar.",
  en: "Side projects for experimenting.",
}

export const LAB: LabProjectDef[] = [
  {
    key: "sentiment",
    glyph: "SA",
    name: "Sentiment Analyzer",
    summary: {
      es: "API que determina el tono emocional del texto — positivo, neutral o negativo — y asigna una puntuación de polaridad.",
      en: "API that determines the emotional tone of text — positive, neutral, or negative — and assigns a polarity score.",
    },
    tech: ["Python", "FastAPI", "Next.js"],
    url: "https://happy-face-sentiment-analyzer.vercel.app/",
    github: "https://github.com/raulmalagarriga/sentimentAnalyzer",
    cover: SentimentHappy,
  },
  {
    key: "battleship",
    glyph: "BS",
    name: "Battleship Game",
    summary: {
      es: "Clásico battleship multijugador con chat en tiempo real integrado.",
      en: "Classic multiplayer battleship game with integrated real-time chat.",
    },
    tech: ["Node.js", "Express", "Socket.io"],
    github: "https://github.com/raulmalagarriga/Battleship_game",
    cover: PlayingBattleship,
  },
]
