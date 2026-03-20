'use client'; // Change this to 'use client'

import RichTextEditor from "@/components/rte";
import {createBlogAction, getCategoriesAction} from "@/app/(admin)/admin/actions";
import axios from "axios";

interface BlogPost {
    id?: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    isFeatured:false;
    // featuredImage: string;
    status: 'draft' | 'published';
    category:string;
    // createdAt?: Date;
    // updatedAt?: Date;
}

export default function NewBlogPage() {
    const onSave = async (post: BlogPost) => {

        try {

            // 2. Await the backend call to ensure the promise resolves
            const result = await createBlogAction(post);
            return { success: true };
        } catch (error: any) {
            // console.error("Server Action Error:", error.message);
            return {
                success: false,
                message: error.response?.data || "Database connection failed"
            };
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
            <RichTextEditor onSave={onSave}/>
        </div>
    );
}