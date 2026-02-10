'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import productsData from '@/data/products.json';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';

const products = productsData as Product[];

export function Catalog() {
    const t = useTranslations('Catalog');
    const [filter, setFilter] = useState('All');

    const categories = ['All', ...Array.from(new Set(products.map(p => p.material)))];

    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.material === filter);

    // Helper to get translated category label
    const getCategoryLabel = (cat: string) => {
        if (cat === 'All') return t('all');
        if (cat.toLowerCase().includes('corten')) return t('corten');
        if (cat.toLowerCase().includes('brass')) return t('brass');
        if (cat.toLowerCase().includes('steel')) return t('steel');
        return cat;
    };

    return (
        <section id="catalog" className="py-32 bg-[#09090b]">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-12 border-b border-gray-800 pb-12">
                    <div className="max-w-2xl">
                        <FadeIn>
                            <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
                                {t('title_start')} <span className="font-medium italic text-gradient-gold">{t('title_end')}</span>
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <p className="text-xl text-gray-400 font-light leading-relaxed">
                                {t('description')}
                            </p>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.2} className="flex flex-wrap gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${filter === cat
                                    ? 'bg-[#C5A059] text-black border-[#C5A059]'
                                    : 'bg-transparent text-gray-400 border-gray-800 hover:border-[#C5A059] hover:text-[#C5A059]'
                                    }`}
                            >
                                {getCategoryLabel(cat)}
                            </button>
                        ))}
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-32 text-gray-500 font-light text-xl">
                        {t('no_products')}
                    </div>
                )}
            </div>
        </section>
    );
}
