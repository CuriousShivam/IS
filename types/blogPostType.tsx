export interface BlogPost {
    id?: string;
    title: string;
    slug: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    featuredImage: string;
    status: 'draft' | 'published';
    excerpt:string,
    isFeatured:boolean,
    category:'string',
    createdAt?: string;
    updatedAt?: string;
}