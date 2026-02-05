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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative flex flex-col bg-[#18181b] rounded-none overflow-hidden"
        >
            {/* Image Container - Minimalist */}
            <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>

            {/* Content - Hidden initially or very minimal */}
            <div className="pt-6 space-y-2">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-light text-white tracking-wide group-hover:text-[#D4AF37] transition-colors">{product.title}</h3>
                    <span className="text-lg font-medium text-[#D4AF37]">{product.price}</span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="uppercase tracking-wider text-xs">{product.material}</span>
                </div>

                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <Button variant="outline" fullWidth size="sm" className="border-gray-700 text-gray-300 hover:border-white hover:text-white rounded-none">
                            {t('buy_now')}
                        </Button>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
