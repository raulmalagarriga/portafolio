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

export type SectionId = "home" | "pulse" | "cases" | "experience" | "consulting" | "contact"

export type SectionDef = {
  id: SectionId
  labelKey: string
  /** Path shown in the section header (e.g. "~/casos"). */
  pathKey: string
  file: string
  num: string
}

export const SECTIONS: SectionDef[] = [
  { id: "home", labelKey: "nav.home", pathKey: "path.home", file: "index.tsx", num: "01" },
  { id: "pulse", labelKey: "nav.pulse", pathKey: "path.pulse", file: "pulse.tsx", num: "02" },
  { id: "cases", labelKey: "nav.cases", pathKey: "path.cases", file: "cases/", num: "03" },
  { id: "experience", labelKey: "nav.experience", pathKey: "path.experience", file: "experience.tsx", num: "04" },
  { id: "consulting", labelKey: "nav.consulting", pathKey: "path.consulting", file: "consulting.tsx", num: "05" },
  { id: "contact", labelKey: "nav.contact", pathKey: "path.contact", file: "contact.tsx", num: "06" },
]

export function sectionDef(id: SectionId): SectionDef {
  return SECTIONS.find((s) => s.id === id)!
}

export type LinkDef = {
  key: "github" | "linkedin" | "blog"
  icon: IconName
  url: string
}

export const LINKS: LinkDef[] = [
  { key: "github", icon: "github", url: "https://github.com/raulmalagarriga" },
  { key: "linkedin", icon: "linkedin", url: "https://www.linkedin.com/in/rjmalagarrigat/" },
  { key: "blog", icon: "medium", url: "https://medium.com/@rjmalagarrigat" },
]

export const SOCIAL = {
  github: "https://github.com/raulmalagarriga",
  linkedin: "https://www.linkedin.com/in/rjmalagarrigat/",
  medium: "https://medium.com/@rjmalagarrigat",
  email: "rjmalagarrigat@gmail.com",
}

export const PROFILE_PHOTO = ProfilePhoto
