'use client';

import { useTranslations } from 'next-intl';
import productsData from '@/data/products.json';
import { ProductCard } from './ProductCard';
import { Product } from '@/types';

// Utility to determine colSpan based on index for a varied grid layout
const getColSpan = (index: number) => {
    const span2Indices = [0, 3, 7, 10, 15];
    return span2Indices.includes(index) ? 'md:col-span-2' : 'md:col-span-1';
};

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productsData.map((item, i) => (
                        <div key={item.id} className={getColSpan(i)}>
                            <ProductCard product={item as Product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
