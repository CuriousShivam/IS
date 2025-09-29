// todo:
// imediately change state on btn clicks
// blockquote requires cite value for metadata
'use client'
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link as LinkIcon,
    Unlink,
    ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Eye,
    Save,
    Upload,
    Video,
    Maximize2,
    Minimize2
} from 'lucide-react';
import { VideoEmbed } from '@/lib/TipTapExtension/VideoEmbed'

const lowlight = createLowlight(common);

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

interface TiptapBlogEditorProps {
    initialPost?: BlogPost;
    onSave: (post: BlogPost) => Promise<void>;
    // imageKitConfig: {
    //     urlEndpoint: string;
    //     publicKey: string;
    //     authenticationEndpoint: string;
    // };
}

const TiptapBlogEditor: React.FC<TiptapBlogEditorProps> = ({
                                                               initialPost,
                                                               onSave,
                                                               // imageKitConfig
                                                           }) => {
    const [post, setPost] = useState<BlogPost>(
        initialPost || {
            title: '',
            slug: '',
            content: '',
            metaTitle: '',
            metaDescription: '',
            metaKeywords: '',
            featuredImage: '',
            status: 'draft',
        }
    );


    const [isPreview, setIsPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showMetaFields, setShowMetaFields] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeView, setActiveView] = useState<'visual' | 'html'>('visual');
    const [htmlContent, setHtmlContent] = useState(initialPost?.content || "");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editor = useEditor({
        immediatelyRender:false,
        extensions: [
            StarterKit.configure({
                codeBlock: false, // We'll use CodeBlockLowlight instead
                link:false,
            }),
            VideoEmbed,
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg shadow-md my-4',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 hover:text-blue-800 underline',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),

            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: 'bg-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto',
                },
            }),
            Placeholder.configure({
                placeholder: 'Start writing your blog post...',
                emptyEditorClass: 'cursor-text before:content-[attr(data-placeholder)] before:absolute  before:text-gray-400 before:pointer-events-none',
            }),
        ],
        content: initialPost?.content || '',
        onUpdate: ({ editor }) => {
            const content = editor.getHTML();
            setPost(prev => ({ ...prev, content }));
            setHtmlContent(content);
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none max-w-none p-6 min-h-96',
            },
        },
    });


    // Auto-generate slug from title
    useEffect(() => {

            const slug = post.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setPost(prev => ({ ...prev, slug }));

    }, [post.title]);

    // Auto-generate meta title if empty
    useEffect(() => {
        if (post.title && !post.metaTitle) {
            setPost(prev => ({ ...prev, metaTitle: post.title }));
        }
    }, [post.title]);

    // Update editor when switching from HTML view
    useEffect(() => {
        if (activeView === 'visual' && editor && htmlContent !== editor.getHTML()) {
            editor.commands.setContent(htmlContent);
        }
    }, [activeView, editor, htmlContent]);

    // Upload an Image File
    const handleImageUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', file.name);
            // console.log('uplload')
            const response = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const { url } = await response.json();
                editor?.chain().focus().setImage({ src: url }).run();
            }
        } catch (error) {
            console.error('Image upload failed:', error);
            alert('Image upload failed. Please try again.');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    //Add image using url
    const addImage = useCallback(() => {
        const url = window.prompt('Enter image URL');
        const alt = window.prompt("Enter image alt text");
        if (url && editor) {
            editor.chain().focus().setImage({ src: url, alt }).run();
        }
    }, [editor]);

    // Add a link
    const addLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    // Add a Video
    const addVideo = useCallback(() => {
        const url = window.prompt('Enter video URL (YouTube, Vimeo, etc.)');
        if (url && editor) {
            let embedUrl = ''

            if (url.includes('youtube.com') || url.includes('youtu.be')) {
                const videoId = url.includes('youtu.be')
                    ? url.split('/').pop()?.split('?')[0]
                    : url.split('v=')[1]?.split('&')[0]
                embedUrl = `https://www.youtube.com/embed/${videoId}`
            } else if (url.includes('vimeo.com')) {
                const videoId = url.split('/').pop()
                embedUrl = `https://player.vimeo.com/video/${videoId}`
            } else {
                embedUrl = url
            }

            editor.chain().focus().setVideo({ src: embedUrl }).run()
        }
    }, [editor]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if(!post.slug || post.slug.trim() === ''){
                return window.alert("Slug is required.")
            }
             await onSave({
                ...post,
                content: activeView === 'html' ? htmlContent : editor?.getHTML() || '',
                updatedAt: new Date(),
                createdAt: post.createdAt || new Date(),
            });
            // console.log('rte res ', res)
        } catch (error) {
            console.error('Save failed:', error);
            alert('Failed to save blog post. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const togglePreview = () => {
        setIsPreview(!isPreview);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    if (!editor) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">Loading editor...</span>
            </div>
        );
    }

    if (isPreview) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Preview</h1>
                    <button
                        onClick={togglePreview}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Back to Editor
                    </button>
                </div>

                <article className="prose max-w-none">
                    <h1>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{
                        __html: activeView === 'html' ? htmlContent : editor.getHTML()
                    }} />
                </article>

                <div className="mt-8 p-4 bg-gray-100 rounded">
                    <h3 className="font-bold mb-2">SEO Preview</h3>
                    <div className="text-blue-600 text-lg">{post.metaTitle}</div>
                    <div className="text-gray-600 text-sm">{window.location.origin}/blog/{post.slug}</div>
                    <div className="text-gray-800 text-sm mt-1">{post.metaDescription}</div>
                </div>
            </div>
        );
    }


    return (
        <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'max-w-6xl mx-auto'} p-6`}>
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-4">Blog Editor</h1>

                {/* Basic Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Post Title */}
                    <input
                        type="text"
                        placeholder="Blog Title"
                        value={post.title}
                        onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {/* Post Slug */}
                    <input
                        type="text"
                        placeholder="Slug (auto-generated)"
                        value={post.slug}
                        onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Featured Image */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Featured Image URL
                    </label>
                    <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={post.featuredImage}
                        onChange={(e) => setPost(prev => ({ ...prev, featuredImage: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Meta Fields Toggle */}
                <button
                    onClick={() => setShowMetaFields(!showMetaFields)}
                    className="mb-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                    {showMetaFields ? 'Hide' : 'Show'} SEO Meta Fields
                </button>

                {/* SEO Meta Fields */}
                {showMetaFields && (
                    <div className="grid grid-cols-1 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        {/* Meta Title*/}
                        <input
                            type="text"
                            placeholder="Meta Title (SEO)"
                            value={post.metaTitle}
                            onChange={(e) => setPost(prev => ({ ...prev, metaTitle: e.target.value }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            maxLength={60}
                        />
                        <div className="text-sm text-gray-500">
                            {post.metaTitle.length}/60 characters
                        </div>
                        {/* Meta Description */}
                        <textarea
                            placeholder="Meta Description (SEO)"
                            value={post.metaDescription}
                            onChange={(e) => setPost(prev => ({ ...prev, metaDescription: e.target.value }))}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            maxLength={160}
                        />
                        <div className="text-sm text-gray-500">
                            {post.metaDescription.length}/160 characters
                        </div>
                        {/* Meta Keywords*/}
                        <input
                            type="text"
                            placeholder="Meta Keywords (comma-separated)"
                            value={post.metaKeywords}
                            onChange={(e) => setPost(prev => ({ ...prev, metaKeywords: e.target.value }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                )}
            </div>

            {/* Editor Toolbar */}
            <div className="border border-gray-300 rounded-lg mb-4">
                <div className="flex flex-wrap items-center gap-2 p-3 border-b border-gray-300 bg-gray-50 overflow-x-auto">

                    {/* View Toggle */}
                    <div className="flex border border-gray-300 rounded">
                        <button
                            onClick={() => setActiveView('visual')}
                            className={`px-3 py-1 text-sm ${
                                activeView === 'visual'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            Visual
                        </button>
                        <button
                            onClick={() => {
                                setHtmlContent(editor.getHTML());
                                setActiveView('html');
                            }}
                            className={`px-3 py-1 text-sm ${
                                activeView === 'html'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            HTML
                        </button>
                    </div>

                    {activeView === 'visual' && (
                        <>
                            {/* History */}
                            <div className="flex border-l border-gray-300 pl-2 gap-1">
                                <button
                                    onClick={() => editor.chain().focus().undo().run()}
                                    disabled={!editor.can().undo()}
                                    className="p-2 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Undo"
                                >
                                    <Undo size={16} />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().redo().run()}
                                    disabled={!editor.can().redo()}
                                    className="p-2 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Redo"
                                >
                                    <Redo size={16} />
                                </button>
                            </div>

                            {/* Text Formatting */}
                            <div className="flex border-l border-gray-300 pl-2 gap-1">
                                <button
                                    onClick={() => editor.chain().focus().toggleBold().run()}
                                    className={`p-2 rounded ${
                                        editor.isActive('bold') ? 'bg-blue-500 text-white ' : 'hover:bg-gray-200'
                                    }`}
                                    title="Bold"
                                >
                                    <Bold size={16} />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().toggleItalic().run()}
                                    className={`p-2 rounded ${
                                        editor.isActive('italic') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Italic"
                                >
                                    <Italic size={16} />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                                    className={`p-2 rounded ${
                                        editor.isActive('underline') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Underline"
                                >
                                    <UnderlineIcon size={16} />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().toggleStrike().run()}
                                    className={`p-2 rounded ${
                                        editor.isActive('strike') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Strikethrough"
                                >
                                    <Strikethrough size={16} />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().toggleCode().run()}
                                    className={`p-2 rounded ${
                                        editor.isActive('code') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Inline Code"
                                >
                                    <Code size={16} />
                                </button>
                            </div>

                            {/* Headings */}
                            <div className="flex border-l border-gray-300 pl-2 gap-1">
                                <button
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                    className={`p-2 rounded ${
                                        editor.isActive('heading', { level: 1 }) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Heading 1"
                                >
                                    <Heading1 size={16} />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                    className={`p-2 rounded ${
                                        editor.isActive('heading', { level: 2 }) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Heading 2"
                                >
                                    <Heading2 size={16} />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                    className={`p-2 rounded ${
                                        editor.isActive('heading', { level: 3 }) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Heading 3"
                                >
                                    <Heading3 size={16} />
                                </button>
                            </div>

                            {/* Lists */}
                            <div className="flex border-l border-gray-300 pl-2 gap-1">
                                <button
                                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                                    className={`p-2 rounded ${
                                        editor.isActive('bulletList') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Bullet List"
                                >
                                    <List size={16} />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                    className={`p-2 rounded ${
                                        editor.isActive('orderedList') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Numbered List"
                                >
                                    <ListOrdered size={16} />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                    className={`p-2 rounded ${
                                        editor.isActive('blockquote') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Quote"
                                >
                                    <Quote size={16} />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                    className={`p-2 rounded ${
                                        editor.isActive('codeBlock') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Code Block"
                                >
                                    <Code size={16} />
                                </button>
                            </div>

                            {/* Text Alignment */}
                            <div className="flex border-l border-gray-300 pl-2 gap-1">
                                <button
                                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                                    className={`p-2 rounded ${
                                        editor.isActive({ textAlign: 'left' }) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Align Left"
                                >
                                    <AlignLeft size={16} />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                                    className={`p-2 rounded ${
                                        editor.isActive({ textAlign: 'center' }) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Align Center"
                                >
                                    <AlignCenter size={16} />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                                    className={`p-2 rounded ${
                                        editor.isActive({ textAlign: 'right' }) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Align Right"
                                >
                                    <AlignRight size={16} />
                                </button>
                            </div>

                            {/* Media */}
                            <div className="flex border-l border-gray-300 pl-2 gap-1">
                                <button
                                    onClick={addLink}
                                    className={`p-2 rounded ${
                                        editor.isActive('link') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                    title="Add Link"
                                >
                                    <LinkIcon size={16} />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().unsetLink().run()}
                                    disabled={!editor.isActive('link')}
                                    className="p-2 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Remove Link"
                                >
                                    <Unlink size={16} />
                                </button>
                                <button
                                    onClick={addImage}
                                    className="p-2 hover:bg-gray-200 rounded"
                                    title="Add Image"
                                >
                                    <ImageIcon size={16} />
                                </button>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-2 hover:bg-gray-200 rounded"
                                    title="Upload Image"
                                >
                                    <Upload size={16} />
                                </button>
                                <button
                                    onClick={addVideo}
                                    className="p-2 hover:bg-gray-200 rounded"
                                    title="Add Video"
                                >
                                    <Video size={16} />
                                </button>
                            </div>
                        </>
                    )}

                    {/* Action Buttons */}
                    <div className="flex ml-auto gap-2">
                        <button
                            onClick={toggleFullscreen}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                        >
                            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                            {isFullscreen ? 'Exit' : 'Fullscreen'}
                        </button>

                        <button
                            onClick={togglePreview}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                        >
                            <Eye size={16} />
                            Preview
                        </button>

                        <select
                            value={post.status}
                            onChange={(e) => setPost(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>

                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 text-sm"
                        >
                            <Save size={16} />
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>

                {/* Content Editor */}
                <div className={`min-h-96 ${isFullscreen ? 'h-[calc(100vh-300px)]' : ''}`}>
                    {activeView === 'visual' ? (
                        <EditorContent
                            editor={editor}
                            className={`min-h-96 ${isFullscreen ? 'h-full overflow-y-auto' : ''}`}
                        />
                    ) : (
                        <textarea
                            value={htmlContent}
                            onChange={(e) => setHtmlContent(e.target.value)}
                            className={`w-full p-4 font-mono text-sm focus:outline-none resize-none border-0 min-h-96 ${
                                isFullscreen ? 'h-full' : ''
                            }`}
                            placeholder="Enter your HTML content here..."
                        />
                    )}
                </div>
            </div>

            {/* Hidden file input for image uploads */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Character counts and tips */}
            <div className="text-sm text-gray-500 space-y-1">
                <p>💡 <strong>Editor Tips:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Use <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Ctrl/Cmd + B</kbd> for bold, <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Ctrl/Cmd + I</kbd> for italic</li>
                    {/*<li>Type <code>/</code> to see available slash commands</li>*/}
                    <li>Use <kbd className="px-2 py-1 bg-gray-200 rounded text-xs"># </kbd> at start of line for headings</li>
                    <li>Keep meta titles under 60 characters and descriptions under 160 characters</li>
                    <li>Add alt text to images for better accessibility and SEO</li>
                </ul>
            </div>
        </div>
    );
};

export default TiptapBlogEditor;