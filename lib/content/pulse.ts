import type { StaticImageData } from "next/image"
import type { L, LList } from "@/lib/i18n"
import type { ContactReason } from "@/lib/content/contact"

import LandingPulse1 from "@/assets/pulse/landing.png"
import LandingPulse2 from "@/assets/pulse/landing2.png"
import InterfazPulse from "@/assets/pulse/pulseinterfaz.png"

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
    es: "Plataforma para entrenadores fitness para gestionar clientes, rutinas, nutrición, pagos y progreso desde un solo lugar. Los entrenadores trabajan desde su app web y móvil; sus clientes siguen su plan y su progreso desde su propia app.",
    en: "A platform for fitness trainers to manage clients, routines, nutrition, payments and progress in one place. Trainers work from the web and mobile apps; their clients follow their plan and progress from their own app.",
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
    es: "Cofundador y COO en Chokotech LLC. Lidero el backend (Node.js, MongoDB, Google Cloud Run), buena parte del frontend (React Native, Next.js), y las operaciones y finanzas de la empresa.",
    en: "Co-founder and COO at Chokotech LLC. I lead the backend (Node.js, MongoDB, Google Cloud Run), much of the frontend (React Native, Next.js), and the company's operations and finance.",
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
  gallery: [
    { kind: "static", src: LandingPulse1, alt: { es: "Landing de PULSE", en: "PULSE landing page" } },
    { kind: "static", src: LandingPulse2, alt: { es: "Landing de PULSE (detalle)", en: "PULSE landing page (detail)" } },
    { kind: "static", src: InterfazPulse, alt: { es: "Interfaz de PULSE", en: "PULSE interface" } },
    // TODO: drop more screenshots in /public/pulse/ with these exact names and they will show up automatically.
    { kind: "file", src: "/pulse/pulse-1.png", alt: { es: "Captura de PULSE 1", en: "PULSE screenshot 1" } },
    { kind: "file", src: "/pulse/pulse-2.png", alt: { es: "Captura de PULSE 2", en: "PULSE screenshot 2" } },
  ] satisfies GalleryItem[],
}
