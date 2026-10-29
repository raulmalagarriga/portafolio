import type { StaticImageData } from "next/image"
import type { L, LList } from "@/lib/i18n"
import type { ContactReason } from "@/lib/content/contact"

import LandingPulse from "@/assets/pulse/landing.png"
import PhoneDashboard from "@/assets/pulse/Dashboard.png"

export type GalleryItem =
  | { kind: "static"; src: StaticImageData; alt: L }
  | { kind: "file"; src: string; alt: L }

export const PULSE = {
  name: "PULSE",
  company: "Chokotech LLC",
  tagline: {
    es: "La plataforma para entrenadores que quieren crecer sin perder clientes en el caos.",
    en: "The platform for trainers who want to grow without losing clients in the chaos.",
  } satisfies L,
  description: {
    es: "Clientes, rutinas, nutrición, pagos y progreso en un solo lugar. El entrenador trabaja desde web y móvil; sus atletas siguen su plan desde su propia app.",
    en: "Clients, routines, nutrition, payments and progress in one place. Trainers work from web and mobile; their athletes follow their plan from their own app.",
  } satisfies L,
  /** Short feature chips; the last one doubles as the platforms line. */
  chips: {
    es: ["rutinas", "agenda", "chat", "planes con IA", "marketplace", "iOS · Android · Web"],
    en: ["routines", "booking", "chat", "AI plans", "marketplace", "iOS · Android · Web"],
  } satisfies LList,
  role: {
    es: "Cofundador y COO. Lidero el backend y gran parte del frontend, además de las operaciones y finanzas de la empresa.",
    en: "Co-founder and COO. I lead the backend and much of the frontend, plus the company's operations and finance.",
  } satisfies L,
  stack: ["Node.js", "TypeScript", "MongoDB", "Google Cloud Run", "React Native", "Next.js", "Cloudflare R2"],
  links: {
    website: { es: "https://www.pulsefit.app/es", en: "https://www.pulsefit.app/en" } satisfies L,
  },
  apps: [
    {
      key: "trainer",
      name: { es: "PULSE Entrenadores", en: "PULSE Personal Trainers" } satisfies L,
      audience: { es: "entrenadores", en: "trainers" } satisfies L,
      appStore: "https://apps.apple.com/mx/app/pulse-personal-trainers/id6758558594",
      googlePlay: "https://play.google.com/store/apps/details?id=com.pulse.pulsetrainer",
    },
    {
      key: "athlete",
      name: { es: "PULSE Atletas", en: "PULSE Athlete" } satisfies L,
      audience: { es: "atletas", en: "athletes" } satisfies L,
      appStore: "https://apps.apple.com/mx/app/pulse-athlete/id6763801195",
      googlePlay: "https://play.google.com/store/apps/details?id=com.pulse.pulseclient",
    },
  ],
  investorCta: {
    label: {
      es: "¿Inviertes en startups? Hablemos",
      en: "Investing in startups? Let's talk",
    } satisfies L,
    reason: "pulse" as ContactReason,
  },
  /** Landing page with the phone app overlaid at the bottom right (both shown uncropped). */
  screens: {
    web: { src: LandingPulse, alt: { es: "Landing de PULSE", en: "PULSE landing page" } satisfies L },
    phone: { src: PhoneDashboard, alt: { es: "App móvil de PULSE · panel", en: "PULSE mobile app · dashboard" } satisfies L },
  },
}
