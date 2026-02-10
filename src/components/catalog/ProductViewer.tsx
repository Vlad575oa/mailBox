'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ProductViewerProps {
    product: Product;
}

export function ProductViewer({ product }: ProductViewerProps) {
    const t = useTranslations('Catalog');
    const images = product.images || [product.image];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Reset index when product changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [product.id]);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    // Get 3 images to show in the row: [previous, current, next]
    const getVisibleIndices = () => {
        if (images.length === 0) return [];
        if (images.length === 1) return [0, 0, 0];
        if (images.length === 2) return [currentIndex === 0 ? 1 : 0, currentIndex, currentIndex === 0 ? 1 : 0];

        const prevIdx = (currentIndex - 1 + images.length) % images.length;
        const nextIdx = (currentIndex + 1) % images.length;
        return [prevIdx, currentIndex, nextIdx];
    };

    const visibleIndices = getVisibleIndices();

    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8">
            {/* 3-Column Layout to ensure perfect centering on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10 lg:gap-0">

                {/* Left Balance Spacer (Visible only on Desktop) */}
                <div className="hidden lg:block h-full w-full" />

                {/* Center: 3-Image Gallery Strip with Drag/Swipe */}
                <div className="relative flex flex-col items-center w-full">
                    <div className="relative w-full flex items-center justify-center gap-4 sm:gap-8 overflow-hidden py-0">
                        {visibleIndices.map((idx, i) => {
                            const isMain = i === 1;
                            return (
                                <motion.div
                                    key={`${product.id}-${idx}-${i}`}
                                    className={`relative aspect-square transition-all duration-700 overflow-hidden rounded-sm shadow-2xl ${isMain
                                        ? 'w-[660px] sm:w-[1300px] lg:w-[2000px] z-20 cursor-grab active:cursor-grabbing border border-white/5'
                                        : 'w-[140px] sm:w-[180px] scale-90 sm:block hidden pointer-events-none'
                                        }`}
                                    layoutId={isMain ? `main-img-${product.id}` : undefined}
                                    drag={isMain ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={(_, info) => {
                                        if (info.offset.x > 30) prevImage();
                                        else if (info.offset.x < -30) nextImage();
                                    }}
                                >
                                    <Image
                                        src={images[idx]}
                                        alt=""
                                        fill
                                        className="object-cover pointer-events-none"
                                        sizes={isMain ? "800px" : "200px"}
                                        priority={isMain}
                                    />
                                    {isMain && (
                                        <>
                                            <div className="absolute top-3 left-3 z-30">
                                                <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md text-[#C5A059] text-[8px] font-bold uppercase tracking-[0.2em] border border-[#C5A059]/30">
                                                    {product.material}
                                                </span>
                                            </div>

                                            {/* Navigation Arrows Overlay (Desktop & Mobile) */}
                                            <div className="absolute inset-0 flex items-center justify-between px-2 z-30 pointer-events-none">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                                    className="p-2 sm:p-3 bg-black/30 hover:bg-black/60 backdrop-blur-md rounded-full pointer-events-auto border border-white/10 text-white transition-all hover:scale-110 active:scale-90"
                                                >
                                                    <FaChevronLeft size={16} />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                                    className="p-2 sm:p-3 bg-black/30 hover:bg-black/60 backdrop-blur-md rounded-full pointer-events-auto border border-white/10 text-white transition-all hover:scale-110 active:scale-90"
                                                >
                                                    <FaChevronRight size={16} />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Image Pager (Thumbnails for selection) - Reduced Size by 50% from previous */}
                    <div className="mt-2 flex flex-wrap justify-center gap-1.5 max-w-full overflow-x-auto pb-2 px-4 scrollbar-hide">
                        {images.map((img, idx) => (
                            <button
                                key={`thumb-${idx}`}
                                onClick={() => setCurrentIndex(idx)}
                                className={`relative w-6 h-8 sm:w-8 sm:h-11 rounded-[1px] overflow-hidden border transition-all duration-300 flex-shrink-0 ${currentIndex === idx ? 'border-[#C5A059] scale-105 shadow-md shadow-[#C5A059]/20' : 'border-transparent opacity-100 hover:opacity-100'
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`Product view ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="32px"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Area: CTAs - Shifted right and lower on desktop */}
                <div className="flex flex-col items-center lg:items-end lg:pt-24 lg:pl-16 gap-6 max-w-[320px] lg:max-w-none mx-auto lg:mx-0">

                    {/* Intro Text */}
                    <p className="text-white/80 text-sm sm:text-base text-center lg:text-right leading-relaxed max-w-[340px]">
                        {t('buy_intro')} <span className="text-[#C5A059] font-medium block mt-1">{t('shop_link_text')}</span>
                    </p>

                    <div className="flex flex-col items-center lg:items-end gap-3">
                        <a href={product.link} target="_blank" rel="noopener noreferrer" className="group">
                            <Button
                                className="relative rounded-full px-8 py-3 sm:px-10 sm:py-4 overflow-hidden group transition-all duration-500 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-[length:200%_auto] hover:bg-right hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] flex flex-col items-center justify-center leading-tight min-w-[160px]"
                            >
                                <span className="relative text-sm sm:text-base font-bold tracking-wider uppercase text-black z-10">
                                    {t('buy_now')}
                                </span>
                            </Button>
                        </a>

                        <motion.p
                            key={product.price}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-base sm:text-lg font-serif italic text-[#C5A059]/80 tracking-wide lg:mr-6"
                        >
                            {product.price}
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Title Section */}
            <div className="w-full text-center mt-6">
                <motion.div
                    key={product.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-light text-white tracking-widest uppercase mb-1">{t(`products.${product.id}`)}</h2>
                    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent mx-auto" />
                </motion.div>
            </div>
        </div>
    );
}
