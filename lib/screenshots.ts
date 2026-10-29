import fs from "node:fs"
import path from "node:path"
import { CASES } from "@/lib/content/cases"

/** Public-folder screenshot paths referenced by the content (e.g. "/cases/verifica-1.png"). */
export function expectedScreenshotPaths(): string[] {
  const paths = new Set<string>()
  for (const c of CASES) for (const item of c.gallery) if (item.kind === "file") paths.add(item.src)
  return Array.from(paths)
}

/**
 * Server-only. Returns which expected screenshots actually exist in /public,
 * so the UI can swap the "screenshot coming soon" placeholder for the real image
 * without any code change — just drop the file in and redeploy.
 */
export function availableScreenshots(): string[] {
  const publicDir = path.join(process.cwd(), "public")
  return expectedScreenshotPaths().filter((p) => {
    try {
      return fs.existsSync(path.join(publicDir, p))
    } catch {
      return false
    }
  })
}
