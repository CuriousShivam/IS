// app/blogs/page.tsx - Blog List Page
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import SafeImage from "@/components/admin/media/safeImage";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    featuredImage: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const baseUrl = process.env.BASE_URL || "http://localhost:8080";
        const res = await fetch(
            `${baseUrl}/api/blogs?status=published`,
            {cache: 'no-store',
                next: {
                    revalidate:  0,
                },
            }
        );


        if (!res.ok) return [];

        const data = await res.json();


        // OPTIMIZATION: Map only the required fields for the UI
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
}

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ''); // Strip HTML tags
    const wordCount = textContent.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

// Helper function to format date
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Helper function to get excerpt
function getExcerpt(description: string, maxLength: number = 150): string {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + '...';
}

export default async function BlogListPage() {
    const posts = await getBlogPosts();
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
    // Generate JSON-LD for blogs list
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Your Blog Name", // replace with your site/blogs name
        description: "Latest articles and insights",
        url: `${baseUrl}/blog`,
        publisher: {
            "@type": "Organization",
            name: "Your Blog Name", // or company name
            logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.png`, // your logo
            },
        },
        blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription,
            image: post.featuredImage ? [post.featuredImage] : [],
            datePublished: post.createdAt,
            dateModified: post.updatedAt,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
                "@type": "Person",
                name: "Your Name", // replace or fetch dynamically
            },
            publisher: {
                "@type": "Organization",
                name: "Your Blog Name",
                logo: {
                    "@type": "ImageObject",
                    url: `${baseUrl}/logo.png`,
                },
            },
            mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${baseUrl}/blog/${post.slug}`,
            },
        })),
    };

    return (
        <>
            {/* JSON-LD Script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="min-h-screen bg-gray-50">
                {/* Hero & Stats Bar Sections remain the same */}

                <main className="max-w-6xl mx-auto  py-20 px-6">
                    {posts.length === 0 ? (
                        <div className="text-center p-12">
                            <h2 className="text-2xl font-bold">No Posts Yet</h2>
                        </div>
                    ) : (
                        <>
                            {/* Featured Post (First Post) */}
                            <article className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
                                <div className="grid md:grid-cols-2">
                                    <div className="relative h-64 md:h-full">
                                        <SafeImage
                                            src={posts[0].featuredImage || "/placeholder.png"}
                                            alt={posts[0].title}
                                            fill
                                        />
                                    </div>
                                    <div className="p-8">
                                        <h2 className="text-3xl font-bold mb-4">
                                             <Link href={`/blogs/${posts[0].slug}`}>{posts[0].title}</Link>
                                        </h2>
                                        <p className="text-gray-700 mb-6">
                                            {getExcerpt(posts[0].metaDescription, 200)}
                                        </p>
                                        <Link href={`/blogs/${posts[0].slug}`} className="text-blue-600 font-semibold flex items-center gap-2">
                                            Read Full Article <ArrowRight size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </article>

                            {/* Regular Posts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.slice(1).map((post) => (
                                    <article key={post.id} className="bg-white rounded-lg shadow-md flex flex-col">
                                        <Link href={`/blogs/${post.slug}`} className="relative h-48">
                                            <SafeImage src={post.featuredImage || "/placeholder.png"} alt={post.title} fill sizes={'auto'} />
                                        </Link>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h2 className="text-xl font-bold mb-3 hover:text-blue-600">
                                                <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                                            </h2>
                                            <p className="text-gray-600 line-clamp-3 mb-4">{post.metaDescription}</p>
                                            <Link href={`/blogs/${post.slug}`} className="text-blue-600 mt-auto flex items-center gap-2">
                                                Read More <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </>
    );
}