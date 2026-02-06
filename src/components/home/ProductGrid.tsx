'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

import productsData from '@/data/products.json';

// Utility to determine colSpan based on index for a varied grid layout
const getColSpan = (index: number) => {
    // Indices: 0, 3, 7, 10, 15 should have col-span-2 (original pattern)
    const span2Indices = [0, 3, 7, 10, 15];
    return span2Indices.includes(index) ? 'md:col-span-2' : 'md:col-span-1';
};

const products = productsData.map((item, index) => ({
    id: item.id,
    name: item.title,
    price: item.price ? item.price.replace('.00 USD', '') : item.title.match(/\$\d+/)?.[0] || 'Price on request',
    image: item.image,
    colSpan: getColSpan(index),
    url: item.link
}));

export function ProductGrid() {
    const t = useTranslations('ProductGrid');

    return (
        <section id="catalog" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-thin text-[#1A1A1A] mb-4">
                            {t('title')}
                        </h2>
                        <p className="text-[#666666] max-w-lg mb-4 font-light">
                            {t('description')}
                        </p>
                        <div className="h-[1px] w-full bg-[#1A1A1A]/10" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                    {products.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.6 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className={`group relative overflow-hidden rounded-sm bg-[#F9F9F7] ${product.colSpan}`}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <h3 className="text-2xl font-light text-white mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-white/80 italic font-serif mb-6">{product.price}</p>

                                <a href={product.url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="gold" className="w-full">
                                        {t('buy_btn')}
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
