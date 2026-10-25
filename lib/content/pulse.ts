import type { StaticImageData } from "next/image"
import type { L, LList } from "@/lib/i18n"
import type { ContactReason } from "@/lib/content/contact"

import LandingPulse1 from "@/assets/pulse/landing.png"
import LandingPulse2 from "@/assets/pulse/landing2.png"
import InterfazPulse from "@/assets/pulse/pulseinterfaz.png"
import PhoneDashboard from "@/assets/pulse/Dashboard.png"
import PhoneInterfaz1 from "@/assets/pulse/Interfaz1.png"
import PhoneInterfaz2 from "@/assets/pulse/Interfaz2.png"
import PhoneLogin from "@/assets/pulse/login.png"

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
  metrics: [
    { value: "+2k", label: { es: "usuarios", en: "users" } satisfies L },
    { value: "+4", label: { es: "países de LatAm", en: "LatAm countries" } satisfies L },
    { value: "iOS · Android · Web", label: { es: "plataformas", en: "platforms" } satisfies L },
  ],
  features: {
    es: [
      "agendamiento de citas",
      "constructor de rutinas",
      "calendario interactivo",
      "chat en la app",
      "generador de planes con IA",
      "marketplace de productos digitales",
      "perfil público del entrenador",
    ],
    en: [
      "self-booking",
      "routine builder",
      "interactive calendar",
      "in-app chat",
      "AI plan generator",
      "digital products marketplace",
      "public trainer profile",
    ],
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
      audience: { es: "para entrenadores", en: "for trainers" } satisfies L,
      appStore: "https://apps.apple.com/mx/app/pulse-personal-trainers/id6758558594",
      googlePlay: "https://play.google.com/store/apps/details?id=com.pulse.pulsetrainer",
    },
    {
      key: "athlete",
      name: { es: "PULSE Atletas", en: "PULSE Athlete" } satisfies L,
      audience: { es: "para sus clientes", en: "for their clients" } satisfies L,
      appStore: "https://apps.apple.com/mx/app/pulse-athlete/id6763801195",
      googlePlay: "https://play.google.com/store/apps/details?id=com.pulse.pulseclient",
    },
  ],
  investorCta: {
    label: {
      es: "¿Inviertes en startups? Hablemos de PULSE",
      en: "Investing in startups? Let's talk about PULSE",
    } satisfies L,
    reason: "pulse" as ContactReason,
  },
  /** Wide web screenshots (shown in the main gallery, never cropped). */
  gallery: [
    { kind: "static", src: LandingPulse1, alt: { es: "Landing de PULSE", en: "PULSE landing page" } },
    { kind: "static", src: LandingPulse2, alt: { es: "Landing de PULSE (detalle)", en: "PULSE landing page (detail)" } },
    { kind: "static", src: InterfazPulse, alt: { es: "Panel web de PULSE", en: "PULSE web dashboard" } },
    // TODO: optional extra web screenshots in /public/pulse/ (hidden until the file exists).
    { kind: "file", src: "/pulse/pulse-1.png", alt: { es: "Captura de PULSE", en: "PULSE screenshot" } },
  ] satisfies GalleryItem[],
  /** Phone app screens (9:19.5), shown in a device frame beside the web gallery. */
  phone: [
    { kind: "static", src: PhoneDashboard, alt: { es: "App móvil · panel", en: "Mobile app · dashboard" } },
    { kind: "static", src: PhoneInterfaz1, alt: { es: "App móvil · rutina", en: "Mobile app · routine" } },
    { kind: "static", src: PhoneInterfaz2, alt: { es: "App móvil · detalle", en: "Mobile app · detail" } },
    { kind: "static", src: PhoneLogin, alt: { es: "App móvil · acceso", en: "Mobile app · login" } },
  ] satisfies GalleryItem[],
}
