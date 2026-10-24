import Portfolio from "@/components/portfolio"
import { availableScreenshots } from "@/lib/screenshots"

export default function LocalePage() {
  // Computed at build time: which optional screenshots exist in /public.
  const shots = availableScreenshots()
  return <Portfolio availableScreenshots={shots} />
}
