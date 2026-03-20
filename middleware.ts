import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 1. The actual logic Next.js was looking for

export function middleware(request: NextRequest) {
    const token = request.cookies.get('JSESSIONID')?.value;
    const { pathname } = request.nextUrl;

    // 1. If user is logged in and tries to access /login, send them to /admin
    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    // 2. Standard protection: Redirect to login if NO token for /admin routes
    if (pathname.startsWith('/admin') && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}
// 3.  matcher config
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}