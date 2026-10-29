import type { CSSProperties, ElementType, ReactNode } from "react"

type CardProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** Flat card: thin border, 12px radius, no window bar. Pane is reserved for PULSE and the contact form. */
export default function Card({ as: Tag = "div", children, className = "", style }: CardProps) {
  return (
    <Tag className={`flat-card${className ? " " + className : ""}`} style={style}>
      {children}
    </Tag>
  )
}
