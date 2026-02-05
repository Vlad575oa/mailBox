'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';

export function Hero() {
    const t = useTranslations('Hero');

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-gray-50 flex items-center justify-center py-20 lg:py-0">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <div className="order-2 lg:order-1 relative z-10 space-y-8">
                        <FadeIn delay={0.1}>
                            <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full mb-4">
                                {t('badge')}
                            </span>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <h1 className="text-5xl border-l-4 border-primary pl-6 font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl leading-[1.1]">
                                {t('title_start')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                                    {t('title_end')}
                                </span>
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
                                {t('description')}
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a href="https://ferrumdecorstudio.shop/collections/mail-boxes" target="_blank" rel="noopener noreferrer">
                                <Button variant="premium" size="xl" className="w-full sm:w-auto min-w-[220px]">
                                    {t('cta_shop')}
                                </Button>
                            </a>
                            <a href="#catalog">
                                <Button variant="outline" size="xl" className="w-full sm:w-auto min-w-[220px]">
                                    {t('cta_catalog')}
                                </Button>
                            </a>
                        </FadeIn>

                        <FadeIn delay={0.5} className="flex items-center gap-8 pt-6 text-sm font-semibold text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                {t('badge_shipping')}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                {t('badge_warranty')}
                            </div>
                        </FadeIn>
                    </div>

                    {/* Product "Card" Visual */}
                    <FadeIn direction="left" duration={0.8} delay={0.2} className="order-1 lg:order-2 relative z-10 perspective-1000">
                        <div className="relative w-full aspect-[4/5] md:aspect-square max-w-[600px] mx-auto group">
                            {/* Background Glow */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2rem] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-1000"></div>

                            {/* Card Container */}
                            <div className="relative h-full w-full rounded-[2rem] overflow-hidden bg-white shadow-2xl border border-white/50 transition-transform duration-700 ease-out group-hover:scale-[1.01] group-hover:-rotate-1">

                                {/* Image */}
                                <Image
                                    src="/images/product-1.jpg" // Using ID 1 as Hero
                                    alt="Custom Corten Steel Mailbox"
                                    fill
                                    priority
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                                {/* Floating Price Tag */}
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/50">
                                    <span className="text-xl font-bold text-gray-900">$359.00</span>
                                </div>

                                {/* Floating Label */}
                                <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                                    <p className="text-white font-medium text-sm text-opacity-80">{t('card_badge')}</p>
                                    <h3 className="text-white text-xl font-bold">{t('card_title')}</h3>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Background decorations */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent skew-x-12"></div>
        </section>
    );
}
