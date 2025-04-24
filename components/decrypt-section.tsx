"use client"

import { useRef, useEffect, useState } from "react"
import DecryptText from "@/components/decrypt-text"

interface DecryptSectionProps {
  items: string[]
  prefix?: string
  className?: string
  itemClassName?: string
  itemDelay?: number
}

export default function DecryptSection({
  items,
  prefix = "$",
  className = "",
  itemClassName = "",
  itemDelay = 150,
}: DecryptSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLUListElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)

          // Add a debug message to console
          console.log("Skills section is now visible, triggering animation")

          // Once visible and animated, no need to observe anymore
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current)
          }
        }
      },
      {
        threshold: 0.1, // Trigger when just 10% of the element is visible
        rootMargin: "0px 0px -10% 0px", // Trigger slightly before the element is fully in view
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [hasAnimated])

  return (
    <ul ref={sectionRef} className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className={`flex items-center gap-2 ${itemClassName}`}>
          <span className="text-theme">{prefix}</span>{" "}
          <DecryptText text={item} startDelay={index * itemDelay} duration={1500} isVisible={isVisible} />
        </li>
      ))}
    </ul>
  )
}
