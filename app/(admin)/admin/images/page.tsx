// app/(admin)/dashboard/media/upload/page.tsx
"use client";

// Check this path: is it /admin/admin/ or just /admin/actions?
import {getImagesAction, uploadImageAction} from '@/app/(admin)/admin/actions';
import AdminImageUpload from '@/components/AdminImageUpload';
import MediaGallery from "@/components/AdminGallery"; // Ensure this filename isn't a typo (Gallery vs Galary)

export default function MediaManagementPage() { // Renamed from ImageUploadPage or MediaGallery
    return (
        <div className="p-6 space-y-10">
            <section>
                <h2 className="text-xl font-bold mb-4">Upload New Asset</h2>
                <AdminImageUpload uploadImageAction={uploadImageAction}/>
            </section>

            <hr className="border-gray-200" />

            <section>
                <h2 className="text-xl font-bold mb-4">Your Media Library</h2>
                <MediaGallery getImagesAction={getImagesAction}/>
            </section>
        </div>
    );
}