import { ProductGrid } from '@/components/home/ProductGrid';
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
    return (
        <div className="pt-20 bg-[#F9F9F7] min-h-screen">
            <ProductGrid />
        </div>
    );
}
