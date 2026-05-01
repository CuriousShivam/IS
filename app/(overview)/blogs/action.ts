'use server'
import {BlogPost} from "@/types/blogPostType"
import axios from "axios";

/**
 * Searches blogs by title or content.
 * Requirement 6.1.3: Dynamic Data Retrieval.
 */
import { cache } from 'react';

// Use React 'cache' to memoize the function during a single render pass
export const getBlogPostsAction = cache(async (): Promise<BlogPost[]> => {
    try {
        const baseUrl = process.env.BASE_URL || "http://localhost:8080";

        const res = await fetch(
            `${baseUrl}/api/blogs?status=published`,
            {
                next: {
                    revalidate: 360, // 6 minutes
                },
            }
        );

        if (!res.ok) return [];

        const data = await res.json();

        return data.map((post: any) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            metaDescription: post.metaDescription || post.content?.substring(0, 160),
            featuredImage: post.featuredImage,
            createdAt: post.createdAt,
        }));
    } catch (error) {
        console.error('Error fetching blogs posts:', error);
        return [];
    }
});

export async function getBlogBySlugAction(slug: string) {
    const baseUrl = process.env.NODE_ENV_BACKEND_BASE_URL || "http://localhost:8080";


    const res = await fetch(`${baseUrl}/api/blogs/post/${slug}`, {
        next: {
            revalidate: 360,
        }
    });

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