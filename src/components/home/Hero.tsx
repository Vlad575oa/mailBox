'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';

const products = [
    {
        id: 1,
        name: 'Corten Steel Lord of the Rings',
        price: '$359',
        image: '/images/product-1.jpg',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-lord-of-the-rings-inspired-corten-postbox-unique-personalized-mail-box'
    },
    {
        id: 2,
        name: 'Custom Order Joe Edition',
        price: '$1,525',
        image: '/images/product-2.jpg',
        url: 'https://ferrumdecorstudio.shop/products/custom-order-for-joe-custom-wall-mount-corten-steel-mailbox'
    },
    {
        id: 3,
        name: 'Modern Personalizable Corten',
        price: '$359',
        image: '/images/product-3.jpg',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-modern-personalizable-corten-postbox-unique-personalized-mail-box-copy-4'
    },
    {
        id: 4,
        name: 'Modern Colored Black Metal',
        price: '$359',
        image: '/images/product-4.jpg',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-mailbox-modern-colored-black-metal-postbox-unique-personalized-mail-box-copy-1'
    },
    {
        id: 5,
        name: 'Pure Brass 100% Letter Box',
        price: '$949',
        image: '/images/product-5.jpg',
        url: 'https://ferrumdecorstudio.shop/products/pure-brass-personalized-mailbox-modern-wall-mount-100-brass-letter-box-unique-personalized-post-box-copy'
    },
    {
        id: 6,
        name: 'Brass Personalized Letter Box',
        price: '$949',
        image: '/images/product-6.jpg',
        url: 'https://ferrumdecorstudio.shop/products/pure-brass-personalized-letter-box-modern-wall-mount-brass-mailbox-unique-personalized-post-box-copy'
    },
    {
        id: 7,
        name: 'Corten Steel Modern Series',
        price: '$949',
        image: '/images/product-7.jpg',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-modern-personalizable-corten-postbox-unique-personalized-mail-box-copy-3'
    },
    {
        id: 8,
        name: 'Corten Steel Personalizable V2',
        price: '$359',
        image: '/images/product-8.jpg',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-modern-personalizable-corten-postbox-unique-personalized-mail-box-copy-2'
    },
    {
        id: 9,
        name: 'Corten Steel Premium',
        price: '$399',
        image: '/images/product-9.jpg',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-modern-personalizable-corten-postbox-unique-personalized-mail-box-copy-1'
    },
    {
        id: 10,
        name: 'Black Metal Modern Postbox',
        price: '$359',
        image: '/images/product-10.jpg',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-mailbox-modern-colored-black-metal-postbox-unique-personalized-mail-box-copy'
    },
    {
        id: 11,
        name: 'Corten Wall Mount Classic',
        price: '$229',
        image: '/images/product-11.jpg',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-modern-personalizable-corten-postbox-unique-personalized-mail-box-copy'
    },
    {
        id: 12,
        name: 'Corten Steel Designer Edition',
        price: '$395',
        image: '/images/product-12.jpg',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-modern-personalizable-corten-postbox-unique-personalized-mail-box'
    },
    {
        id: 13,
        name: 'Merbau Wood Wall Mount',
        price: '$395',
        image: '/images/product-13.jpg',
        url: 'https://ferrumdecorstudio.shop/products/merbau-wall-mount-personalized-mailbox-copy'
    },
    {
        id: 14,
        name: 'Pure Brass Signature',
        price: '$395',
        image: '/images/product-14.jpg',
        url: 'https://ferrumdecorstudio.shop/products/pure-brass-personalized-mailbox-copy'
    },
    {
        id: 15,
        name: 'Brass Personalized Luxury',
        price: '$949',
        image: '/images/product-15.jpg',
        url: 'https://ferrumdecorstudio.shop/products/bespoke-custom-built-wall-mount-cor-ten-steel-mailbox-copy'
    },
    {
        id: 16,
        name: 'Corten Personalized Wall Mount',
        price: '$445',
        image: '/images/product-16.jpg',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-copy'
    },
];

