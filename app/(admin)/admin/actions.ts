// app/admin/blogs/actions.ts (or wherever your action lives)
'use server'

import axios from "axios";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

// 1. Must be an async function
export async function createBlogAction(post: any) {
    try {
        const baseUrl = process.env.NODE_ENV_BACKEND_BASE_URL || "http://localhost:8080";


        // 2. Await the backend call to ensure the promise resolves
        const res = await axios.post(`${baseUrl}/api/admin/blogs/create`, post, {
            headers: {
                'Content-Type': 'application/json',
                // 2. Pass the cookie to Spring Boot [cite: 21, 164]
                'Origin': process.env.NODE_PUBLIC_FRONTEND_BASE_URL
            },
            withCredentials: true // Important for CORS
        });

        return { success: true, status: res.status };
    } catch (error: any) {
        console.error("Server Action Error:", error.message);
        return {
            success: false,
            message: error.response?.data || "Database connection failed"
        };
    }
}
export async function getCategoriesAction() {
    try {

        const baseUrl = process.env.NODE_ENV_BACKEND_BASE_URL || "http://localhost:8080";

        // 2. Manually attach it to the backend call
        const res = await axios.get(`${baseUrl}/api/admin/categories`, {
            headers: {
                // Manually setting the Cookie header for the Server-to-Server call
                'Content-Type': 'application/json',
                // Manually set Origin if your Spring Boot CORS is strict
                'Origin': process.env.NODE_PUBLIC_FRONTEND_BASE_URL,
                'revalidate':360
            },
            withCredentials: true
        });
        return { success: true, data: res.data };
    } catch (error: any) {
        console.error("Action Error:", error.response?.status, error.response?.data);
        return { success: false, data: [] };
    }
}

export async function getBlogsAction() {
    try {
        const baseUrl = process.env.NODE_ENV_BACKEND_BASE_URL || "http://localhost:8080";

        // Requirement 6.1.3: Retrieves blog content from PostgreSQL
        const res = await axios.get(`${baseUrl}/api/admin/blogs`, {
            headers: {
                // Manually setting the Cookie header for the Server-to-Server call
                'Content-Type': 'application/json',
                // Manually set Origin if your Spring Boot CORS is strict
                'Origin': process.env.NODE_PUBLIC_FRONTEND_BASE_URL
            },
            withCredentials: true,

        });

        return {
            success: true,
            data: res.data // This should be an array of Blog objects
        };
    } catch (error: any) {
        console.error("Fetch Blogs Error:", error.response?.data || error.message);
        return {
            success: false,
            data: []
        };
    }
}

export async function getBlogByIdAction(id: string) {
    try {
        const baseUrl = process.env.NODE_ENV_BACKEND_BASE_URL || "http://localhost:8080";

        // Ensure the ID is valid before making the request
        if (!id) return { success: false, error: "ID is required" };

        const res = await axios.get(`${baseUrl}/api/admin/blogs/${id}`, {
            headers: {
                // Manually setting the Cookie header for the Server-to-Server call
                'Content-Type': 'application/json',
                // Manually set Origin if your Spring Boot CORS is strict
                'Origin': process.env.NODE_PUBLIC_FRONTEND_BASE_URL
            },
            withCredentials: true
        });

        return {
            success: true,
            data: res.data
        };
    } catch (error: any) {
        console.error(`Error fetching blog ${id}:`, error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data?.message || "Failed to fetch blog"
        };
    }
}
export async function updateBlogAction(post:any ) {
    try {

        const baseUrl = process.env.NODE_ENV_BACKEND_BASE_URL || "http://localhost:8080";
        post.category = post.category.id;

        // 2. Await the backend call to ensure the promise resolves
        const res = await axios.put(`${baseUrl}/api/admin/blogs/${post.id}`, post, {
            headers: {
                'Content-Type': 'application/json',
                // 2. Pass the cookie to Spring Boot [cite: 21, 164]
                'Origin': process.env.NODE_PUBLIC_FRONTEND_BASE_URL
            },
            withCredentials: true // Important for CORS

        });

        return { success: true, status: res.status };
    } catch (error: any) {
        console.error("Server Action Error:", error.message);
        return {
            success: false,
            message: error.response?.data || "Database connection failed"
        };
    }
}

