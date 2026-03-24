import React from "react";
import {   Button, Divider, Image } from "@heroui/react";
import { HeartHandshake, ShieldCheck, UserCheck, Clock } from "lucide-react";
import Link from "next/link";
import {submitEnquiryAction} from "@/app/(overview)/action";
import EnquiryModal from "@/components/enquirymodal";

// This is now a Server Component by default
export default function AboutPage() {
    const pillars = [
        {
            title: "Your Family, Our Priority",
            desc: "We help you find a safety net that protects your loved ones when they need it most.",
            icon: <HeartHandshake className="text-red-500" size={32} />,
        },
        {
            title: "Transparent Advice",
            desc: "No hidden terms or confusing jargon. We explain insurance in simple language.",
            icon: <ShieldCheck className="text-blue-600" size={32} />,
        },
        {
            title: "Support When It Matters",
            desc: "From choosing a policy to assistance during claims, we are by your side.",
            icon: <UserCheck className="text-green-600" size={32} />,
        }
    ];

    return (
        <div className="min-h-screen bg-white  ">
            {/* --- Hero Section --- */}
            <section className="py-20 bg-blue-50/30 -mt-26">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="animate-in fade-in slide-in-from-left duration-1000">
                        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                            Helping You Secure a <span className="text-blue-600">Brighter Future.</span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            At **Insurance Advisor**, we believe everyone deserves access to clear, honest, and personalized protection.
                            Our platform simplifies the journey, ensuring you spend less time worrying and more time living.
                        </p>
                        <div className="flex gap-4">
                            <EnquiryModal submitAction={submitEnquiryAction}/>
                        </div>
                    </div>

                    <div className="relative animate-in fade-in zoom-in duration-1000">
                        <img
                            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1331&auto=format&fit=crop"
                            alt="Happy Family"
                            className="rounded-2xl shadow-2xl object-cover max-h-[450px]"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-blue-100 hidden md:block">
                            <div className="flex items-center gap-3">
                                <Clock className="text-blue-600" />
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">Quick Support</p>
                                    <p className="text-xs text-slate-500">Response within 24h</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Pillars Section --- */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {pillars.map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <div className="mb-6 p-5 bg-white shadow-sm border border-gray-100 rounded-2xl">
                                {item.icon}
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h4>
                            <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- The Promise Section --- */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">Our Simple Promise</h2>
                    <p className="text-xl text-slate-300 leading-relaxed italic">
                        "We treat your financial security with the same care we would our own.
                        No aggressive sales, no complex terms—just honest guidance."
                    </p>
                    <hr className="my-10 bg-slate-700" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <p className="text-3xl font-bold text-blue-400">100%</p>
                            <p className="text-slate-400 text-xs mt-1 uppercase">Objective</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-blue-400">Easy</p>
                            <p className="text-slate-400 text-xs mt-1 uppercase">Claims</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-blue-400">Zero</p>
                            <p className="text-slate-400 text-xs mt-1 uppercase">Fees</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-blue-400">Expert</p>
                            <p className="text-slate-400 text-xs mt-1 uppercase">Support</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}