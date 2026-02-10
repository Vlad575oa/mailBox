import { Suspense } from 'react';
import { ProductCatalog } from '@/components/home/ProductCatalog';
import { getTranslations } from 'next-intl/server';
import productsData from '@/data/products.json';
import { Product } from '@/types';

type Props = {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props) {
    const { locale } = await params;
    const { id } = await searchParams;
    const t = await getTranslations({ locale, namespace: 'Catalog' });
    const baseUrl = 'https://ferrumdecorstudio.shop';

    // Find product if id exists
    const productId = id ? Number(id) : null;
    const product = productId ? (productsData as Product[]).find(p => p.id === productId) : null;

    // Base URL for this page (catalog root)
    const pagePath = `${baseUrl}/${locale}/catalog`;
    const canonicalUrl = product ? `${pagePath}?id=${product.id}` : pagePath;

    const languages = {} as Record<string, string>;
    ['de', 'en', 'ru', 'ja', 'it', 'fr', 'uk'].forEach(loc => {
        languages[loc] = product
            ? `${baseUrl}/${loc}/catalog?id=${product.id}`
            : `${baseUrl}/${loc}/catalog`;
    });

    const title = product
        ? `${t(`products.${product.id}`)} | FerrumDecor`
        : `${t('title_start')} ${t('title_end')} | FerrumDecor`;

    const description = product
        ? `${t(`products.${product.id}`)} - ${t('description')}`
        : t('description');

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                ...languages,
                'x-default': product
                    ? `${baseUrl}/de/catalog?id=${product.id}`
                    : `${baseUrl}/de/catalog`
            }
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            images: product ? [{ url: product.image }] : undefined
        }
    };
}

export default function CatalogPage() {
    // Catalog page render
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
            <ProductCatalog />
        </Suspense>
    );
}
