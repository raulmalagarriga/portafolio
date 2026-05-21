import ScrambleText from "@/components/terminal/scramble-text"

type SectionHeaderProps = {
  num: string
  file: string
  title: string
  sub?: string
}

export default function SectionHeader({ num, file, title, sub }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div className="sect-title">
        <span className="num">{num}</span>
        <span>—</span>
        <span style={{ color: "var(--ink-mute)" }}>
          ~/<span style={{ color: "var(--ink)" }}>{file}</span>
        </span>
        <span className="bar" />
      </div>
      <h2 className="sect-h">
        <ScrambleText text={title} duration={750} trigger="scroll" />
      </h2>
      {sub && <p className="sect-sub">{sub}</p>}
    </div>
  )
}
