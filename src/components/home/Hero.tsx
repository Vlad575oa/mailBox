'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Hero() {
    const t = useTranslations('Hero');
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#09090b] flex items-center justify-center">

            {/* Background Image Parallax */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-black/30 z-10" />
                <Image
                    src="/images/product-1.jpg" // High quality hero background
                    alt="Luxury Mailbox"
                    fill
                    priority
                    className="object-cover opacity-60"
                />
            </motion.div>

            {/* Cinematic Particles or overlay effects could go here */}

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div style={{ opacity }}>
                    <FadeIn delay={0.2} direction="down">
                        <span className="inline-block py-1 px-3 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
                            {t('badge')}
                        </span>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-extralight tracking-tighter text-white mb-6">
                            {t('title_start')} <br className="hidden md:block" />
                            <span className="font-bold gold-text">
                                {t('title_end')}
                            </span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.6}>
                        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-12 text-balance">
                            {t('description')}
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.8} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <a href="https://ferrumdecorstudio.shop/collections/mail-boxes" target="_blank" rel="noopener noreferrer">
                            <Button variant="gold" size="xl" className="min-w-[240px]">
                                {t('cta_shop')}
                            </Button>
                        </a>
                        <a href="#catalog">
                            <Button variant="outline" size="xl" className="min-w-[240px]">
                                {t('cta_catalog')}
                            </Button>
                        </a>
                    </FadeIn>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
            >
                <span className="text-[10px] uppercase tracking-[0.3em]">Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
            </motion.div>
        </section>
    );
}
