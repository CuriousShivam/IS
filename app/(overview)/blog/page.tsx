// app/blog/page.tsx - Blog List Page
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import SafeImage from "@/components/safeImage";

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
        const res = await fetch(
            `${process.env.BASE_URL}/api/admin/posts/content?status=published`,
            {
                next: {
                    revalidate: 60, // Revalidate every 60 seconds
                    tags: ['blog-list']
                },
            }
        );

        if (!res.ok) {
            console.error('Failed to fetch blog posts');
            return [];
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching blog posts:', error);
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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    // Generate JSON-LD for blog list
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Your Blog Name", // replace with your site/blog name
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
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
                    <div className="max-w-6xl mx-auto px-6">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Our Blog
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
                            Discover the latest articles, tutorials, and insights about web development,
                            technology, and everything in between.
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <main className="max-w-6xl mx-auto px-6 py-12">
                    {/* Stats Bar */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-3xl font-bold text-gray-900">{posts.length}</p>
                                <p className="text-gray-600">Published Articles</p>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Search size={20} />
                                <span>Search coming soon...</span>
                            </div>
                        </div>
                    </div>

                    {/* Blog Posts Grid */}
                    {posts.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                No Posts Yet
                            </h2>
                            <p className="text-gray-600">
                                Check back soon for our latest articles and insights!
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Featured Post (First Post) */}
                            {posts[0] && (
                                <article className="bg-white rounded-lg shadow-md overflow-hidden mb-12 hover:shadow-xl transition-shadow">
                                    <div className="grid md:grid-cols-2 gap-0">
                                        {posts[0].featuredImage && (
                                            <div className="relative h-64 md:h-full">
                                                <SafeImage src={posts[0].featuredImage}  alt={'featured image'} fill />
                                                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    Featured
                                                </div>
                                            </div>
                                        )}
                                        <div className="p-8 flex flex-col justify-center">
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={16} />
                                                    <time dateTime={posts[0].createdAt}>
                                                        {formatDate(posts[0].createdAt)}
                                                    </time>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={16} />
                                                    <span>{calculateReadingTime(posts[0].metaDescription)} min read</span>
                                                </div>
                                            </div>

                                            <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                                                <Link href={`/blog/${posts[0].slug}`}>
                                                    {posts[0].title}
                                                </Link>
                                            </h2>

                                            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                                                {getExcerpt(posts[0].metaDescription, 200)}
                                            </p>

                                            <Link
                                                href={`/blog/${posts[0].slug}`}
                                                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                                            >
                                                Read Full Article
                                                <ArrowRight size={20} />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            )}

                            {/* Regular Posts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.slice(1).map((post) => (
                                    <article
                                        key={post.id}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
                                    >
                                        {/* Featured Image */}
                                        {post.featuredImage ? (
                                            <Link href={`/blog/${post.slug}`} className="relative h-48 overflow-hidden">
                                                <SafeImage
                                                    src={post.featuredImage}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </Link>
                                        ) : (
                                            <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <span className="text-white text-6xl font-bold opacity-20">
                          {post.title.charAt(0)}
                        </span>
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            {/* Meta Info */}
                                            <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    <time dateTime={post.createdAt}>
                                                        {formatDate(post.createdAt)}
                                                    </time>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    <span>{calculateReadingTime(post.metaDescription)} min</span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                                                <Link href={`/blog/${post.slug}`}>
                                                    {post.title}
                                                </Link>
                                            </h2>

                                            {/* Description */}
                                            <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                                                {getExcerpt(post.metaDescription)}
                                            </p>

                                            {/* Read More Link */}
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors mt-auto"
                                            >
                                                Read More
                                                <ArrowRight size={16} />
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