"use client"

import { useState, useEffect } from "react"

export default function TerminalBackground() {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  const terminalLines = [
    "> initializing system...",
    "> loading profile...",
    "> connecting to database...",
    "> importing modules...",
    "> setting up environment...",
    "> checking dependencies...",
    "> starting backend services...",
    "> system ready.",
  ]

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Typing effect
  useEffect(() => {
    if (currentLine >= terminalLines.length) return

    const currentFullLine = terminalLines[currentLine]

    if (charIndex < currentFullLine.length) {
      const timer = setTimeout(
        () => {
          setCharIndex(charIndex + 1)
        },
        Math.random() * 50 + 30,
      ) // Random typing speed for realistic effect
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, currentFullLine])
        setCurrentLine(currentLine + 1)
        setCharIndex(0)
      }, 500) // Pause before next line
      return () => clearTimeout(timer)
    }
  }, [currentLine, charIndex, terminalLines])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none">
      <div className="max-w-2xl w-full text-green-500 font-mono text-sm sm:text-base">
        {lines.map((line, index) => (
          <div key={index} className="mb-2">
            {line}
          </div>
        ))}
        {currentLine < terminalLines.length && (
          <div>
            {terminalLines[currentLine].substring(0, charIndex)}
            {showCursor && <span className="animate-pulse">_</span>}
          </div>
        )}
      </div>
    </div>
  )
}
