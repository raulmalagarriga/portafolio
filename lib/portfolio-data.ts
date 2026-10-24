import ProfilePhoto from "@/assets/profile-photo.png"

export type IconName =
  | "github"
  | "linkedin"
  | "external"
  | "arrow"
  | "send"
  | "download"
  | "search"
  | "chevronLeft"
  | "chevronRight"
  | "close"
  | "terminal"
  | "menu"
  | "medium"
  | "palette"
  | "cpu"

export type SectionId =
  | "home"
  | "what-i-do"
  | "pulse"
  | "cases"
  | "experience"
  | "consulting"
  | "lab"
  | "stack"
  | "links"
  | "contact"

export type SectionDef = {
  id: SectionId
  labelKey: string
  file: string
  num: string
  /** Lower-priority tabs are hidden on narrow desktop widths (they stay reachable via ⌘K). */
  secondary?: boolean
}

export const SECTIONS: SectionDef[] = [
  { id: "home", labelKey: "nav.home", file: "index.tsx", num: "01" },
  { id: "what-i-do", labelKey: "nav.what-i-do", file: "what-i-do.tsx", num: "02" },
  { id: "pulse", labelKey: "nav.pulse", file: "pulse.tsx", num: "03" },
  { id: "cases", labelKey: "nav.cases", file: "cases.tsx", num: "04" },
  { id: "experience", labelKey: "nav.experience", file: "experience.tsx", num: "05" },
  { id: "consulting", labelKey: "nav.consulting", file: "consulting.tsx", num: "06" },
  { id: "lab", labelKey: "nav.lab", file: "lab.tsx", num: "07", secondary: true },
  { id: "stack", labelKey: "nav.stack", file: "stack.tsx", num: "08", secondary: true },
  { id: "links", labelKey: "nav.links", file: "links.tsx", num: "09", secondary: true },
  { id: "contact", labelKey: "nav.contact", file: "contact.tsx", num: "10" },
]

export function sectionNum(id: SectionId): string {
  return SECTIONS.find((s) => s.id === id)?.num ?? "00"
}

export type LinkDef = {
  key: "github" | "linkedin" | "blog" | "resume"
  icon: IconName
  url: string
}

export const LINKS: LinkDef[] = [
  { key: "github", icon: "github", url: "https://github.com/raulmalagarriga" },
  { key: "linkedin", icon: "linkedin", url: "https://www.linkedin.com/in/rjmalagarrigat/" },
  { key: "blog", icon: "medium", url: "https://medium.com/@rjmalagarrigat" },
  { key: "resume", icon: "download", url: "/Resume-RaulJMalagarriga.pdf" },
]

export const SOCIAL = {
  github: "https://github.com/raulmalagarriga",
  linkedin: "https://www.linkedin.com/in/rjmalagarrigat/",
  medium: "https://medium.com/@rjmalagarrigat",
  email: "rjmalagarrigat@gmail.com",
}

export const PROFILE_PHOTO = ProfilePhoto
