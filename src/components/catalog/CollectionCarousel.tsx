'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface CollectionCarouselProps {
    products: Product[];
    activeId: number;
    onSelect: (product: Product) => void;
}

export function CollectionCarousel({ products, activeId, onSelect }: CollectionCarouselProps) {
    const t = useTranslations('Catalog');
    const wrapperRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [constraints, setConstraints] = useState({ left: 0, right: 0 });

    const scroll = (direction: 'left' | 'right') => {
        if (wrapperRef.current) {
            const { scrollLeft, clientWidth } = wrapperRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            wrapperRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (!wrapperRef.current || !scrollRef.current) return;

        const handleResize = () => {
            if (wrapperRef.current && scrollRef.current) {
                const containerWidth = wrapperRef.current.offsetWidth;
                const contentWidth = scrollRef.current.scrollWidth;
                // Calculate max drag distance (negative value)
                // We want to stop when the right edge of content hits the right edge of container
                const minLeft = -(contentWidth - containerWidth);
                setConstraints({ left: minLeft > 0 ? 0 : minLeft, right: 0 });
            }
        };

        handleResize(); // Initial calculation
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [products]);

    return (
        <div className="w-full bg-transparent py-4 px-4 sm:px-6">
            {/* Header Line */}
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 mb-4">
                <div className="h-[1px] flex-grow bg-white/10" />
                <span className="text-[9px] uppercase tracking-[0.4em] font-medium text-white/30 whitespace-nowrap">
                    collection browse
                </span>
                <div className="h-[1px] flex-grow bg-white/10" />
            </div>

            {/* Carousel Container */}
            <div className="relative group max-w-[1400px] mx-auto flex items-center gap-2 sm:gap-4">
                <button
                    onClick={() => scroll('left')}
                    className="p-2 text-white/20 hover:text-[#C5A059] transition-colors flex-shrink-0"
                    aria-label="Scroll left"
                >
                    <FaChevronLeft size={20} strokeWidth={1} />
                </button>

                <div
                    ref={wrapperRef}
                    className="flex-grow overflow-x-hidden py-4"
                >
                    <motion.div
                        ref={scrollRef}
                        drag="x"
                        dragConstraints={constraints}
                        dragElastic={0.1}
                        className="flex gap-4 sm:gap-6 cursor-grab active:cursor-grabbing items-end w-max"
                    >
                        {products.map((product) => {
                            const isActive = product.id === activeId;
                            return (
                                <motion.button
                                    key={product.id}
                                    onClick={() => onSelect(product)}
                                    className={`relative flex-shrink-0 flex flex-col items-center transition-all duration-700 ${isActive ? 'w-[40px] sm:w-[50px]' : 'w-[28px] sm:w-[35px] opacity-100 grayscale-0 hover:opacity-100'
                                        }`}
                                    animate={{
                                        scale: isActive ? 1.05 : 0.95,
                                        y: isActive ? -2 : 0
                                    }}
                                >
                                    <div className={`relative aspect-[3/4] w-full overflow-hidden bg-white/5 border transition-all duration-300 ${isActive ? 'border-[#C5A059] shadow-[0_0_10px_rgba(197,160,89,0.3)]' : 'border-white/5'}`}>
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-cover pointer-events-none"
                                            sizes="50px"
                                        />
                                        {isActive && (
                                            <div className="absolute inset-0 border border-[#C5A059]/50 z-20 pointer-events-none" />
                                        )}
                                    </div>
                                    <span className={`text-[5px] uppercase tracking-[0.2em] text-center truncate w-full mt-1.5 transition-colors duration-300 ${isActive ? 'text-[#C5A059] font-bold' : 'text-white/40 font-light'}`}>
                                        {t(`products.${product.id}`)}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="p-2 text-white/20 hover:text-[#C5A059] transition-colors flex-shrink-0"
                    aria-label="Scroll right"
                >
                    <FaChevronRight size={20} strokeWidth={1} />
                </button>
            </div>
        </div>
    );
}
