"use client"

import React, { useEffect, useState } from "react";

export default function PartnerLogos() {
    const [mounted, setMounted] = useState(false);
    // This will hold our merged array: [{ name: '...', logo: '...' }]
    const [partnerList, setPartnerList] = useState<{ name: string; logo: string }[]>([]);

    useEffect(() => {
        const names = process.env.NEXT_PUBLIC_PARTNER_NAME?.split(',').filter(Boolean) || [];
        const logos = process.env.NEXT_PUBLIC_PARTNER_LOGO?.split(',').filter(Boolean) || [];

        // Zip the two arrays together
        const merged = names.map((name, index) => ({
            name: name,
            logo: logos[index] || '/placeholder.png' // Fallback if logos array is shorter
        }));

        setPartnerList(merged);
        setMounted(true);
    }, []);

    // Skeleton loader for initial server-side pass
    if (!mounted || partnerList.length === 0) {
        return <div className="h-32 w-full bg-gray-50 animate-pulse border-y border-gray-100" />;
    }

    return (
        <section className="py-12 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">
                    Our Network Partners
                </h2>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 md:mb-12">
                    Trusted by India's Top Insurers
                </h3>

                {/* MOBILE VIEW: 2-Column Grid for Android/iOS */}
                <div className="grid grid-cols-2 gap-4 md:hidden">
                    {partnerList.map((partner, idx) => (
                        <div key={`mob-${idx}`} className="flex justify-center items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-8 w-auto object-contain grayscale opacity-70"
                            />
                        </div>
                    ))}
                </div>

                {/* DESKTOP VIEW: Continuous Marquee */}
                <div className="hidden md:block relative overflow-x-hidden">
                    <div className="flex animate-marquee whitespace-nowrap items-center">
                        {/* Triple the list to ensure no gaps during the loop */}
                        {[...partnerList, ...partnerList, ...partnerList].map((partner, idx) => (
                            <div key={`desktop-${idx}`} className="mx-10 flex-shrink-0">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}