import type { ReactElement } from "react"
import type { LabProjectDef } from "@/lib/content/lab"

/**
 * Lab card illustrations (from the light-redesign reference). `currentColor` is the accent;
 * #5a626f / #3a3f4a are the neutral strokes.
 */

type ArtProps = { label: string }

function SentimentArt({ label }: ArtProps) {
  return (
    <svg width="240" height="92" viewBox="0 0 240 92" fill="none" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={label}>
      <g stroke="#5a626f" strokeWidth="1.6">
        <circle cx="40" cy="32" r="18" />
        <path d="M31 42 q9 -7 18 0" />
        <circle cx="120" cy="32" r="18" />
        <path d="M111 41 h18" />
      </g>
      <g fill="#5a626f">
        <circle cx="34" cy="27" r="1.8" />
        <circle cx="46" cy="27" r="1.8" />
        <circle cx="114" cy="27" r="1.8" />
        <circle cx="126" cy="27" r="1.8" />
      </g>
      <g stroke="currentColor" strokeWidth="1.8">
        <circle cx="200" cy="32" r="18" />
        <path d="M190 37 q10 10 20 0" />
      </g>
      <g fill="currentColor">
        <circle cx="194" cy="27" r="1.8" />
        <circle cx="206" cy="27" r="1.8" />
      </g>
      <path d="M22 74 H218" stroke="#3a3f4a" strokeWidth="1.5" />
      <path d="M22 70 v8 M120 70 v8 M218 70 v8" stroke="#5a626f" strokeWidth="1.5" />
      <path d="M120 74 H189" stroke="currentColor" strokeWidth="2" />
      <circle cx="189" cy="74" r="4.5" fill="currentColor" />
      <text x="189" y="90" textAnchor="middle" fill="currentColor" style={{ font: "500 9.5px 'JetBrains Mono', monospace" }}>
        +0.82
      </text>
    </svg>
  )
}

function BattleshipArt({ label }: ArtProps) {
  return (
    <svg width="240" height="92" viewBox="0 0 240 92" fill="none" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={label}>
      <path
        d="M20 14 h112 v64 h-112 z M36 14 v64 M52 14 v64 M68 14 v64 M84 14 v64 M100 14 v64 M116 14 v64 M20 30 h112 M20 46 h112 M20 62 h112"
        stroke="#3a3f4a"
        strokeWidth="1.2"
      />
      <rect x="38" y="33" width="44" height="10" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M72 34 l8 8 M80 34 l-8 8" stroke="currentColor" strokeWidth="1.8" />
      <g fill="#5a626f">
        <circle cx="108" cy="22" r="2" />
        <circle cx="28" cy="70" r="2" />
        <circle cx="92" cy="54" r="2" />
        <circle cx="60" cy="22" r="2" />
      </g>
      <g stroke="currentColor" strokeWidth="1.5">
        <circle cx="108" cy="70" r="6" />
        <path d="M108 60 v4 M108 76 v4 M98 70 h4 M114 70 h4" />
      </g>
      <path
        d="M152 20 h44 a5 5 0 0 1 5 5 v12 a5 5 0 0 1 -5 5 h-34 l-6 6 v-6 h-4 a5 5 0 0 1 -5 -5 v-12 a5 5 0 0 1 5 -5 z"
        stroke="#5a626f"
        strokeWidth="1.5"
      />
      <path d="M156 28 h30 M156 34 h20" stroke="#5a626f" strokeWidth="1.5" />
      <path
        d="M176 52 h44 a5 5 0 0 1 5 5 v12 a5 5 0 0 1 -5 5 h-4 v6 l-6 -6 h-34 a5 5 0 0 1 -5 -5 v-12 a5 5 0 0 1 5 -5 z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M181 60 h28 M181 66 h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export const LAB_ILLUSTRATIONS: Record<LabProjectDef["key"], (props: ArtProps) => ReactElement> = {
  sentiment: SentimentArt,
  battleship: BattleshipArt,
}
