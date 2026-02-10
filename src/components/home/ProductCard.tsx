'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getShimmerPlaceholder } from '@/lib/image-utils';

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
    const t = useTranslations('Catalog');
    const images = product.images || [product.image];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group flex flex-col bg-[#18181b] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#C5A059]/30"
        >
            {/* Main Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 400px"
                            priority={priority}
                            loading={priority ? 'eager' : 'lazy'}
                            placeholder="blur"
                            blurDataURL={getShimmerPlaceholder(400, 500)}
                        />
                    </motion.div>
                </AnimatePresence>


                {/* "Order" Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[2px]">
                    <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform scale-90 group-hover:scale-100 transition-transform duration-500"
                    >
                        <Button variant="gold" size="sm" className="px-6 py-4 flex flex-col items-center leading-tight shadow-2xl shadow-[#C5A059]/40">
                            <span className="text-sm font-bold uppercase tracking-widest">{t('buy_now')}</span>
                            <span className="text-[10px] font-medium text-black/70 tracking-tight lowercase">{t('buy_now_note')}</span>
                        </Button>
                    </a>
                </div>

                {/* Material/Price Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[#C5A059] text-[10px] font-bold uppercase tracking-widest border border-[#C5A059]/30">
                        {product.material}
                    </span>
                </div>
            </div>

            {/* Content & Thumbnails */}
            <div className="p-6 bg-gradient-to-b from-[#18181b] to-black border-t border-white/5">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-light text-white leading-tight max-w-[70%]">{t(`products.${product.id}`)}</h3>
                    <div className="text-right">
                        <p className="text-[#C5A059] font-medium text-lg">{product.price}</p>
                    </div>
                </div>

                {/* Thumbnails & Navigation Carousel row */}
                {images.length > 1 && (
                    <div className="space-y-4">
                        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar justify-center">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`relative flex-shrink-0 w-12 h-12 border transition-all duration-300 ${currentIndex === idx ? 'border-[#C5A059] ring-1 ring-[#C5A059]' : 'border-white/10 opacity-50 hover:opacity-100'
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt=""
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Carousel Navigation Arrows Below Thumbnails */}
                        <div className="flex justify-center gap-4 text-[#C5A059]">
                            <button
                                onClick={prevImage}
                                className="p-2 rounded-full border border-[#C5A059]/30 hover:bg-[#C5A059]/10 transition-colors"
                                aria-label="Previous image"
                            >
                                <FaChevronLeft size={16} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="p-2 rounded-full border border-[#C5A059]/30 hover:bg-[#C5A059]/10 transition-colors"
                                aria-label="Next image"
                            >
                                <FaChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
