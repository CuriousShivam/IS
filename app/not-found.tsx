// app/(overview)/not-found.tsx
import Link from 'next/link';
import {Search, Home, PhoneCall} from 'lucide-react';
import {Navbar} from "@/components/users/navbar&footer/navbar";
import Footer from "@/components/users/navbar&footer/footer";

export default function NotFound() {
    return (<>
            <div className="relative flex flex-col h-screen">
                <Navbar/>
                <main className=" flex items-center justify-center bg-gray-50 p-6">

                    <div className="max-w-xl w-full text-center">
                        {/* Visual Badge */}
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-8">
                            <Search size={40} className="text-blue-600"/>
                        </div>

                        {/* Messaging */}
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                            Page Not Found
                        </h1>
                        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                            The insurance guide or page you're looking for doesn't exist.
                            It might have been moved or the URL was entered incorrectly.
                        </p>

                        {/* Action Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link
                                href="/"
                                className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                            >
                                <Home size={18}/>
                                Go to Homepage
                            </Link>

                            <Link
                                href="/blogs"
                                className="flex items-center justify-center gap-2 py-4 bg-white text-blue-600 border-2 border-blue-100 rounded-xl font-bold hover:bg-blue-50 transition-all"
                            >
                                <Search size={18}/>
                                Browse Blogs
                            </Link>
                        </div>

                        {/* Footer Support */}

                    </div>

                </main>
                <footer className="w-full flex items-center justify-center py-3">
                    <Footer/>
                </footer>
            </div>
        </>
    );
}