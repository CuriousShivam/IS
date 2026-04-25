"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TiptapBlogEditor from "@/components/ui/rte";
import { getBlogByIdAction, updateBlogAction} from "@/app/(admin)/admin/actions";
import {BlogPost} from '@/types/blogPostType'



export default function EditPostBySlug() {
    const { id } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadBlog() {
            if (typeof id !== 'string') {
                setNotFound(true);
                setLoading(false);
                return;
            }
            const result = await getBlogByIdAction(id);
            if (result.success) {
                setPost(result.data);
            }
            setLoading(false);
        }
        loadBlog();
    }, [id]);

    const onSave = async (post: BlogPost ) => {

        try {

            // 2. Await the backend call to ensure the promise resolves
            const result = await updateBlogAction(post );

            return { success: true };
        } catch (error: any) {
            // console.error("Server Action Error:", error.message);
            alert(error.message);
            return {
                success: false,
                message: error.response?.data || "Database connection failed"
            };
        }
    };

    if (loading) {
        return <div>Loading post...</div>;
    }

    if (notFound || !post) {
        return <div>Post not found</div>;
    }

    return (
        <div>
            <TiptapBlogEditor initialPost={post} onSave={onSave} />
        </div>
    );
}
