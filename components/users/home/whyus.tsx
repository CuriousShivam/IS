// components/WhyUs.tsx
import { ShieldCheck, TrendingUp, Search, Wallet, Percent, HeartHandshake } from 'lucide-react';

const highlights = [
    { text: "Strong Insurer Reputation", icon: <ShieldCheck className="text-blue-600" />, color: "bg-blue-50" },
    { text: "High Claim Settlement Ratio", icon: <TrendingUp className="text-cyan-600" />, color: "bg-cyan-50" },
    { text: "Transparent Terms & Conditions", icon: <Search className="text-sky-600" />, color: "bg-sky-50" },
    { text: "Comprehensive Coverage", icon: <HeartHandshake className="text-indigo-600" />, color: "bg-indigo-50" },
    { text: "Affordable Premiums", icon: <Wallet className="text-blue-50" />, color: "bg-blue-600", dark: true },
    { text: "Great Discounts", icon: <Percent className="text-orange-600" />, color: "bg-orange-50" },
];

export default function WhyUs() {
    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                        <TrendingUp size={32} className="text-blue-500" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Our Plan Picks Stand Out</h2>

                <div className="flex flex-wrap justify-center gap-4">
                    {highlights.map((item, index) => (
                        <div
                            key={index}
                            className={`${item.color} ${item.dark ? 'text-white' : 'text-gray-800'} 
                px-8 py-4 rounded-full shadow-sm border border-white/50 flex items-center gap-3
                hover:scale-105 transition-transform cursor-default font-medium text-sm md:text-base`}
                        >
                            {item.icon}
                            {item.text}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}