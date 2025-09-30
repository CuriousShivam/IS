// app/blog/[slug]/page.tsx - Next.js App Router
import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import SafeImage from "@/components/safeImage";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    featuredImage: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/admin/posts/content?slug=${slug}`, {
            method: 'GET', next: {revalidate: 3600}, // Revalidate every hour
        });

        if (!res.ok) {
            return null;
        }

        return res.json();
    } catch (error) {
        console.error('Failed to fetch blog post:', error);
        return null;
    }
}

// Generate metadata for SEO
export async function generateMetadata(
    {params}: { params: { slug: string } }
): Promise<Metadata> {
    const p = await params;
    const post = await getBlogPost(p.slug);
    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription,
        keywords: post.metaKeywords,
        authors: [{name: 'Your Blog Name'}],
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription,
            type: 'article',
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            images: post.featuredImage ? [
                {
                    url: post.featuredImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ] : [],
            siteName: 'Your Blog Name',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.metaTitle || post.title,
            description: post.metaDescription,
            images: post.featuredImage ? [post.featuredImage] : [],
        },
        alternates: {
            canonical: `${process.env.BASE_URL}/blog/${post.slug}`,
        },
    };
}


export default async function BlogPostPage({
                                               params
                                           }: {
    params: { slug: string }
}) {
    const p = await params;
    const post = await getBlogPost(p.slug);

    if (!post) {
        notFound();
    }



    // Format date for display
    const publishDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const updateDate = new Date(post.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Generate JSON-LD structured data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        image: post.featuredImage ? [post.featuredImage] : [],
        author: {
            "@type": "Person",
            name: "Your Name", // Replace dynamically if available
        },
        publisher: {
            "@type": "Organization",
            name: "Your Blog Name",
            logo: {
                "@type": "ImageObject",
                url: `${process.env.BASE_URL}/logo.png`,
            },
        },
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
        url: `${process.env.BASE_URL}/blog/${post.slug}`,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${process.env.BASE_URL}/blog/${post.slug}`,
        },
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />

            <article className="max-w-4xl mx-auto px-6 py-8">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 text-sm">
                        <time dateTime={post.createdAt} className="font-medium">
                            Published on {publishDate}
                        </time>
                        {post.updatedAt !== post.createdAt && (
                            <>
                                <span className="hidden sm:inline">•</span>
                                <time dateTime={post.updatedAt}>
                                    Updated on {updateDate}
                                </time>
                            </>
                        )}
                    </div>
                </header>

                {/* Featured Image */}
                {post.featuredImage && (
                    <div className="mb-8 rounded-lg overflow-hidden">
                        <SafeImage
                            src={post.featuredImage}
                            alt={post.title}
                            width={800}
                            height={400}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md"
                    dangerouslySetInnerHTML={{__html: post.content}}
                />


            </article>
        </>
    );
}
