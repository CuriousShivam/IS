// components/SafeImage.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface SafeImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    className?: string;
    priority?: boolean;
    sizes?: string;
    fallbackText?: string;
}

export default function SafeImage({
                                      src,
                                      alt,
                                      width,
                                      height,
                                      fill = false,
                                      className = '',
                                      priority = false,
                                      sizes,
                                      fallbackText,
                                  }: SafeImageProps) {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // If image failed to load or src is invalid, show fallback
    if (imageError || !src) {
        return (
            <div
                className={`bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center ${className}`}
                style={fill ? undefined : { width, height }}
            >
                <ImageIcon className="text-white opacity-30 mb-2" size={48} />
                {fallbackText && (
                    <span className="text-white text-sm opacity-70 text-center px-4">
            {fallbackText}
          </span>
                )}
            </div>
        );
    }

    // Check if the hostname is configured
    const isExternalImage = src.startsWith('http://') || src.startsWith('https://');

    // For external images that might not be configured, use regular img tag
    if (isExternalImage) {
        try {
            const url = new URL(src);
            const configuredHosts = [
                'ik.imagekit.io',
                'imagekit.io',
                'images.unsplash.com',
                'via.placeholder.com',
                // Add your configured hosts here
            ];

            const isConfigured = configuredHosts.some(host =>
                url.hostname.includes(host)
            );

            if (!isConfigured) {
                // Use regular img tag for unconfigured hosts
                return (
                    <div className={fill ? 'relative w-full h-full' : ''} style={fill ? undefined : { width, height }}>
                        <img
                            src={src}
                            alt={alt}
                            className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity'}`}
                            onLoad={() => setIsLoading(false)}
                            onError={() => setImageError(true)}
                            style={fill ? { width: '100%', height: '100%', objectFit: 'cover' } : { width, height }}
                        />
                        {isLoading && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                        )}
                    </div>
                );
            }
        } catch (e) {
            // Invalid URL, show fallback
            setImageError(true);
            return null;
        }
    }

    // Use Next.js Image component for configured hosts
    return (
        <div className={fill ? 'relative w-full h-full' : ''}>
            <Image
                src={src}
                alt={alt}
                width={fill ? undefined : width}
                height={fill ? undefined : height}
                fill={fill}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity'}`}
                onError={() => setImageError(true)}
                onLoad={() => setIsLoading(false)}
                priority={priority}
                sizes={sizes}
            />
            {isLoading && (
                <div
                    className="absolute inset-0 bg-gray-200 animate-pulse"
                    style={fill ? undefined : { width, height }}
                />
            )}
        </div>
    );
}