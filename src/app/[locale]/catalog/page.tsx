import { Suspense } from 'react';
import { ProductCatalog } from '@/components/home/ProductCatalog';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Catalog' });
    return {
        title: t('title_start') + ' ' + t('title_end') + ' | FerrumDecor',
        description: t('description')
    };
}

export default function CatalogPage() {
    // Catalog page render
    return (
        <div className="pt-16 bg-white min-h-screen">
            <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
                <ProductCatalog />
            </Suspense>
        </div>
    );
}
