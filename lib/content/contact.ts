import type { L } from "@/lib/i18n"

export type ContactReason = "consulting" | "pulse" | "collab" | "other"

export const CONTACT_REASONS: { id: ContactReason; label: L }[] = [
  { id: "consulting", label: { es: "Consultoría / proyecto a medida", en: "Consulting / custom project" } },
  { id: "pulse", label: { es: "PULSE / inversión", en: "PULSE / investment" } },
  { id: "collab", label: { es: "Colaboración", en: "Collaboration" } },
  { id: "other", label: { es: "Otro", en: "Other" } },
]

export function isContactReason(value: string | null | undefined): value is ContactReason {
  return !!value && CONTACT_REASONS.some((r) => r.id === value)
}
