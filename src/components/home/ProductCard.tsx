'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const t = useTranslations('Catalog');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col overflow-hidden rounded-[1.5rem] bg-white transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-100"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Floating Price */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-sm font-bold text-gray-900 border border-white/50">
                    {product.price}
                </div>
            </div>

            {/* Content */}
            <div className="relative p-6 flex flex-col flex-grow">
                <div className="mb-3 flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {product.material}
                    </span>
                </div>

                <h3 className="mb-4 text-xl font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors">
                    {product.title}
                </h3>

                {/* Hidden benefits that slide up on hover could go here, but kept clean for mobile */}

                <div className="mt-auto pt-6 border-t border-gray-100 flex gap-3 opacity-90 group-hover:opacity-100 transition-opacity">
                    <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                    >
                        <Button variant="premium" fullWidth size="sm" className="rounded-xl shadow-none">
                            {t('buy_now')}
                        </Button>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
