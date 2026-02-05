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
        <section id="catalog" className="py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <FadeIn>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                                {t('title_start')} <span className="text-primary">{t('title_end')}</span>
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                                {t('description')}
                            </p>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.2} className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border whitespace-nowrap ${filter === cat
                                        ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900 hover:text-gray-900'
                                    }`}
                            >
                                {getCategoryLabel(cat)}
                            </button>
                        ))}
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        {t('no_products')}
                    </div>
                )}
            </div>
        </section>
    );
}
