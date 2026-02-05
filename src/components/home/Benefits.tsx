'use client';

import { FaShieldAlt, FaFeather, FaHammer, FaRecycle } from 'react-icons/fa';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

export function Benefits() {
    const t = useTranslations('Benefits');

    const features = [
        {
            icon: FaHammer,
            title: t('items.artisan.title'),
            description: t('items.artisan.description'),
            className: "md:col-span-2 md:row-span-2 min-h-[400px]" // Big feature
        },
        {
            icon: FaShieldAlt,
            title: t('items.element.title'),
            description: t('items.element.description'),
            className: "md:col-span-1 md:row-span-1"
        },
        {
            icon: FaRecycle,
            title: t('items.sustainable.title'),
            description: t('items.sustainable.description'),
            className: "md:col-span-1 md:row-span-1"
        },
        {
            icon: FaFeather,
            title: t('items.aesthetic.title'),
            description: t('items.aesthetic.description'),
            className: "md:col-span-2 md:row-span-1" // Wide feature
        }
    ];

    return (
        <section id="features" className="py-32 bg-[#09090b] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="mb-24 max-w-3xl">
                    <FadeIn>
                        <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white mb-6">
                            {t('title_start')} <span className="font-bold gold-text">{t('title_end')}</span>
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="text-xl text-gray-400 font-light leading-relaxed border-l-2 border-[#D4AF37]/50 pl-6">
                            {t('subtitle')}
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {features.map((feature, index) => (
                        <FadeIn key={index} delay={0.1 * index} className={clsx("h-full", feature.className)}>
                            <div className="group h-full p-10 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500 hover:bg-white/[0.05] relative overflow-hidden flex flex-col justify-between">

                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110 group-hover:-rotate-12">
                                    <feature.icon className="w-32 h-32 text-white" />
                                </div>

                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-6 border border-[#D4AF37]/20 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="h-6 w-6" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">{feature.title}</h3>
                                    <p className="text-gray-400 font-light leading-relaxed">
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
