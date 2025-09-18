import type {NextAuthConfig} from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/admin',
        signOut: '/',
    },
    callbacks:{
        authorized({auth, request:{nextUrl}}){
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/admin/home");
            if (isOnDashboard) {
                return isLoggedIn;
            }else if(isLoggedIn){
                return Response.redirect(new URL('/admin/home', nextUrl));
            }
            return true;
        }
    },
    providers: []
} satisfies NextAuthConfig;

