'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="bg-gray-100 rounded-2xl h-72 flex items-center justify-center text-gray-400">
                No images available
            </div>
        );
    }

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    const next = () => setCurrentIndex((i) => (i + 1) % images.length);

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid gap-2">
                {images.length === 1 ? (
                    <div
                        className="relative h-80 md:h-96 rounded-2xl overflow-hidden cursor-zoom-in group"
                        onClick={() => openLightbox(0)}
                    >
                        <Image
                            src={images[0]}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                            <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {/* Main large image */}
                        <div
                            className="col-span-2 row-span-2 relative h-64 md:h-80 rounded-2xl overflow-hidden cursor-zoom-in group"
                            onClick={() => openLightbox(0)}
                        >
                            <Image
                                src={images[0]}
                                alt={`${title} 1`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                            </div>
                        </div>
                        {/* Thumbnails */}
                        {images.slice(1, 5).map((img, i) => (
                            <div
                                key={i}
                                className="relative h-32 md:h-40 rounded-xl overflow-hidden cursor-zoom-in group"
                                onClick={() => openLightbox(i + 1)}
                            >
                                <Image
                                    src={img}
                                    alt={`${title} ${i + 2}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    unoptimized
                                />
                                {i === 3 && images.length > 5 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">+{images.length - 5}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                    onClick={(e) => e.target === e.currentTarget && setLightboxOpen(false)}
                >
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-2"
                    >
                        <X size={22} />
                    </button>

                    <button
                        onClick={prev}
                        className="absolute left-4 text-white/80 hover:text-white bg-white/10 rounded-full p-3"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="relative w-full max-w-4xl h-[80vh] mx-16">
                        <Image
                            src={images[currentIndex]}
                            alt={`${title} ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>

                    <button
                        onClick={next}
                        className="absolute right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-3"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-gold w-6' : 'bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
