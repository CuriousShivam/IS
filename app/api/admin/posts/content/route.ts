import { NextRequest, NextResponse } from 'next/server';
import  getServerSession  from "next-auth"
import { auth } from "@/auth"   // adjust to your path
import prisma from "@/lib/prisma"
import { getToken } from "next-auth/jwt"

const secret = process.env.AUTH_SECRET
// GET /api/blog - Fetch all blog posts or specific post by slug
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');
        const status = searchParams.get('status') || 'published';
        // ✅ get session
        // const token = await getToken({ req, secret })
        // console.log("JSON Web Token", token)
        // const session = await auth();
        // console.log(session, "Session haha")
        // //
        // if (status === "all") {
        //     if (!session || session.user.role !== "admin") {
        //         return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
        //     }
        // }
        if (slug) {
            // Fetch single post by slug
            const post = await prisma.blogPost.findUnique({
                where: { slug },
            });

            if (!post) {
                return NextResponse.json({ error: 'Post not found' }, { status: 404 });
            }

            return NextResponse.json(post);
        } else {
            // Fetch all posts
            const posts = await prisma.blogPost.findMany({
                where: status !== 'all' ? { status } : {},
                orderBy: { createdAt: 'desc' }
            });
            return NextResponse.json(posts);
        }
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog posts' },
            { status: 500 }
        );
    }
}

// POST /api/blog - Create new blog post
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        console.log('Route.ts.' + data)

        // Validate required fields
        if (!data.title || !data.slug || !data.content) {
            return NextResponse.json(
                { error: 'Title, slug, and content are required' },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existingPost = await prisma.blogPost.findUnique({
            where: { slug: data.slug },
        });

        if (existingPost) {
            return NextResponse.json(
                { error: 'A post with this slug already exists' },
                { status: 409 }
            );
        }

        const post = await prisma.blogPost.create({
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                metaTitle: data.metaTitle || data.title,
                metaDescription: data.metaDescription || '',
                metaKeywords: data.metaKeywords || '',
                featuredImage: data.featuredImage || '',
                status: data.status || 'draft',
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to create blog post' },
            { status: 500 }
        );
    }
}

// PUT /api/blog - Update existing blog post
export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();

        if (!data.id) {
            return NextResponse.json(
                { error: 'Post ID is required for updates' },
                { status: 400 }
            );
        }

        const post = await prisma.blogPost.update({
            where: { id: data.id },
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
                metaKeywords: data.metaKeywords,
                featuredImage: data.featuredImage,
                status: data.status,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to update blog post' },
            { status: 500 }
        );
    }
}

// DELETE /api/blog - Delete blog post
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Post ID is required' },
                { status: 400 }
            );
        }

        await prisma.blogPost.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to delete blog post' },
            { status: 500 }
        );
    }
}
