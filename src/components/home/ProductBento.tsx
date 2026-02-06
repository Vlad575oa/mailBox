'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const features = [
    {
        key: 'material',
        colSpan: 'md:col-span-2',
        image: '/images/PURE_BRASS_Personalized_Mailbox.jpg'
    },
    {
        key: 'design',
        colSpan: 'md:col-span-1',
        image: '/images/product-10.jpg'
    },
    {
        key: 'durability',
        colSpan: 'md:col-span-1',
        image: '/images/Custom_Wall_mount_Corten_steel_mailbox.jpg'
    },
    {
        key: 'customization',
        colSpan: 'md:col-span-2',
        image: '/images/Custom_Wall_mount_personalized_mailbox.jpg'
    }
];

export function ProductBento() {
    const t = useTranslations('ProductBento');

    return (
        <section className="py-24 bg-[#F9F9F7]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-light text-[#1A1A1A] mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-[#666666] max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.key}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative overflow-hidden rounded-sm bg-white shadow-sm ${feature.colSpan}`}
                        >
                            <Image
                                src={feature.image}
                                alt={t(`${feature.key}.title`)}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-0 left-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-serif italic mb-2">{t(`${feature.key}.title`)}</h3>
                                <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-xs">
                                    {t(`${feature.key}.description`)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
