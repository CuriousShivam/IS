import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/admin/login", // custom login page
        signOut: "/",           // where to go after signout
    },
    session: {
        strategy: "jwt", // ✅ required for getToken()
    },
    callbacks: {
        async jwt({ token, user }) {
            // First time user logs in → persist user info
            if (user) {
                token.id = user?.id
                token.email = user?.email
                token.role = user?.role
            }
            return token
        },
        async session({ session, token }) {
            // Make token fields available in `session.user`
            if (token) {
                session.user = {
                    id: token.id as string,
                    email: token.email as string,
                    role: token.role as string,
                }
            }
            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnAdminRoute = nextUrl.pathname.startsWith("/admin")

            // If trying to access /admin/* but not logged in → block
            if (isOnAdminRoute && !isLoggedIn) {
                return false
            }

            // If logged in but on public route → redirect to /admin
            if (!isOnAdminRoute && isLoggedIn) {
                return Response.redirect(new URL("/admin", nextUrl))
            }

            if (nextUrl.pathname.startsWith("/admin/login") && isLoggedIn){
                return Response.redirect(new URL("/admin", nextUrl))
            }

            // Otherwise allow
            return true
        },
    },
    providers: [], // e.g. Google, Credentials, GitHub
} satisfies NextAuthConfig
