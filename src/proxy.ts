import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const privateRoutes = ["/dashboard", "/settings"]
const authRoutes = ["/login", "/register"]

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const hasSession = request.cookies.has("accessToken")
    const isPrivateRoute = privateRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`),
    )

    if (!hasSession && isPrivateRoute) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (
        hasSession &&
        (pathname === "/" || authRoutes.includes(pathname))
    ) {
        return NextResponse.redirect(
            new URL("/dashboard/calendar", request.url),
        )
    }

    if (pathname === "/") {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/register",
        "/dashboard/:path*",
        "/settings/:path*",
    ],
}
