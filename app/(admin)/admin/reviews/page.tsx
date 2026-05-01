import { getAdminReviews, updateReviewStatus } from "@/app/(admin)/admin/actions";
import ReviewTable from "./reviewTable";
export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
    const reviews = await getAdminReviews();

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Review Moderation</h1>
                        <p className="text-sm text-gray-500">Approve or feature customer testimonials</p>
                    </div>
                </div>

                <ReviewTable initialReviews={reviews} updateAction={updateReviewStatus} />
            </div>
        </div>
    );
}
