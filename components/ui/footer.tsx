import React from "react";
import Link from "next/link";
import { Shield, Facebook, Twitter, Instagram, Github, Mail } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand Section */}
                    <div className="lg:col-span-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-1.5 bg-blue-600 rounded-lg">
                                <Shield className="text-white" size={20} />
                            </div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">
                                Insurance<span className="text-blue-600">Advisor</span>
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
                            Providing expert guidance and transparent insurance solutions to secure your family's future.
                            Your trusted partner in life, health, and general insurance.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
                                <Link key={i} href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-3">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Services</h4>
                        <ul className="space-y-4">
                            {["Life Insurance", "Health Plans", "Motor Insurance", "Term Plans"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="lg:col-span-3">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Support</h4>
                        <ul className="space-y-4">
                            {["Help Center", "Claim Process", "Privacy Policy", "Contact Us"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    {/*<div className="lg:col-span-4">*/}
                    {/*    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Newsletter</h4>*/}
                    {/*    <p className="text-gray-500 text-sm mb-4">Stay updated with the latest insurance trends and tips.</p>*/}
                    {/*    <form className="flex flex-col gap-2">*/}
                    {/*        <div className="relative">*/}
                    {/*            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />*/}
                    {/*            <input*/}
                    {/*                type="email"*/}
                    {/*                placeholder="Enter your email"*/}
                    {/*                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*        <button className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-200 transition-all">*/}
                    {/*            Subscribe*/}
                    {/*        </button>*/}
                    {/*    </form>*/}
                    {/*</div>*/}
                </div>

                <div className="mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs text-center">
                        © {currentYear} Insurance Advisor. Built with Spring Boot & Next.js. All Rights Reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/admin" className="text-gray-300 hover:text-gray-500 text-[10px] uppercase tracking-tighter">Admin Portal</Link>
                        <Link href="#" className="text-gray-400 hover:text-blue-600 text-xs">Terms of Service</Link>
                        <Link href="#" className="text-gray-400 hover:text-blue-600 text-xs">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;