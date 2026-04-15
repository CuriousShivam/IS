'use server'

import axios from "axios";

export async function submitEnquiryAction(formData: any) {
    try {
        const baseUrl = process.env.NODE_ENV_BACKEND_BASE_URL || "http://localhost:8080";

        const res = await fetch(`${baseUrl}/api/enquiries/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Origin":baseUrl
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            return { success: false, message: "Server rejected the request" };
        }

        return { success: true };
    } catch (error) {
        console.error("Action Error:", error);
        return { success: false, message: "Connection to backend failed" };
    }
}

export async function getApprovedReviews() {
    const baseUrl = process.env.NODE_ENV_BACKEND_BASE_URL || "http://localhost:8080";
    try {

        const res = await fetch(`${baseUrl}/api/reviews`, {
            next: { revalidate: 900 } // Cache for 1 hour to save CPU/RAM
        });

        if (!res.ok) return [];
        const data = await res.json();
        return data
    } catch (error) {
        console.error("Fetch Reviews Error:", error);
        return [];
    }
}

//  Submit a New Review (Public)
export async function submitReviewAction(data: { userName: string; rating: number; comment: string }) {
    const baseUrl = process.env.NODE_ENV_BACKEND_BASE_URL || "http://localhost:8080";
    try {
        const res = await axios.post(`${baseUrl}/api/reviews/submit`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': process.env.NODE_PUBLIC_FRONTEND_BASE_URL
            }
        });

if(res.status === 200) {return { success: true, message: res.data };}

    } catch (error: any) {
        console.error("Submit Review Error:", error.response?.status);
        return { success: false, message: "Submission failed" };
    }
}
