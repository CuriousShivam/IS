'use server'

import axios from "axios";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    try {
        // This call happens server-to-server. The client never sees this URL.

        const response = await axios.post(process.env.NODE_ENV_BACKEND_BASE_URL+"/api/auth/login", {
            email,
            passwordHash:password
        });

        if (response.status === 200) {
            // Store the JWT or Session in a secure cookie [cite: 164]
            const cookieStore = await cookies();

            // Extract JSESSIONID from the set-cookie header [cite: 164]
            const rawCookie = response.headers['set-cookie'];
            if (rawCookie && rawCookie[0]) {
                const jSessionId = rawCookie[0].split(';')[0].split('=')[1];

                // Save to browser with security flags [cite: 74, 77]
                cookieStore.set("JSESSIONID", jSessionId, {
                    httpOnly: true, // Prevents XSS [cite: 75]
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/",
                    maxAge: 3 * 60 * 60 // 3-hour session as per your DFD [cite: 679]
                });
            }

            return { success: true };
        }
    } catch (error) {
        return { success: false, message: "Invalid credentials" };
    }
}