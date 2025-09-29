"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TiptapBlogEditor from "@/components/rte";

interface BlogPost {
    id?: string;
    title: string;
    slug: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    featuredImage: string;
    status: 'draft' | 'published';
    createdAt?: Date;
    updatedAt?: Date;
}

export default function EditPostBySlug() {
    const { slug } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/admin/posts/content?slug=${slug}`, {
                    cache: "no-store",
                });

                if (!res.ok) {
                    setNotFound(true);
                    setLoading(false);
                    return;
                }

                const data = await res.json();

                if (data?.error) {
                    setNotFound(true);
                } else {
                    setPost(data);
                }
            } catch (err) {
                console.error("Failed to fetch post:", err);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    const onSave = async (post: BlogPost) => {
        try{
            const res = await fetch(`/api/admin/posts/content`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
                cache: "no-store",
            })

                window.alert(res.status + ': ' + res.statusText)

        }catch(error){
            console.log(error);
            window.alert(error);
        }
    }

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
