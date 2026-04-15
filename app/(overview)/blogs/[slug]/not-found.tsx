// app/blogs/[slug]/not-found.tsx
import Link from 'next/link';
import { FileQuestion, ChevronLeft, Search } from 'lucide-react';

export default function BlogNotFound() {
    return (
        <main className="min-h-[70vh] flex items-center justify-center px-6 py-24 bg-gray-50">
            <div className="max-w-md w-full text-center">
                {/* Visual Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="p-6 bg-blue-100 rounded-full text-blue-600 animate-pulse">
                        <FileQuestion size={64} />
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Post Not Found</h1>
                <p className="text-gray-600 mb-10 leading-relaxed">
                    The insurance guide you are looking for might have been moved, renamed, or is temporarily unavailable.
                </p>

                {/* Navigation Actions */}
                <div className="space-y-4">
                    <Link
                        href="/blogs"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                        <Search size={18} />
                        Browse Other Guides
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all"
                    >
                        <ChevronLeft size={18} />
                        Back to Home
                    </Link>
                </div>

                {/* Support Hook */}

            </div>
        </main>
    );
}