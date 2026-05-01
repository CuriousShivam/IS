import { getAdminEnquiries } from "../actions";
import EnquiryTableClient from "@/components/admin/customerEnquiries/EnquiryTableAdmin";
export const dynamic = 'force-dynamic';
export default async function AdminEnquiryPage() {
    const enquiries = await getAdminEnquiries();

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Enquiries</h1>
                    <p className="text-gray-500">Manage consultation requests from your clients.</p>
                </div>
                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold">
                    Total: {enquiries.length}
                </div>
            </header>

            <EnquiryTableClient initialData={enquiries} />
        </div>
    );
}