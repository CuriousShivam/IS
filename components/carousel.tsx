// const Carousel =() => {
//     return ("Carousel")
// }
//
// export default Carousel;

"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {ReactNode} from "react";

type CarouselProps = {
    images: {
        sm: string[]; // small screens
        md: string[]; // medium screens
        lg: string[]; // large screens
    };
};

function NextLInk(props: { children: ReactNode }) {
    return null;
}

export default function ResponsiveCarousel({ images }: CarouselProps) {
    return (
        <div className="w-full mx-auto h-full">
            {/* Mobile */}
            <div className="block md:hidden h-[70vh] ">
                <Swiper
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    navigation
                    loop
                    className="rounded-xl shadow-lg h-full "
                >
                    {images.sm.map((src, idx) => (
                        <SwiperSlide key={`sm-${idx}`}>
                            <Image
                                src={src}
                                alt={`carousel-sm-${idx}`}
                                width={800}
                                height={400}
                                className="w-full   object-cover rounded-xl h-full"
                                priority
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Tablet */}
            <div className="hidden md:block lg:hidden">
                <Swiper
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    navigation
                    loop
                    className="rounded-xl shadow-lg"
                >
                    {images.md.map((src, idx) => (
                        <SwiperSlide key={`md-${idx}`}>
                            <Image
                                src={src}
                                alt={`carousel-md-${idx}`}
                                width={1200}
                                height={500}
                                className="w-full h-auto object-contain rounded-xl"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Desktop */}
            <div className="hidden lg:block w-full h-[75vh] ">
                <Swiper
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    navigation
                    loop
                    className="rounded-xl shadow-lg   h-full"
                >
                    {images.lg.map((src, idx) => (
                        <SwiperSlide key={`lg-${idx}`}>
                            <Image
                                src={src}
                                alt={`carousel-lg-${idx}`}
                                width={1600}
                                height={600}
                                className="w-full  object-cover rounded-xl h-full"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
