// app/admin/blogs/actions.ts (or wherever your action lives)
'use server'

import axios from "axios";
import {cookies} from "next/headers";

// 1. Must be an async function
export async function createBlogAction(post: any) {
    try {
        const baseUrl = process.env.BACKEND_BASE_URL || "http://localhost:8080";


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

        const baseUrl = process.env.BACKEND_BASE_URL || "http://localhost:8080";

        // 2. Manually attach it to the backend call
        const res = await axios.get(`${baseUrl}/api/admin/categories`, {
            headers: {
                // Manually setting the Cookie header for the Server-to-Server call
                'Content-Type': 'application/json',
                // Manually set Origin if your Spring Boot CORS is strict
                'Origin': process.env.NODE_PUBLIC_FRONTEND_BASE_URL
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
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:8080";

        // Requirement 6.1.3: Retrieves blog content from PostgreSQL
        const res = await axios.get(`${baseUrl}/api/admin/blogs`, {
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
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:8080";

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
        console.log(res.data);
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
export async function updateBlogAction(post ) {
    try {
        console.log("Post: ", post);
        console.log("Id: ", post.id);
        const baseUrl = process.env.BACKEND_BASE_URL || "http://localhost:8080";
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