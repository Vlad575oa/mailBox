'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export function BrandStory() {
    const containerRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('ProductBento'); // Using ProductBento messages for now as we added keys there
    const details = ['detail_1', 'detail_2', 'detail_3', 'detail_4']; // Keys for mapping, if we had array in json we could map. But messages are array in json. Next-intl array handling:

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
        <section id="brand-story" ref={containerRef} className="py-32 overflow-hidden bg-white relative">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

                    {/* LEFT: Detail Image */}
                    {/* LEFT: Text & Details */}
                    <div className="order-1 md:order-1 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className="text-4xl md:text-6xl font-thin tracking-tight text-[#1A1A1A] mb-8">
                                {t('title')}
                            </h2>
                            <p className="text-2xl text-[#666666] leading-relaxed font-light mb-10">
                                {t('text')}
                            </p>

                            {/* Staggered Details List */}
                            <ul className="space-y-4">
                                {[0, 1, 2, 3].map((i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 + (i * 0.15) }}
                                        className="flex items-center gap-4 text-lg text-[#1A1A1A]"
                                    >
                                        <span className="w-12 h-[1px] bg-[#B89E72]"></span>
                                        {t(`details.${i}`)}
                                    </motion.li>
                                ))}
                            </ul>

                        </motion.div>
                    </div>

                    {/* RIGHT: Detail Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="order-2 md:order-2 relative"
                    >
                        <div className="relative z-10">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-2xl shadow-[#B89E72]/10">
                                <Image
                                    src="/images/brand-story-detail.png"
                                    alt="Precision Engineering"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-[#B89E72]/5 mix-blend-overlay" />
                            </div>
                        </div>
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#F9F9F7] border border-[#B89E72]/20 z-0 -z-10" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
