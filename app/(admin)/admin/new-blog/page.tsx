'use client'
import RichTextEditor from "@/components/rte";

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

export default () => {
    const onSave = async (post: BlogPost) => {
        try{
        const res = await fetch(`/api/admin/posts/content`, {
            method: 'POST',
            body: JSON.stringify(post),
        })
        if(!res.ok){
            window.alert(res.status + ': ' + res.statusText)
        }else{
            window.alert(res.status + ': ' + res.statusText)
        }
        }catch(error){
            console.log(error);
            window.prompt(error);
        }
    }
    return (<>
        <RichTextEditor onSave={onSave}/>
    </>)
}