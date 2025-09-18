import Carousel from "@/components/carousel";
import QuickInsurance from "@/components/quickInsurance";

export default function Home() {
    return (<>

               <div className="p-1 selection:bg-transparent">
                <Carousel
                    images={{
                        sm: [
                            "/img2.jpg",
                            "/img1.png",
                            "/img2.jpg",
                        ],
                        md: [
                            "/img2.jpg",
                            "/img1.png",
                            "/img2.jpg",
                            "/img1.png",
                            "/img2.jpg",
                        ],
                        lg: [
                            "/img1.png",
                            "/img2.jpg",
                            "/img1.png",
                            "/img2.jpg",
                            "/img1.png",
                            "/img2.jpg",
                            "/img1.png",
                        ],
                    }}
                />
            </div>

            <main className="flex  w-full flex-col p-1 pt-10"><QuickInsurance/></main>
        </>

    );
}
