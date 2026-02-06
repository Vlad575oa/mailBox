'use client';

import { FaShieldAlt, FaFeather, FaHammer, FaRecycle } from 'react-icons/fa';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import Image from 'next/image';

export function Benefits() {
    const t = useTranslations('Benefits');

    const features = [
        {
            key: 'artisan',
            icon: FaHammer,
            title: t('items.artisan.title'),
            description: t('items.artisan.description'),
            className: "md:col-span-2 md:row-span-2 min-h-[400px]",
            image: "/images/product-6.jpg" // Corten visual
        },
        {
            key: 'element',
            icon: FaShieldAlt,
            title: t('items.element.title'),
            description: t('items.element.description'),
            className: "md:col-span-1 md:row-span-1",
            image: "/images/product-7.jpg" // Brass visual
        },
        {
            key: 'sustainable',
            icon: FaRecycle,
            title: t('items.sustainable.title'),
            description: t('items.sustainable.description'),
            className: "md:col-span-1 md:row-span-1",
            image: null // Icon focused
        },
        {
            key: 'aesthetic',
            icon: FaFeather,
            title: t('items.aesthetic.title'),
            description: t('items.aesthetic.description'),
            className: "md:col-span-2 md:row-span-1",
            image: "/images/product-8.jpg" // Designer visual
        }
    ];

    return (
        <section id="features" className="py-24 bg-white relative overflow-hidden">

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="mb-16 max-w-3xl">
                    <FadeIn>
                        <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs mb-2 block">{t('badge')}</span>
                        <h2 className="text-4xl md:text-5xl font-thin tracking-tight text-[#1A1A1A] mb-6">
                            {t('title_start')} <span className="font-serif italic text-[#D4AF37]">{t('title_end')}</span>
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="text-xl text-[#666666] font-light leading-relaxed border-l-2 border-[#D4AF37] pl-6 max-w-2xl">
                            {t('subtitle')}
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {features.map((feature, index) => (
                        <FadeIn key={index} delay={0.1 * index} className={clsx("h-full relative group rounded-2xl overflow-hidden shadow-lg", feature.className)}>
                            {/* Background Image if exists */}
                            {feature.image && (
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}

                            {/* Overlay */}
                            <div className={clsx(
                                "absolute inset-0 transition-opacity duration-300",
                                feature.image ? "bg-black/60 group-hover:bg-black/50" : "bg-[#F9F9F7]"
                            )} />

                            <div className="relative h-full p-8 flex flex-col justify-between z-10">
                                <div className={clsx(
                                    "inline-flex items-center justify-center w-12 h-12 rounded-full mb-6 backdrop-blur-md",
                                    feature.image ? "bg-white/20 text-white" : "bg-[#D4AF37]/10 text-[#D4AF37]"
                                )}>
                                    <feature.icon className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className={clsx(
                                        "text-2xl font-bold mb-3 tracking-wide",
                                        feature.image ? "text-white" : "text-[#1A1A1A]"
                                    )}>
                                        {feature.title}
                                    </h3>
                                    <p className={clsx(
                                        "font-light leading-relaxed text-sm md:text-base",
                                        feature.image ? "text-white/80" : "text-[#666666]"
                                    )}>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
