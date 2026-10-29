import type { ReactNode, CSSProperties } from "react"

type PaneProps = {
  title?: ReactNode
  meta?: ReactNode
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** Terminal window with a title bar. Only for PULSE and the contact form; everything else is a Card. */
export default function Pane({ title, meta, children, className = "", style }: PaneProps) {
  return (
    <div className={`pane${className ? " " + className : ""}`} style={style}>
      {(title || meta) && (
        <div className="pane-head">
          <div className="tl" aria-hidden>
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
