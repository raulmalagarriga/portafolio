"use client"

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react"

type StaggerProps = {
  /** Container element; keep list semantics with "ol" / "ul" / "dl". */
  as?: ElementType
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** Children rise in one after another when the container enters the viewport. */
export default function Stagger({ as: Tag = "div", children, className = "", style }: StaggerProps) {
  const ref = useRef<HTMLElement | null>(null)
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
    <Tag ref={ref} className={`stagger${shown ? " in" : ""}${className ? " " + className : ""}`} style={style}>
      {kids}
    </Tag>
  )
}
