
"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Image, Button, Spinner } from "@heroui/react";
import { Copy, Check, Trash2 } from 'lucide-react';

interface ImageAsset {
    id: string;
    url: string;
    altText: string;
    createdAt:string;
    fileId: string;
}

export default function AdminGallery({getImagesAction}:{getImagesAction:Function}) {
    const [images, setImages] = useState<ImageAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const data:any = await getImagesAction();
            setImages(data.data);
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch assets:", error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (url: string, id: string) => {
        // This creates the exact tag you requested
        const imgTag = `<img src="${url}" alt="" />`;

        navigator.clipboard.writeText(imgTag).then(() => {
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000); // Reset icon after 2s
        });
    };

    if (loading) return <div className="flex justify-center p-20"><Spinner label="Loading Assets..." /></div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Media Library</h1>
                <p className="text-sm text-gray-500">Click an image to copy its HTML tag</p>
            </div>
            <button onClick={fetchImages}>reload</button>

            <div className="gap-6 grid grid-cols-2 sm:grid-cols-4">
                {images.map((item) => (
                    <Card
                        key={item.id}
                        className="hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer"
                        >
                        <CardBody className="p-0">
                            <Image
                                alt={item.altText}
                                className="w-full object-cover h-[140px]"
                                radius="lg"
                                shadow="sm"
                                src={item.url}
                                width="100%"
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-between bg-white/10 border-t-1 border-default-100">
                            <code className="text-[10px] truncate text-gray-500 w-32">
                                {item.url.split('/').pop()}
                            </code>
                            {/* Now this Button is valid because the parent is a <div> */}
                            <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                color={copiedId === item.id ? "success" : "default"}
                                onClick={() => copyToClipboard(item.url, item.id)}
                            >
                                {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {images.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
                    <p className="text-gray-500">No images found in the database.</p>
                </div>
            )}
        </div>
    );
}