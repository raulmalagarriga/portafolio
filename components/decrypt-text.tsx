"use client"

import { useState, useEffect, useRef } from "react"

interface DecryptTextProps {
  text: string
  delay?: number
  duration?: number
  startDelay?: number
  className?: string
  onComplete?: () => void
  isVisible?: boolean
  preserveSpace?: boolean
  animationColor?: string
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?~`-=[]\\;',./\""

export default function DecryptText({
  text,
  delay = 50,
  duration = 2000,
  startDelay = 0,
  className = "",
  onComplete,
  isVisible = false,
  preserveSpace = true,
  animationColor = "",
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isDecrypting, setIsDecrypting] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const hasStartedRef = useRef(false)
  // const hasCompletedRef = useRef(false)

  // Initialize with placeholder spaces to preserve layout
  useEffect(() => {
    if (preserveSpace && !displayText) {
      setDisplayText(text.replace(/./g, " "))
    }
  }, [text, preserveSpace, displayText])

  // Reset animation when visibility changes
  useEffect(() => {
    if (isVisible) {
      // Always start animation when section becomes visible
      hasStartedRef.current = false
      startAnimation()
    } else {
      // Reset when section is no longer visible
      if (preserveSpace) {
        setDisplayText(text.replace(/./g, " "))
      } else {
        setDisplayText("")
      }
      setIsDecrypting(false)
      hasStartedRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isVisible, preserveSpace, text])

  // Start the animation
  const startAnimation = () => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    setTimeout(() => {
      setIsDecrypting(true)
      startTimeRef.current = Date.now()

      // Generate initial random text of the same length
      setDisplayText(
        Array(text.length)
          .fill(0)
          .map((_, i) => (text[i] === " " ? " " : characters.charAt(Math.floor(Math.random() * characters.length))))
          .join(""),
      )

      // Start the interval for updating the text
      intervalRef.current = setInterval(updateText, delay)
    }, startDelay)
  }

  // Update the text during animation
  const updateText = () => {
    if (!startTimeRef.current) return

    const elapsedTime = Date.now() - startTimeRef.current
    const progress = Math.min(elapsedTime / duration, 1)

    // Calculate how many characters should be revealed
    const revealIndex = Math.floor(text.length * progress)

    // Create the new display text
    let newDisplayText = ""
    for (let i = 0; i < text.length; i++) {
      if (i < revealIndex) {
        // Characters before the reveal index are shown correctly
        newDisplayText += text[i]
      } else if (i === revealIndex) {
        // Character at the reveal index has a chance to be correct
        // Always preserve spaces
        if (text[i] === " ") {
          newDisplayText += " "
        } else {
          newDisplayText +=
            Math.random() < 0.5 ? text[i] : characters.charAt(Math.floor(Math.random() * characters.length))
        }
      } else {
        // Characters after the reveal index are random
        // Always preserve spaces
        if (text[i] === " ") {
          newDisplayText += " "
        } else {
          newDisplayText += characters.charAt(Math.floor(Math.random() * characters.length))
        }
      }
    }

    setDisplayText(newDisplayText)

    // Check if animation is complete
    if (progress >= 1) {
      setDisplayText(text)
      setIsDecrypting(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (onComplete) onComplete()
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <span className={`font-mono ${isDecrypting && animationColor ? animationColor : ""} ${className}`}>
      {displayText || text}
    </span>
  )
}
