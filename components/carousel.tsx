"use client"

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ResponsiveCarousel() {
    const [mounted, setMounted] = useState(false);
    // Use state to hold the image arrays so they are stable
    const [images, setImages] = useState({ sm: [], md: [], lg: [] });

    useEffect(() => {
        // Fetch and parse the ENV variables ONLY on the client
        const smUrls = process.env.NEXT_PUBLIC_CAROUSAL_SM?.split(',').filter(Boolean) || ['/placeholder.png'];
        const mdUrls = process.env.NEXT_PUBLIC_CAROUSAL_MD?.split(',').filter(Boolean) || ['/placeholder.png'];
        const lgUrls = process.env.NEXT_PUBLIC_CAROUSAL_LG?.split(',').filter(Boolean) || ['/placeholder.png'];

        setImages({ sm: smUrls, md: mdUrls, lg: lgUrls });
        setMounted(true);
    }, []);

    // Skeleton loader for your i3 processor's speed
    if (!mounted) {
        return <div className="h-[75vh] w-full bg-gray-200 animate-pulse rounded-xl shadow-inner" />;
    }

    return (
        <div className="w-full mx-auto h-full">
            {/* Mobile */}
            <div className="block -mt-10 md:hidden h-[75vh]">
                <Swiper
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    navigation
                    loop
                    className="rounded-xl shadow-lg h-full"
                >
                    {images.sm.map((src, idx) => (
                        <SwiperSlide key={`sm-${idx}`}>
                            <Image
                                src={src}
                                alt={`carousel-sm-${idx}`}
                                width={800}
                                height={400}
                                className="w-full object-cover rounded-xl h-full"
                                priority
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Desktop Section (Lg) */}
            <div className="hidden lg:block w-full h-[75vh]">
                <Swiper
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    navigation
                    loop
                    className="rounded-xl shadow-lg h-full"
                >
                    {images.lg.map((src, idx) => (
                        <SwiperSlide key={`lg-${idx}`}>
                            <Image
                                src={src}
                                alt={`carousel-lg-${idx}`}
                                width={1600}
                                height={600}
                                className="w-full object-cover rounded-xl h-full"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            {/* ... keep your Tablet (md) section the same using images.md */}
        </div>
    );
}