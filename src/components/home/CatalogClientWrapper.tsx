'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import { ProductViewer } from '../catalog/ProductViewer';
import { CollectionCarousel } from '../catalog/CollectionCarousel';
import { motion, AnimatePresence } from 'framer-motion';

interface CatalogClientWrapperProps {
    products: Product[];
    initialProduct: Product;
}

export function CatalogClientWrapper({ products, initialProduct }: CatalogClientWrapperProps) {
    const searchParams = useSearchParams();
    const [selectedProduct, setSelectedProduct] = useState<Product>(initialProduct);

    // Update selected product if URL param changes
    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            const product = products.find(p => p.id === Number(id));
            if (product) setSelectedProduct(product);
        }
    }, [searchParams, products]);

    // Scroll to top on mobile when product changes
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [selectedProduct.id]);

    return (
        <div className="mt-4 md:mt-0">
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedProduct.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                    <ProductViewer product={selectedProduct} />
                </motion.div>
            </AnimatePresence>

            <div className="mt-8 sm:mt-12">
                <CollectionCarousel
                    products={products}
                    activeId={selectedProduct.id}
                    onSelect={setSelectedProduct}
                    useLinks={true}
                />
            </div>
        </div>
    );
}
