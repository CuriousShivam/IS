'use client'; // Change this to 'use client'

import RichTextEditor from "@/components/ui/rte";
import {createBlogAction} from "@/app/(admin)/admin/actions";
import {BlogPost} from "@/types/blogPostType";


export default function NewBlogPage() {
    const onSave = async (post: BlogPost) => {

        try {
            // Await the backend call to ensure the promise resolves
            const result = await createBlogAction(post);
            return result.success;
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