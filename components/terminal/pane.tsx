import type { ReactNode, CSSProperties } from "react"

type PaneProps = {
  title?: ReactNode
  meta?: ReactNode
  corners?: boolean
  hoverable?: boolean
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export default function Pane({
  title,
  meta,
  corners = false,
  hoverable = false,
  children,
  className = "",
  style,
}: PaneProps) {
  return (
    <div className={`pane${hoverable ? " hoverable" : ""}${className ? " " + className : ""}`} style={style}>
      {corners && (
        <>
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
        </>
      )}
      {(title || meta) && (
        <div className="pane-head">
          <div className="tl">
            <span />
            <span />
            <span />
          </div>
          {title && <div className="pane-title">{title}</div>}
          {meta && <div className="pane-meta">{meta}</div>}
        </div>
      )}
      <div className="pane-body">{children}</div>
    </div>
  )
}
