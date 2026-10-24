import { NextResponse, type NextRequest } from "next/server"
import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE, detectLocale, isLocale } from "@/lib/i18n"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return NextResponse.next()

  const cookie = request.cookies.get(LOCALE_COOKIE)?.value
  const locale = isLocale(cookie)
    ? cookie
    : detectLocale(request.headers.get("accept-language")) || DEFAULT_LOCALE

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Skip Next internals, API routes and any path with a file extension (pdf, ico, xml, txt, png…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
}
