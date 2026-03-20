import Carousel from "@/components/carousel";
import QuickInsurance from "@/components/quickInsurance";

// sm: process.env.NEXT_PUBLIC_CAROUSAL_SM.split(','); // small screens
// md:  process.env.NEXT_PUBLIC_CAROUSAL_MD.split(','); // medium screens
// lg:  process.env.NEXT_PUBLIC_CAROUSAL_LG.split(','); // large screens
export default function Home() {
    // @ts-ignore
    return (<>

               <div className="p-1 selection:bg-transparent">
                <Carousel
                    images={{
                        sm: process.env.NEXT_PUBLIC_CAROUSAL_SM.split(',') ,
                        md: process.env.NEXT_PUBLIC_CAROUSAL_MD.split(','),
                        lg: process.env.NEXT_PUBLIC_CAROUSAL_LG.split(','),
                    }}
                />
            </div>

            {/*<main className="flex  w-full flex-col p-1 pt-10"><QuickInsurance/></main>*/}
        </>

    );
}
