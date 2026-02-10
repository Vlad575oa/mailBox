'use client';

import { Suspense, useEffect } from 'react';
import { ProductCatalog } from '@/components/home/ProductCatalog';

export default function CatalogPageClient() {
    useEffect(() => {
        // Scroll to top when navigating to catalog page
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <div className="pt-24 bg-[#050505] min-h-screen">
            <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
                <ProductCatalog />
            </Suspense>
        </div>
    );
}
