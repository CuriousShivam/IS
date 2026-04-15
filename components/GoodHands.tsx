// components/GoodHands.tsx
import React from 'react';
import { ShieldCheck, UserCheck, Clock, Award } from 'lucide-react';

export default function GoodHands() {
    const trustPilars = [
        { icon: <ShieldCheck size={24} />, title: "Secure Coverage", desc: "Protecting your future with top-tier plans." },
        { icon: <UserCheck size={24} />, title: "Personalized Advice", desc: "Expert guidance tailored to your finances." },
        { icon: <Clock size={24} />, title: "Quick Claims", desc: "Assistance when you need it the most." },
        { icon: <Award size={24} />, title: "Verified Expert", desc: "Certified advisor with years of experience." },
    ];

    return (
        <section className="relative bg-[#1a365d] py-20 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center ">

                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Relax, You're in <span className="text-blue-400">Good Hands</span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        We simplify the complex world of insurance so you can focus on what matters most—your family and your business.
                    </p>
                </div>


            </div>
        </section>
    );
}