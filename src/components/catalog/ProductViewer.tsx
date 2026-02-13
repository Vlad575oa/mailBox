'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaWhatsapp, FaEtsy } from 'react-icons/fa';
import { trackFerrumShopClick } from '@/lib/analytics';

interface ProductViewerProps {
    product: Product;
}

export function ProductViewer({ product }: ProductViewerProps) {
    const t = useTranslations('Catalog');
    const tWA = useTranslations('WhatsApp');
    const images = product.images || [product.image];
    const [currentIndex, setCurrentIndex] = useState(0);
    // Reset index when product changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [product.id]);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);


    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8">
            {/* 3-Column Layout to ensure perfect centering on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-[0.6fr_1.8fr_0.6fr] items-center gap-10 lg:gap-0">

                {/* Left Balance Spacer (Visible only on Desktop) */}
                <div className="hidden lg:block h-full w-full" />

                {/* Center: Main Image with External Arrows */}
                <div className="relative flex flex-col items-center w-full">
                    <div className="relative w-full flex items-center justify-center gap-4 sm:gap-10 py-0">
                        {/* Left Arrow - Now outside */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="p-3 sm:p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white transition-all hover:scale-110 active:scale-90 z-30"
                            aria-label="Previous image"
                        >
                            <FaChevronLeft size={20} />
                        </button>

                        <motion.div
                            key={`${product.id}-${currentIndex}`}
                            className="relative aspect-square w-full max-w-[600px] lg:max-w-[800px] overflow-hidden rounded-sm shadow-2xl border border-white/5 z-20 cursor-grab active:cursor-grabbing"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(_, info) => {
                                if (info.offset.x > 30) prevImage();
                                else if (info.offset.x < -30) nextImage();
                            }}
                        >
                            <Image
                                src={images[currentIndex]}
                                alt={t(`products.${product.id}`)}
                                fill
                                className="object-cover pointer-events-none"
                                sizes="(max-width: 768px) 100vw, 800px"
                                priority
                            />
                            <div className="absolute top-3 left-3 z-30">
                                <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md text-[#C5A059] text-[8px] font-bold uppercase tracking-[0.2em] border border-[#C5A059]/30">
                                    {product.material}
                                </span>
                            </div>
                        </motion.div>

                        {/* Right Arrow - Now outside */}
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="p-3 sm:p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white transition-all hover:scale-110 active:scale-90 z-30"
                            aria-label="Next image"
                        >
                            <FaChevronRight size={20} />
                        </button>
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
                <div className="flex flex-col items-center lg:items-end -mt-2 lg:mt-0 lg:pt-16 lg:pl-16 gap-6 max-w-[320px] lg:max-w-none mx-auto lg:mx-0">

                    <div className="flex flex-col items-center lg:items-end gap-3">
                        <div className="flex flex-col items-center gap-2">
                            <a
                                href={product.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white text-[11px] sm:text-xs text-center px-4 font-light tracking-wide max-w-[300px] lg:max-w-none hover:text-[#C5A059] transition-colors leading-tight"
                                onClick={() => trackFerrumShopClick(`product_viewer_note_${product.id}`)}
                            >
                                {t('official_site_note')}
                            </a>
                            <a
                                href={product.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transform scale-90 hover:scale-100 transition-transform duration-500"
                                onClick={() => trackFerrumShopClick(`product_viewer_button_${product.id}`)}
                            >
                                <Button
                                    className="relative rounded-full px-8 py-3 sm:px-10 sm:py-4 overflow-hidden group transition-all duration-500 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-[length:200%_auto] hover:bg-right hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] flex flex-col items-center justify-center leading-[1.1] min-w-[160px] animate-pulse"
                                >
                                    <span className="relative text-sm font-bold tracking-wider uppercase text-black z-10 leading-none">
                                        {t('buy_now')}
                                    </span>
                                    {t('buy_now_note') && (
                                        <span className="relative text-[10px] font-medium text-black/70 tracking-tight lowercase z-10 leading-none mt-0.5">
                                            {t('buy_now_note')}
                                        </span>
                                    )}
                                </Button>
                            </a>
                        </div>

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
                    <h2 className="text-[10px] sm:text-sm font-light text-white tracking-widest uppercase mb-1 leading-tight">{t(`products.${product.id}`)}</h2>

                    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent mx-auto" />
                </motion.div>
            </div>
        </div>
    );
}
