"use client"

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react"

type StaggerProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export default function Stagger({ children, className = "", style }: StaggerProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const kids = Children.toArray(children).map((child, i) => {
    if (!isValidElement(child)) return child
    const element = child as ReactElement<{ style?: CSSProperties }>
    const existingStyle = element.props.style ?? {}
    const style = { ...existingStyle, ["--i" as string]: i } as CSSProperties
    return cloneElement(element, { style })
  })

  return (
    <div
      ref={ref}
      className={`stagger${shown ? " in" : ""}${className ? " " + className : ""}`}
      style={style}
    >
      {kids}
    </div>
  )
}
