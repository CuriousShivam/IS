'use client'
import Carousel from "@/components/carousel";
import QuickInsurance from "@/components/quickInsurance";
import EnquiryModal from "@/components/enquirymodal";
import {submitEnquiryAction} from "@/app/(overview)/action";
import {Button, Link} from "@heroui/react";
import PartnerLogos from "@/components/partnerLogo";

// sm: process.env.NEXT_PUBLIC_CAROUSAL_SM.split(','); // small screens
// md:  process.env.NEXT_PUBLIC_CAROUSAL_MD.split(','); // medium screens
// lg:  process.env.NEXT_PUBLIC_CAROUSAL_LG.split(','); // large screens
export default function Home() {
    // @ts-ignore

    return (
        <>

            <div className="p-1 selection:bg-transparent">
                <main className="min-h-screen">

                    {/* 1. HERO SECTION */}
                    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Insurance Advice You Can <span className="text-blue-600">Trust.</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                            We help you navigate the complex world of insurance to find the perfect plan for your
                            health, life, and assets.
                        </p>
                        <div className="flex justify-center gap-4">
                            <EnquiryModal submitAction={submitEnquiryAction}/>
                            <Link href="/blogs">Explore Blogs</Link>

                        </div>
                    </section>

                    {/* 2. SERVICES SECTION */}
                    <section className="py-20 max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Expertise</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {['Health', 'Life', 'Vehicle', 'Term'].map((item) => (
                                <div key={item}
                                     className="p-6 border rounded-xl hover:shadow-md transition-shadow bg-white">
                                    <div
                                        className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center text-blue-600 font-bold">
                                        {item[0]}
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">{item} Insurance</h3>
                                    <p className="text-gray-500 text-sm">Comprehensive coverage plans designed for your
                                        specific needs.</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. FEATURED BLOGS SECTION */}
                    {/*<section className="bg-gray-50 py-20 px-6">*/}
                    {/*    <div className="max-w-7xl mx-auto">*/}
                    {/*        <div className="flex justify-between items-center mb-10">*/}
                    {/*            <h2 className="text-3xl font-bold">Latest Insights</h2>*/}
                    {/*            <Button variant="light" color="primary">View All Posts →</Button>*/}
                    {/*        </div>*/}
                    {/*        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">*/}
                    {/*            /!* Map your fetched blogs here *!/*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</section>*/}

                    <Carousel />

                    <PartnerLogos/>
                </main>


            </div>

            {/*<main className="flex  w-full flex-col p-1 pt-10"><QuickInsurance/></main>*/}
        </>
)
}
