'use server'
import { getApprovedReviews, submitReviewAction } from "@/app/(overview)/action";
import ReviewForm from "@/components/users/reviews/reviewForm";
import ReviewList from "@/components/users/reviews/reviewList"; // Import the component we just made

export default async function ReviewsPage() {
    // This fetch happens on the server (very fast on Xubuntu)
    const reviews = await getApprovedReviews();

    return (
        <div className="max-w-6xl mx-auto py-16 px-6 ">
            <header className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">Client Testimonials</h1>
                <p className="text-gray-500">Trusted advice from satisfied policy holders.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* 1. The Showcase (Client Component) */}
                <ReviewList reviews={reviews} />

                {/* 2. The Form (Already a Client Component) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <ReviewForm submitAction={submitReviewAction} />
                    </div>
                </div>
            </div>
        </div>
    );
}