export async function getAdminEnquiries() {
    try {
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString(); // Gets JSESSIONID or JWT

        const res = await axios.get(`${process.env.NODE_ENV_BACKEND_BASE_URL}/api/admin/enquiries/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': allCookies, // Manually forward the browser's cookies
                'Origin': process.env.NODE_PUBLIC_FRONTEND_BASE_URL,
            },
            withCredentials: true,
        });

        // Axios stores the JSON in .data
        return res.data;

    } catch (error: any) {
        console.error("Admin Fetch Error:", error.response?.status, error.message);

        // If it's a 403, your Spring Boot session might have expired
        if (error.response?.status === 403) {
            console.log("Access Denied: Check Spring Security path matching.");
        }

        return [];
    }
}
export async function deleteEnquiryAction(id: string) {
    try {
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        const res = await axios.delete(`${process.env.NODE_ENV_BACKEND_BASE_URL}/api/admin/enquiries/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': process.env.NODE_PUBLIC_FRONTEND_BASE_URL,
                'Cookie': allCookies,
            },
            withCredentials: true
        });


        // Revalidate the path so the UI updates
        revalidatePath('/admin/enquiries');
        return { success: true };

    } catch (error: any) {
        console.error("Delete Error:", error.response?.status);
        return { success: false, error: error.response?.status };
    }
}

export async function getAdminReviews() {
    try {
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        const res = await axios.get(`${process.env.NODE_ENV_BACKEND_BASE_URL}/api/admin/reviews/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': process.env.NODE_PUBLIC_FRONTEND_BASE_URL,
                'Cookie': allCookies,
            },
            withCredentials: true
        });
        return res.data;
    } catch (error: any) {
        console.error("Admin Fetch Reviews Error:", error.response?.status);
        return [];
    }
}

export async function updateReviewStatus(id: string, updates: any) {
    try {
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        const res = await axios.patch(`${process.env.NODE_ENV_BACKEND_BASE_URL}/api/admin/reviews/${id}`, updates, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': process.env.NODE_PUBLIC_FRONTEND_BASE_URL,
                'Cookie': allCookies,
            },
            withCredentials: true
        });
        // Clear cache for the public reviews page so changes reflect immediately
        revalidatePath('/admin/reviews');
        return { success: true, data: res.data };
    } catch (error: any) {
        console.error("Update Review Error:", error.response?.status);
        return { success: false, msg: "Failed to update review status" };
    }
}


export async function uploadImageAction(formData: FormData) {
    try {
        // We forward the formData directly to the Spring Boot backend
        const response = await fetch(`${process.env.NODE_ENV_BACKEND_BASE_URL}/api/admin/images/upload`, {
            method: "POST",
            body: formData, // FormData automatically sets the correct Multipart headers
            // Note: Do NOT manually set Content-Type header when sending FormData
            credentials: 'include',

        });


        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Backend upload failed");
        }

        const data = await response.json();
        return { success: true, data }; // This returns the saved 'images' table record
    } catch (error) {
        console.error("Upload Error:", error);
        return { success: false, error: "Upload failed" };
    }
}

export async function getImagesAction() {
    try {
        const response = await fetch(`${process.env.NODE_ENV_BACKEND_BASE_URL}/api/admin/images`,{
            credentials: 'include',
        });
        const data = await response.json();
        return { success: true, data: data };
    } catch (error:any) {
        console.error("Failed to fetch assets:", error);
        return { success: false, error: error.response?.status };
    }
}
export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('JSESSIONID');
}