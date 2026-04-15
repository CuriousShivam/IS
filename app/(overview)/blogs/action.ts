'use server'

import axios from "axios";

/**
 * Searches blogs by title or content.
 * Requirement 6.1.3: Dynamic Data Retrieval.
 */
// export async function getBlogsAction(query: string) {
//     try {
//         const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:8080";
//
//         // Don't fetch if the query is too short
//         if (!query || query.trim().length < 2) return { success: true, data: [] };
//
//         const res = await axios.get(`${baseUrl}/api/blogs/search`, {
//             params: { query: "" } ,// Sends as ?query=your_text,
//             headers: {
//                 // Manually setting the Cookie header for the Server-to-Server call
//                 'Content-Type': 'application/json',
//                 // Manually set Origin if your Spring Boot CORS is strict
//                 'Origin': process.env.NODE_PUBLIC_FRONTEND_BASE_URL
//             },
//             withCredentials: true
//         });
//
//         console.log("Res", res)
//
//         return {
//             success: true,
//             data: res.data
//         };
//     } catch (error: any) {
//         console.error("Search Action Error:", error.response?.data || error.message);
//         return {
//             success: false,
//             data: [],
//             error: "Search failed"
//         };
//     }
// }

export async function getBlogBySlugAction(slug: string) {
    const baseUrl = process.env.NODE_ENV_BACKEND_BASE_URL || "http://localhost:8080";
    const res = await fetch(`${baseUrl}/api/blogs/post/${slug}`);

    if (!res.ok) return { success: false };
    const data = await res.json();
    return { success: true, data };
}
// export async function searchBlogsAction(query: string) {
//     try {
//         const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:8080";
//
//         // Don't fetch if the query is too short
//         if (!query || query.trim().length < 2) return { success: true, data: [] };
//
//         const res = await axios.get(`${baseUrl}/api/blogs/search`, {
//             params: { query: query.trim() } // Sends as ?query=your_text
//         });
//
//         return {
//             success: true,
//             data: res.data
//         };
//     } catch (error: any) {
//         console.error("Search Action Error:", error.response?.data || error.message);
//         return {
//             success: false,
//             data: [],
//             error: "Search failed"
//         };
//     }
// }