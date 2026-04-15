// app/(admin)/dashboard/media/upload/page.tsx
"use client";

import React, { useState } from 'react';
import { Upload, X,  CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import {convertToWebP} from "@/utils/imageCompression";

export default function ImageUploadPage({uploadImageAction}: { uploadImageAction: any }) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    // Handle file selection and generate preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setStatus(null);
        }
    };

    // Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        setLoading(true);
        setStatus({ type: 'success', msg: "Optimizing image..." });

        try {
            // 1. Convert to WebP on the client side
            const webpBlob = await convertToWebP(selectedFile);

            // 2. Prepare FormData with the new WebP blob
            const formData = new FormData();
            formData.append("file", webpBlob, "image.webp");

            // 3. Send to Backend
            const result = await uploadImageAction(formData);

            if (result.success) {
                setStatus({ type: 'success', msg: "Optimized WebP uploaded successfully!" });
                setSelectedFile(null);
                setPreviewUrl(null);
            } else {
                throw new Error(result.error);
            }
        } catch (err: any) {
            setStatus({ type: 'error', msg: err.message || "Conversion failed" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Upload New Asset</h1>
                <p className="text-gray-500">Add a featured image for your blogs or services.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                    {!previewUrl ? (
                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-10 h-10 text-blue-500 mb-3" />
                                <p className="mb-2 text-sm text-gray-700">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-400">PNG, JPG or WebP (Max 5MB)</p>
                            </div>
                            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                        </label>
                    ) : (
                        <div className="relative w-full h-64 rounded-2xl overflow-hidden border">
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => { setPreviewUrl(null); setSelectedFile(null); }}
                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {status && (
                    <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {status.type === 'success' && <CheckCircle2 size={20} />}
                        <p className="text-sm font-medium">{status.msg}</p>
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={!selectedFile || loading}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:bg-gray-300 disabled:shadow-none transition-all"
                    >
                        {loading ? "Uploading..." : "Confirm Upload"}
                    </button>
                    <Link
                        href="/admin/dashboard/media"
                        className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}