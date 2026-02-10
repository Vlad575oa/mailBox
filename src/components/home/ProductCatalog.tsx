'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import { ProductViewer } from '../catalog/ProductViewer';
import { CollectionCarousel } from '../catalog/CollectionCarousel';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function ProductCatalog() {
    const products = productsData as Product[];
    const searchParams = useSearchParams();
    const initialId = searchParams.get('id');

    const initialProduct = initialId
        ? products.find(p => p.id === Number(initialId)) || products[0]
        : products[0];

    const [selectedProduct, setSelectedProduct] = useState<Product>(initialProduct);

    // Update selected product if URL param changes (optional, but good for back/forward navigation)
    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            const product = products.find(p => p.id === Number(id));
            if (product) setSelectedProduct(product);
        }
    }, [searchParams, products]);

    return (
        <section className="relative w-full min-h-screen bg-[#050505] pt-24 pb-20 overflow-hidden" id="catalog">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/back_catalog.png"
                    alt="Catalog Background"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#050505] to-[#000000] opacity-40 pointer-events-none z-1" />

            <div className="container relative z-10 mx-auto">
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
                    />
                </div>
            </div>
        </section>
    );
}