export function Hero() {
    const t = useTranslations('Hero');
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-[90vh] w-full overflow-hidden bg-[#F9F9F7] flex items-center py-20 lg:py-24">

            {/* Background Image Parallax (Subtle) */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#F9F9F7]/12 to-[#F9F9F7] z-2" />
                <Image
                    src="/images/hero-bg-modern.png"
                    alt="Vintage Mailbox Background"
                    fill
                    priority
                    className="object-cover opacity-89"
                />
            </motion.div>

            <div className="w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center">

                    {/* LEFT SIDE: Compact 4x4 Catalog Grid (Now First Order) */}
                    <div className="lg:col-span-12 xl:col-span-5 order-2 lg:order-1 pl-[160px]">
                        <FadeIn delay={0.4} direction="right">
                            <div className="relative">
                                {/* Decorative elements */}
                                <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none" />

                                <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl p-3 border border-white/50">

                                    {/* Desktop: 4x4 Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {products.map((product) => (
                                            <a
                                                key={product.id}
                                                href={product.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group block relative aspect-square overflow-hidden rounded-lg bg-[#F2F0EB] shadow-sm hover:shadow-md transition-all duration-300"
                                            >
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                {/* Hover Overlay with Price */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="text-white font-medium text-sm tracking-wide bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                                                        {product.price}
                                                    </span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* RIGHT SIDE: Main Content (Now on Right) */}
                    <div className="lg:col-span-7 order-1 lg:order-2 text-center lg:text-left pl-0 lg:pl-40 pr-6">
                        <FadeIn delay={0.2}>
                            <span className="inline-block py-2 px-6 border border-white/20 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-bold tracking-[0.25em] uppercase mb-8">
                                {t('badge')}
                            </span>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight text-[#1A1A1A] mb-8 leading-[1.1]">
                                {t('title_start')} <br />
                                <span className="font-serif italic text-[#D4AF37]">
                                    {t('title_end')}
                                </span>
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.6}>
                            <p className="text-xl md:text-2xl text-[#1A1A1A] max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed mb-10 text-balance">
                                {t('description')}
                            </p>
                        </FadeIn>

                        {/* Stats - Moved to Right Column as requested */}
                        <FadeIn delay={0.7}>
                            <div className="flex items-center justify-center lg:justify-start gap-12 opacity-80 mb-12 text-[#1A1A1A]">
                                <div className="flex flex-col items-center lg:items-start gap-1">
                                    <div className="text-3xl font-serif">15+</div>
                                    <div className="text-[11px] uppercase tracking-wider text-[#666666]">Years Experience</div>
                                </div>
                                <div className="w-[1px] h-10 bg-[#1A1A1A]/10" />
                                <div className="flex flex-col items-center lg:items-start gap-1">
                                    <div className="text-3xl font-serif">EU/USA</div>
                                    <div className="text-[11px] uppercase tracking-wider text-[#666666]">Worldwide Shipping</div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* New Features List */}
                        <FadeIn delay={0.8}>
                            <div className="space-y-8 mb-12 text-left">
                                <div>
                                    <h3 className="text-[#1A1A1A] font-bold text-xl mb-1">{t('new_features.materials_title')}</h3>
                                    <p className="text-[#666666] font-light text-base">{t('new_features.materials_desc')}</p>
                                </div>
                                <div>
                                    <h3 className="text-[#1A1A1A] font-bold text-xl mb-1">{t('new_features.customization_title')}</h3>
                                    <p className="text-[#666666] font-light text-base">{t('new_features.customization_desc')}</p>
                                </div>
                                <div>
                                    <h3 className="text-[#1A1A1A] font-bold text-xl mb-1">{t('new_features.durability_title')}</h3>
                                    <p className="text-[#666666] font-light text-base">{t('new_features.durability_desc')}</p>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={1.0}>
                            <div className="flex gap-4 justify-center lg:justify-start">
                                <a href="https://ferrumdecorstudio.shop/collections/mail-boxes" target="_blank" rel="noopener noreferrer">
                                    <Button variant="gold" size="lg" className="min-w-[240px] py-6 text-lg shadow-xl shadow-[#D4AF37]/20 uppercase tracking-widest">
                                        {t('cta_buy')}
                                    </Button>
                                </a>
                            </div>
                        </FadeIn>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/40">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#1A1A1A]/20 to-transparent"></div>
            </motion.div>
        </section>
    );
}
